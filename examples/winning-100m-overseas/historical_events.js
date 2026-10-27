/**
 * 历史大事件与魔改平行世界黑天鹅引擎 (Historical & Altered Black Swan Events Engine)
 * 深度联动:
 * 1. 剧情决策 (Story Dilemmas)
 * 2. 股市涨跌 (Stock Market Surges & Crashes)
 * 3. 商城资产 (Mall Assets & Exclusive Privileges)
 */

const HISTORICAL_AND_ALTERED_EVENTS = [
  // ── 1. 中国式 P2P 与影子银行暴雷风暴 (P2P Meltdown) ──────────────────
  {
    id: 'evt_p2p_collapse',
    yearTrigger: 2027,
    chance: 0.85,
    titleZh: '🚨 历史风暴: 百亿级 P2P 互联网理财连环崩盘！',
    titleEn: 'SHADOW BANKING MELTDOWN: Top P2P Lending Platforms Default!',
    icon: '💥',
    descZh: `宣称“保本保息年化18%”的几大知名理财平台突然切断提现通道，实控人被曝潜逃斐济，涉及资金超两百亿美元！
经侦与联邦特勤局迅速查封全部关联账户，成千上万中产排队维权，波及全行业流动性。`,
    descEn: 'High-yield shadow banking portals freeze redemptions. Over $20B in investor capital vanishes overnight.',
    choices: [
      {
        text: '🏃【及时断臂抽身】动用人脉提前打折甩卖债权，仅回收 40% 本金',
        impact: { money: -5000000, happiness: -10, credit: -10 },
        feedback: '你果断割肉挽回了部分流动现金。虽然损失了五百万，但躲过了随后的刑事全面清算。',
        stockImpact: [
          { symbol: 'SPY', multiplier: 0.90, desc: '大盘金融指数下跌 -10%' }
        ]
      },
      {
        text: '✈️【湾流私机与离岸特权】(需持有湾流私人飞机或离岸信托) 提前跨境保全本金',
        requires: { item: 'jet_gulfstream_g650', name: '湾流私人公务机' },
        impact: { money: 0, happiness: 20, credit: 15, fame: 20 },
        feedback: '【👑 专属资产特权生效】在冻结令下达前六小时，你的私人法务团队搭乘湾流直飞苏黎世，全额转移了资金！你在风暴中毫发无损，名声大噪！',
        stockImpact: []
      },
      {
        text: '🩸【深陷其中并被殃及】账户关联资金遭司法冻结，支付巨额诉讼保全费',
        impact: { money: -12000000, happiness: -25, credit: -20, reputation: -15 },
        feedback: '惨重教训！你的家族办公室未能幸免，千万元流动资金被依法冻结审查，商业信誉受到重创。',
        stockImpact: [
          { symbol: 'SPY', multiplier: 0.85, desc: '大盘重挫 -15%' }
        ]
      }
    ]
  },

  // ── 2. 游戏驿站 GME 散户大战华尔街空头 (The GameStop WSB Squeeze) ──────────
  {
    id: 'evt_gamestop_squeeze',
    yearTrigger: 2028,
    chance: 0.9,
    titleZh: '💎🙌 历史重演: Reddit 散户抱团血洗华尔街做空机构！',
    titleEn: 'WSB REBELLION: Retail Army Squeezes Wall Street Short Sellers!',
    icon: '🚀',
    descZh: `散户在 WallStreetBets 论坛掀起世纪逼空圣战！妖股【GME】单周从 $20 狂飙至 $400，香橼等做空百亿基金相继爆仓。
主经纪商和券商紧急“拔掉买入网线”，华尔街遭遇信誉危机，国会紧急传唤听证！`,
    descEn: 'Retail apes force billions in hedge fund margin calls. Brokerages shut off buy buttons in chaos.',
    choices: [
      {
        text: '🦍【加入散户大军】斥资 $5,000,000 梭哈买入认购期权，助推史诗逼空',
        impact: { money: 25000000, happiness: 40, fame: 50, karma: 30 },
        feedback: '【神级暴赚 +$25,000,000！】逼空潮顶峰，空头被迫以天价平仓你的期权！你成为 Reddit 散户奉若神明的传奇带头大哥！',
        stockImpact: [
          { symbol: 'GME', multiplier: 2.80, desc: 'GME 股价火箭升空 +180%！' }
        ]
      },
      {
        text: '📉【勾结券商做空】帮华尔街做市商融券砸盘，反向收割散户浮筹',
        impact: { money: 15000000, happiness: -15, fame: -30, karma: -40, credit: -20 },
        feedback: '华尔街券商拔网线限制交易，你趁机大笔砸空散户，狂赚一千五百万。但你在网上遭到人肉开盒与全美散户唾骂。',
        stockImpact: [
          { symbol: 'GME', multiplier: 0.35, desc: 'GME 遭遇断崖式砸盘暴跌 -65%！' }
        ]
      },
      {
        text: '🍵【冷眼旁观·做多纳指】避开妖股绞肉机，平稳加仓大盘与科技股',
        impact: { money: 3000000, happiness: 10, fame: 5, credit: 10 },
        feedback: '你没有趟这趟浑水，趁市场动荡以低价抄底了优质蓝筹股，赚取三百万稳健利润。',
        stockImpact: [
          { symbol: 'SPY', multiplier: 1.08, desc: '标普大盘温和上涨 +8%' }
        ]
      }
    ]
  },

  // ── 3. 比特币创世钱包苏醒与数字货币大地震 (Bitcoin Genesis Awakening) ───────
  {
    id: 'evt_bitcoin_shock',
    yearTrigger: 2029,
    chance: 0.85,
    titleZh: '🪙 突发加密海啸: 沉睡15年的中本聪创世钱包异动！',
    titleEn: 'CRYPTO TSUNAMI: Satoshi Nakamoto Genesis Wallet Wakes Up!',
    icon: '⚡',
    descZh: `区块链链上数据监测到，沉睡超15年的100万枚原始比特币突然发生小额转移测试！
全球加密交易所瞬间发生踩踏式提币挤兑，币价在24小时内从 12 万美元跌至 3 万美元，随后又被多国央行主权基金爆拉回 18 万美元！`,
    descEn: '1,000,000 Genesis Bitcoins move. Wild swings from $120k to $30k and back to $180k shake the world.',
    choices: [
      {
        text: '⛏️【暴跌底仓抄底】斥资 $10,000,000 动用冷钱包建立去中心化加密国库',
        impact: { money: 35000000, happiness: 30, wisdom: 25, fame: 20 },
        feedback: '【暴利狂赚 +$35,000,000！】在恐慌最顶点你全盘吃进血筹，随后多国主权基金宣布将比特币纳入国家外汇储备，你的持仓翻了数倍！',
        stockImpact: [
          { symbol: 'NVDA', multiplier: 1.45, desc: '算力与加密硬件板块狂飙 +45%' },
          { symbol: 'GME', multiplier: 1.60, desc: '散户加密情绪暴涨 +60%' }
        ]
      },
      {
        text: '🛡️【利用瑞士金库避风】(需持有瑞士避税地下金库) 黄金物理交割避险',
        requires: { item: 'lux_swiss_vault', name: '瑞士地下私人避税金库' },
        impact: { money: 8000000, happiness: 15, wisdom: 15, credit: 20 },
        feedback: '【👑 专属资产特权生效】在数字货币血雨腥风中，你的瑞士物理金库自动完成现货套利，零风险赚取八百万美元！',
        stockImpact: []
      },
      {
        text: '🛑【远离投机·做空科技股】坚信加密泡沫破裂，重仓做空高估值概念股',
        impact: { money: -6000000, happiness: -20, wisdom: -10 },
        feedback: '判断失误！主权资金的强势托底直接打爆了你的空头头寸，亏损六百万美元。',
        stockImpact: [
          { symbol: 'NVDA', multiplier: 1.30, desc: '算力股强劲反弹 +30%' }
        ]
      }
    ]
  },

  // ── 4. 2030年 AGI 人工智能奇点与量化革命 (The AGI Singularity Epoch) ─────────
  {
    id: 'evt_agi_singularity',
    yearTrigger: 2030,
    chance: 0.9,
    titleZh: '🤖 平行篡改历史: AGI 强人工智能奇点全面突破！',
    titleEn: 'THE SINGULARITY: Artificial General Intelligence Achieved!',
    icon: '🔮',
    descZh: `OpenAI 与五角大楼联合宣布：新一代自进化量子智能系统通过超人类综合测试！
华尔街 95% 的交易员与分析师在48小时内遭算法替代，算力需求瞬间爆炸，电网与芯片成为全球最抢手的战略资源！`,
    descEn: 'Human-level AGI clears autonomy tests. Silicon Valley chips and power grids become ultimate gold.',
    choices: [
      {
        text: '🧠【全仓领投算力与超导】斥资 $20,000,000 抢建万卡量子算力中心',
        impact: { money: 60000000, happiness: 35, wisdom: 35, fame: 40 },
        feedback: '【神级布局！净资产暴增 +$60,000,000！】全球主权AI大模型排队租用你的算力矩阵，你的现金流直接井喷！',
        stockImpact: [
          { symbol: 'NVDA', multiplier: 1.85, desc: '英伟达芯片算力暴涨 +85%！' },
          { symbol: 'TSLA', multiplier: 1.50, desc: '具身机器人概念大涨 +50%！' }
        ]
      },
      {
        text: '⚖️【游说政府征收机器人税】联合工会与国会，推动限制自主交易算法',
        impact: { money: -5000000, happiness: 10, fame: 45, karma: 40 },
        feedback: '你站在了人类劳动者的一边，赢得了全美蓝领与知识界的崇高声望，但支付了五百万游说费用。',
        stockImpact: [
          { symbol: 'NVDA', multiplier: 0.85, desc: '监管审查导致芯片板块回调 -15%' }
        ]
      }
    ]
  },

  // ── 5. 全球房产次贷崩塌与豪宅止赎潮 (Subprime & Foreclosure Fire-Sale) ──────
  {
    id: 'evt_housing_fire_sale',
    yearTrigger: 2031,
    chance: 0.85,
    titleZh: '📉 历史危机: 商业地产与次贷危机爆发，豪宅打对折！',
    titleEn: 'HOUSING CRASH: Commercial Debt Bubble Bursts, Mansions 50% Off!',
    icon: '🏚️',
    descZh: `欧美跨国商业地产抵押贷款违约率突破 35%，大量投机富豪资金链断裂，银行扣押拍卖海量顶层豪宅。
比弗利山庄与曼哈顿地标大宅价格一夜腰斩，现金为王的抄底时刻来临！`,
    descEn: 'Commercial real estate defaults spark bank auctions. Mega mansions dump at 50% liquidation prices.',
    choices: [
      {
        text: '🏰【全款抄底止赎豪宅】以对折特价斥资 $9,000,000 拿下比弗利山庄庄园',
        impact: { money: -9000000, happiness: 30, reputation: 25, credit: 20 },
        feedback: '【大捡漏成功！】你在银行法拍拍卖行以平时一半的价格拿下了带私家直升机坪的顶级庄园，总净资产瞬间增厚！',
        stockImpact: [
          { symbol: 'SPY', multiplier: 0.88, desc: '地产暴雷拖累大盘 -12%' }
        ],
        unlockMallItem: 'house_beverly_villa'
      },
      {
        text: '🩸【做空区域性按揭银行】建立房产违约掉期头寸 (CDS)，大发国难财',
        impact: { money: 28000000, happiness: -15, reputation: -20, karma: -35 },
        feedback: '【大空头得手 +$28,000,000！】如同电影《大空头》重现，三家区域银行轰然倒闭，你的离岸账户涌入巨额做空收益。',
        stockImpact: [
          { symbol: 'SPY', multiplier: 0.80, desc: '金融股暴跌 -20%' }
        ]
      },
      {
        text: '🤝【建立救助基金收留断供家庭】捐资设立廉租救济基金，修复社会信誉',
        impact: { money: -8000000, happiness: 35, reputation: 50, karma: 60 },
        feedback: '你挽救了数百个濒临流落街头的家庭，时代周刊整版报道了你的善举，你赢得了无法用金钱衡量的声望。',
        stockImpact: []
      }
    ]
  }
];

// 触发大事件管理器
class HistoricalEventsManager {
  constructor() {
    this.events = JSON.parse(JSON.stringify(HISTORICAL_AND_ALTERED_EVENTS));
    this.triggeredEventIds = new Set();
  }

  // 每年推进时检查是否有历史/魔改事件触发
  checkYearEvents(currentYear, ownedAssets = []) {
    for (const evt of this.events) {
      if (this.triggeredEventIds.has(evt.id)) continue;

      // 只要年份达到或者随机命中
      if (currentYear >= evt.yearTrigger && Math.random() < evt.chance) {
        this.triggeredEventIds.add(evt.id);
        return evt;
      }
    }
    return null;
  }
}

window.historicalEventsManager = new HistoricalEventsManager();
