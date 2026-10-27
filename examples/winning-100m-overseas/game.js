/**
 * 完整对齐原版架构的海外版主逻辑控制器 (Game Controller)
 * 100% 对应原版核心系统:
 * - core.LifeSimulation (52周推进/生活费扣减/年龄增长)
 * - core.Ledger (复式记账/流动现金/固定资产/实业投资)
 * - core.ConsumerAssets (商城购买/真实折旧/9折二手出售)
 * - FirstTreat (首局三卡兑现: 好物/好车/好房)
 * - 五维属性: Health, Wisdom, Reputation, Romance, Credit
 * - 终局人生六幕长卷特稿
 */

class FullLifeGameEngine {
  constructor() {
    // 1. 时间轴系统 (Time & Age)
    this.currentWeek = 1;
    this.currentYear = 2026;
    this.currentAge = 29;
    this.weeklyLivingCost = 1200; // 每周基础生活开销 ($)

    // 2. 五维属性系统 (Five Stats 0 ~ 100)
    this.health = 75;
    this.wisdom = 60;
    this.reputation = 40;
    this.romance = 45;
    this.credit = 60;

    // 3. 复式记账系统 (Double-Entry Ledger)
    this.liquidCash = 20; // 初始口袋里只有20美元彩票钱
    this.ownedAssets = []; // [{ id, buyYear, buyPrice, item }]
    this.investments = []; // [{ name, amount, annualYield }]

    // 4. 剧情与事实状态 (Facts & Story)
    this.storyIndex = 0;
    this.facts = {
      owns_house: false,
      owns_vehicle: false,
      marital_status: 'single',
      first_treat_done: false
    };

    // 历史重大事件记录 (用于人生特稿长卷)
    this.lifeEventsLog = [];

    // 当前主界面激活标签: 'story' | 'stocks' | 'mall' | 'ledger' | 'family'
    this.currentTab = 'story';
    this.currentMallCategory = 'all';

    // 剧情剧本模式: 'lottery' (中彩票1亿) | 'black_gold' (黑金教皇逆袭)
    this.activeScenario = 'lottery';

    // 广告后悔药备份与黑天鹅对冲
    this.backupSnapshot = null;
    this.currentPendingBearNews = null;

    this.initDOM();
    this.renderCurrentTab();
    this.updateHUD();
  }

  // 获取当前剧本的所有章节
  getCurrentScenarioChapters() {
    if (this.activeScenario === 'black_gold' && typeof SCENARIO_BLACK_GOLD_CHAPTERS !== 'undefined') {
      return SCENARIO_BLACK_GOLD_CHAPTERS;
    }
    return STORY_CHAPTERS;
  }

  // 计算总净资产 (Total Net Worth)
  getTotalNetWorth() {
    const assetsVal = this.ownedAssets.reduce((sum, a) => {
      const years = Math.max(0, this.currentYear - a.buyYear);
      return sum + calculateAssetCurrentValue(a.item, years);
    }, 0);
    const investVal = this.investments.reduce((sum, i) => sum + i.amount, 0);
    const stockVal = window.stockMarket ? window.stockMarket.getTotalPortfolioValue() : 0;
    return Math.round(this.liquidCash + assetsVal + investVal + stockVal);
  }

  // 计算当前持有名下固定资产总估值
  getConsumerAssetsValue() {
    return this.ownedAssets.reduce((sum, a) => {
      const years = Math.max(0, this.currentYear - a.buyYear);
      return sum + calculateAssetCurrentValue(a.item, years);
    }, 0);
  }

  // --- 初始化事件绑定 ---
  initDOM() {
    // 标签页切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentTab = btn.dataset.tab;
        this.renderCurrentTab();
      });
    });

    // 时间推进按钮
    document.getElementById('btn-next-week').addEventListener('click', () => this.advanceWeeks(1));
    document.getElementById('btn-next-year').addEventListener('click', () => this.advanceWeeks(52));

    // 首局三卡兑现“暂不购买”
    document.getElementById('btn-skip-first-treat').addEventListener('click', () => {
      document.getElementById('modal-first-treat').classList.add('hidden');
      this.facts.first_treat_done = true;
    });

    // 故事反馈继续按钮
    document.getElementById('btn-continue-story').addEventListener('click', () => {
      document.getElementById('modal-feedback').classList.add('hidden');
      this.storyIndex++;
      this.renderStoryView();
    });

    // 广告 1: 悔棋后悔药
    document.getElementById('btn-ad-rewind').addEventListener('click', () => {
      window.adService.showRewarded('rewind_time', () => {
        this.restoreBackup();
      });
    });

    // 广告 2: 商业内幕风投红包
    document.getElementById('btn-ad-insider').addEventListener('click', () => {
      window.adService.showRewarded('insider_grant', () => {
        const bonus = 5000000;
        this.liquidCash += bonus;
        this.updateHUD();
        this.showToast(`🎉 华尔街神秘天使基金注资: +$5,000,000!`);
      });
    });

    // 广告 3: 双倍年度被动理财结算
    document.getElementById('btn-ad-double-yield').addEventListener('click', () => {
      window.adService.showRewarded('double_annual_yield', () => {
        const bonus = Math.round(this.liquidCash * 0.08);
        this.liquidCash += bonus;
        this.updateHUD();
        this.showToast(`📈 年度离线理财双倍结算: +$${bonus.toLocaleString()}!`);
      });
    });

    // 重开一局
    document.getElementById('btn-restart-game').addEventListener('click', () => {
      document.getElementById('modal-endgame').classList.add('hidden');
      this.restartGame();
    });

    // 华尔街快讯确认
    document.getElementById('btn-close-news').addEventListener('click', () => {
      document.getElementById('modal-market-news').classList.add('hidden');
    });

    // 美联储救市对冲广告
    document.getElementById('btn-bailout-ad').addEventListener('click', () => {
      if (this.currentPendingBearNews) {
        window.adService.showRewarded('bailout_protection', () => {
          const ev = this.currentPendingBearNews;
          const stock = window.stockMarket.stocks.find(s => s.symbol === ev.symbol);
          if (stock) {
            window.stockMarket.bailoutFromBearMarket(ev.symbol, stock.prevPrice);
          }
          document.getElementById('modal-market-news').classList.add('hidden');
          this.showToast(`🛡️ 美联储对冲救市成功！${ev.symbol} 暴跌已无损撤销！`);
          this.updateHUD();
          this.renderCurrentTab();
        });
      }
    });
  }

  // --- 推进时间 (周循环 / 年循环) ---
  advanceWeeks(numWeeks) {
    for (let i = 0; i < numWeeks; i++) {
      this.currentWeek++;
      if (this.currentWeek % 52 === 0) {
        this.currentYear++;
        this.currentAge++;

        // 年度投资收益结算
        let annualYieldTotal = 0;
        this.investments.forEach(inv => {
          const yieldMoney = inv.amount * inv.annualYield;
          annualYieldTotal += yieldMoney;
        });
        if (annualYieldTotal > 0) {
          this.liquidCash += annualYieldTotal;
        }

        // 年度生活费与豪宅跑车维护费
        const luxuryMaint = this.ownedAssets.length * 15000;
        this.liquidCash = Math.max(0, this.liquidCash - luxuryMaint);
      }

      // 每周生活扣费
      this.liquidCash -= Math.round(this.weeklyLivingCost);
    }

    // 华尔街股票行情演化与突发大事件
    if (window.stockMarket) {
      const news = window.stockMarket.tickMarket(numWeeks);
      if (news) {
        this.showMarketNewsModal(news);
      }
    }

    this.updateHUD();
    this.renderCurrentTab();

    if (numWeeks >= 52) {
      window.adService.showInterstitial();
      this.showToast(`📅 岁月如梭，时间推进至 ${this.currentYear}年 (${this.currentAge}岁)`);
    }

    // 检查是否达到 80 岁人生终局
    if (this.currentAge >= 80) {
      this.showLifeBiographyEndgame();
    }
  }

  // --- 视图分发渲染 ---
  renderCurrentTab() {
    const viewContainer = document.getElementById('tab-content-area');
    viewContainer.innerHTML = '';

    if (this.currentTab === 'story') {
      this.renderStoryView();
    } else if (this.currentTab === 'stocks') {
      this.renderStockView();
    } else if (this.currentTab === 'mall') {
      this.renderMallView();
    } else if (this.currentTab === 'ledger') {
      this.renderLedgerView();
    } else if (this.currentTab === 'family') {
      this.renderFamilyView();
    }
  }

  // 1. 剧情视图渲染
  renderStoryView() {
    const view = document.getElementById('tab-content-area');
    const chapters = this.getCurrentScenarioChapters();

    if (this.storyIndex >= chapters.length) {
      view.innerHTML = `
        <div class="scenario-switch-bar">
          <button class="sc-pill ${this.activeScenario === 'lottery' ? 'active' : ''}" data-sc="lottery">🎟️ 剧本一: 中彩票1亿</button>
          <button class="sc-pill ${this.activeScenario === 'black_gold' ? 'active' : ''}" data-sc="black_gold">🏴‍☠️ 剧本二: 黑金教皇</button>
        </div>
        <div class="empty-card">
          <div style="font-size:48px;">👑</div>
          <h3>所有核心主线决策已完结</h3>
          <p>你现在已成为全球顶流富豪。你可以自由在【华尔街股市】操盘、【奢华商城】消费置业、在【资产账本】操作投资，或点击【推进下一年】安享晚年。</p>
          <button class="btn-action" style="margin-top:14px;" onclick="window.game.showLifeBiographyEndgame()">📜 查阅我的一生·特稿长卷纪念册</button>
        </div>
      `;
      this.bindScenarioSwitchButtons(view);
      return;
    }

    const ch = chapters[this.storyIndex];
    view.innerHTML = `
      <div class="scenario-switch-bar">
        <button class="sc-pill ${this.activeScenario === 'lottery' ? 'active' : ''}" data-sc="lottery">🎟️ 剧本一: 中彩票1亿</button>
        <button class="sc-pill ${this.activeScenario === 'black_gold' ? 'active' : ''}" data-sc="black_gold">🏴‍☠️ 剧本二: 黑金教皇</button>
      </div>

      <div class="story-panel">
        <div class="story-meta">
          <span class="badge-scene">${ch.scene}</span>
          <span class="badge-date">${this.currentYear}年 · 第${this.currentWeek % 52 || 52}周</span>
        </div>
        <h2 class="story-title">${ch.chapterTitle}</h2>
        <div class="story-icon">${ch.image}</div>
        <div class="story-desc">${ch.narrative.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')}</div>
        <div class="choices-list" id="story-choices-box"></div>
      </div>
    `;

    this.bindScenarioSwitchButtons(view);

    const box = document.getElementById('story-choices-box');
    ch.choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className = 'choice-item-btn';
      btn.innerHTML = `
        <div class="choice-title">${choice.text}</div>
        <div class="choice-delta">${choice.impact.money > 0 ? `+$${choice.impact.money.toLocaleString()}` : (choice.impact.money < 0 ? `-$${Math.abs(choice.impact.money).toLocaleString()}` : '')}</div>
      `;
      btn.addEventListener('click', () => this.handleMakeStoryChoice(choice));
      box.appendChild(btn);
    });
  }

  // 绑定剧本切换器按钮事件
  bindScenarioSwitchButtons(view) {
    view.querySelectorAll('.sc-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const targetSc = pill.dataset.sc;
        if (targetSc !== this.activeScenario) {
          this.activeScenario = targetSc;
          this.storyIndex = 0;
          this.lifeEventsLog = [];
          if (targetSc === 'black_gold') {
            this.liquidCash = -12500000; // 负债1250万开局
            this.health = 70;
            this.wisdom = 65;
            this.reputation = 20;
            this.credit = 15;
            this.showToast('🏴‍☠️ 已切换到【黑金教皇】剧本！初始负债 $1250万，逆袭开始！');
          } else {
            this.liquidCash = 20;
            this.health = 75;
            this.wisdom = 60;
            this.reputation = 40;
            this.credit = 60;
            this.showToast('🎟️ 已切换到【中彩票1亿】剧本！');
          }
          this.updateHUD();
          this.renderStoryView();
        }
      });
    });
  }

  // 处理主线决策
  handleMakeStoryChoice(choice) {
    this.createBackupSnapshot();

    // 扣除或增加流动资产
    this.liquidCash += choice.impact.money;
    if (choice.impact.futureReward) {
      this.liquidCash += choice.impact.futureReward;
    }

    this.reputation = Math.max(0, Math.min(100, this.reputation + choice.impact.fame));
    this.credit = Math.max(0, Math.min(100, this.credit + choice.impact.karma));
    this.romance = Math.max(0, Math.min(100, this.romance + (choice.impact.happiness > 0 ? 5 : -5)));

    // 记录人生历史
    const curChapters = this.getCurrentScenarioChapters();
    this.lifeEventsLog.push({
      year: this.currentYear,
      age: this.currentAge,
      title: curChapters[this.storyIndex] ? curChapters[this.storyIndex].chapterTitle : '未知章节',
      choice: choice.text,
      feedback: choice.feedback
    });

    this.updateHUD();

    // 弹出决策结果反馈
    document.getElementById('feedback-text').innerText = choice.feedback;
    document.getElementById('modal-feedback').classList.remove('hidden');

    // 开启悔棋广告入口
    document.getElementById('btn-ad-rewind').classList.remove('hidden');

    // 如果刚完成了第一章（彩票兑奖拿到几千万），并且尚未触发过首购犒赏三卡，则立刻触发！
    if (this.storyIndex === 0 && !this.facts.first_treat_done) {
      setTimeout(() => this.triggerFirstTreatPackage(), 800);
    }
  }

  // 2. 触发原版「第一笔犒赏」（精选三卡兑现）
  triggerFirstTreatPackage() {
    const modal = document.getElementById('modal-first-treat');
    modal.classList.remove('hidden');

    const cardsContainer = document.getElementById('first-treat-cards');
    cardsContainer.innerHTML = '';

    const treatItems = [
      MALL_ITEMS.find(i => i.id === 'lux_phone_iphone_x'),
      MALL_ITEMS.find(i => i.id === 'car_bmw_320li'),
      MALL_ITEMS.find(i => i.id === 'house_city_2br')
    ];

    treatItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'treat-card';
      card.innerHTML = `
        <div class="treat-icon">${item.icon}</div>
        <h4>${item.nameZh}</h4>
        <div class="treat-price">$${item.price.toLocaleString()}</div>
        <p class="treat-desc">${item.descZh}</p>
        <button class="treat-buy-btn">立即兑现犒赏 (Buy)</button>
      `;
      card.querySelector('.treat-buy-btn').addEventListener('click', () => {
        if (this.buyMallItem(item)) {
          modal.classList.add('hidden');
          this.facts.first_treat_done = true;
          this.showToast(`🎁 已兑现第一笔犒赏: ${item.nameZh}!`);
        }
      });
      cardsContainer.appendChild(card);
    });
  }

  // 3. 奢华商城视图渲染 (分类、购买、详情)
  renderMallView() {
    const view = document.getElementById('tab-content-area');
    view.innerHTML = `
      <div class="mall-header">
        <div class="chips-row" id="mall-chips"></div>
      </div>
      <div class="mall-list" id="mall-cards-container"></div>
    `;

    // 渲染分类芯片
    const chipsBox = document.getElementById('mall-chips');
    MALL_CATEGORIES.forEach(cat => {
      const chip = document.createElement('div');
      chip.className = `chip ${this.currentMallCategory === cat.id ? 'active' : ''}`;
      chip.innerText = cat.labelZh;
      chip.addEventListener('click', () => {
        this.currentMallCategory = cat.id;
        this.renderMallView();
      });
      chipsBox.appendChild(chip);
    });

    // 渲染商品卡片
    const cardsBox = document.getElementById('mall-cards-container');
    const filtered = this.currentMallCategory === 'all'
      ? MALL_ITEMS
      : MALL_ITEMS.filter(i => i.category === this.currentMallCategory);

    filtered.forEach(item => {
      const isAlreadyOwned = this.ownedAssets.some(a => a.item.id === item.id);
      const card = document.createElement('div');
      card.className = 'mall-item-card';
      card.innerHTML = `
        <div class="mall-item-top">
          <div class="item-icon">${item.icon}</div>
          <div class="item-meta">
            <div class="item-name">${item.nameZh} <span class="item-en">(${item.nameEn})</span></div>
            <div class="item-price">$${item.price.toLocaleString()}</div>
          </div>
        </div>
        <div class="specs-grid">
          ${item.specs.map(s => `<span>${s.kZh}: <b>${s.vZh}</b></span>`).join('')}
        </div>
        <p class="item-story-desc">${item.descZh}</p>
        <div class="mall-item-footer">
          <div class="buff-tags">
            ${Object.entries(item.buff).map(([k, v]) => `<span>+${v} ${k}</span>`).join(' ')}
          </div>
          <button class="buy-btn ${isAlreadyOwned ? 'disabled' : ''}">
            ${isAlreadyOwned ? '已持有 (Owned)' : '全款购入 (Buy)'}
          </button>
        </div>
      `;

      if (!isAlreadyOwned) {
        card.querySelector('.buy-btn').addEventListener('click', () => {
          this.buyMallItem(item);
        });
      }
      cardsBox.appendChild(card);
    });
  }

  // 购买商城商品 (对齐原版扣款与五维加成)
  buyMallItem(item) {
    if (this.liquidCash < item.price) {
      this.showToast('❌ 可用流动现金不足以支付！');
      return false;
    }

    this.liquidCash -= item.price;
    this.ownedAssets.push({
      id: item.id,
      buyYear: this.currentYear,
      buyPrice: item.price,
      item: item
    });

    // 事实位打标
    if (item.category === 'house') this.facts.owns_house = true;
    if (item.category === 'car') this.facts.owns_vehicle = true;

    // 增加五维 buff
    Object.entries(item.buff).forEach(([stat, val]) => {
      this[stat] = Math.min(100, (this[stat] || 50) + val);
    });

    this.updateHUD();
    this.showToast(`🎉 成功购入 ${item.nameZh}！总净资产与声望提升！`);
    this.renderCurrentTab();
    return true;
  }

  // 4. 资产账本视图渲染 (复式记账、实业投资、二手资产9折变现出售)
  renderLedgerView() {
    const view = document.getElementById('tab-content-area');
    const assetsVal = this.getConsumerAssetsValue();
    const investVal = this.investments.reduce((sum, i) => sum + i.amount, 0);
    const stockVal = window.stockMarket ? window.stockMarket.getTotalPortfolioValue() : 0;

    view.innerHTML = `
      <div class="ledger-dashboard-card">
        <h3>📊 家族复式财务账本 (Family Balance Sheet)</h3>
        <div class="ledger-grid">
          <div>流动现金 (Liquid Cash):<br><b style="color:#10b981;">$${this.liquidCash.toLocaleString()}</b></div>
          <div>股票持仓 (Stock Portfolio):<br><b style="color:#a855f7;">$${stockVal.toLocaleString()}</b></div>
          <div>固定资产 (Fixed Assets):<br><b style="color:#38bdf8;">$${assetsVal.toLocaleString()}</b></div>
          <div>实业投资 (Investments):<br><b style="color:#f59e0b;">$${investVal.toLocaleString()}</b></div>
          <div style="grid-column: span 2;">总净资产 (Net Worth):<br><b style="color:#facc15; font-size:17px;">$${this.getTotalNetWorth().toLocaleString()}</b></div>
        </div>
      </div>

      <h4 style="margin: 16px 0 8px; color:#e2e8f0;">名下持有资产 (可随时按当前折旧估值 90% 二手卖出变现):</h4>
      <div class="owned-assets-list" id="owned-assets-box"></div>

      <h4 style="margin: 20px 0 8px; color:#e2e8f0;">💼 顶级实业投资与私募创投项目 (Special Projects):</h4>
      <div class="invest-projects-list" id="invest-projects-box"></div>
    `;

    // 渲染已拥有资产与卖出按钮
    const assetsBox = document.getElementById('owned-assets-box');
    if (this.ownedAssets.length === 0) {
      assetsBox.innerHTML = '<div style="color:#94a3b8; font-size:12px; padding:10px;">名下暂无豪车豪宅，前往【奢华商城】逛逛吧。</div>';
    } else {
      this.ownedAssets.forEach((owned, idx) => {
        const years = Math.max(0, this.currentYear - owned.buyYear);
        const currentVal = calculateAssetCurrentValue(owned.item, years);
        const sellPrice = Math.round(currentVal * 0.9); // 原版 ConsumerAssets 9折回收

        const row = document.createElement('div');
        row.className = 'owned-asset-row';
        row.innerHTML = `
          <div>
            <b>${owned.item.icon} ${owned.item.nameZh}</b>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">
              购入年份: ${owned.buyYear}年 (持有${years}年) · 当前估值: $${currentVal.toLocaleString()}
            </div>
          </div>
          <button class="sell-btn">以9折变现 (+$${sellPrice.toLocaleString()})</button>
        `;
        row.querySelector('.sell-btn').addEventListener('click', () => {
          this.sellOwnedAsset(idx, sellPrice);
        });
        assetsBox.appendChild(row);
      });
    }

    // 渲染实业投资项目
    const investBox = document.getElementById('invest-projects-box');
    const availableProjects = [
      { id: 'inv_silicon_ai', name: '🤖 硅谷具身智能机器人研发中心', cost: 10000000, yield: 0.18, desc: '预期年化分红 18%' },
      { id: 'inv_manhattan_reit', name: '🏢 曼哈顿顶级商业写字楼 REITs 基金', cost: 5000000, yield: 0.08, desc: '稳健型收租分红，年化 8%' },
      { id: 'inv_clean_energy', name: '⚡ 德州清洁太阳能电网基建项目', cost: 8000000, yield: 0.12, desc: 'ESG 绿色能源，年化 12%' }
    ];

    availableProjects.forEach(p => {
      const isInvested = this.investments.some(i => i.name === p.name);
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <b>${p.name}</b>
          <span style="color:#10b981; font-weight:bold;">$${p.cost.toLocaleString()}</span>
        </div>
        <p style="font-size:11px; color:#94a3b8; margin:6px 0;">${p.desc}</p>
        <button class="invest-btn ${isInvested ? 'disabled' : ''}">
          ${isInvested ? '已建仓注资 (Active)' : '斥资领投 (Invest)'}
        </button>
      `;
      if (!isInvested) {
        card.querySelector('.invest-btn').addEventListener('click', () => {
          this.investSpecialProject(p);
        });
      }
      investBox.appendChild(card);
    });
  }

  // 二手卖出名下资产
  sellOwnedAsset(idx, sellPrice) {
    const asset = this.ownedAssets[idx];
    this.liquidCash += sellPrice;
    this.ownedAssets.splice(idx, 1);

    // 重新校准事实位
    this.facts.owns_house = this.ownedAssets.some(a => a.item.category === 'house');
    this.facts.owns_vehicle = this.ownedAssets.some(a => a.item.category === 'car');

    this.updateHUD();
    this.showToast(`💵 二手资产已变现出让，回笼流动现金: +$${sellPrice.toLocaleString()}`);
    this.renderCurrentTab();
  }

  // 投资大项目
  investSpecialProject(project) {
    if (this.liquidCash < project.cost) {
      this.showToast('❌ 流动资金不足，无法领投该项目！');
      return;
    }
    this.liquidCash -= project.cost;
    this.investments.push({
      name: project.name,
      amount: project.cost,
      annualYield: project.yield
    });
    this.reputation += 10;
    this.credit += 10;
    this.updateHUD();
    this.showToast(`🚀 成功领投 ${project.name}！每年底将获得丰厚被动分红！`);
    this.renderCurrentTab();
  }

  // 5. 人际关系与家庭视图渲染
  renderFamilyView() {
    const view = document.getElementById('tab-content-area');
    view.innerHTML = `
      <div class="family-card">
        <h3>❤️ 亲友社交圈与家庭关系网 (Family & Network)</h3>
        <p style="font-size:12px; color:#94a3b8; margin: 8px 0 16px;">
          财富不仅改变了你自己，也重构了你身边的所有人际纽带。
        </p>
        <div class="partner-row">
          <div class="avatar-box">👰</div>
          <div>
            <b>维多利亚 (Chloe Victoria)</b>
            <div style="font-size:11px; color:#38bdf8;">婚姻状态: ${this.facts.marital_status === 'married' ? '合法夫妻 (带婚前协议保障)' : '恋爱观察期'}</div>
          </div>
        </div>
        <div style="margin-top:16px; font-size:13px; line-height:1.7; color:#cbd5e1; background:#0f172a; padding:12px; border-radius:10px;">
          <div>👨‍👩‍👧 子女状况: ${this.facts.marital_status === 'married' ? '育有长女（就读瑞士私立名校）' : '未育'}</div>
          <div>🤝 远房亲戚借款: 已通过离岸家族办公室统筹分配，避免无限度索取</div>
          <div>🏛️ 社会地位评价: 华尔街与比弗利名流圈高看一眼，不再是底层的“透明人”</div>
        </div>
      </div>
    `;
  }

  // 6. 华尔街股市与随机行情视图渲染 (Stock Market View)
  renderStockView() {
    const view = document.getElementById('tab-content-area');
    const sm = window.stockMarket;
    const portfolioVal = sm.getTotalPortfolioValue();
    const unrealizedPnL = sm.getTotalUnrealizedPnL();
    const pnlSign = unrealizedPnL >= 0 ? '+' : '-';
    const pnlColor = unrealizedPnL >= 0 ? '#10b981' : '#ef4444';

    view.innerHTML = `
      <div class="stocks-dashboard">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3 style="color:#facc15; font-size:15px;">🏛️ 纽约证券交易所 (NYSE / NASDAQ)</h3>
          <span style="font-size:10px; color:#94a3b8; background:#0f172a; padding:3px 8px; border-radius:12px;">实时撮合交易</span>
        </div>
        <div class="stocks-summary-grid">
          <div class="stock-stat-box">
            <span class="stock-stat-label">我的持仓总市值 (Portfolio Value)</span>
            <span class="stock-stat-val" style="color:#38bdf8;">$${portfolioVal.toLocaleString()}</span>
          </div>
          <div class="stock-stat-box">
            <span class="stock-stat-label">浮动持仓盈亏 (Unrealized P&L)</span>
            <span class="stock-stat-val" style="color:${pnlColor};">${pnlSign}$${Math.abs(unrealizedPnL).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <!-- 商业化广告内幕挂钩 -->
      <div class="insider-ad-box">
        <div>
          <b style="color:#facc15; font-size:12px;">🕵️ 华尔街绝密内幕调研 (Insider Tip)</b>
          <div style="font-size:10px; color:#cbd5e1; margin-top:2px;">看一段欧美激励广告，解锁下周 100% 暴涨暴赚股票！</div>
        </div>
        <button id="btn-stock-insider-ad" class="ad-btn gold" style="font-size:11px; padding:6px 10px; white-space:nowrap;">
          🎬 获取内幕
        </button>
      </div>

      <h4 style="margin: 10px 0 8px; color:#e2e8f0; font-size:13px;">📈 华尔街实时股票标的行列表:</h4>
      <div id="stocks-items-container"></div>
    `;

    // 绑定内幕广告
    document.getElementById('btn-stock-insider-ad').addEventListener('click', () => {
      window.adService.showRewarded('wall_street_insider', () => {
        const candidateStocks = sm.stocks.filter(s => s.symbol !== 'SPY');
        const chosen = candidateStocks[Math.floor(Math.random() * candidateStocks.length)];
        sm.setInsiderTip(chosen.symbol);
        this.showToast(`🔥 绝密内幕获得: 【${chosen.symbol}】下周必迎来超大主力拉升！速去买入！`);
      });
    });

    const container = document.getElementById('stocks-items-container');
    sm.stocks.forEach(stock => {
      const holding = sm.portfolio[stock.symbol] || { shares: 0, avgCost: 0 };
      const changePct = (((stock.price - stock.prevPrice) / stock.prevPrice) * 100).toFixed(2);
      const isUp = stock.price >= stock.prevPrice;
      const changeClass = isUp ? 'up' : 'down';
      const changeSign = isUp ? '+' : '';

      const holdingVal = Math.round(holding.shares * stock.price);
      const holdingPnL = Math.round(holding.shares * (stock.price - holding.avgCost));
      const holdingPnLSign = holdingPnL >= 0 ? '+' : '-';
      const holdingPnLColor = holdingPnL >= 0 ? '#10b981' : '#ef4444';

      const card = document.createElement('div');
      card.className = 'stock-card';
      card.innerHTML = `
        <div class="stock-header">
          <div class="stock-title-group">
            <span class="stock-icon">${stock.icon}</span>
            <div>
              <div class="stock-name-zh">${stock.nameZh}</div>
              <span class="stock-symbol-tag">${stock.symbol} · ${stock.nameEn}</span>
            </div>
          </div>
          <div class="stock-price-group">
            <div class="stock-cur-price" style="color:${isUp ? '#34d399' : '#f87171'}">$${stock.price.toFixed(2)}</div>
            <span class="stock-change-pill ${changeClass}">${changeSign}${changePct}%</span>
          </div>
        </div>

        <div style="font-size:11px; color:#94a3b8; line-height:1.4; margin: 4px 0 8px;">
          ${stock.descZh}
        </div>

        <!-- 玩家持仓状态 -->
        <div class="stock-holdings-box">
          <div>
            持股数: <b style="color:#f8fafc;">${holding.shares.toLocaleString()} 股</b> 
            (成本: $${holding.avgCost.toFixed(2)})
          </div>
          <div>
            市值: <b style="color:#facc15;">$${holdingVal.toLocaleString()}</b>
            ${holding.shares > 0 ? ` (<span style="color:${holdingPnLColor};">${holdingPnLSign}$${Math.abs(holdingPnL).toLocaleString()}</span>)` : ''}
          </div>
        </div>

        <!-- 快捷买卖操作 -->
        <div class="stock-actions-grid">
          <button class="btn-buy-quick" data-amt="10000">+$1万</button>
          <button class="btn-buy-quick" data-amt="100000">+$10万</button>
          <button class="btn-buy-quick" data-amt="1000000">+$100万</button>
          <button class="btn-buy-quick" data-amt="MAX" style="background:#047857;">全仓梭哈</button>
          ${holding.shares > 0 ? `<button class="btn-sell-all">全部清仓变现</button>` : ''}
        </div>
      `;

      // 绑定快捷买入
      card.querySelectorAll('.btn-buy-quick').forEach(b => {
        b.addEventListener('click', () => {
          let amt = b.dataset.amt === 'MAX' ? this.liquidCash : parseInt(b.dataset.amt);
          if (amt <= 0 || this.liquidCash < stock.price) {
            this.showToast('❌ 流动现金不足！');
            return;
          }
          const res = sm.buyStock(stock.symbol, amt, this.liquidCash);
          if (res.success) {
            this.liquidCash -= res.cost;
            this.updateHUD();
            this.showToast(`✅ 成功买入 ${res.shares.toLocaleString()} 股 ${res.symbol} (花费 $${res.cost.toLocaleString()})`);
            this.renderStockView();
          } else {
            this.showToast(`❌ ${res.msg}`);
          }
        });
      });

      // 绑定清仓卖出
      const sellBtn = card.querySelector('.btn-sell-all');
      if (sellBtn) {
        sellBtn.addEventListener('click', () => {
          const res = sm.sellStock(stock.symbol);
          if (res.success) {
            this.liquidCash += res.revenue;
            this.updateHUD();
            const pnlStr = res.profit >= 0 ? `盈利 +$${res.profit.toLocaleString()}` : `亏损 -$${Math.abs(res.profit).toLocaleString()}`;
            this.showToast(`💰 成功清仓 ${res.shares.toLocaleString()} 股 ${res.symbol}！套现 $${res.revenue.toLocaleString()} (${pnlStr})`);
            this.renderStockView();
          } else {
            this.showToast(`❌ ${res.msg}`);
          }
        });
      }

      container.appendChild(card);
    });
  }

  // 7. 突发黑天鹅/暴涨大事件弹窗提示
  showMarketNewsModal(news) {
    const modal = document.getElementById('modal-market-news');
    const badge = document.getElementById('news-badge');
    const headline = document.getElementById('news-headline');
    const details = document.getElementById('news-details');
    const impactBox = document.getElementById('news-impact-box');
    const bailoutBtn = document.getElementById('btn-bailout-ad');

    modal.querySelector('.modal-card').className = `modal-card news-modal ${news.type.toLowerCase()}`;
    badge.className = `news-type-badge ${news.type.toLowerCase()}`;
    badge.innerText = news.type === 'BULL' ? '🔥 华尔街利好暴涨 · BULL RUN' : '💥 华尔街黑天鹅暴跌 · BLACK SWAN';

    headline.innerText = news.titleZh;
    details.innerText = `${news.descZh}\n\n[Wall Street Dispatch]: ${news.descEn}`;

    const stock = window.stockMarket.stocks.find(s => s.symbol === news.symbol);
    const holding = window.stockMarket.portfolio[news.symbol] || { shares: 0 };
    const pct = (((news.multiplier - 1) * 100)).toFixed(0);
    const sign = news.multiplier > 1 ? '+' : '';

    impactBox.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <b>标的: ${stock ? stock.icon : ''} ${news.symbol}</b>
        <span style="font-weight:900; font-size:14px; color:${news.type === 'BULL' ? '#10b981' : '#ef4444'};">
          ${sign}${pct}% 冲击！
        </span>
      </div>
      <div style="font-size:11px; color:#cbd5e1; margin-top:4px;">
        最新价格: $${stock ? stock.price.toFixed(2) : ''} (冲击前: $${stock ? stock.prevPrice.toFixed(2) : ''})
      </div>
      ${holding.shares > 0 ? `
        <div style="margin-top:6px; font-weight:bold; color:${news.type === 'BULL' ? '#facc15' : '#f87171'};">
          您当前持有 ${holding.shares.toLocaleString()} 股！市值受到直接剧烈波及！
        </div>
      ` : ''}
    `;

    // 如果是玩家持仓的股票遭遇黑天鹅暴跌，提供广告救市对冲
    if (news.type === 'BEAR' && holding.shares > 0) {
      this.currentPendingBearNews = news;
      bailoutBtn.classList.remove('hidden');
    } else {
      this.currentPendingBearNews = null;
      bailoutBtn.classList.add('hidden');
    }

    modal.classList.remove('hidden');
  }

  // --- 人生总结·特稿长卷纪念册 (Biography Endgame) ---
  showLifeBiographyEndgame() {
    const modal = document.getElementById('modal-endgame');
    modal.classList.remove('hidden');

    const totalWealth = this.getTotalNetWorth();
    let title = '一代资本传奇';
    let summaryText = '';

    if (totalWealth > 100000000 && this.reputation > 70) {
      title = '👑 The Legendary Titan (全球百亿级传奇大亨)';
      summaryText = '你用 1 亿美元作为跳板，不仅没有沦为被金钱吞噬的暴发户，反而建立起了横跨科技、地产与慈善的商业帝国。时代周刊封面上永远留下了你的名字。';
    } else if (totalWealth > 20000000) {
      title = '🏰 The Peaceful Aristocrat (稳健世代传承家族)';
      summaryText = '你依靠纪律性极强的资产配置和家族信托，规避了所有名利场的巨浪与诱惑，让子孙后代享有享之不尽的财富自由。';
    } else {
      title = '💸 The Wild Gambler (跌宕起伏的冒险狂人)';
      summaryText = '财富在你手中如同过山车，豪车、游艇、赌场、巨额投资。你曾拥有整个世界，你的狂放不羁是所有人谈论的传奇。';
    }

    document.getElementById('end-title').innerText = title;
    document.getElementById('end-desc').innerText = summaryText;

    // 渲染六幕特稿事实长卷
    const rollContainer = document.getElementById('end-life-roll');
    rollContainer.innerHTML = '';
    this.lifeEventsLog.forEach(log => {
      const item = document.createElement('div');
      item.className = 'roll-fact-item';
      item.innerHTML = `
        <div class="roll-year">${log.year}年 (${log.age}岁) · ${log.title}</div>
        <div class="roll-choice">抉择: ${log.choice}</div>
        <div class="roll-result">历史事实: ${log.feedback}</div>
      `;
      rollContainer.appendChild(item);
    });

    document.getElementById('end-wealth-final').innerText = `$${totalWealth.toLocaleString()}`;
    document.getElementById('end-health-final').innerText = `${this.health}%`;
    document.getElementById('end-reputation-final').innerText = `${this.reputation}%`;
  }

  // 重新开启人生
  restartGame() {
    this.currentWeek = 1;
    this.currentYear = 2026;
    this.currentAge = 29;
    this.health = 75;
    this.wisdom = 60;
    this.reputation = 40;
    this.romance = 45;
    this.credit = 60;
    this.liquidCash = 20;
    this.ownedAssets = [];
    this.investments = [];
    if (window.stockMarket) {
      window.stockMarket = new StockMarketSystem();
    }
    this.storyIndex = 0;
    this.lifeEventsLog = [];
    this.facts = { owns_house: false, owns_vehicle: false, marital_status: 'single', first_treat_done: false };
    this.currentTab = 'story';
    this.updateHUD();
    this.renderCurrentTab();
  }

  // 状态快照备份 (支持看广告后悔药)
  createBackupSnapshot() {
    this.backupSnapshot = {
      liquidCash: this.liquidCash,
      health: this.health,
      wisdom: this.wisdom,
      reputation: this.reputation,
      romance: this.romance,
      credit: this.credit,
      storyIndex: this.storyIndex,
      ownedAssets: [...this.ownedAssets],
      investments: [...this.investments],
      stocks: window.stockMarket ? JSON.parse(JSON.stringify(window.stockMarket.stocks)) : null,
      portfolio: window.stockMarket ? JSON.parse(JSON.stringify(window.stockMarket.portfolio)) : null
    };
  }

  restoreBackup() {
    if (!this.backupSnapshot) return;
    this.liquidCash = this.backupSnapshot.liquidCash;
    this.health = this.backupSnapshot.health;
    this.wisdom = this.backupSnapshot.wisdom;
    this.reputation = this.backupSnapshot.reputation;
    this.romance = this.backupSnapshot.romance;
    this.credit = this.backupSnapshot.credit;
    this.storyIndex = this.backupSnapshot.storyIndex;
    this.ownedAssets = [...this.backupSnapshot.ownedAssets];
    this.investments = [...this.backupSnapshot.investments];
    if (this.backupSnapshot.stocks && window.stockMarket) {
      window.stockMarket.stocks = JSON.parse(JSON.stringify(this.backupSnapshot.stocks));
    }
    if (this.backupSnapshot.portfolio && window.stockMarket) {
      window.stockMarket.portfolio = JSON.parse(JSON.stringify(this.backupSnapshot.portfolio));
    }

    if (this.lifeEventsLog.length > 0) this.lifeEventsLog.pop();

    this.updateHUD();
    this.renderCurrentTab();
    document.getElementById('modal-feedback').classList.add('hidden');
    document.getElementById('btn-ad-rewind').classList.add('hidden');
    this.showToast('⏪ 岁月倒流成功！已无损撤销上一步抉择！');
  }

  updateHUD() {
    document.getElementById('hud-age-week').innerText = `${this.currentYear}年 · ${this.currentAge}岁 (第${this.currentWeek}周)`;
    document.getElementById('hud-liquid-cash').innerText = `$${this.liquidCash.toLocaleString()}`;
    document.getElementById('hud-net-worth').innerText = `$${this.getTotalNetWorth().toLocaleString()}`;

    // 五维条
    document.getElementById('bar-health').style.width = `${this.health}%`;
    document.getElementById('bar-wisdom').style.width = `${this.wisdom}%`;
    document.getElementById('bar-reputation').style.width = `${this.reputation}%`;
    document.getElementById('bar-romance').style.width = `${this.romance}%`;
    document.getElementById('bar-credit').style.width = `${this.credit}%`;
  }

  showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.classList.remove('hidden');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.add('hidden'), 2800);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.game = new FullLifeGameEngine();
});
