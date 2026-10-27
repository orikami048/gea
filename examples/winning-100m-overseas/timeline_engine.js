/**
 * 完整对齐原版《奖来7000万》的多时间线树状分支命运图谱 (Multi-Timeline Branching Graph Engine)
 * 具备 10 大截然不同的分支时间线，每个选择都能直接分裂出独立的时间线：
 * 
 * 1. 🌲 【隐士哲人·山野圣贤线】(Zen Philanthropist) - 隐姓埋名、匿名慈善、安详一生
 * 2. 🔥 【比弗利名流·风云大亨线】(Beverly Hills Celebrity) - 聚光灯、世纪婚礼、派对狂欢
 * 3. 🤖 【硅谷科技教皇·具身智能线】(Tech Sovereign) - 斯坦福极客、机器人万亿市值敲钟
 * 4. 🏛️ 【华盛顿暗黑权力幕后线】(Washington Kingmaker) - 老钱联姻、国会游说、影子操盘
 * 5. ⛓️ 【联邦重犯·铁窗量化线】(Federal Inmate & Syndicate) - 商业行贿爆雷、入狱服刑5年、狱中涅槃
 * 6. 🩸 【华尔街嗜血大空头线】(Wall Street Bloodhound) - 离岸暗池、狙击做空、收割全球机构
 * 7. 🌴 【加勒比海盗·离岸主权君王线】(Offshore Sovereign Corsair) - 避税金库、买下免税群岛
 * 8. 🏭 【重工实业·清洁能源托拉斯线】(Clean Energy Monopolist) - 地中海跨洋管网、水土生态治理
 * 9. 🧬 【赛博永生·基因重组长生线】(Cyber Transhumanist) - 端粒重组、打破人类寿命天花板
 * 10. 📉 【至暗破产·绝境东山再起线】(Fallen Phoenix) - 资产归零、绝地反击、白手逆袭
 */

const TIMELINE_GRAPH_NODES = {
  // ══════════════════════════════════════════════════════════════════════════════
  // 【第一章：29至34岁】中奖兑付、四大初始时间线分裂
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
        text: '💻【暗中将全部资金兑入算法暗池】建立高频量化模型，开启嗜血空头之路',
        setFact: { wealth_disclosure: 'quant' },
        targetNodeId: 'T_SHORT_ROOT',
        impact: { money: 5000000, wisdom: 30, fame: 10, karma: -20 },
        feedback: '【⚡ 时间线分裂！】你已步入《🩸 华尔街嗜血大空头时间线》！冰冷的K线成为你唯一的信仰，猎杀对冲基金的号角吹响！'
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
  // 【时间线分支 A: 🌴 离岸主权君王线 (Offshore Corsair)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_OFFSHORE_ROOT': {
    id: 'T_OFFSHORE_ROOT',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🌴 跨国避税·加勒比海盗线',
    title: '第二幕：开曼壳架构与私人免税海岛',
    scene: '🛥️ 巴哈马拿骚深水游艇码头',
    image: '🏝️',
    narrative: `依托特拉华与开曼群岛的重叠信托架构，你的资产在全球税务稽查网中彻底隐形。
巴哈马政府官员私下向你推介一座拥有独立直升机坪和深水港的私人免税海岛，售价 2500 万美元。`,
    choices: [
      {
        text: '🏝️【斥资买下独立海岛】组建私人国际安保，建立属于自己的离岸国度',
        setFact: { owns_private_island: true },
        targetNodeId: 'T_OFFSHORE_MID',
        impact: { money: -25000000, reputation: 25, credit: 35 },
        feedback: '【时间线推进！】升起你的私人家族旗帜！你在这座岛上拥有超越主权国家法律的绝对特权，成为名副其实的离岸君王！'
      },
      {
        text: '🏛️【转战华盛顿政治游说】利用离岸黑金设立两党智库，收买国会法案',
        setFact: { washington_lobbyist: true },
        targetNodeId: 'T_KINGMAKER_MID',
        impact: { money: -15000000, wisdom: 25, credit: 40 },
        feedback: '【⚡ 时间线突变！】你已转向步入《🏛️ 华盛顿暗黑权力幕后时间线》！国会山议员们在你的私人游艇上签署秘密法案！'
      }
    ]
  },

  'T_OFFSHORE_MID': {
    id: 'T_OFFSHORE_MID',
    chapter: 'CH03',
    ageRange: '40-44岁',
    timelineName: '🌴 跨国避税·加勒比海盗线',
    title: '第三幕：公海暗池洗钱与全球司法风暴',
    scene: '🏰 私人海岛要塞地下指挥中心',
    image: '🏴‍☠️',
    narrative: `美国国税局（IRS）与国际刑警联合发起代号“加勒比风暴”的跨境追税行动，多艘巡逻舰封锁了公海航道。
你的私人智囊团制定了应急预案：是动用私人武装与外交豁免权硬刚，还是金蝉脱壳转入瑞士地下金库？`,
    choices: [
      {
        text: '🛡️【出示岛国总理外交豁免护照】启动私家防卫队，不交一分钱霸气逼退调查官',
        targetNodeId: 'T_OFFSHORE_LATE',
        impact: { money: -5000000, fame: 40, credit: 30 },
        feedback: '法律战大获全胜！国际海事法庭宣布你享有完整外交不容侵犯权，华尔街富豪们跪求将资产打包入你的海岛信托！'
      },
      {
        text: '🩸【绝密转战瑞士深山金库】将全部流动资产兑现为物理黄金埋入花岗岩',
        targetNodeId: 'T_ZEN_LATE',
        impact: { money: 0, wisdom: 35, happiness: 20 },
        feedback: '【时间线汇流！】避开风头，你将千吨黄金深埋阿尔卑斯山，进入大隐隐于市的永恒防御状态。'
      }
    ]
  },

  'T_OFFSHORE_LATE': {
    id: 'T_OFFSHORE_LATE',
    chapter: 'CH07',
    ageRange: '60-80岁',
    timelineName: '🌴 跨国避税·加勒比海盗线',
    title: '第四幕：公海终极独立邦国·世袭离岸帝国',
    scene: '👑 私人海岛大殿 · 独立建国庆典',
    image: '🔱',
    narrative: `岁月流转，你的海岛已扩建为容纳数万顶尖科学家的离岸自贸港与无税自由邦。
全球大国在此停靠航母与你签署引渡条约，你的人生从当年的小职员，彻底升维为近代人类罕见的私人主权君王。`,
    choices: [
      {
        text: '📜【阅毕全书·开启离岸君王终极报告】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 50 },
        feedback: '你以独立主权者的身份俯瞰世界，此生波澜壮阔，无怨无悔！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 B: 🔥 比弗利名流·风云大亨线 (Celebrity & Playboy)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_CELEB_ROOT': {
    id: 'T_CELEB_ROOT',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🔥 比弗利名流·风云大亨线',
    title: '第二幕：比弗利山庄庄园与名媛婚约考验',
    scene: '🏰 比弗利山庄日落大道庄园 · 泳池派对',
    image: '🥂',
    narrative: `你斥资两千万拿下全城地标庄园，泳池派对永不落幕。好莱坞一线名媛“克洛伊”向你倾心，但强烈抵触签署婚前协议。`,
    choices: [
      {
        text: '🛡️【坚持铁血婚前协议】不签协议绝不领证，捍卫资产主权',
        setFact: { marital_status: 'married_prenup' },
        targetNodeId: 'T_CELEB_MID_STABLE',
        impact: { money: -5000000, reputation: 25, credit: 20 },
        feedback: '克洛伊妥协签字。你享受着聚光灯下的神仙眷侣形象，同时在法律上筑起了防火墙。'
      },
      {
        text: '❤️【盲信真爱·千金买笑】放弃婚前协议，赠送五千万共同账户举办世纪婚礼',
        setFact: { marital_status: 'married_trap' },
        targetNodeId: 'T_CELEB_MID_DISASTER',
        impact: { money: -25000000, romance: 40, fame: 50, credit: -20 },
        feedback: '【⚠️ 致命伏笔！】世纪婚礼轰动全球，但你的半数财富已完全暴露在他人指尖！'
      }
    ]
  },

  'T_CELEB_MID_STABLE': {
    id: 'T_CELEB_MID_STABLE',
    chapter: 'CH03',
    ageRange: '40-44岁',
    timelineName: '🔥 比弗利名流·风云大亨线',
    title: '第三幕：好莱坞制片传媒帝国与超级跑车车队',
    scene: '🎬 环球影业私董会放映厅',
    image: '🏎️',
    narrative: `你在好莱坞收购了独立制片厂，名下豪车成排。此时地中海跨国基建与土地招标向你招手，需要你决定资本的下一步流向。`,
    choices: [
      {
        text: '🩸【受贿贪婪·私相授受】为图暴利，向主管官员私下输送巨额干股',
        targetNodeId: 'T_PRISON_ROOT',
        impact: { money: -20000000, credit: -50, karma: -50 },
        feedback: '【⚡ 命运断崖式跌落！】你已步入《⛓️ 联邦重犯·铁窗量化时间线》！名流光环瞬间被司法风暴粉碎！'
      },
      {
        text: '🤖【转战硅谷极客圈】厌倦浮华派对，重金领投斯坦福具身智能机器人',
        targetNodeId: 'T_AI_ROOT',
        impact: { money: -20000000, wisdom: 35, fame: 20 },
        feedback: '【⚡ 时间线突变！】你已转向步入《🤖 硅谷科技教皇时间线》！洗尽铅华，直奔人类前沿！'
      }
    ]
  },

  'T_CELEB_MID_DISASTER': {
    id: 'T_CELEB_MID_DISASTER',
    chapter: 'CH03',
    ageRange: '40-44岁',
    timelineName: '📉 至暗破产·绝境逆袭线',
    title: '第三幕：世纪婚变背刺·八千万资产遭冻结分割',
    scene: '⚖️ 洛杉矶高等法院家事法庭',
    image: '💔',
    narrative: `婚后第七年，克洛伊与私人健身教练卷走三千万海外资产并起诉离婚。
由于没有婚前协议，法庭判决平分所有共有房产与公司股权。你的流动资金彻底见底，面临破产危机！`,
    choices: [
      {
        text: '💪【绝境清仓·白手二次逆袭】变卖残余名表超跑，凭借华尔街量化旧部东山再起',
        targetNodeId: 'T_FALLEN_COMEBACK',
        impact: { money: 10000000, wisdom: 40, credit: 30 },
        feedback: '【⚡ 时间线分裂！】你已步入《📉 至暗破产·绝境东山再起时间线》！雄狮断腕，你在废墟上重铸坚不可摧的心智！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 C: ⛓️ 联邦重犯·铁窗量化线 (Federal Prison)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_PRISON_ROOT': {
    id: 'T_PRISON_ROOT',
    chapter: 'CH03',
    ageRange: '41-45岁',
    timelineName: '⛓️ 联邦重犯·铁窗量化线',
    title: '第四幕：手写协议曝光·判处联邦监狱服刑五年',
    scene: '🔒 纽约联邦惩教中心 (MCC) · 高墙铁丝网',
    image: '⛓️',
    narrative: `手写回扣协议被国际反腐局查获。法槌重重落下：罚没三千万美元，判处服刑五年！
昔日亿万富翁，如今只有胸前代号【#89413】。
但在牢狱中，监狱长发现你高超的财务模型，私下请你为监狱内部信托与警员退休基金进行避险规划。`,
    choices: [
      {
        text: '🧘【狱中苦修·暗中操盘】暗中帮监狱管理层理财赢得庇护，同时在脑海推演下一代算法',
        targetNodeId: 'T_PRISON_REENTRY',
        impact: { money: 0, wisdom: 45, health: -10, credit: -20 },
        feedback: '【时间线推进！】铁窗磨平了浮躁。五年间你虽在深渊，却用大脑推演完成了震撼后世的颠覆性商业蓝图！'
      }
    ]
  },

  'T_PRISON_REENTRY': {
    id: 'T_PRISON_REENTRY',
    chapter: 'CH04',
    ageRange: '46岁',
    timelineName: '⛓️ 联邦重犯·铁窗量化线',
    title: '第五幕：刑满释放·雨中重逢与破釜沉舟',
    scene: '🚪 联邦监狱沉重大门外 · 细雨初歇',
    image: '🌧️',
    narrative: `沉重铁门在身后开启。你穿着洗得发白的旧风衣走出高墙。
故交极客顾行舟（Gu）撑着伞在雨中等你，后备箱里放着两台最新研发的具身人形机器人原型机。`,
    choices: [
      {
        text: '🦾【全部信托余粮梭哈AI】“我失去的一切，要亲手加倍拿回来！”',
        targetNodeId: 'T_AI_SUCCESS',
        impact: { money: -10000000, wisdom: 30, fame: 30 },
        feedback: '【⚡ 史诗级跃迁！】你已重新杀回《🤖 硅谷科技教皇时间线》！罪徒出狱逆袭万亿巨头的神话拉开序幕！'
      },
      {
        text: '🌲【看透红尘·深山隐退】带上仅存的五百万，远赴落基山脉过安宁岁月',
        targetNodeId: 'T_ZEN_LATE',
        impact: { money: 5000000, happiness: 40, health: 30 },
        feedback: '【⚡ 时间线汇流！】你放下执念，步入《🌲 隐士哲人时间线》，与松涛星空终身相伴。'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 D: 🤖 硅谷科技教皇线 (Tech Sovereign)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_AI_ROOT': {
    id: 'T_AI_ROOT',
    chapter: 'CH04',
    ageRange: '45-48岁',
    timelineName: '🤖 硅谷科技教皇线',
    title: '第四幕：两千万元领投斯坦福具身智能',
    scene: '💻 硅谷帕洛阿尔托 · 宙斯机器人实验室',
    image: '🦾',
    narrative: `你成为新一代具身双足机器人“宙斯”的最大独立控股投资人。
项目需要连续烧钱突破神经电机动力学。这是决定人类走向赛博时代还是研发破产的豪赌。`,
    choices: [
      {
        text: '🚀【追加两千万封顶量产】自建独立核微电网，全速推进量产验证',
        targetNodeId: 'T_AI_SUCCESS',
        impact: { money: -20000000, wisdom: 40, fame: 35 },
        feedback: '【时间线推进！】技术全面贯通！全球科技巨头排队抢购独家代理，奇迹诞生！'
      }
    ]
  },

  'T_AI_SUCCESS': {
    id: 'T_AI_SUCCESS',
    chapter: 'CH04',
    ageRange: '48-55岁',
    timelineName: '🤖 硅谷科技教皇线',
    title: '第五幕：纳斯达克挂牌敲钟·市值冲破千亿美金',
    scene: '🔔 纳斯达克时代广场大屏 · 沸腾的人群',
    image: '👑',
    narrative: `敲钟槌落下的一瞬间，开盘涨幅飙至 420%！公司市值突破千亿美元大关！
你个人的股权账面价值飙升至惊人的 18 亿美元！时代周刊封面将你评为“定义二十一世纪的普罗米修斯”。`,
    choices: [
      {
        text: '🧬【向人类寿命极限宣战】斥资上亿研发端粒重组与赛博逆龄血清',
        targetNodeId: 'T_CYBER_IMMORTAL',
        impact: { money: -50000000, wisdom: 30, health: 30 },
        feedback: '【⚡ 时间线分裂！】你已步入《🧬 赛博永生·基因重组长生时间线》！肉体苦弱，机械飞升与长生药局成为你的新疆域！'
      },
      {
        text: '🏛️【进军国会山·掌控国家科技命脉】利用技术优势介入全球地缘政治',
        targetNodeId: 'T_KINGMAKER_MID',
        impact: { money: -20000000, credit: 40, fame: 40 },
        feedback: '【⚡ 时间线突变！】你已转向步入《🏛️ 华盛顿暗黑权力幕后时间线》！五角大楼将国家算力主权全权交托于你！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 E: 🧬 赛博永生·基因长生线 (Cyber Transhumanist)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_CYBER_IMMORTAL': {
    id: 'T_CYBER_IMMORTAL',
    chapter: 'CH08',
    ageRange: '70-99岁',
    timelineName: '🧬 赛博永生·基因长生线',
    title: '第六幕：阿尔卑斯逆龄血清·战胜衰老与死神',
    scene: '🧪 瑞士阿尔卑斯山麓尖端冷冻生命中心 · 82岁',
    image: '🧬',
    narrative: `八十岁这一年，重病没有击垮你。你签署生死状注入了第一代端粒重组与仿生器官矩阵。
奇迹在监护仪上跳动：你的细胞生理机能回测至 42 岁黄金状态，白发重焕乌黑！同龄的对手相继埋入黄土，而你依然目光锐利。`,
    choices: [
      {
        text: '📜【阅毕全书·开启赛博长生万字史诗大结局】(View Final Chronicle)',
        targetNodeId: null,
        impact: { fame: 60, health: 40 },
        feedback: '全剧终！你战胜了人类千万年以来的达摩克利斯之剑，成为横跨两个世纪的长生教皇！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 F: 🏛️ 华盛顿暗黑权力幕后线 (Washington Kingmaker)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_KINGMAKER_MID': {
    id: 'T_KINGMAKER_MID',
    chapter: 'CH06',
    ageRange: '50-65岁',
    timelineName: '🏛️ 华盛顿暗黑权力幕后线',
    title: '第四幕：两党超级行动委员会·影子造王者',
    scene: '🏛️ 华盛顿特区大都会俱乐部私密雪茄室',
    image: '🥃',
    narrative: `你设立的 Super PAC 政治献金网络已渗透参众两院。
总统大选前夕，两位党派候选人深夜秘密登门拜访，向你呈递下一届内阁财经首脑的提名名单，只为争取你的一张支票背书。`,
    choices: [
      {
        text: '🖋️【敲定内阁人选与免税特许】将自己信任的门生送入财政部与美联储',
        targetNodeId: 'T_KINGMAKER_LATE',
        impact: { money: -30000000, credit: 50, fame: 30 },
        feedback: '【时间线推进！】法案按你的意志修改。你不再需要登上福布斯，因为你掌控着制定财富规则的人！'
      }
    ]
  },

  'T_KINGMAKER_LATE': {
    id: 'T_KINGMAKER_LATE',
    chapter: 'CH09',
    ageRange: '70-99岁',
    timelineName: '🏛️ 华盛顿暗黑权力幕后线',
    title: '第五幕：国会山无冕教皇·百年政治王朝',
    scene: '📜 弗吉尼亚老宅书房 · 总统亲授总统自由勋章',
    image: '🏅',
    narrative: `七十载风云变幻，总统换了十届，而你始终端坐在权力的最中心。
你的家族成为美利坚不可动摇的深层支柱，历史课本上或许隐藏了你的名字，但每一张美元纸币的流向都在你的意志下运转。`,
    choices: [
      {
        text: '📜【阅毕全书·开启权力王朝特稿大结局】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 60 },
        feedback: '全剧终！凡人追逐金钱，大亨追逐权力，而你化身为了权力本身！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 G: 🌲 隐士哲人·山野圣贤线 (Zen Philanthropist)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_ZEN_ROOT': {
    id: 'T_ZEN_ROOT',
    chapter: 'CH02',
    ageRange: '32-45岁',
    timelineName: '🌲 隐士哲人·山野圣贤线',
    title: '第二幕：太浩湖畔木屋与匿名三千助学金',
    scene: '🏡 内华达太浩湖畔松林木屋 · 柴火与清茶',
    image: '🌲',
    narrative: `你退出了所有投行群聊，拉黑了酒肉朋友。在太浩湖畔买下一座简朴木屋，每天劈柴、阅读、看日出。
通过匿名信托，你向全球贫困儿童默默资助了上万所乡村图书馆，从未对外透露过你的名字。`,
    choices: [
      {
        text: '🕊️【设立罕见病免版税科研实验室】用千万资金为穷苦绝症患者研发低成本救命药',
        targetNodeId: 'T_ZEN_LATE',
        impact: { money: -15000000, happiness: 50, karma: 60, health: 25 },
        feedback: '【时间线推进！】药价被你打到平民价！世人不知金主是谁，但无数母亲在深夜病房里合十为你默默祈福！'
      }
    ]
  },

  'T_ZEN_LATE': {
    id: 'T_ZEN_LATE',
    chapter: 'CH09',
    ageRange: '70-99岁',
    timelineName: '🌲 隐士哲人·山野圣贤线',
    title: '第三幕：安详九十九载·时代精神的无上丰碑',
    scene: '🌅 太浩湖夕阳下 · 四世同堂与清澈双眼',
    image: '🕊️',
    narrative: `九十九岁那年，在儿孙与老友轻柔的歌声中，你平静地躺在摇椅上。
你名下的银行账户只留下了维持生活的五万美元，而你拯救过的生命、修建的林场与图书馆如璀璨星辰点亮大地。`,
    choices: [
      {
        text: '📜【阅毕全书·开启文明灯塔特稿大结局】(View Grand Finale)',
        targetNodeId: null,
        impact: { happiness: 60, karma: 60 },
        feedback: '全剧终！大音希声，大象无形。你用金钱完成了人类灵魂最壮丽的救赎！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 H: 🩸 华尔街嗜血大空头线 (Wall Street Bloodhound)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_SHORT_ROOT': {
    id: 'T_SHORT_ROOT',
    chapter: 'CH02',
    ageRange: '32-45岁',
    timelineName: '🩸 华尔街嗜血大空头线',
    title: '第二幕：做空次贷危机·百亿机构轰然爆仓',
    scene: '📈 曼哈顿对冲基金秘密交易室 · 彭博终端荧光',
    image: '📉',
    narrative: `你嗅到了全球房地产次贷与商业银行资产负债表的致命溃疡。
你调动百倍杠杆建立史诗级看跌期权，与华尔街老牌投行展开你死我活的对手盘博弈。`,
    choices: [
      {
        text: '🩸【满仓核按钮清算】在危机爆发当夜无情按压，收割一亿两千万美金现金',
        targetNodeId: 'T_SHORT_LATE',
        impact: { money: 120000000, happiness: -15, fame: 50, credit: -30 },
        feedback: '【时间线推进！】三家百年投行破产清算！你坐在空荡的交易室里喝着冰威士忌，成为全华尔街谈之色变的“黑天鹅收割机”！'
      }
    ]
  },

  'T_SHORT_LATE': {
    id: 'T_SHORT_LATE',
    chapter: 'CH07',
    ageRange: '60-85岁',
    timelineName: '🩸 华尔街嗜血大空头线',
    title: '第三幕：对冲基金终极主宰·华尔街冷血死神',
    scene: '🏦 瑞士苏黎世湖畔私人城堡',
    image: '☠️',
    narrative: `数十年来，无数对冲基金经理在你的做空报告前颤抖爆仓。
你积累了天文数字的财富，但终日只能生活在私人保镖的重重护卫下。你在冰冷的金钱王座上，见证着资本主义最赤裸的贪婪与毁灭。`,
    choices: [
      {
        text: '📜【阅毕全书·开启冷血空头终局特稿】(View Grand Finale)',
        targetNodeId: null,
        impact: { fame: 50 },
        feedback: '全剧终！华尔街将你视作贪婪与恐惧的具象化化身，你的传说至今仍是对冲基金圈的梦魇！'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【时间线分支 I: 📉 至暗破产·绝境东山再起线 (Fallen Phoenix)】
  // ══════════════════════════════════════════════════════════════════════════════
  'T_FALLEN_COMEBACK': {
    id: 'T_FALLEN_COMEBACK',
    chapter: 'CH04',
    ageRange: '45-60岁',
    timelineName: '📉 至暗破产·绝境东山再起线',
    title: '第四幕：城中村地下室重装出发·二次崛起',
    scene: '💻 租来的廉价车库 · 贴满草稿纸的墙壁',
    image: '🔥',
    narrative: `经历了婚变背叛与资产清盘，你重新搬进廉租车库。
你没有沉沦，凭借脑海中数十年的金融实战直觉与代码技能，你带领三名年轻人创立了下一代自动化算力撮合平台。`,
    choices: [
      {
        text: '🚀【斩获首笔三千万风投】五年后再造独角兽，重返福布斯富豪榜',
        targetNodeId: 'T_AI_SUCCESS',
        impact: { money: 30000000, wisdom: 50, reputation: 40, credit: 35 },
        feedback: '【⚡ 史诗级逆风翻盘！】你用无可置疑的铁血战绩向全世界证明：能让你成为亿万富豪的不是运气，而是你本身！'
      }
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

  // 重置时间线
  reset() {
    this.currentNodeId = 'CH01_WIN';
    this.unlockedPath = ['CH01_WIN'];
    this.activeTimelineName = '🌟 命运奇点 · 头奖降临';
  }

  // 获取时间线树状图谱数据 (供 UI 可视化弹窗渲染)
  getGraphVisualizationData() {
    return Object.keys(this.nodes).map(nodeId => {
      const node = this.nodes[nodeId];
      const isCurrent = this.currentNodeId === nodeId;
      const isUnlocked = this.unlockedPath.includes(nodeId);
      return {
        id: node.id,
        chapter: node.chapter,
        age: node.ageRange,
        title: node.title,
        timeline: node.timelineName,
        isCurrent: isCurrent,
        isUnlocked: isUnlocked
      };
    });
  }
}

window.timelineDirector = new TimelineBranchDirector();
