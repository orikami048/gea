/**
 * 完整对齐原版《奖来7000万》的多时间线树状分支命运图谱 (Multi-Timeline Branching Graph Engine)
 * 100% 对应原版核心架构:
 * - 10 大年龄跨度时代 (29岁 ~ 99岁，共3692周)
 * - 真实时间线分水岭:
 *    - 【牢狱服刑时间线 vs 合规大亨时间线】(对照原版 CH03_PRISON)
 *    - 【硅谷AI成功暴赚百倍 vs 研发破产血本无归】(对照原版 CH04_AI_SUCCESS / CH04_AI_LOSS)
 *    - 【原配白头偕老 vs 婚变财产分割再婚】(对照原版 CH04 婚姻重选)
 *    - 【多子女常春藤精英 vs 败家弃子】(对照原版 CH06)
 * - 交互式「命运时间线决策树 (Timeline Tree)」可视化
 */

const TIMELINE_GRAPH_NODES = {
  // ══════════════════════════════════════════════════════════════════════════════
  // 【第一章：29至34岁】中奖兑付、财富知情与人生基石
  // ══════════════════════════════════════════════════════════════════════════════
  'CH01_WIN': {
    id: 'CH01_WIN',
    chapter: 'CH01',
    ageRange: '29-30岁',
    timelineName: '🌟 命运起点 · 头奖诞生',
    title: '第一幕：暴富降临与兑奖抉择',
    scene: '🎰 拉斯维加斯 7-Eleven 彩票总署',
    image: '🎟️',
    narrative: `那张20美元机选的彩票匹配了全部六个号码。
扣税后净现金 5200 万美元静静躺在你的银行账户里。柜台人员递来特大号合影支票，等待你的下一步决定。`,
    choices: [
      {
        text: '🕶️【隐匿身份】设立特拉华匿名信托，严密封锁中奖消息',
        setFact: { wealth_disclosure: 'secret' },
        targetNodeId: 'CH01_SECRET_PATH',
        impact: { money: 0, happiness: 15, fame: -10, karma: 10 },
        feedback: '明智之举！你的真实姓名被严密保护。没有暴发户的聚光灯，你在暗处握住了亿万资本。'
      },
      {
        text: '📸【公开亮相】高举巨型支票召开全球新闻发布会，拥抱顶级流量',
        setFact: { wealth_disclosure: 'public' },
        targetNodeId: 'CH01_PUBLIC_PATH',
        impact: { money: 0, happiness: 20, fame: 50, karma: -10 },
        feedback: '你一夜登上全球各大媒体头条！粉丝暴涨两百万，但随之而来的是无数远房亲友的借款轰炸与骗局邀约。'
      }
    ]
  },

  // ── 分支 1A: 隐秘财富时间线 ──
  'CH01_SECRET_PATH': {
    id: 'CH01_SECRET_PATH',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🌲 隐士崛起线',
    title: '第二幕：借款试亲友与指定伴侣',
    scene: '☕ 故乡小镇老街茶馆',
    image: '🤝',
    narrative: `你隐瞒了千万身家，假称自己在大城市贷款买房需要凑首付，向身边的亲友发去借款测试。
同时，母亲为你安排了相亲，两位不同背景的姑娘走入你的生活。`,
    choices: [
      {
        text: '👰【青梅竹马·苏菲】选择朴实善良的儿时旧识，低调成家相濡以沫',
        setFact: { partner_id: 'sophie_pure', marital_status: 'married' },
        targetNodeId: 'CH02_STABLE_HOME',
        impact: { money: -500000, happiness: 35, romance: 40, reputation: 10 },
        feedback: '苏菲没有在乎你的房子大小，甚至拿出了自己工作攒的存款帮你。婚礼在小镇教堂温馨举行，你体会到了久违的安心。'
      },
      {
        text: '💼【精英学妹·萨拉】选择硅谷常春藤投资总监，强强联合组建家族办公室',
        setFact: { partner_id: 'sarah_elite', marital_status: 'married' },
        targetNodeId: 'CH02_ELITE_HOME',
        impact: { money: -2000000, happiness: 20, wisdom: 25, credit: 30 },
        feedback: '萨拉一眼识破了你的金融布局，两人相视一笑签署了家族信托协议。你们不仅是伴侣，更是横跨投融资的顶级合伙人！'
      }
    ]
  },

  // ── 分支 1B: 名流聚光灯时间线 ──
  'CH01_PUBLIC_PATH': {
    id: 'CH01_PUBLIC_PATH',
    chapter: 'CH01',
    ageRange: '31-34岁',
    timelineName: '🔥 浮华名流线',
    title: '第二幕：比弗利名流圈与名媛婚约',
    scene: '🥂 比弗利山庄四季酒店顶层私董会',
    image: '💎',
    narrative: `公开中奖后，好莱坞名媛、名模和经纪人如同嗅到血腥的鲨鱼蜂拥而至。
名媛“克洛伊”（Chloe）在游艇晚宴上向你举杯，提出两家联姻，但拒绝签署婚前财产协议。`,
    choices: [
      {
        text: '🛡️【铁腕协议】坚决要求签署婚前协议 (Prenup)，不妥协一分财产底线',
        setFact: { partner_id: 'chloe_prenup', marital_status: 'married_prenup' },
        targetNodeId: 'CH02_CELEB_PRENUP',
        impact: { money: -5000000, happiness: 10, fame: 30, credit: 20 },
        feedback: '克洛伊虽不情愿，但最终在金钱诱惑下签署了由顶级律师起草的铁血协议。你保全了财富主权。'
      },
      {
        text: '❤️【盲信真爱】放弃婚前协议，豪掷千万举办世纪奢华婚礼',
        setFact: { partner_id: 'chloe_noprenup', marital_status: 'married_vulnerable' },
        targetNodeId: 'CH02_CELEB_VULNERABLE',
        impact: { money: -15000000, happiness: 30, fame: 50, romance: 20, credit: -10 },
        feedback: '好莱坞全城轰动！世纪婚礼耗资千万，你的奢华登峰造极，但你的半数身家从此埋下了致命隐患。'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【第二章：35至39岁】共同生活与成为父母
  // ══════════════════════════════════════════════════════════════════════════════
  'CH02_STABLE_HOME': {
    id: 'CH02_STABLE_HOME',
    chapter: 'CH02',
    ageRange: '35-39岁',
    timelineName: '🌲 隐士崛起线',
    title: '第三幕：亲生子女与温馨港湾',
    scene: '🏡 湖畔现代庄园 · 儿童房',
    image: '👶',
    narrative: `时光飞逝，你们的长子长女相继诞生。苏菲悉心照料家庭，你们的生活宁静祥和，财富在低调稳健的资产配置中稳步增长。`,
    choices: [
      {
        text: '🎓【重金精英启蒙】设立千万美元家族教育成长基金，聘请私教双语陪伴',
        setFact: { child_plan: 'elite_education' },
        targetNodeId: 'CH03_LAND_DECISION',
        impact: { money: -3000000, wisdom: 20, happiness: 25 },
        feedback: '孩子们在充满爱的氛围中茁壮成长，知书达礼，家庭成为了你最坚不可摧的后盾。'
      }
    ]
  },

  'CH02_ELITE_HOME': {
    id: 'CH02_ELITE_HOME',
    chapter: 'CH02',
    ageRange: '35-39岁',
    timelineName: '💼 资本同盟线',
    title: '第三幕：代际信托与硅谷拓荒',
    scene: '🏢 旧金山泛美金字塔顶层办公室',
    image: '📈',
    narrative: `萨拉为你生下一个聪慧的女儿，同时家族办公室已管理着上亿美元的私募股权头寸。家庭与事业在此深度交融。`,
    choices: [
      {
        text: '🏛️【离岸信托设立】将核心股权打包入开曼不可撤销信托，隔绝代际风险',
        setFact: { child_plan: 'trust_protection' },
        targetNodeId: 'CH03_LAND_DECISION',
        impact: { money: -1500000, credit: 30, wisdom: 25 },
        feedback: '法律架构无懈可击！即便未来面临任何全球动荡，你的后代仍享有终身优渥的生活保障。'
      }
    ]
  },

  'CH02_CELEB_PRENUP': {
    id: 'CH02_CELEB_PRENUP',
    chapter: 'CH02',
    ageRange: '35-39岁',
    timelineName: '🔥 浮华名流线',
    title: '第三幕：名流红毯与代孕继承人',
    scene: '🌴 迈阿密海滩顶层复式套房',
    image: '🥂',
    narrative: `克洛伊不愿影响身材，你们通过瑞士顶级合法医疗机构迎来了继承人。浮华的派对仍在继续，但两人在金钱上的距离感始终存在。`,
    choices: [
      {
        text: '🛥️【购置深海游艇】维持名流体面，进入跨国商业与土地诱惑阶段',
        setFact: { child_plan: 'surrogate_heir' },
        targetNodeId: 'CH03_LAND_DECISION',
        impact: { money: -8000000, fame: 20, happiness: 10 },
        feedback: '金钱维系着光鲜的外壳，但你的注意力已逐渐转向更大的资本猎场。'
      }
    ]
  },

  'CH02_CELEB_VULNERABLE': {
    id: 'CH02_CELEB_VULNERABLE',
    chapter: 'CH02',
    ageRange: '35-39岁',
    timelineName: '⚠️ 危机潜伏线',
    title: '第三幕：挥霍无度与裂痕初现',
    scene: '🛍️ 巴黎蒙田大道奢侈品店',
    image: '💔',
    narrative: `没有婚前协议的约束，克洛伊花钱如流水，年开销冲上千万。在孩子出生的第二年，你发现她与好莱坞制片人往来甚密，且暗中在转移资产。`,
    choices: [
      {
        text: '🕵️【雇佣私人侦探搜集证据】暗中收缩权限，准备迎接硬仗',
        setFact: { child_plan: 'fragile_marriage' },
        targetNodeId: 'CH03_LAND_DECISION',
        impact: { money: -500000, wisdom: 15, happiness: -20 },
        feedback: '危机感笼罩了你。你开始意识到，没有制度约束的金钱，是一场迟早降临的灾难。'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【第三章：40至44岁】重大时间线分水岭：土地诱惑与牢狱分流 (对照原版 CH03_PRISON)
  // ══════════════════════════════════════════════════════════════════════════════
  'CH03_LAND_DECISION': {
    id: 'CH03_LAND_DECISION',
    chapter: 'CH03',
    ageRange: '40-42岁',
    timelineName: '⚖️ 命运十字路口 · 牢狱分水岭',
    title: '第四幕：百亿深海油气土地招标与回扣诱惑',
    scene: '⚓ 欧洲地中海港口秘密私董会',
    image: '🛢️',
    narrative: `四十岁这一年，你面临人生最大的一次商业跃升机会——某沿海主权国出让价值百亿美元的深海油气管网与土地独家承包权。
当地主管官员赵长官深夜私下递给你一份手写协议：“只要私下转入我们离岸基金 2000 万美元回扣干股，项目直接内定给你，保底十年赚十亿。”`,
    choices: [
      {
        text: '🩸【铤而走险·输送回扣】签署秘密协议，调集离岸黑金拿下项目',
        setFact: { prison_convict: true },
        targetNodeId: 'CH03_PRISON_TIMELINE',
        impact: { money: -20000000, credit: -50, fame: -40, karma: -50 },
        feedback: '【⚠️ 致命抉择 · 踩中世纪雷区！】你以为万无一失，却不知该官员早已被国际刑警与反贪局秘密立案调查！'
      },
      {
        text: '🏛️【拒绝受贿·走阳光公开竞标】联手联合国绿色基金，以公开透明水土治理方案竞标',
        setFact: { prison_convict: false },
        targetNodeId: 'CH03_TITAN_TIMELINE',
        impact: { money: -10000000, credit: 40, reputation: 50, karma: 40 },
        feedback: '【🌟 正道荣光！】你断然拒绝了受贿提议。半年后该官员东窗事发被捕入狱，而你凭借无懈可击的环保方案赢得国际社会赞誉，合法拿下特许经营权！'
      }
    ]
  },

  // ── 【牢狱服刑 5 年时间线】 (100% 对照原版 CH03_PRISON) ──
  'CH03_PRISON_TIMELINE': {
    id: 'CH03_PRISON_TIMELINE',
    chapter: 'CH03',
    ageRange: '42-45岁',
    timelineName: '⛓️ 牢狱服刑时间线 (Federal Prison)',
    title: '第五幕：手写协议被查·判处服刑五年',
    scene: '🔒 纽约联邦惩教中心 (MCC New York) · 铁窗与高墙',
    image: '⛓️',
    narrative: `手写协议被曝光，国际反腐巨网收拢。
法槌重重落下：因跨国商业贿赂与洗钱罪，你被判处联邦监狱服刑五年，罚没三千万美元非法所得。
铁门在你身后沉重关上。昔日亿万富翁，如今只剩胸口冰冷的囚徒编号【#89413】。
服刑期间，监狱长发现你曾是顶级量化天才，让你在医务室负责协助监狱基金税务。`,
    choices: [
      {
        text: '🧘【铁窗苦修·重构心智】在狱中研读量子计算与脑科学，暗中推演下一代AI架构',
        targetNodeId: 'CH04_POST_PRISON_REENTRY',
        impact: { money: 0, wisdom: 40, health: -15, reputation: -20 },
        feedback: '高墙困住了你的肉体，却淬炼了你的灵魂。五年的屈辱与清苦，让你褪去了浮躁，成为真正冷酷而精深的洞察者。'
      }
    ]
  },

  // ── 【阳光实业财阀时间线】 (合规成功路线) ──
  'CH03_TITAN_TIMELINE': {
    id: 'CH03_TITAN_TIMELINE',
    chapter: 'CH03',
    ageRange: '42-45岁',
    timelineName: '🏰 实业财阀时间线 (Green Energy Mogul)',
    title: '第五幕：绿色能源管道通气与名望登顶',
    scene: '🌍 联合国可持续发展峰会 · 日内瓦',
    image: '⚡',
    narrative: `地中海管网顺利通气，源源不断输送清洁能源，每年为你贡献数千万美元净现金流。
你以“商业向善、兼济天下”的形象登上时代周刊封面，成为欧美政商界备受推崇的工业巨擎。`,
    choices: [
      {
        text: '🚀【进军前沿硬科技】携滚滚现金流，进入下一代通用人工智能 (AGI) 军备竞赛',
        targetNodeId: 'CH04_AI_INVESTMENT',
        impact: { money: 20000000, reputation: 30, credit: 30 },
        feedback: '实业现金流如蓄水池般充沛！你手握巨资，站在了人类科技革命的最前沿。'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【第四章：45至49岁】硅谷机器人投资与婚姻重组 (对照原版 CH04_AI_SUCCESS / CH04_AI_LOSS)
  // ══════════════════════════════════════════════════════════════════════════════
  'CH04_POST_PRISON_REENTRY': {
    id: 'CH04_POST_PRISON_REENTRY',
    chapter: 'CH04',
    ageRange: '46岁',
    timelineName: '⛓️ 涅槃出狱线',
    title: '第六幕：刑满释放·重返残破的世界',
    scene: '🚪 联邦监狱铁门外 · 细雨霏霏',
    image: '🌧️',
    narrative: `五年刑期结束，铁门在你身后轰然开启。
外面的世界已天翻地覆。若是此前未签署婚前协议的伴侣，早已在你入狱第二年卷款提出离婚；而你仅存的信托资产依然为你守住了最后两千万筹码。
老友兼极客顾行舟（Gu）撑着黑伞站在雨中等你，他的后备箱里装着一台双足人形机器人原型机。`,
    choices: [
      {
        text: '🦾【全部残余身家梭哈AI】“我失去的，必须用未来拿回来！”投资机器人',
        targetNodeId: 'CH04_AI_SUCCESS',
        impact: { money: -15000000, wisdom: 30, fame: 20 },
        feedback: '破釜沉舟！在所有人视你为刑满释放废人时，你用最后的血本押注了人类未来最硬核的赛道！'
      }
    ]
  },

  'CH04_AI_INVESTMENT': {
    id: 'CH04_AI_INVESTMENT',
    chapter: 'CH04',
    ageRange: '46岁',
    timelineName: '🏰 实业财阀时间线',
    title: '第六幕：硅谷具身智能千万天使轮',
    scene: '🤖 斯坦福人工智能实验室战情室',
    image: '🦾',
    narrative: `天才科学家顾行舟向你展示了新一代具身智能机器人“宙斯”原型机。
项目需要两千万元独立领投资金。这是一场要么单日归零、要么催生出万亿科技寡头的豪赌。`,
    choices: [
      {
        text: '🚀【两千万全资领投】拿下 45% 股权与独家商业化专利授权',
        targetNodeId: 'CH04_AI_SUCCESS',
        impact: { money: -20000000, wisdom: 30, fame: 25 },
        feedback: '投资协议签署完毕。你成为全球顶尖具身机器人公司的控股董事！'
      },
      {
        text: '🛑【谨慎拒绝·留存现金】不愿冒险，继续稳守传统能源与商业写字楼收租',
        targetNodeId: 'CH04_AI_LOSS',
        impact: { money: 0, happiness: 10, credit: 15 },
        feedback: '你选择了保守防御。错过了科技爆发的火箭，但也规避了技术迭代初期的暴风雨。'
      }
    ]
  },

  // ── 【AI 爆发成为科技教皇时间线】 ──
  'CH04_AI_SUCCESS': {
    id: 'CH04_AI_SUCCESS',
    chapter: 'CH04',
    ageRange: '47-49岁',
    timelineName: '🤖 硅谷科技教皇线 (Tech Sovereign)',
    title: '第七幕：机器人量产震撼世界·市值破千亿',
    scene: '🔔 纳斯达克时代广场敲钟大厅',
    image: '👑',
    narrative: `奇迹发生了！具身智能机器人顺利通过图灵商用测试，五角大楼、亚马逊与特斯拉争相采购！
公司在纳斯达克挂牌上市，首日暴涨 400%，市值突破千亿美元！
你个人的账面净资产暴涨至 15 亿美元，昔日无论是商海浮沉还是牢狱之灾，都在这一刻被写成了传奇教科书！`,
    choices: [
      {
        text: '🏛️【构建百年家族传承】步入五十岁知天命之年，全面谋篇布局代际治理',
        targetNodeId: 'CH05_FAMILY_GOVERNANCE',
        impact: { money: 150000000, fame: 50, reputation: 50 },
        feedback: '时代周刊将你列为全球最具影响力的百大人物之首！你站在了人类商业文明的最巅峰！'
      }
    ]
  },

  // ── 【稳健中产/传统守成时间线】 ──
  'CH04_AI_LOSS': {
    id: 'CH04_AI_LOSS',
    chapter: 'CH04',
    ageRange: '47-49岁',
    timelineName: '🏰 稳健老钱家族线 (Quiet Aristocrat)',
    title: '第七幕：错失风口·但家庭安详守成',
    scene: '🏡 汉普顿私人海滩庄园',
    image: '🌊',
    narrative: `虽然你没有赶上AI暴富的造神运动，但你的固定资产、商铺租金与债券组合稳健如山。
你远离了二级市场的惊涛骇浪，在儿女环绕与海风吹拂中平稳步入知天命之年。`,
    choices: [
      {
        text: '☕【从容安度晚年】将精力聚焦在子女教育、亲人陪伴与慈善修养',
        targetNodeId: 'CH05_FAMILY_GOVERNANCE',
        impact: { money: 5000000, happiness: 30, health: 15 },
        feedback: '平淡是真。在无数激进投机者破产跳楼的周期里，你的稳健让全家人享有恒久尊严。'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // 【第五章至第十章：50至99岁】家族传承、长生药局与3692周终局长卷 (对照原版 CH05-CH10)
  // ══════════════════════════════════════════════════════════════════════════════
  'CH05_FAMILY_GOVERNANCE': {
    id: 'CH05_FAMILY_GOVERNANCE',
    chapter: 'CH05',
    ageRange: '50-69岁',
    timelineName: '🏛️ 家族治理与代际传承',
    title: '第八幕：父母长眠、子女成家与景区名望',
    scene: '🌲 故乡山麓 · 家族永久生态陵园与慈善医院',
    image: '🕯️',
    narrative: `五十至六十岁这二十年间，至亲父母相继安详离世。你依照他们朴素的遗愿修建了惠及全镇的公益医院与生态公园。
你的长子从麻省理工毕业自主创办卫星通讯公司，女儿则成为顶尖公益法律专家。家族的枝叶已繁茂蔽日。`,
    choices: [
      {
        text: '🧬【踏入古稀之年】面对衰老挑战，探索深海端粒与逆龄长寿科研',
        targetNodeId: 'CH08_LONGEVITY_TEST',
        impact: { money: -30000000, wisdom: 20, health: 10 },
        feedback: '财富已经不再是数字游戏。你将目光投向了人类最终的敌人——衰老与时间。'
      }
    ]
  },

  'CH08_LONGEVITY_TEST': {
    id: 'CH08_LONGEVITY_TEST',
    chapter: 'CH08',
    ageRange: '70-89岁',
    timelineName: '🧬 终极长生与晚年照护',
    title: '第九幕：重病考验、长生血清与精神圆满',
    scene: '🏔️ 瑞士阿尔卑斯山麓尖端医疗中心 · 78岁',
    image: '🧪',
    narrative: `七十多岁时，严重的器官老化向你发出最后通牒。私人医疗集团为你提供了合规的器官修复手术与尖端端粒重组血清。
躺在病床上，窗外是巍峨的雪山与晚霞。伴侣紧紧握着你的手，床边摆满了四世同堂的合影。`,
    choices: [
      {
        text: '🕊️【平静受老·签署生前预嘱】拒绝无意义的插管创伤，以尊严和爱安享终局',
        targetNodeId: 'CH10_GRAND_FINALE',
        impact: { happiness: 50, karma: 50, health: 20 },
        feedback: '你获得了超越肉体的崇高宁静。所有的掠夺与拼杀都已归于尘土，留下的唯有对生命深深的感恩。'
      }
    ]
  },

  'CH10_GRAND_FINALE': {
    id: 'CH10_GRAND_FINALE',
    chapter: 'CH10',
    ageRange: '90-99岁 (第3692周)',
    timelineName: '👑 3692周终局 · 人生万字史诗长卷',
    title: '第十幕：九十九岁固定终局·人生纪念册封卷',
    scene: '📜 历史的回廊 · 100岁人生总结长卷',
    image: '🌟',
    narrative: `第七十一载岁月，整整三千六百九十二个星期，在此刻画上圆满句号。
从二十九岁那张二十美元的彩票，到布鲁克林的深渊徘徊，再到地中海管网、纳斯达克敲钟、甚至联邦铁窗里的沉思……
你的一生，是真正超越了平庸、在无数次时间线分叉中由你亲手缔造的史诗。`,
    choices: [
      {
        text: '📜【阅毕全书·开启人生特稿大结局】(View Final Chronicle)',
        targetNodeId: null, // 触发终局弹窗
        impact: { money: 0 },
        feedback: '全剧终。时代周刊永远铭刻下你的名字。'
      }
    ]
  }
};

class TimelineBranchDirector {
  constructor() {
    this.nodes = TIMELINE_GRAPH_NODES;
    this.currentNodeId = 'CH01_WIN';
    this.unlockedPath = ['CH01_WIN'];
    this.activeTimelineName = '🌟 命运起点 · 头奖诞生';
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
    this.activeTimelineName = '🌟 命运起点 · 头奖诞生';
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
