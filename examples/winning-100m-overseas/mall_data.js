/**
 * 欧美奢华商城与资产目录 (ConsumerMallCatalog)
 * 对照原版 core.ConsumerAssets & data.ConsumerMallCatalog 100% 完整复刻
 * 包含四大分类 (house, car, yatch_moto, lux)
 * 具备原版真实物理折旧算法参数 (depreciation / collectible / market) 与五维加成 buff
 */
const MALL_CATEGORIES = [
  { id: 'all', labelZh: '全部商品', labelEn: 'All Assets' },
  { id: 'house', labelZh: '🏰 豪宅地产', labelEn: 'Real Estate' },
  { id: 'car', labelZh: '🏎️ 超跑名车', labelEn: 'Supercars' },
  { id: 'yacht_moto', labelZh: '🛥️ 游艇重机', labelEn: 'Yachts & Aviation' },
  { id: 'lux', labelZh: '💎 臻品名表', labelEn: 'Luxury Collectibles' }
];

const MALL_ITEMS = [
  // ── 1. 豪宅地产 (Real Estate) ──────────────────────────────────
  {
    id: 'house_city_2br',
    category: 'house',
    nameZh: '曼哈顿精品高层两居室',
    nameEn: 'Manhattan Skyline 2BR Condo',
    price: 1850000,
    cls: 'market',
    icon: '🏙️',
    specs: [
      { kZh: '面积', kEn: 'Size', vZh: '140㎡ 挑高大平层', vEn: '1,500 sq ft' },
      { kZh: '地段', kEn: 'Location', vZh: '曼哈顿中城中央公园旁', vEn: 'Midtown Manhattan' },
      { kZh: '景观', kEn: 'View', vZh: '全景落地天际线视野', vEn: 'Central Park Views' }
    ],
    descZh: '你的第一处独立私密住所。从合租地下室，到关上门属于自己的顶级避风港。',
    descEn: 'Your premier luxury residence. Leaving rented rooms behind for your own private sanctuary.',
    buff: { wisdom: 2, reputation: 3, romance: 4 }
  },
  {
    id: 'house_beverly_villa',
    category: 'house',
    nameZh: '比弗利山庄超级庄园',
    nameEn: 'Bel-Air Mega Mansion',
    price: 18500000,
    cls: 'market',
    icon: '🏰',
    specs: [
      { kZh: '占地', kEn: 'Lot Size', vZh: '12,000 平方英尺庄园', vEn: '12,000 sq ft Estate' },
      { kZh: '车库', kEn: 'Garage', vZh: '8 车位恒温地下车库', vEn: '8-Car Subterranean' },
      { kZh: '配套', kEn: 'Amenities', vZh: '无边悬崖泳池·私人影院', vEn: 'Infinity Pool & Cinema' }
    ],
    descZh: '好莱坞巨星同款地标级庄园，洛杉矶全城夜景尽收眼底。',
    descEn: 'Iconic architectural estate overlooking the entire Los Angeles basin.',
    buff: { wisdom: 5, reputation: 15, romance: 10 }
  },
  {
    id: 'house_miami_penthouse',
    category: 'house',
    nameZh: '迈阿密海滩顶层复式海景套房',
    nameEn: 'Miami Beach Oceanfront Penthouse',
    price: 8500000,
    cls: 'market',
    icon: '🏖️',
    specs: [
      { kZh: '楼层', kEn: 'Floor', vZh: '54层顶楼带私人直升机坪', vEn: 'Top Floor with Helipad' },
      { kZh: '露台', kEn: 'Terrace', vZh: '360° 大西洋无死角海景', vEn: '360° Ocean Panorama' }
    ],
    descZh: '推开落地窗就是大西洋暖风与游艇码头，永不落幕的度假胜地。',
    descEn: 'Ocean breeze and azure waves at your doorstep. The ultimate tropical retreat.',
    buff: { health: 5, reputation: 8, romance: 12 }
  },

  // ── 2. 超跑名车 (Supercars & Exotics) ──────────────────────────
  {
    id: 'car_bmw_320li',
    category: 'car',
    nameZh: '宝马 3系 M运动版',
    nameEn: 'BMW 330i M Sport',
    price: 48000,
    cls: 'car_mainstream',
    icon: '🚗',
    specs: [
      { kZh: '动力', kEn: 'Engine', vZh: '2.0T 涡轮增压 255马力', vEn: '2.0L Turbo 255 HP' },
      { kZh: '驱动', kEn: 'Drivetrain', vZh: '前置后驱 纯粹驾驶', vEn: 'RWD Performance' }
    ],
    descZh: '钥匙握在手里的踏实感。以前只能看着别人开走，今天终于轮到你。',
    descEn: 'The first sporty ride you can truly call your own. The road ahead is yours.',
    buff: { reputation: 1, romance: 2 }
  },
  {
    id: 'car_porsche_911',
    category: 'car',
    nameZh: '保时捷 911 GT3 RS',
    nameEn: 'Porsche 911 GT3 RS',
    price: 245000,
    cls: 'car_super',
    icon: '🏎️',
    specs: [
      { kZh: '引擎', kEn: 'Engine', vZh: '4.0L 水平对置六缸自然吸气', vEn: '4.0L Naturally Aspirated' },
      { kZh: '零百', kEn: '0-60 mph', vZh: '3.0 秒 赛道利器', vEn: '3.0s Track Monster' }
    ],
    descZh: '纽博格林赛道传奇，高转速自然吸气的轰鸣是最好的减压药。',
    descEn: 'Pure motorsport engineering. High-revving thrills that turn heads everywhere.',
    buff: { reputation: 6, romance: 6, wisdom: 2 }
  },
  {
    id: 'car_ferrari_sf90',
    category: 'car',
    nameZh: '法拉利 SF90 Stradale',
    nameEn: 'Ferrari SF90 Stradale',
    price: 650000,
    cls: 'car_super',
    icon: '🏎️',
    specs: [
      { kZh: '马力', kEn: 'Horsepower', vZh: '1000 匹混动超跑', vEn: '1,000 HP Hybrid V8' },
      { kZh: '极速', kEn: 'Top Speed', vZh: '340 km/h', vEn: '211 mph' }
    ],
    descZh: '跃马旗舰，当这辆血红色的超级机器停在比弗利酒店门口，无人敢直视。',
    descEn: 'The pinnacle of Italian craftsmanship. Absolute dominance on the boulevard.',
    buff: { reputation: 12, romance: 10 }
  },
  {
    id: 'car_rolls_phantom',
    category: 'car',
    nameZh: '劳斯莱斯 幻影 长轴距版',
    nameEn: 'Rolls-Royce Phantom EWB',
    price: 580000,
    cls: 'car_premium',
    icon: '🚘',
    specs: [
      { kZh: '车顶', kEn: 'Headliner', vZh: '星空流星车顶', vEn: 'Starlight Headliner' },
      { kZh: '后排', kEn: 'Rear Cabin', vZh: '香槟冷藏柜·航空按摩椅', vEn: 'Executive Suite & Fridge' }
    ],
    descZh: '顶级资本家的移动殿堂，静谧得甚至能听见机械手表的滴答声。',
    descEn: 'The undisputed king of luxury. Serene silence while the chauffeur drives.',
    buff: { reputation: 15, credit: 15, wisdom: 3 }
  },

  // ── 3. 游艇与奢华出行 (Yachts & Aviation) ──────────────────────
  {
    id: 'yacht_sunseeker_88',
    category: 'yacht_moto',
    nameZh: '圣汐 88英尺 豪华飞桥游艇',
    nameEn: 'Sunseeker 88ft Ocean Yacht',
    price: 7800000,
    cls: 'yacht',
    icon: '🛥️',
    specs: [
      { kZh: '长度', kEn: 'Length', vZh: '26.3 米 双层甲板', vEn: '88 ft Tri-Deck' },
      { kZh: '承载', kEn: 'Capacity', vZh: '配备4名全职船员与管家', vEn: '4 Full-time Crew' }
    ],
    descZh: '在加勒比海与地中海自由穿梭，真正的私人浮动五星级酒店。',
    descEn: 'Sail the Caribbean and Mediterranean at will. Your private palace on water.',
    buff: { health: 4, reputation: 14, romance: 15 }
  },
  {
    id: 'jet_gulfstream_g650',
    category: 'yacht_moto',
    nameZh: '湾流 G650ER 洲际私人公务机',
    nameEn: 'Gulfstream G650ER Private Jet',
    price: 25000000,
    cls: 'aviation',
    icon: '✈️',
    specs: [
      { kZh: '航程', kEn: 'Range', vZh: '13,890 公里 不经停直飞全球', vEn: '7,500 NM Non-stop' },
      { kZh: '客舱', kEn: 'Cabin', vZh: '主卧大床套房·百兆星链网络', vEn: 'Stateroom & Starlink' }
    ],
    descZh: '告别排队与安检。世界任何一个角落，只要你想，随时起飞。',
    descEn: 'Skip airport lines forever. Time is the only luxury money cannot buy—until now.',
    buff: { reputation: 25, credit: 20, wisdom: 8 }
  },

  // ── 4. 臻品名表与收藏 (Luxury Collectibles) ─────────────────────
  {
    id: 'lux_phone_iphone_x',
    category: 'lux',
    nameZh: '定制钛金高定手机',
    nameEn: 'Custom Titanium Flagship Phone',
    price: 3500,
    cls: 'digital',
    icon: '📱',
    specs: [
      { kZh: '材质', kEn: 'Material', vZh: '航天级五级钛合金外壳', vEn: 'Grade 5 Aerospace Titanium' }
    ],
    descZh: '一件以前舍不得买的好物。这次，你终于没有把它放回货架。',
    descEn: 'A luxury gadget you once stared at through store windows. Today, you take it home.',
    buff: { wisdom: 1, reputation: 1 }
  },
  {
    id: 'lux_rolex_daytona',
    category: 'lux',
    nameZh: '劳斯绿金迪通拿机械腕表',
    nameEn: 'Rolex Daytona Green Dial Gold',
    price: 85000,
    cls: 'collectible',
    icon: '⌚',
    specs: [
      { kZh: '材质', kEn: 'Gold', vZh: '18K 黄金铸造机芯', vEn: '18K Yellow Gold' },
      { kZh: '保值', kEn: 'Value', vZh: '全球硬通货 拍卖行溢价率极高', vEn: 'High Secondary Liquidity' }
    ],
    descZh: '腕间沉甸甸的黄金质感，硬通货中的硬通货。',
    descEn: 'The definitive luxury timepiece recognized by bankers and collectors worldwide.',
    buff: { reputation: 6, credit: 6, romance: 4 }
  },
  {
    id: 'lux_hermes_birkin',
    category: 'lux',
    nameZh: '爱马仕 喜马拉雅 铂金包',
    nameEn: 'Hermès Birkin Himalaya Niloticus',
    price: 160000,
    cls: 'collectible',
    icon: '👜',
    specs: [
      { kZh: '工艺', kEn: 'Craft', vZh: '尼罗鳄皮 渐变白色染制', vEn: 'Niloticus Crocodile Matte' },
      { kZh: '配货', kEn: 'Rarity', vZh: '顶级 VIP 限量定制款', vEn: 'Extremely Rare Collector Spec' }
    ],
    descZh: '名媛社交圈的通行证。送出它的那一刻，所有防线迎刃而解。',
    descEn: 'The holy grail of haute couture. Opens doors in high-society salons instantly.',
    buff: { romance: 10, reputation: 8 }
  }
];

/**
 * 资产折旧与二手回收算法 (100% 对照原版 core.ConsumerAssets 计算模型)
 * - 汽车数码: 首年落地折 85%，每年递减 15%，地板残值 20%
 * - 收藏品: 名表名包具有保值抗跌性，随年份小幅波动
 * - 房产: 长期复合增长稳步增值
 */
function calculateAssetCurrentValue(item, yearsOwned) {
  if (yearsOwned <= 0) return item.price;

  if (item.cls === 'car_mainstream' || item.cls === 'car_super' || item.cls === 'digital') {
    // 汽车/数码折旧模型
    const landing = 0.85;
    const yearlyRate = 0.85;
    const floor = 0.20;
    const decayed = landing * Math.pow(yearlyRate, yearsOwned - 1);
    return Math.round(item.price * Math.max(floor, decayed));
  } else if (item.cls === 'collectible') {
    // 收藏品微幅保值升值模型 (每年约 3%~5% 增值)
    return Math.round(item.price * Math.pow(1.035, yearsOwned));
  } else if (item.cls === 'market') {
    // 房产地产升值模型 (平均每年 4% 复合增长)
    return Math.round(item.price * Math.pow(1.04, yearsOwned));
  }
  return item.price;
}
