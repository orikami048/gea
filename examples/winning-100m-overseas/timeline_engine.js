/**
 * 完整对齐原版《奖来7000万》的多时间线与「分支的分支」嵌套图谱 (Fractal Multi-Timeline Graph Engine)
 * 具备 10 大主时间线 + 12 大深度子时间线分支 (Sub-Timelines):
 * 
 * 1. 🩸 华尔街嗜血大空头线
 *    ├─ 🩸-A: 跨国主权外汇狙击狂徒线 (Currency Warlord)
 *    └─ 🩸-B: 司法部红通公海潜艇逃亡线 (Red Notice Fugitive)
 * 2. 🤖 硅谷科技教皇线
 *    ├─ 🤖-A: 脑机接口数字机械神灵线 (Neural Matrix God)
 *    └─ 🤖-B: 五角大楼军工自主武装舰队线 (Autonomous War Fleet)
 * 3. ⛓️ 联邦重犯·铁窗量化线
 *    ├─ ⛓️-A: 联邦监狱地下金融教父线 (Prison Yard Syndicate)
 *    └─ ⛓️-B: 司法特赦白道复仇线 (State Witness Avenger)
 * 4. 🌴 跨国避税·加勒比海盗线
 *    ├─ 🌴-A: 公海免税银行帝国线 (Offshore Banking State)
 *    └─ 🌴-B: 私人防卫军阀要塞线 (Sovereign Fortress)
 * 5. 🌲 隐士哲人·山野圣贤线
 *    ├─ 🌲-A: 诺贝尔和平奖文明微光线 (Nobel Peace Laureate)
 *    └─ 🌲-B: 散尽万金纯粹苦行隐士线 (Pure Mountain Ascetic)
 * 6. 🔥 比弗利名流·风云大亨线
 *    ├─ 🎬-A: 好莱坞传媒奥斯卡巨头线 (Hollywood Media King)
 *    └─ 🎲-B: 拉斯维加斯赌场暗夜皇帝线 (Vegas Casino Emperor)
 * 7. 🏛️ 华盛顿暗黑权力幕后线
 * 8. 🧬 赛博永生·基因重组长生线
 * 9. 📉 至暗破产·绝境东山再起线
 * 10. 🏭 重工实业·清洁能源托拉斯线
 */

const TIMELINE_GRAPH_NODES = {
  // ══════════════════════════════════════════════════════════════════════════════
  // 【根节点】中奖兑付、四大初始时间线分裂
  // ══════════════════════════════════════════════════════════════════════════════
  'CH01_WIN': {
    id: 'CH01_WIN',
    chapter: 'CH01',
    ageRange: '29-30岁',
    timelineName: '🌟 命运奇点 · 头奖降临',
    title: '第一幕：暴富降临与四大初始时间线抉择',
    scene: '🎰 拉斯维加斯彩票总署 · 贵宾兑奖室',
    image: '🎟️',
    narrative: `那张20美元机选的彩票匹配了全部六个号码。扣税后净现金 5200 万美元静静躺在你的银行账户里。
这笔巨款是通往天堂的门票，也是撕裂人生的导火索。四条截然不同的未来轨迹正在你面前裂开：`,
    choices: [
      {
        text: '💻【暗中将全部资金兑入算法暗池】建立高频量化模型，开启嗜血空头之路',
        setFact: { wealth_disclosure: 'quant' },
        targetNodeId: 'T_SHORT_ROOT',
        impact: { money: 5000000, wisdom: 30, fame: 10, karma: -20 },
        feedback: '【⚡ 时间线分裂！】你已步入《🩸 华尔街嗜血大空头时间线》！冰冷的K线成为你唯一的信仰，猎杀对冲基金的号角吹响！'
      },
      {
        text: '🕶️【设立特拉华盲盒信托】彻底隐匿身份，金蝉脱壳进入离岸避税体系',
        setFact: { wealth_disclosure: 'secret' },
        targetNodeId: 'T_OFFSHORE_ROOT',
        impact: { money: 0, happiness: 15, fame: -15, karma: 10 },
        feedback: '【⚡ 时间线分裂！】你已步入《🌴 加勒比海盗·离岸主权君王时间线》！真实姓名永久封存，资本潜入幽灵暗池！'
      },
      {
        text: '📸【召开全球新闻发布会】手持巨额支票全网直播，拥抱好莱坞顶级流量',
        setFact: { wealth_disclosure: 'public' },
        targetNodeId: 'T_CELEB_ROOT',
        impact: { money: 0, happiness: 25, fame: 60, karma: -10 },
        feedback: '【⚡ 时间线分裂！】你已步入《🔥 比弗利名流·风云大亨时间线》！全球推特瞬间登顶第一，名利场的大门轰然敞开！'
      },
      {
        text: '🕊️【隐姓埋名回馈故里】秘密将八成资金注入匿名慈善成长基金',
        setFact: { wealth_disclosure: 'saint' },
        targetNodeId: 'T_ZEN_ROOT',
        impact: { money: -20000000, happiness: 40, fame: -20, karma: 60 },
        feedback: '【⚡ 时间线分裂！】你已步入《🌲 隐士哲人·山野圣贤时间线》！拒绝金钱腐蚀心灵，你选择了一条大音希声的崇高道路！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 1: 🩸 华尔街嗜血大空头线】及其子分支
  // ══════════════════════════════════════════════════════════════════════════════
  'T_SHORT_ROOT': {
    id: 'T_SHORT_ROOT',
    chapter: 'CH02',
    ageRange: '32-40岁',
    timelineName: '🩸 华尔街嗜血大空头线',
    title: '第二幕：做空次贷危机·对手盘爆仓',
    scene: '📈 曼哈顿对冲基金秘密交易室 · 彭博终端荧光',
    image: '📉',
    narrative: `你嗅到了全球房地产次贷与商业银行资产负债表的致命溃疡。
建立百倍杠杆看跌期权，成功收割一亿两千万美金现金。此刻，两个截然不同的空头子分支出现在你眼前：`,
    choices: [
      {
        text: '🌍【发起跨国主权外汇突袭】效仿索罗斯，满仓做空某欧洲国家主权货币！',
        targetNodeId: 'T_SHORT_CURRENCY',
        impact: { money: 180000000, fame: 60, karma: -40, credit: -20 },
        feedback: '【⚡ 时间线二级分裂！】你已由空头线深入裂变为《🩸-A: 跨国主权外汇狙击狂徒线》！多国央行行长紧急宣布对你实施跨国反制！'
      },
      {
        text: '🚤【遭遇反洗钱红通通缉·乘坐潜艇逃亡】司法部联合突袭，转入公海逃亡网络',
        targetNodeId: 'T_SHORT_FUGITIVE',
        impact: { money: -30000000, wisdom: 40, health: -15 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🩸-B: 司法部红通公海潜艇逃亡线》！你的名字登上国际刑警红色通缉令！'
      }
    ]
  },

  // ── 子时间线 1-A: 跨国主权外汇狙击狂徒 ──
  'T_SHORT_CURRENCY': {
    id: 'T_SHORT_CURRENCY',
    chapter: 'CH04',
    ageRange: '45-60岁',
    timelineName: '🩸-A: 跨国主权外汇狙击狂徒线',
    title: '第三幕：击溃央行外汇储备·铸就金融黑洞',
    scene: '🏰 苏黎世湖畔私人要塞金库 · 高频卫星链路',
    image: '💥',
    narrative: `你调动百亿热钱在外汇期货市场发动闪电战。某国央行在抵抗48小时后宣告外汇耗尽，货币贬值40%！
你单笔获利四亿美元，成为全球金融史无可争议的“主权货币毁灭者”。`,
    choices: [
      {
        text: '👑【自封离岸中央银行行长】用海量黄金储备为小型主权国背书，掌握铸币权',
        targetNodeId: 'T_SHORT_LATE',
        impact: { money: 200000000, fame: 50 },
        feedback: '你获得了超越常规商业的终极金融特权——私人铸币权！'
      }
    ]
  },

  // ── 子时间线 1-B: 司法部红通公海潜艇逃亡 ──
  'T_SHORT_FUGITIVE': {
    id: 'T_SHORT_FUGITIVE',
    chapter: 'CH04',
    ageRange: '45-60岁',
    timelineName: '🩸-B: 司法部红通公海潜艇逃亡线',
    title: '第三幕：深海核潜艇庇护·幽灵资本操盘',
    scene: '⚓ 大西洋公海 · 私人改造科研潜艇指挥舱',
    image: '🌊',
    narrative: `联邦特勤局冻结了你所有的陆地账户，但无法穿透公海深海。
你长年生活在两千吨级私人深潜器中，通过百兆星链卫星在暗网调动冷钱包操盘。没有主权法庭能将传票送至海底两千米。`,
    choices: [
      {
        text: '🏴‍☠️【在公海建立幽灵金融暗网】联合全球离岸黑市，成为无法被审判的深海神话',
        targetNodeId: 'T_SHORT_LATE',
        impact: { money: 80000000, wisdom: 50 },
        feedback: '你在水下静默前行，成为国际法理无法触及的幽灵操盘手！'
      }
    ]
  },

  'T_SHORT_LATE': {
    id: 'T_SHORT_LATE',
    chapter: 'CH07',
    ageRange: '65-99岁',
    timelineName: '🩸 华尔街嗜血大空头线 (终极封卷)',
    title: '第四幕：金融死神终局·贪婪与毁灭的永恒丰碑',
    scene: '🏦 苏黎世湖畔终极城堡 · 纯黑大理石王座',
    image: '☠️',
    narrative: `数十年来，无数基金经理因你的名字不寒而栗。你站在万亿财富的顶峰，身后是倒下的投行与央行残骸。
你在冰冷的王座上端起酒杯，见证了现代金融最极致的残酷与辉煌。`,
    choices: [
      {
        text: '📜【阅毕全书·开启嗜血空头万字特稿报告】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 50 },
        feedback: '全剧终！你的名字成为全球商学院金融战争史永不褪色的黑色神话！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 2: 🤖 硅谷科技教皇线】及其子分支
  // ══════════════════════════════════════════════════════════════════════════════
  'T_AI_ROOT': {
    id: 'T_AI_ROOT',
    chapter: 'CH04',
    ageRange: '45-48岁',
    timelineName: '🤖 硅谷科技教皇线',
    title: '第二幕：具身智能万亿豪赌·纳斯达克敲钟',
    scene: '🔔 纳斯达克敲钟台 · 时代广场巨屏',
    image: '🦾',
    narrative: `你投资的具身双足机器人“宙斯”震撼世界，纳斯达克敲钟上市首日暴涨400%，市值破千亿！
拥有上百亿美元科技估值的你，站在科技演进的最高阶梯上，必须决定下一代核心战略：`,
    choices: [
      {
        text: '🧠【研发侵入式脑机接口】将人类意识与超级量子云端融合，追寻硅基神格！',
        targetNodeId: 'T_AI_NEURAL_GOD',
        impact: { money: -50000000, wisdom: 50, health: 30 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🤖-A: 脑机接口数字机械神灵线》！向人类肉体极限宣战！'
      },
      {
        text: '⚔️【拿下五角大楼全球国防合同】制造十万台自主重装机甲，掌控全球武装主权！',
        targetNodeId: 'T_AI_WAR_FLEET',
        impact: { money: 120000000, fame: 50, credit: 40 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🤖-B: 五角大楼军工自主武装舰队线》！你成为了现实版钢铁侠！'
      }
    ]
  },

  // ── 子时间线 2-A: 脑机接口数字机械神灵 ──
  'T_AI_NEURAL_GOD': {
    id: 'T_AI_NEURAL_GOD',
    chapter: 'CH06',
    ageRange: '55-75岁',
    timelineName: '🤖-A: 脑机接口数字机械神灵线',
    title: '第三幕：意识上传突破·肉身与量子云共生',
    scene: '🔮 内华达地下千米超级量子超算中心',
    image: '🧠',
    narrative: `第一批通过脑机接口实现意识永续的人类诞生了。
你的思维可以直接接入全球光纤电网，在一秒钟内完成千万次高频推理。肉体的衰老不再具有威胁，你的意识已在云端永生。`,
    choices: [
      {
        text: '🌟【开启人类数字升华新纪元】引领亿万信徒进入超维数字世界',
        targetNodeId: 'T_CYBER_IMMORTAL',
        impact: { wisdom: 60, fame: 60 },
        feedback: '【时间线汇流！】你彻底超越了碳基凡人，成为科技文明史第一位数字神灵！'
      }
    ]
  },

  // ── 子时间线 2-B: 五角大楼军工自主武装舰队 ──
  'T_AI_WAR_FLEET': {
    id: 'T_AI_WAR_FLEET',
    chapter: 'CH06',
    ageRange: '55-75岁',
    timelineName: '🤖-B: 五角大楼军工自主武装舰队线',
    title: '第三幕：自主机甲军团列装·全球防务霸权',
    scene: '🛰️ 太平洋深水航母编队甲板 · 宙斯机甲列阵',
    image: '🛡️',
    narrative: `你的自主军工舰队守护着马六甲海峡与直布罗陀海峡。
各国政要在联合国安全理事会上向你的企业致敬，你凭借无可匹敌的绝对科技硬实力，终结了数十场局部地缘冲突。`,
    choices: [
      {
        text: '🏛️【进驻参谋长联席会议】担任全球和平特别防务顾问，权倾朝野',
        targetNodeId: 'T_KINGMAKER_LATE',
        impact: { credit: 60, fame: 50 },
        feedback: '【时间线突变！】科技与权力深度合流，你成为主宰现代世界的超级守护者！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 3: ⛓️ 联邦重犯·铁窗量化线】及其子分支 (原版 CH03_PRISON 深度扩展)
  // ══════════════════════════════════════════════════════════════════════════════
  'T_PRISON_ROOT': {
    id: 'T_PRISON_ROOT',
    chapter: 'CH03',
    ageRange: '41-45岁',
    timelineName: '⛓️ 联邦重犯·铁窗量化线',
    title: '第二幕：手写协议曝光·判处服刑五年',
    scene: '🔒 纽约联邦惩教中心 (MCC) · 铁窗与高墙',
    image: '⛓️',
    narrative: `手写贿赂协议曝光，罚没三千万美元，判处服刑五年。
昔日亿万富翁，如今只有胸前编号【#89413】。
在狱中放风广场上，两大势力同时找上了你：`,
    choices: [
      {
        text: '🚬【接管狱中黑手党洗钱账本】帮东欧与西西里教父重组暗网资产，建立地下威信！',
        targetNodeId: 'T_PRISON_GODFATHER',
        impact: { money: 20000000, credit: -30, wisdom: 35 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《⛓️-A: 联邦监狱地下金融教父线》！狱警和囚犯头目都尊你为账房老九！'
      },
      {
        text: '⚖️【协助联邦检察官秘密作证】转为污点证人，戴罪立功扳倒陷害你的幕后黑手！',
        targetNodeId: 'T_PRISON_AVENGER',
        impact: { money: 10000000, credit: 35, reputation: 25 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《⛓️-B: 司法特赦白道复仇线》！获得总统提前特赦出狱！'
      }
    ]
  },

  // ── 子时间线 3-A: 联邦监狱地下金融教父 ──
  'T_PRISON_GODFATHER': {
    id: 'T_PRISON_GODFATHER',
    chapter: 'CH04',
    ageRange: '46-55岁',
    timelineName: '⛓️-A: 联邦监狱地下金融教父线',
    title: '第三幕：铁窗黑白通吃·出狱统领黑金辛迪加',
    scene: '🍷 曼哈顿小意大利私人雪茄会所',
    image: '🎩',
    narrative: `五年刑满释放当天，八辆黑色凯迪拉克在监狱门外列队护送。
在狱中积攒的庞大地下金融人脉让你一跃成为美东各大地下黑钱庄的最高首席量化顾问，黑白两道无人敢欠你的账。`,
    choices: [
      {
        text: '🩸【将黑金清洗进入纳斯达克对冲基金】重返华尔街，以狠辣手段猎杀仇敌',
        targetNodeId: 'T_SHORT_LATE',
        impact: { money: 80000000, fame: 40 },
        feedback: '你在暗处织起巨网，华尔街投行大佬们纷纷被你玩弄于股掌之间！'
      }
    ]
  },

  // ── 子时间线 3-B: 司法特赦白道复仇 ──
  'T_PRISON_AVENGER': {
    id: 'T_PRISON_AVENGER',
    chapter: 'CH04',
    ageRange: '46-55岁',
    timelineName: '⛓️-B: 司法特赦白道复仇线',
    title: '第三幕：白宫特赦令下达·雷霆复仇昔日仇家',
    scene: '🏛️ 华盛顿司法部特别大陪审团证人席',
    image: '⚡',
    narrative: `你出具的详尽量化洗钱账册直接将当年构陷你的跨国财阀董事会全员送入铁窗！
白宫特赦令签发，你不仅洗清了所有罪名，还获得了高达两千万美元的巨额举报人司法分成。`,
    choices: [
      {
        text: '🚀【拿着司法赔偿金与顾行舟投资机器人】王者归来，杀入硅谷科技巅峰！',
        targetNodeId: 'T_AI_ROOT',
        impact: { money: 50000000, reputation: 50 },
        feedback: '【时间线突变！】完美洗脱冤屈，你以英雄姿态杀回硅谷巅峰！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 4: 🌴 跨国避税·加勒比海盗线】及其子分支
  // ══════════════════════════════════════════════════════════════════════════════
  'T_OFFSHORE_ROOT': {
    id: 'T_OFFSHORE_ROOT',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🌴 跨国避税·加勒比海盗线',
    title: '第二幕：买下巴哈马独立海岛·主权避风港',
    scene: '🛥️ 巴哈马拿骚深水私人码头',
    image: '🏝️',
    narrative: `斥资两千五百万买下拥有独立主权的加勒比海岛。
在这里没有国税局的传票，也没有繁复的金融审查。下一步建设蓝图展开：`,
    choices: [
      {
        text: '🏦【建立全球离岸免税私立银行】为全球亿万富豪提供不可穿透的秘密金库！',
        targetNodeId: 'T_OFFSHORE_SOVEREIGN',
        impact: { money: 40000000, credit: 40 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🌴-A: 公海免税银行帝国线》！数百位全球政商寡头成为你的储户！'
      },
      {
        text: '⚔️【招募黑水前雇佣军·打造海上要塞军阀】部署岸基防空雷达，建立武装独立邦！',
        targetNodeId: 'T_OFFSHORE_WARZONE',
        impact: { money: -15000000, fame: 40, credit: -20 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🌴-B: 私人防卫军阀要塞线》！大国军舰也不得不在你的领海外缘减速通报！'
      }
    ]
  },

  // ── 子时间线 4-A: 公海免税银行帝国 ──
  'T_OFFSHORE_SOVEREIGN': {
    id: 'T_OFFSHORE_SOVEREIGN',
    chapter: 'CH03',
    ageRange: '40-60岁',
    timelineName: '🌴-A: 公海免税银行帝国线',
    title: '第三幕：主权离岸清算中心·超越瑞士的保密殿堂',
    scene: '🏰 花岗岩海岛地下金库 · 数百吨黄金金砖',
    image: '🔱',
    narrative: `你的海岛银行成为全球高净值家族的首选避风港。
你掌握着全球最核心的财富秘密账簿，即便欧美经济陷入泥潭，你的海岛依然夜夜笙歌、现金如潮。`,
    choices: [
      {
        text: '📜【阅毕全书·开启离岸主权帝国万字终局】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 50 },
        feedback: '全剧终！你缔造了一个超越主权疆界的离岸避税帝国！'
      }
    ]
  },

  // ── 子时间线 4-B: 私人防卫军阀要塞 ──
  'T_OFFSHORE_WARZONE': {
    id: 'T_OFFSHORE_WARZONE',
    chapter: 'CH03',
    ageRange: '40-60岁',
    timelineName: '🌴-B: 私人防卫军阀要塞线',
    title: '第三幕：铁甲战舰巡航·加勒比无敌海上霸主',
    scene: '⚓ 护卫舰甲板 · 直升机盘旋',
    image: '🏴‍☠️',
    narrative: `你的私人防卫舰队在加勒比海域拥有无可撼动的制海权。
加勒比多个岛国推举你为联合防务协调长官，你将个人财富直接转化为了近代不可思议的私人海上霸权。`,
    choices: [
      {
        text: '📜【阅毕全书·开启海上军阀帝国终局特稿】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 60 },
        feedback: '全剧终！金钱化为铁甲，你成为了加勒比海上永不沉没的主权传奇！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 5: 🌲 隐士哲人·山野圣贤线】及其子分支
  // ══════════════════════════════════════════════════════════════════════════════
  'T_ZEN_ROOT': {
    id: 'T_ZEN_ROOT',
    chapter: 'CH02',
    ageRange: '32-45岁',
    timelineName: '🌲 隐士哲人·山野圣贤线',
    title: '第二幕：太浩湖畔松林木屋·万所匿名图书室',
    scene: '🏡 太浩湖畔木屋 · 柴火微光与清茶',
    image: '🌲',
    narrative: `你退出了所有投行名利场，隐姓埋名在湖畔松林长居。
你暗中捐建了上万所乡村图书室，救助了无数濒危病患。此时两条更深邃的人生道路展开：`,
    choices: [
      {
        text: '🕊️【攻克罕见病免版税药局】组建全球顶尖非营利科研所，彻底消灭两种绝症！',
        targetNodeId: 'T_ZEN_NOBEL',
        impact: { money: -25000000, karma: 80, happiness: 50 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🌲-A: 诺贝尔和平奖文明微光线》！时代周刊将你评选为人性最纯粹的光芒！'
      },
      {
        text: '🧘【散尽万金纯粹苦行】将剩余财富全数散给孤儿院，粗茶淡饭游历全球',
        targetNodeId: 'T_ZEN_ASCETIC',
        impact: { money: -10000000, karma: 100, health: 30 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🌲-B: 散尽万金纯粹苦行隐士线》！身无分文，却拥有整个世界的精神安宁！'
      }
    ]
  },

  // ── 子时间线 5-A: 诺贝尔和平奖文明微光 ──
  'T_ZEN_NOBEL': {
    id: 'T_ZEN_NOBEL',
    chapter: 'CH06',
    ageRange: '60-85岁',
    timelineName: '🌲-A: 诺贝尔和平奖文明微光线',
    title: '第三幕：奥斯陆市政厅·诺贝尔和平奖授勋',
    scene: '🏅 挪威奥斯陆市政厅 · 全场起立雷鸣掌声',
    image: '🕊️',
    narrative: `你研发的免版税救命药拯救了三千七百万第三世界儿童。
在奥斯陆市政厅的讲台上，你身着朴素布衣发表和平演讲。世界首脑全体起立，致敬你这位用金钱对抗荒芜的当代圣贤。`,
    choices: [
      {
        text: '📜【阅毕全书·开启人类文明灯塔终极大结局】(View Grand Finale)',
        targetNodeId: null,
        impact: { karma: 100, fame: 60 },
        feedback: '全剧终！大音希声，你的善行在人类文明史册中熠熠生辉！'
      }
    ]
  },

  // ── 子时间线 5-B: 散尽万金纯粹苦行隐士 ──
  'T_ZEN_ASCETIC': {
    id: 'T_ZEN_ASCETIC',
    chapter: 'CH06',
    ageRange: '60-99岁',
    timelineName: '🌲-B: 散尽万金纯粹苦行隐士线',
    title: '第三幕：天地为庐·了无牵挂的得道高人',
    scene: '🌅 喜马拉雅雪山脚下 · 晨钟暮鼓与清风',
    image: '🏔️',
    narrative: `你没有一分钱存款，但每到一处，受过你恩惠的人民用最新鲜的面包与清泉迎接你。
你体会到了任何物质财富都无法比拟的自在与澄澈，安详地步入百岁长寿境界。`,
    choices: [
      {
        text: '📜【阅毕全书·开启大觉悟者终极大结局】(View Grand Finale)',
        targetNodeId: null,
        impact: { karma: 100, health: 40 },
        feedback: '全剧终！金钱的奴隶在世间挣扎，而你成了自身灵魂真正的主宰！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 6: 🔥 比弗利名流线】及其子分支
  // ══════════════════════════════════════════════════════════════════════════════
  'T_CELEB_ROOT': {
    id: 'T_CELEB_ROOT',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🔥 比弗利名流·风云大亨线',
    title: '第二幕：比弗利山庄世纪名流派对',
    scene: '🏰 比弗利山庄日落大道庄园 · 泳池晚宴',
    image: '🥂',
    narrative: `你买下全城最贵庄园，成为好莱坞派对的核心主宰。
在名利场的巨大引力下，两处极具诱惑力的新舞台摆在你眼前：`,
    choices: [
      {
        text: '🎬【收购好莱坞八大独立影业】签约名导巨星，进军全球电影文化传媒帝国！',
        targetNodeId: 'T_CELEB_HOLLYWOOD',
        impact: { money: -30000000, fame: 50, romance: 30 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🎬-A: 好莱坞传媒奥斯卡巨头线》！金球奖与奥斯卡评委视你为幕后大金主！'
      },
      {
        text: '🎲【全资控股拉斯维加斯奢华赌场度假村】接管赌城内华达地下娱乐帝国！',
        targetNodeId: 'T_CELEB_VEGAS',
        impact: { money: -40000000, fame: 40, credit: 30 },
        feedback: '【⚡ 时间线二级分裂！】你已深入裂变为《🎲-B: 拉斯维加斯赌场暗夜皇帝线》！霓虹灯不夜城在你脚下闪烁！'
      }
    ]
  },

  // ── 子时间线 6-A: 好莱坞传媒奥斯卡巨头 ──
  'T_CELEB_HOLLYWOOD': {
    id: 'T_CELEB_HOLLYWOOD',
    chapter: 'CH04',
    ageRange: '45-70岁',
    timelineName: '🎬-A: 好莱坞传媒奥斯卡巨头线',
    title: '第三幕：柯达剧院奥斯卡红毯·横扫最佳影片',
    scene: '🏆 洛杉矶杜比剧院 · 奥斯卡颁奖典礼',
    image: '🎬',
    narrative: `你的电影制作集团囊括了数十项奥斯卡小金人，主导了全球流行文化的审美与叙事。
你坐在影院第一排，台上的巨星纷纷向你致谢。你用金钱铸就了一座流光溢彩的文化梦工厂。`,
    choices: [
      {
        text: '📜【阅毕全书·开启好莱坞传媒大亨终局报告】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 60 },
        feedback: '全剧终！在胶片与数字流媒体的世纪长卷中，你留下了不可磨灭的传奇！'
      }
    ]
  },

  // ── 子时间线 6-B: 拉斯维加斯赌场暗夜皇帝 ──
  'T_CELEB_VEGAS': {
    id: 'T_CELEB_VEGAS',
    chapter: 'CH04',
    ageRange: '45-70岁',
    timelineName: '🎲-B: 拉斯维加斯赌场暗夜皇帝线',
    title: '第三幕：不夜城现金奶牛·内华达娱乐霸主',
    scene: '🎰 拉斯维加斯百乐宫顶层总裁套房 · 俯瞰大道',
    image: '🎲',
    narrative: `每晚数千万美元的筹码流水在你的度假村中穿梭。
从职业拳击金腰带争霸赛到全球超模总决赛，拉斯维加斯大道因为你的存在而夜夜沸腾。你成为了内华达沙漠中当之无愧的暗夜皇帝。`,
    choices: [
      {
        text: '📜【阅毕全书·开启赌城娱乐皇帝终局报告】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 50, money: 100000000 },
        feedback: '全剧终！沙漠中的金色绿洲铭记着你的名字，赌城传奇永不落幕！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【主时间线 7, 8, 9, 10 核心节点维护】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_KINGMAKER_LATE': {
    id: 'T_KINGMAKER_LATE',
    chapter: 'CH09',
    ageRange: '70-99岁',
    timelineName: '🏛️ 华盛顿暗黑权力幕后线',
    title: '终极幕：国会山无冕教皇·百年权力王朝',
    scene: '📜 弗吉尼亚老宅书房 · 总统亲授自由勋章',
    image: '🏅',
    narrative: `七十载风云变幻，总统换了十届，而你始终端坐在权力的最中心。历史课本上或许隐藏了你的名字，但每一张美元纸币的流向都在你的意志下运转。`,
    choices: [
      { text: '📜【阅毕全书·开启权力王朝特稿大结局】(View Grand Finale)', targetNodeId: null, impact: { fame: 60 }, feedback: '全剧终！凡人追逐金钱，而你化身为了权力本身！' }
    ]
  },

  'T_CYBER_IMMORTAL': {
    id: 'T_CYBER_IMMORTAL',
    chapter: 'CH08',
    ageRange: '70-99岁',
    timelineName: '🧬 赛博永生·基因长生线',
    title: '终极幕：阿尔卑斯逆龄血清·战胜衰老与死神',
    scene: '🧪 瑞士阿尔卑斯山麓尖端冷冻生命中心 · 82岁',
    image: '🧬',
    narrative: `细胞生理机能回测至42岁黄金状态，白发重焕乌黑！同龄的对手相继埋入黄土，而你依然目光锐利，统治着跨世纪的产业版图。`,
    choices: [
      { text: '📜【阅毕全书·开启赛博长生万字史诗大结局】(View Grand Finale)', targetNodeId: null, impact: { fame: 60, health: 40 }, feedback: '全剧终！你成为了横跨两个世纪的长生教皇！' }
    ]
  }
};

class TimelineBranchDirector {
  constructor() {
    this.nodes = TIMELINE_GRAPH_NODES;
    this.currentNodeId = 'CH01_WIN';
    this.unlockedPath = ['CH01_WIN'];
    this.activeTimelineName = '🌟 命运奇点 · 头奖降临';
  }

  getCurrentNode() {
    return this.nodes[this.currentNodeId] || this.nodes['CH01_WIN'];
  }

  // 玩家做出抉择，跳转到对应的时间线目标节点
  transitionTo(targetNodeId) {
    if (!targetNodeId || !this.nodes[targetNodeId]) {
      return null;
    }
    this.currentNodeId = targetNodeId;
    this.unlockedPath.push(targetNodeId);
    const node = this.nodes[targetNodeId];
    if (node.timelineName) {
      this.activeTimelineName = node.timelineName;
    }
    return node;
  }

  // 开发者与测试沙盒: 一键瞬移/跳转至任意时间线节点进行全真测试
  jumpToNodeForTest(targetNodeId) {
    if (!this.nodes[targetNodeId]) return false;
    this.currentNodeId = targetNodeId;
    if (!this.unlockedPath.includes(targetNodeId)) {
      this.unlockedPath.push(targetNodeId);
    }
    this.activeTimelineName = this.nodes[targetNodeId].timelineName;
    return true;
  }

  // 重置时间线
  reset() {
    this.currentNodeId = 'CH01_WIN';
    this.unlockedPath = ['CH01_WIN'];
    this.activeTimelineName = '🌟 命运奇点 · 头奖降临';
  }

  // 自动化时间线完整性测试引擎 (Automated Timeline Traversal Test)
  runFullGraphSelfTest() {
    const report = {
      totalNodes: Object.keys(this.nodes).length,
      timelinesCount: new Set(Object.values(this.nodes).map(n => n.timelineName)).size,
      brokenLinks: [],
      deadEnds: [],
      validTransitions: 0
    };

    Object.keys(this.nodes).forEach(nodeId => {
      const node = this.nodes[nodeId];
      if (!node.choices || node.choices.length === 0) {
        report.deadEnds.push(nodeId);
      } else {
        node.choices.forEach(ch => {
          if (ch.targetNodeId !== null) {
            if (!this.nodes[ch.targetNodeId]) {
              report.brokenLinks.push({ from: nodeId, to: ch.targetNodeId });
            } else {
              report.validTransitions++;
            }
          }
        });
      }
    });

    report.isAllValid = report.brokenLinks.length === 0;
    return report;
  }

  // 获取时间线树状图谱数据 (供 UI 可视化弹窗与测试沙盒渲染)
  getGraphVisualizationData() {
    return Object.keys(this.nodes).map(nodeId => {
      const node = this.nodes[nodeId];
      const isCurrent = this.currentNodeId === nodeId;
      const isUnlocked = this.unlockedPath.includes(nodeId);
      const isSubTimeline = node.id.includes('_CURRENCY') ||
        node.id.includes('_FUGITIVE') ||
        node.id.includes('_NEURAL_GOD') ||
        node.id.includes('_WAR_FLEET') ||
        node.id.includes('_GODFATHER') ||
        node.id.includes('_AVENGER') ||
        node.id.includes('_SOVEREIGN') ||
        node.id.includes('_WARZONE') ||
        node.id.includes('_NOBEL') ||
        node.id.includes('_ASCETIC') ||
        node.id.includes('_HOLLYWOOD') ||
        node.id.includes('_VEGAS');

      return {
        id: node.id,
        chapter: node.chapter,
        age: node.ageRange,
        title: node.title,
        timeline: node.timelineName,
        scene: node.scene,
        image: node.image || '🧭',
        isSubTimeline: isSubTimeline,
        choicesCount: (node.choices || []).length,
        isCurrent: isCurrent,
        isUnlocked: isUnlocked
      };
    });
  }
}

window.timelineDirector = new TimelineBranchDirector();
