/**
 * 欧美爆款剧情决策引擎 (Story Engine)
 * 游戏名称: Winning $100M: Second Life Begins (中彩票1亿美元之后的人生启动)
 */
const STORY_CHAPTERS = [
  {
    id: 'ch1',
    chapterTitle: 'CHAPTER 1: The Winning Ticket (一枪爆中头奖)',
    scene: '🎰 Gas Station in Las Vegas',
    narrative: `You were working a soul-crushing $16/hr shift at an Amazon fulfillment center, drowned in $45,000 student loan debt. On a rainy Tuesday night, you spent your last $20 on a Powerball ticket at a 7-Eleven.
    
The winning numbers flashed on TV... 07 - 14 - 21 - 33 - 58 | Powerball 12.
YOUR TICKET MATCHED ALL SIX.
The prize pool: **$100,000,000.00**.
The lottery commission asks for your decision on how to claim:`,
    image: '🎟️',
    choices: [
      {
        text: '💰 Take the Lump Sum Cash Option ($52,000,000 after 37% Federal + State taxes)',
        impact: { money: 52000000, happiness: 30, fame: 20, karma: 0 },
        feedback: 'You walked out of the lottery office with $52 Million cold hard cash in your bank account! You are instantly in the top 0.1% richest Americans.'
      },
      {
        text: '📅 Take the 30-Year Annuity ($3,333,333 per year guaranteed payout)',
        impact: { money: 3333333, happiness: 15, fame: 5, karma: 10 },
        feedback: 'A conservative, bankruptcy-proof choice! You received your first year payout of $3.33M. Stable and disciplined.'
      }
    ]
  },
  {
    id: 'ch2',
    chapterTitle: 'CHAPTER 2: The Identity Crisis (匿名还是公开)',
    scene: '⚖️ High-Profile Attorney Office',
    narrative: `Under state law, your name is about to become public record unless you form an anonymous blind trust.
Suddenly, your phone blows up with 342 missed calls from high school bullies, distant "cousins" you never met, and financial advisors offering high-risk crypto schemes.
What is your move?`,
    image: '🕶️',
    choices: [
      {
        text: '🥷 Hire an elite legal team to claim via a Blind Delaware Trust ($250,000 fee)',
        impact: { money: -250000, happiness: 25, fame: -10, karma: 10 },
        feedback: 'Smart move! Your real identity remains secret. The paparazzi are clueless, and you enjoy peaceful luxury.'
      },
      {
        text: '📸 Hold a massive press conference and show off the giant novelty check!',
        impact: { money: 0, happiness: 10, fame: 50, karma: -10 },
        feedback: 'Boom! You became an overnight TikTok and Twitter viral celebrity with 2 million followers. But your DMs are flooded with beggars and gold diggers.'
      }
    ]
  },
  {
    id: 'ch3',
    chapterTitle: 'CHAPTER 3: Beverly Hills Luxury (豪宅与顶级超跑)',
    scene: '🌴 Sunset Boulevard, Los Angeles',
    narrative: `You can finally leave your moldy studio apartment. A luxury real estate broker presents you with dream properties in Los Angeles and Miami.
Where will you build your fortress of solitude?`,
    image: '🏰',
    choices: [
      {
        text: '🏰 Buy a 12,000 sq ft Mega-Mansion in Bel-Air ($18,500,000 + $200k/yr maintenance)',
        impact: { money: -18500000, happiness: 35, fame: 25, karma: 0 },
        feedback: 'Infinity pool overlooking Los Angeles skyline, 8-car subterranean garage, private cinema. You feel like Tony Stark.'
      },
      {
        text: '🛥️ Buy a waterfront penthouse in Miami Beach + 80ft Sunseeker Yacht ($12,000,000)',
        impact: { money: -12000000, happiness: 40, fame: 30, karma: -5 },
        feedback: 'Sun, ocean breeze, and non-stop VIP beach clubs. You are living the Grand Theft Auto dream!'
      },
      {
        text: '🏡 Buy a tasteful modern lakeside retreat in Lake Tahoe ($4,500,000)',
        impact: { money: -4500000, happiness: 20, fame: -5, karma: 15 },
        feedback: 'Cozy, serene, surrounded by pines and crystal clear water. Pure tranquility.'
      }
    ]
  },
  {
    id: 'ch4',
    chapterTitle: 'CHAPTER 4: The Gold Digger Dilemma (名媛与爱情考验)',
    scene: '🥂 Rooftop Lounge in Manhattan',
    narrative: `At a private charity gala in New York, you meet "Chloe", a stunning swimsuit model and socialite. She seems deeply fascinated by your "charm and visionary soul".
After 3 months of whirlwind romance, she hints at getting married, but strongly opposes signing a Prenuptial Agreement (婚前协议), calling it "a lack of trust".
How do you respond?`,
    image: '💍',
    choices: [
      {
        text: '🛡️ "No Prenup, No Wedding. Period." (Ironclad Prenup or Walk Away)',
        impact: { money: 0, happiness: 10, fame: 0, karma: 10 },
        feedback: 'She threw a tantrum and left. Two weeks later, TMZ reported she moved on to an NFL quarterback. You just saved half your fortune!'
      },
      {
        text: '❤️ Sign without Prenup: "True love has no price tag"',
        impact: { money: -15000000, happiness: -30, fame: 15, karma: -10 },
        feedback: 'Disaster! Two years later she filed for divorce. The court awarded her $15 Million settlement plus alimony. A brutal lesson in high-stakes romance.'
      }
    ]
  },
  {
    id: 'ch5',
    chapterTitle: 'CHAPTER 5: Wall Street & Silicon Valley (资本帝国运作)',
    scene: '📈 Private Wealth Management Office',
    narrative: `Sitting on tens of millions of idle cash will let inflation eat your wealth.
Your financial advisory presents three distinct investment opportunities:`,
    image: '💼',
    choices: [
      {
        text: '🤖 Lead Angel Round in a cutting-edge Silicon Valley AI Robotics Startup ($10,000,000)',
        impact: { money: -10000000, happiness: 20, fame: 30, karma: 15, futureReward: 35000000 },
        feedback: 'Massive success! 18 months later, the company secured Series B led by Sequoia at a $1.2B valuation! Your stake is now worth $35,000,000!'
      },
      {
        text: '📊 Safe Haven: Allocate into US Treasury Bonds & S&P 500 Index ($20,000,000 at 6% yield)',
        impact: { money: 1200000, happiness: 15, fame: 0, karma: 10 },
        feedback: 'The ultimate sleep-well-at-night strategy. Generating $1,200,000 in passive annual interest risk-free!'
      },
      {
        text: '💎 All-in High Leverage Crypto & Meme Coins ($15,000,000)',
        impact: { money: -12000000, happiness: -40, fame: 10, karma: -20 },
        feedback: 'The crypto exchange got hacked and rug-pulled! You lost $12,000,000 in 48 hours. Wall Street bets are unforgiving.'
      }
    ]
  },
  {
    id: 'ch6',
    chapterTitle: 'CHAPTER 6: The Legacy & Endgame (传奇落幕与人生终章)',
    scene: '🏛️ Global Philanthropy Summit, Geneva',
    narrative: `You have tasted every luxury on earth—supercars, superyachts, private jets, and Michelin-star dining.
Now in your 40s, how do you want the history books to remember you?`,
    image: '👑',
    choices: [
      {
        text: '🌍 Endow a $20M Clean Water & Medical Foundation in developing nations',
        impact: { money: -20000000, happiness: 50, fame: 60, karma: 100 },
        feedback: 'You saved over 200,000 lives. Time Magazine names you Philanthropist of the Year. A true legendary legacy.'
      },
      {
        text: '🏎️ Buy a Formula 1 Racing Team and travel the world racing tracks',
        impact: { money: -25000000, happiness: 45, fame: 80, karma: 0 },
        feedback: 'Pure adrenaline and dopamine! Your team won the Monaco Grand Prix, and your life was a blockbuster movie.'
      }
    ]
  }
];
