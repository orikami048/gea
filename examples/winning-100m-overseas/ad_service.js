/**
 * 海外出海广告服务 (AdService)
 * 适配海外主流发行平台:
 * - Poki SDK (poki.com)
 * - CrazyGames SDK (crazygames.com)
 * - Google AdSense for Games / H5 Ads
 * - 默认: 本地全真模拟器 (支持激励视频倒计时与即时奖励下发)
 */
class AdService {
  constructor() {
    this.provider = 'mock';
    this.isAdShowing = false;
    this.detectSDK();
  }

  detectSDK() {
    if (window.PokiSDK) {
      this.provider = 'poki';
      console.log('[AdService] Running on Poki SDK');
    } else if (window.CrazyGames && window.CrazyGames.SDK) {
      this.provider = 'crazygames';
      console.log('[AdService] Running on CrazyGames SDK');
    } else {
      this.provider = 'mock';
      console.log('[AdService] Running standalone, enabled Mock Rewarded Ads');
    }
  }

  /**
   * 播放激励视频 (Rewarded Video) - 变现核心
   * 场景: 投资内幕暴富、悔棋重来避坑、双倍被动收益
   */
  showRewarded(placement, onRewarded, onClosed) {
    if (this.isAdShowing) return;
    this.isAdShowing = true;

    console.log(`[AdService] Triggered Rewarded Ad for placement: ${placement}`);

    if (this.provider === 'poki') {
      window.PokiSDK.rewardedBreak().then((success) => {
        this.isAdShowing = false;
        if (success && onRewarded) onRewarded();
        if (onClosed) onClosed();
      });
    } else if (this.provider === 'crazygames') {
      window.CrazyGames.SDK.ad.requestAd('rewarded', {
        adFinished: () => {
          this.isAdShowing = false;
          if (onRewarded) onRewarded();
        },
        adError: () => {
          this.isAdShowing = false;
          if (onClosed) onClosed();
        }
      });
    } else {
      // 模拟器
      this.runMockAdModal(`🎬 Rewarded Video: ${placement}`, 4, () => {
        this.isAdShowing = false;
        if (onRewarded) onRewarded();
        if (onClosed) onClosed();
      });
    }
  }

  /**
   * 播放插屏广告 (Interstitial Ad) - 年度结算时自然展示
   */
  showInterstitial(onClosed) {
    if (this.isAdShowing) return;
    this.isAdShowing = true;

    if (this.provider === 'poki') {
      window.PokiSDK.commercialBreak().then(() => {
        this.isAdShowing = false;
        if (onClosed) onClosed();
      });
    } else {
      this.runMockAdModal('📢 Interstitial Ad: Next Chapter Transition', 2, () => {
        this.isAdShowing = false;
        if (onClosed) onClosed();
      });
    }
  }

  runMockAdModal(title, seconds, callback) {
    const modal = document.getElementById('ad-modal');
    const titleEl = document.getElementById('ad-title');
    const timerEl = document.getElementById('ad-countdown');
    if (!modal) {
      setTimeout(callback, 500);
      return;
    }

    titleEl.innerText = title;
    modal.classList.remove('hidden');

    let remain = seconds;
    timerEl.innerText = remain;
    const interval = setInterval(() => {
      remain--;
      timerEl.innerText = remain;
      if (remain <= 0) {
        clearInterval(interval);
        modal.classList.add('hidden');
        callback();
      }
    }, 1000);
  }
}

window.adService = new AdService();
