/**
 * 华尔街股票与随机行情事件引擎 (Stock Market & Random Events Engine)
 * 100% 支持中英双语、真实波动率随机游走、持仓盈亏追踪、黑天鹅突发崩盘与暴利牛市大事件
 */

const INITIAL_STOCKS = [
  {
    symbol: 'NVDA',
    nameZh: '英伟达科技 (Nova AI Chip)',
    nameEn: 'Nova AI Semiconductors',
    price: 125.00,
    prevPrice: 125.00,
    volatility: 0.22,
    icon: '🤖',
    descZh: '全球算力霸主与芯片垄断巨头，AI 军备竞赛绝对核心枢纽。'
  },
  {
    symbol: 'APPL',
    nameZh: '水果巨头 (Fruit Global)',
    nameEn: 'Fruit Tech Inc.',
    price: 190.00,
    prevPrice: 190.00,
    volatility: 0.08,
    icon: '🍎',
    descZh: '消费电子霸主与全球市值天花板，现金流最充沛的蓝筹定海神针。'
  },
  {
    symbol: 'TSLA',
    nameZh: '极速电车 (Hyper EV)',
    nameEn: 'HyperDrive Motors',
    price: 245.00,
    prevPrice: 245.00,
    volatility: 0.18,
    icon: '⚡',
    descZh: '无人驾驶、人形机器人与火星梦想概念集合体，散户与机构共舞。'
  },
  {
    symbol: 'BIOX',
    nameZh: '基因制药 (Apex Bio)',
    nameEn: 'Apex BioTherapeutics',
    price: 48.00,
    prevPrice: 48.00,
    volatility: 0.35,
    icon: '🧬',
    descZh: '抗癌神药与长生不老临床药企，要么单日翻倍，要么一朝归零。'
  },
  {
    symbol: 'GME',
    nameZh: '散户妖股 (GameMeme WSB)',
    nameEn: 'GameMeme WallStreetBets',
    price: 32.00,
    prevPrice: 32.00,
    volatility: 0.45,
    icon: '🚀',
    descZh: 'Reddit WallStreetBets 散户抱团大本营，游资逼空聚集地。'
  },
  {
    symbol: 'SPY',
    nameZh: '标普 500 指数基金 (S&P 500 ETF)',
    nameEn: 'Standard & Poor 500 Trust',
    price: 520.00,
    prevPrice: 520.00,
    volatility: 0.05,
    icon: '🏛️',
    descZh: '巴菲特力荐的美国国运指数，抗通胀长线复利压舱石。'
  }
];

// 随机突发市场大事件库 (正面牛市暴涨 vs 负面黑天鹅暴跌)
const MARKET_RANDOM_EVENTS = [
  // ── 正面利好事件 (Bullish Surges) ──
  {
    id: 'bull_ai_trillion',
    type: 'BULL',
    symbol: 'NVDA',
    multiplier: 1.48, // +48%
    titleZh: '🔥 突发利好: 硅谷科技巨头千亿 AI 算力订单狂潮！',
    titleEn: 'BREAKING: Hyperscalers Announce $100B GPU Capex Boom!',
    descZh: '全球各大科技寡头排队抢购超级算力集群，供不应求，股价单周狂拉 +48%！',
    descEn: 'Tech giants aggressively expand data centers. Stock rockets +48%!'
  },
  {
    id: 'bull_fda_cure',
    type: 'BULL',
    symbol: 'BIOX',
    multiplier: 1.85, // +85%
    titleZh: '🎉 突发奇迹: FDA 闪电批准突破性抗癌与端粒长寿新药！',
    titleEn: 'BREAKING: FDA Fast-Tracks Miracle Cancer & Longevity Therapy!',
    descZh: '三期临床完全治愈率破纪录达到 94%，华尔街彻底沸腾，股价火箭升空 +85%！',
    descEn: 'Breakthrough clinical trial clears with 94% efficacy. Stock explodes +85%!'
  },
  {
    id: 'bull_fed_cut',
    type: 'BULL',
    symbol: 'SPY',
    multiplier: 1.16, // +16%
    titleZh: '🕊️ 宏观暴涨: 美联储宣布超预期降息 50 个基点并重启宽松！',
    titleEn: 'Fed Drops Emergency 50bps Rate Cut & Injects Liquidity!',
    descZh: '全球水龙头全面开启，热钱涌入华尔街，标普指数单周历史性暴拉 +16%！',
    descEn: 'Global liquidity flood sweeps financial markets. S&P jumps +16%!'
  },
  {
    id: 'bull_robotaxi_permit',
    type: 'BULL',
    symbol: 'TSLA',
    multiplier: 1.38, // +38%
    titleZh: '🚀 科技突破: 全自动无人出租车 Robotaxi 获全美商用牌照！',
    titleEn: 'Robotaxi Clears Federal Approvals for Nationwide Fleet!',
    descZh: '百万量级无人车即将在纽约加州上路开跑，出行商业模式彻底重塑，股价大涨 +38%！',
    descEn: 'Fully autonomous commercial fleet goes live. Shares surge +38%!'
  },
  {
    id: 'bull_wsb_squeeze',
    type: 'BULL',
    symbol: 'GME',
    multiplier: 2.10, // +110% 暴涨翻倍
    titleZh: '💎🙌 散户狂欢: Reddit 散户抱团巨量逼空，华尔街空头爆仓！',
    titleEn: 'WSB APES ASSEMBLE: Historic Short Squeeze Triggers Margin Calls!',
    descZh: '空头借券被逼爆仓，数百万散户涌入买入看涨期权，股价单周暴涨翻倍 +110%！',
    descEn: 'Hedge funds liquidated as retail traders fuel historic +110% short squeeze!'
  },
  {
    id: 'bull_apple_secret',
    type: 'BULL',
    symbol: 'APPL',
    multiplier: 1.25, // +25%
    titleZh: '👓 消费奇迹: 新一代空间计算全息设备首周末预售破千万台！',
    titleEn: 'Spatial AI Hologram Headset Crushes 10M Weekend Pre-orders!',
    descZh: '全球专卖店排起数公里长龙，分析师一致上调目标价，市值单日狂飙 +25%！',
    descEn: 'Unprecedented consumer demand fuels global sellouts. Stock leaps +25%!'
  },

  // ── 负面黑天鹅事件 (Bearish Black Swans) ──
  {
    id: 'bear_chip_embargo',
    type: 'BEAR',
    symbol: 'NVDA',
    multiplier: 0.65, // -35%
    titleZh: '💥 黑天鹅暴击: 海外核心芯片出口禁令突遭严苛升级！',
    titleEn: 'CRASH: Massive Export Restrictions Imposed on Advanced AI Chips!',
    descZh: '重大海外市场营收直接面临腰斩风险，对冲基金大规模无情抛售，股价重挫 -35%！',
    descEn: 'Overseas revenue slashed in half. Heavy hedge fund dumping sinks shares -35%!'
  },
  {
    id: 'bear_fda_fail',
    type: 'BEAR',
    symbol: 'BIOX',
    multiplier: 0.38, // -62%
    titleZh: '☠️ 灾难噩耗: 核心长寿药物三期试验严重并发症，全面叫停！',
    titleEn: 'DISASTER: FDA Halts Phase 3 Drug Trial on Severe Safety Flags!',
    descZh: '数十亿研发管道瞬间化为乌有，恐慌性踩踏式抛盘涌现，股价瞬间崩跌 -62%！',
    descEn: 'Core pipeline halted indefinitely. Panic dump triggers brutal -62% crash!'
  },
  {
    id: 'bear_energy_shock',
    type: 'BEAR',
    symbol: 'SPY',
    multiplier: 0.84, // -16%
    titleZh: '📉 宏观风暴: 地缘危机导致全球霍尔木兹海峡封锁，原油冲破$140！',
    titleEn: 'STAGFLATION PANIC: Strait Blockade Spikes Crude Oil Past $140!',
    descZh: '全球恶性滞胀阴云重聚，资金集体逃向黄金避险，美股大盘全线下跌 -16%！',
    descEn: 'Severe stagflation fears strike Wall Street. S&P 500 plunges -16%!'
  },
  {
    id: 'bear_sec_fraud',
    type: 'BEAR',
    symbol: 'TSLA',
    multiplier: 0.72, // -28%
    titleZh: '🚨 监管风暴: 司法部与证监会联合对自动驾驶数据发起刑事调查！',
    titleEn: 'DOJ & SEC Launch Federal Criminal Probe into Autopilot Safety!',
    descZh: '多国相继发出召回禁令，华尔街投行集体下调评级，股价单周暴跌 -28%！',
    descEn: 'Federal criminal probes trigger widespread Wall Street downgrades -28%!'
  },
  {
    id: 'bear_meme_rug',
    type: 'BEAR',
    symbol: 'GME',
    multiplier: 0.45, // -55%
    titleZh: '📉 泡沫破裂: 游资主力巨额出货获利了结，散户踩踏惨案！',
    titleEn: 'BUBBLE BURSTS: Whale Insiders Cash Out Billions, Retail Trapped!',
    descZh: '主力庄家无情砸盘离场，券商再次限制买入，股价高台跳水惨跌 -55%！',
    descEn: 'Whales cash out into euphoria. Sudden liquidity drain triggers -55% collapse!'
  },
  {
    id: 'bear_apple_antitrust',
    type: 'BEAR',
    symbol: 'APPL',
    multiplier: 0.78, // -22%
    titleZh: '⚖️ 垄断判决: 欧盟与美国反垄断法庭裁定拆分应用商店税率！',
    titleEn: 'ANTITRUST SHOCK: Courts Order Complete Dismantling of App Store Monopoly!',
    descZh: '多年高额抽成商业模式遭遇颠覆性重击，巨头利润预期下滑，股价重挫 -22%!',
    descEn: 'High-margin software moat broken by antitrust ruling. Stock drops -22%!'
  }
];

class StockMarketSystem {
  constructor() {
    this.stocks = JSON.parse(JSON.stringify(INITIAL_STOCKS));
    // 玩家持仓: { 'NVDA': { shares: 1000, avgCost: 120.0 } }
    this.portfolio = {};
    // 广告内幕特权: 标记下一周必暴涨的股票
    this.guaranteedNextBullSymbol = null;
    // 历史新闻记录
    this.latestNews = null;
  }

  // 随时间推移自动演化股价 (高斯/随机游走 + 突发事件)
  tickMarket(weeksAdvanced = 1) {
    let triggeredNews = null;

    // 1. 如果有广告预订的必涨内幕
    if (this.guaranteedNextBullSymbol) {
      const targetSym = this.guaranteedNextBullSymbol;
      const targetBullEvents = MARKET_RANDOM_EVENTS.filter(e => e.type === 'BULL' && e.symbol === targetSym);
      const ev = targetBullEvents.length > 0
        ? targetBullEvents[Math.floor(Math.random() * targetBullEvents.length)]
        : MARKET_RANDOM_EVENTS.find(e => e.type === 'BULL');

      const stock = this.stocks.find(s => s.symbol === ev.symbol);
      if (stock) {
        stock.prevPrice = stock.price;
        stock.price = parseFloat((stock.price * ev.multiplier).toFixed(2));
        triggeredNews = ev;
      }
      this.guaranteedNextBullSymbol = null; // 消费内幕消息
    } 
    // 2. 正常随机触发 (约 35% 几率触发黑天鹅或暴涨事件)
    else if (Math.random() < 0.35) {
      const event = MARKET_RANDOM_EVENTS[Math.floor(Math.random() * MARKET_RANDOM_EVENTS.length)];
      const stock = this.stocks.find(s => s.symbol === event.symbol);
      if (stock) {
        stock.prevPrice = stock.price;
        stock.price = parseFloat((stock.price * event.multiplier).toFixed(2));
        triggeredNews = event;
      }
    }

    // 3. 其余股票常规自然随机波动 (几何布朗运动微弱偏多头通胀)
    this.stocks.forEach(stock => {
      if (triggeredNews && stock.symbol === triggeredNews.symbol) return;
      stock.prevPrice = stock.price;

      // 每次推移计算随机百分比变化
      const baseVol = stock.volatility * (weeksAdvanced >= 52 ? 1.6 : 0.65);
      const randomChange = (Math.random() - 0.47) * baseVol; // 微弱偏正向长期通胀
      stock.price = Math.max(1.0, parseFloat((stock.price * (1 + randomChange)).toFixed(2)));
    });

    this.latestNews = triggeredNews;
    return triggeredNews;
  }

  // 计算持仓股票总市值
  getTotalPortfolioValue() {
    let total = 0;
    Object.keys(this.portfolio).forEach(sym => {
      const holding = this.portfolio[sym];
      const stock = this.stocks.find(s => s.symbol === sym);
      if (stock && holding.shares > 0) {
        total += holding.shares * stock.price;
      }
    });
    return Math.round(total);
  }

  // 计算总累计浮动盈亏
  getTotalUnrealizedPnL() {
    let totalPnL = 0;
    Object.keys(this.portfolio).forEach(sym => {
      const holding = this.portfolio[sym];
      const stock = this.stocks.find(s => s.symbol === sym);
      if (stock && holding.shares > 0) {
        totalPnL += holding.shares * (stock.price - holding.avgCost);
      }
    });
    return Math.round(totalPnL);
  }

  // 买入股票
  buyStock(symbol, amountDollars, currentCash) {
    const stock = this.stocks.find(s => s.symbol === symbol);
    if (!stock) return { success: false, msg: '股票代码不存在' };

    const actualAmount = Math.min(amountDollars, currentCash);
    if (actualAmount < stock.price) {
      return { success: false, msg: `现金不足买入 1 股 (当前每股 $${stock.price.toFixed(2)})` };
    }

    const sharesToBuy = Math.floor(actualAmount / stock.price);
    const cost = parseFloat((sharesToBuy * stock.price).toFixed(2));

    if (!this.portfolio[symbol]) {
      this.portfolio[symbol] = { shares: 0, avgCost: 0 };
    }

    const cur = this.portfolio[symbol];
    const totalOldCost = cur.shares * cur.avgCost;
    cur.shares += sharesToBuy;
    cur.avgCost = parseFloat(((totalOldCost + cost) / cur.shares).toFixed(2));

    return {
      success: true,
      cost: cost,
      shares: sharesToBuy,
      symbol: symbol,
      stockName: stock.nameZh
    };
  }

  // 卖出股票 (支持部分或全部)
  sellStock(symbol, sharesToSell = null) {
    const stock = this.stocks.find(s => s.symbol === symbol);
    const holding = this.portfolio[symbol];
    if (!stock || !holding || holding.shares <= 0) {
      return { success: false, msg: '名下未持有该股票' };
    }

    const actualShares = sharesToSell ? Math.min(holding.shares, sharesToSell) : holding.shares;
    const revenue = parseFloat((actualShares * stock.price).toFixed(2));
    const profit = parseFloat((revenue - actualShares * holding.avgCost).toFixed(2));

    holding.shares -= actualShares;
    if (holding.shares <= 0) {
      holding.shares = 0;
      holding.avgCost = 0;
    }

    return {
      success: true,
      revenue: revenue,
      profit: profit,
      shares: actualShares,
      symbol: symbol,
      stockName: stock.nameZh
    };
  }

  // 设置广告内幕情报 (下一周指定股票暴涨)
  setInsiderTip(symbol) {
    this.guaranteedNextBullSymbol = symbol;
  }

  // 美联储救市对冲：看广告抵消黑天鹅暴跌
  bailoutFromBearMarket(symbol, prevPrice) {
    const stock = this.stocks.find(s => s.symbol === symbol);
    if (stock) {
      stock.price = prevPrice;
    }
  }
}

window.stockMarket = new StockMarketSystem();
