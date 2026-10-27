/**
 * 欧美出海 PayPal 9.99 美元终身买断收单服务 (PayPal Buy-out & VIP Service)
 * 1. 真实配置: 填入开发者的 PayPal Client-ID 即可直连官方 PayPal 结算 (美元进账)
 * 2. 模拟沙盒: 支持开发者在本地/非公网环境下一键免密沙盒测试支付流程
 * 3. 终身特权: 永久免广告、赠送 $1000万 启动金、专属 VIP 黄金标识、无限后悔药
 */

const PAYPAL_CONFIG = {
  // 生产环境时替换为你的真实 PayPal 商家 Client ID (获取地址: developer.paypal.com)
  // 默认为官方 Sandbox 沙盒测试 Client ID ('sb')
  clientId: 'sb',
  currency: 'USD',
  price: '9.99',
  productName: 'Winning $100M: VIP Lifetime Pass (9.99 USD)',
  description: '永久去除全部广告 + 赠送1000万美元启动金 + 无限人生倒带悔棋'
};

class PayPalService {
  constructor() {
    this.isPurchased = localStorage.getItem('vip_lifetime_purchased') === 'true';
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.initDOM();
        this.syncVIPStatus();
      });
    } else {
      this.initDOM();
      this.syncVIPStatus();
    }
  }

  isVip() {
    return this.isPurchased;
  }

  initDOM() {
    // 监听买断特权按钮点击
    const btnOpenBuyout = document.getElementById('btn-open-buyout');
    if (btnOpenBuyout) {
      btnOpenBuyout.addEventListener('click', () => this.openModal());
    }

    const btnCloseBuyout = document.getElementById('btn-close-buyout');
    if (btnCloseBuyout) {
      btnCloseBuyout.addEventListener('click', () => this.closeModal());
    }

    // 开发者/玩家一键沙盒模拟支付
    const btnSimulatePay = document.getElementById('btn-simulate-paypal');
    if (btnSimulatePay) {
      btnSimulatePay.addEventListener('click', () => {
        this.processSuccessfulPayment({
          id: 'SANDBOX_PAYPAL_TX_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          status: 'COMPLETED',
          payer: { name: { given_name: 'Overseas Player' } },
          amount: { value: '9.99', currency_code: 'USD' }
        });
      });
    }

    // 尝试挂载 PayPal 官方 Smart Buttons
    this.mountPayPalSDK();
  }

  openModal() {
    const modal = document.getElementById('modal-buyout-paypal');
    if (modal) {
      modal.classList.remove('hidden');
      this.updateModalUI();
    }
  }

  closeModal() {
    const modal = document.getElementById('modal-buyout-paypal');
    if (modal) modal.classList.add('hidden');
  }

  updateModalUI() {
    const statusBox = document.getElementById('buyout-status-desc');
    const actionArea = document.getElementById('buyout-actions-box');
    if (this.isPurchased) {
      if (statusBox) statusBox.innerHTML = '<span style="color:#10b981; font-weight:bold;">✅ 已尊享 $9.99 终身大亨买断特权 (所有广告已永久免除)</span>';
      if (actionArea) actionArea.style.display = 'none';
    } else {
      if (statusBox) statusBox.innerHTML = '只需一次性支付 $9.99，永久解锁尊荣体验，款项直结创作者 PayPal。';
      if (actionArea) actionArea.style.display = 'block';
    }
  }

  // 挂载官方 PayPal 智能支付 SDK
  mountPayPalSDK() {
    // 若在已购买状态或无容器则不加载
    if (this.isPurchased) return;
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    // 如果网络允许，动态加载官方 PayPal JS SDK
    if (typeof paypal === 'undefined') {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=${PAYPAL_CONFIG.currency}`;
      script.onload = () => this.renderButtons();
      script.onerror = () => {
        console.log('[PayPal] Running in standalone/offline mode, using direct checkout simulation.');
      };
      document.head.appendChild(script);
    } else {
      this.renderButtons();
    }
  }

  renderButtons() {
    if (typeof paypal === 'undefined' || !paypal.Buttons) return;
    const container = document.getElementById('paypal-button-container');
    if (!container || container.children.length > 0) return;

    try {
      paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'gold',
          shape: 'rect',
          label: 'pay'
        },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              description: PAYPAL_CONFIG.description,
              amount: {
                currency_code: PAYPAL_CONFIG.currency,
                value: PAYPAL_CONFIG.price
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            console.log('[PayPal] Transaction completed by ' + details.payer.name.given_name);
            this.processSuccessfulPayment(details);
          });
        },
        onError: (err) => {
          console.error('[PayPal] Payment Error:', err);
          if (window.game) {
            window.game.showToast('⚠️ PayPal 支付中断或网络超时，可使用备用模拟通道');
          }
        }
      }).render('#paypal-button-container');
    } catch (e) {
      console.warn('[PayPal] Button render error:', e);
    }
  }

  // 支付成功核心回调处理
  processSuccessfulPayment(txDetails) {
    this.isPurchased = true;
    localStorage.setItem('vip_lifetime_purchased', 'true');
    this.closeModal();

    // 1. 同步到广告服务
    this.syncVIPStatus();

    // 2. 给予玩家 $10,000,000 终身大亨启动红包
    if (window.game) {
      const bonus = 10000000;
      window.game.liquidCash += bonus;
      window.game.reputation = Math.min(100, window.game.reputation + 20);
      window.game.credit = Math.min(100, window.game.credit + 25);
      window.game.updateHUD();
      window.game.renderCurrentTab();
      window.game.showToast(`🎉 感谢支持！$9.99 终身特权生效！已到账 +$10,000,000 巨款！`);
    }

    // 3. 弹窗提示
    const feedbackText = document.getElementById('feedback-text');
    if (feedbackText) {
      feedbackText.innerText = `👑 感谢购买 $9.99 VIP 终身大亨买断包！\n\n- 支付流水: ${txDetails.id}\n- 永久去除全剧所有激励广告与插屏广告！\n- 开局额外赠送 $10,000,000 流动注资！\n- 商业信誉与名流声望大幅提升！\n- 无限次悔棋后悔药已常驻开启！`;
      document.getElementById('modal-feedback').classList.remove('hidden');
    }
  }

  // 同步 VIP 状态到全局 UI 与广告逻辑
  syncVIPStatus() {
    if (this.isPurchased) {
      // 告诉广告服务跳过所有广告倒计时
      if (window.adService) {
        window.adService.isVipLifetime = true;
      }

      // 更新顶部按钮
      const btn = document.getElementById('btn-open-buyout');
      if (btn) {
        btn.innerHTML = '👑 <span>VIP 终身大亨</span>';
        btn.classList.add('vip-active');
      }

      // 更新底部常驻广告栏为一键秒领
      const btnInsider = document.getElementById('btn-ad-insider');
      if (btnInsider) {
        btnInsider.innerHTML = '👑 <span>VIP秒领 (+$5M风投)</span>';
      }
      const btnYield = document.getElementById('btn-ad-double-yield');
      if (btnYield) {
        btnYield.innerHTML = '👑 <span>VIP秒领 (双倍理财)</span>';
      }
      const btnRewind = document.getElementById('btn-ad-rewind');
      if (btnRewind) {
        btnRewind.innerHTML = '👑 <span>VIP无限倒带 (悔棋)</span>';
        btnRewind.classList.remove('hidden');
      }
    }
  }
}

window.paypalService = new PayPalService();
