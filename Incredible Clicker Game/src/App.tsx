import { useState, useEffect, useRef } from 'react';
import svgPaths from "./imports/svg-r7bx4ugo4u";
import imgImage14 from "figma:asset/7b489ef911a559e9d5017f8c48365ec799847d82.png";
import imgVolcanPlatforme1 from "figma:asset/ec7ab8f9fa58f7193aaa895a8d9400aadcf77bf3.png";
import imgImageSansArrierePlan106 from "figma:asset/d817d51d8c65a58f62152aeb29a562fb30ab0925.png";
import imgImageRemoveBackground111 from "figma:asset/c5afaed560bcd9d142288c07c758129f3451cde7.png";
import imgRectangle from "figma:asset/f2eab569c7177e5b710c28b58f84001754fb1cae.png";
import imgDisk01 from "figma:asset/57f6cad8499661b0ab7840623ffe0d06ddcbb26c.png";
import imgDisk02 from "figma:asset/92f38e861872ad38e90c583b7049f81feeca88b9.png";
import imgDisk03 from "figma:asset/8ac7d6144c8b2d525393a3f03c7d4ab377ac1fb0.png";
import imgDisk05 from "figma:asset/4b7275ca68839e5d422ecba763e8c3e997dda403.png";
import imgDisk06 from "figma:asset/41de13aadfc9e3147ad1bc37aa084ec22cc209fe.png";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import { ChatGPTDialog } from "./components/ChatGPTDialog";
import { MouliBossDialog } from "./components/MouliBoosDialog";
import { AlarmaQuizDialog } from "./components/AlarmaQuizDialog";
import { LootBoxDialog, LootItem, Rarity } from "./components/LootBoxDialog";

interface ShopItem {
  id: string;
  name: string;
  description: string;
  baseCost: number;
  clickPower: number;
  passivePower: number;
  image: string;
  maxLevel: number;
  level: number;
}

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  clickBonus: number;
  passiveBonus?: number;
  rarity?: Rarity;
  immortal?: boolean;
  autoClicker?: boolean;
}

export default function App() {
  const [lavaCoins, setLavaCoins] = useState(800);
  const [totalClicks, setTotalClicks] = useState(0);
  const [clickPower, setClickPower] = useState(1);
  const [clicksPerSecond, setClicksPerSecond] = useState(0);
  const [fairPlayPoints, setFairPlayPoints] = useState(4);
  const [afkProgress, setAfkProgress] = useState(0);
  const [afkCoins, setAfkCoins] = useState(0);
  const [inventorySlots, setInventorySlots] = useState(4);
  const [usedSlots, setUsedSlots] = useState(2);
  
  const [clickAnimation, setClickAnimation] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{id: number, value: number, x: number, y: number}>>([]);
  const floatingIdRef = useRef(0);

  // Dialog states
  const [chatGPTDialog, setChatGPTDialog] = useState(false);
  const [mouliDialog, setMouliDialog] = useState(false);
  const [alarmaDialog, setAlarmaDialog] = useState(false);
  const [lootBoxDialog, setLootBoxDialog] = useState(false);
  
  // Boss state
  const [bossHealth, setBossHealth] = useState(1000);
  const [maxBossHealth] = useState(1000);

  // Auto-clicker state
  const [hasAutoClicker, setHasAutoClicker] = useState(false);

  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 'disk1',
      name: 'Disque dur cassé',
      description: '+10 dégats par clic',
      baseCost: 30,
      clickPower: 10,
      passivePower: 0,
      image: imgDisk01,
      maxLevel: 6,
      level: 0
    },
    {
      id: 'disk2',
      name: 'Carte mère cassé',
      description: '+15 dégats par clic',
      baseCost: 50,
      clickPower: 15,
      passivePower: 2,
      image: imgDisk02,
      maxLevel: 6,
      level: 0
    },
    {
      id: 'disk3',
      name: 'Ram cassé',
      description: '+20 dégats par clic',
      baseCost: 100,
      clickPower: 20,
      passivePower: 5,
      image: imgDisk03,
      maxLevel: 6,
      level: 0
    },
    {
      id: 'disk4',
      name: 'Disque dur',
      description: '+30 dégats par clic',
      baseCost: 200,
      clickPower: 30,
      passivePower: 8,
      image: imgDisk01,
      maxLevel: 6,
      level: 0
    },
    {
      id: 'disk5',
      name: 'Disque dur amelioré',
      description: '+50 dégats par clic',
      baseCost: 500,
      clickPower: 50,
      passivePower: 15,
      image: imgDisk05,
      maxLevel: 6,
      level: 0
    },
    {
      id: 'disk6',
      name: 'SSD amelioré',
      description: '+80 dégats par clic',
      baseCost: 1000,
      clickPower: 80,
      passivePower: 25,
      image: imgDisk06,
      maxLevel: 6,
      level: 0
    }
  ]);

  const [inventory, setInventory] = useState<InventoryItem[]>([
    {
      id: 'item1',
      name: 'Bonus Starter',
      image: imgDisk01,
      clickBonus: 5
    },
    {
      id: 'item2',
      name: 'Crystal Power',
      image: imgDisk02,
      clickBonus: 10
    }
  ]);

  // Calculate total click power and passive income
  useEffect(() => {
    let totalClickPower = 1;
    let totalPassivePower = 0;

    shopItems.forEach(item => {
      totalClickPower += item.clickPower * item.level;
      totalPassivePower += item.passivePower * item.level;
    });

    inventory.forEach(item => {
      totalClickPower += item.clickBonus;
      totalPassivePower += item.passiveBonus || 0;
    });

    setClickPower(totalClickPower);
    setClicksPerSecond(totalPassivePower);
  }, [shopItems, inventory]);

  // Passive income generation
  useEffect(() => {
    const interval = setInterval(() => {
      if (clicksPerSecond > 0) {
        setLavaCoins(prev => prev + clicksPerSecond);
        setAfkCoins(prev => prev + clicksPerSecond);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [clicksPerSecond]);

  // AFK battery progress
  useEffect(() => {
    const interval = setInterval(() => {
      setAfkProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 0.5;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setLavaCoins(prev => prev + clickPower);
    setTotalClicks(prev => prev + 1);
    setClickAnimation(true);
    
    // Create floating number
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newFloating = {
      id: floatingIdRef.current++,
      value: clickPower,
      x,
      y
    };
    
    setFloatingNumbers(prev => [...prev, newFloating]);
    
    // Remove after animation
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== newFloating.id));
    }, 1000);

    setTimeout(() => setClickAnimation(false), 100);
  };

  const buyItem = (item: ShopItem) => {
    const currentCost = item.baseCost * Math.pow(1.5, item.level);
    
    if (item.level >= item.maxLevel) {
      toast.error('Niveau maximum atteint !');
      return;
    }
    
    if (lavaCoins < currentCost) {
      toast.error('Pas assez de LC !');
      return;
    }

    setLavaCoins(prev => prev - currentCost);
    setShopItems(prev => prev.map(i => 
      i.id === item.id ? { ...i, level: i.level + 1 } : i
    ));
    
    toast.success(`${item.name} acheté ! Niveau ${item.level + 1}`);
  };

  const collectAfk = () => {
    if (afkCoins > 0) {
      toast.success(`+${afkCoins} LC collectés !`);
      setAfkProgress(0);
      setAfkCoins(0);
    }
  };

  const expandInventory = () => {
    const cost = 800;
    if (lavaCoins < cost) {
      toast.error('Pas assez de LC !');
      return;
    }
    
    setLavaCoins(prev => prev - cost);
    setInventorySlots(prev => prev + 4);
    toast.success('Inventaire agrandi !');
  };

  // ChatGPT handlers
  const handleChatGPTAccept = (success: boolean) => {
    if (success) {
      const bonus = Math.floor(clickPower * 5);
      setLavaCoins(prev => prev + bonus);
      toast.success(`🎉 ChatGPT t'a aidé ! +${bonus} LC`);
    } else {
      const penalty = Math.floor(lavaCoins * 0.25);
      setLavaCoins(prev => Math.max(0, prev - penalty));
      toast.error(`❌ ChatGPT t'a induit en erreur ! -${penalty} LC`);
    }
  };

  const handleChatGPTRefuse = () => {
    setFairPlayPoints(prev => prev + 2);
    toast.success('💎 Fair-play ! +2 FairPlay Points');
  };

  // Mouli Boss handlers
  const handleMouliComplete = (damage: number) => {
    setBossHealth(prev => {
      const newHealth = Math.max(0, prev - damage);
      if (newHealth === 0) {
        const reward = Math.floor(maxBossHealth * 2);
        setLavaCoins(c => c + reward);
        toast.success(`🏆 Boss vaincu ! +${reward} LC`);
        // Reset boss
        setTimeout(() => setBossHealth(maxBossHealth), 1000);
      } else {
        toast.info(`💥 ${damage} dégâts infligés ! Boss: ${newHealth}/${maxBossHealth} HP`);
      }
      return newHealth;
    });
  };

  // Alarma Quiz handlers
  const handleQuizComplete = (powerUpGained: number) => {
    setClickPower(prev => prev + powerUpGained);
    toast.success(`🧠 Quiz terminé ! +${powerUpGained} power permanent`);
  };

  // Loot Box handlers
  const handleLootBoxItem = (item: LootItem) => {
    const newItem: InventoryItem = {
      id: `loot-${Date.now()}`,
      name: item.name,
      image: item.image,
      clickBonus: item.clickBonus,
      passiveBonus: item.passiveBonus,
      rarity: item.rarity,
      immortal: item.immortal,
      autoClicker: item.autoClicker
    };
    
    setInventory(prev => [...prev, newItem]);
    setUsedSlots(prev => prev + 1);
    
    if (item.autoClicker) {
      setHasAutoClicker(true);
      toast.success('🤖 Auto-Clicker activé !');
    }
    
    setLavaCoins(prev => prev - 500);
    toast.success(`📦 ${item.name} obtenu !`);
  };

  // Auto-clicker effect
  useEffect(() => {
    if (!hasAutoClicker) return;
    
    const interval = setInterval(() => {
      setLavaCoins(prev => prev + clickPower);
      setTotalClicks(prev => prev + 1);
    }, 100); // Clique 10 fois par seconde

    return () => clearInterval(interval);
  }, [hasAutoClicker, clickPower]);

  // Random ChatGPT popup
  useEffect(() => {
    const randomInterval = setInterval(() => {
      const shouldAppear = Math.random() > 0.95; // 5% de chance toutes les 10 secondes
      if (shouldAppear) {
        setChatGPTDialog(true);
      }
    }, 10000);

    return () => clearInterval(randomInterval);
  }, []);

  return (
    <div className="relative size-full overflow-hidden">
      <Toaster position="top-center" />
      
      {/* Background Effects */}
      <div className="absolute h-[410px] left-[312px] top-[229px] w-[759px] pointer-events-none">
        <div className="absolute inset-[-24.39%_-13.18%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 959 610">
            <g filter="url(#filter0_f_1_119)">
              <path d={svgPaths.pa67b500} fill="#D9D9D9" fillOpacity="0.77" />
            </g>
            <defs>
              <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="610" id="filter0_f_1_119" width="959" x="3.78196e-06" y="-7.11054e-07">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                <feGaussianBlur result="effect1_foregroundBlur_1_119" stdDeviation="50" />
              </filter>
            </defs>
          </svg>
        </div>
      </div>

      <div className="absolute flex h-[705.717px] items-center justify-center left-[-32px] top-[83px] w-[812.337px] pointer-events-none">
        <div className="flex-none rotate-[150deg]">
          <div className="h-[410px] relative w-[701.292px]">
            <div className="absolute inset-[-24.39%_-14.26%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 901.292 610">
                <g filter="url(#filter0_f_1_113)">
                  <path d={svgPaths.p1f69b380} fill="#D9D9D9" fillOpacity="0.77" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="610" id="filter0_f_1_113" width="901.292" x="-1.8147e-06" y="-7.11054e-07">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_113" stdDeviation="50" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute flex h-[638.717px] items-center justify-center left-[719px] top-[-32px] w-[719.645px] pointer-events-none">
        <div className="flex-none rotate-[150deg]">
          <div className="h-[386.645px] relative w-[607.745px]">
            <div className="absolute inset-[-25.86%_-16.45%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 807.745 586.645">
                <g filter="url(#filter0_f_1_115)">
                  <path d={svgPaths.p2fb6aa00} fill="#D9D9D9" fillOpacity="0.77" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="586.645" id="filter0_f_1_115" width="807.745" x="1.4805e-06" y="1.06785e-06">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_1_115" stdDeviation="50" />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Background */}
      <div className="absolute h-full left-0 top-0 w-[1440px]" style={{ backgroundImage: "linear-gradient(161.574994deg, rgb(26, 11, 11) 0%, rgba(39, 12, 12, 0.78) 24.324%, rgb(22, 3, 3) 99.205%)" }} />

      {/* Left Sidebar */}
      <div className="absolute bg-[rgba(217,217,217,0.26)] border-[#4b1b01] border-[0px_7px_7px_0px] border-solid h-[802px] left-0 rounded-br-[14px] shadow-[10px_4px_4px_0px_rgba(0,0,0,0.25)] top-[91px] w-[198px]" />

      {/* Header */}
      <div className="absolute h-[93px] left-0 rounded-[36px] top-0 w-[1463px]">
        <div className="absolute bg-[rgba(55,41,41,0.08)] border-[#ae2c2c] border-[0px_0px_2px] border-solid inset-[0_1.57%_0_0] rounded-tl-[12px] rounded-tr-[12px]" />
        <p className="absolute bg-clip-text font-['Rubik_Distressed:Regular',sans-serif] inset-[19.35%_79.56%_50.54%_6.36%] leading-[normal] not-italic text-[24px]" style={{ WebkitTextFillColor: "transparent", backgroundImage: "linear-gradient(90.138136deg, rgb(255, 105, 0) 0%, rgb(125, 51, 51) 66.662%)" }}>Code&Click</p>
        <div className="absolute aspect-[500/500] left-[0.62%] right-[94.26%] top-[9px]">
          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgImage14} />
        </div>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[93px] not-italic text-[20px] text-nowrap text-white top-[47px]">Team</p>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[622px] not-italic text-[25px] text-nowrap text-white top-[16px]">{Math.floor(lavaCoins)} LC</p>
        <div className="absolute bg-[rgba(0,0,0,0.53)] border border-[#c47216] border-solid h-[9px] left-[491px] rounded-[6px] top-[69px] w-[362px]" />
        <div 
          className="absolute bg-gradient-to-r from-[#ff8904] h-[7px] left-[492px] rounded-[13px] to-[#9a0279] top-[70px] transition-all duration-300" 
          style={{ width: `${Math.min(afkProgress * 3.62, 362)}px` }}
        />
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[606px] not-italic text-[#ff8904] text-[14px] text-nowrap top-[52px]">{fairPlayPoints} FairPlay Points</p>
      </div>

      {/* Stats Panel */}
      <div className="absolute bg-[rgba(4,4,4,0.26)] border-[0px_0px_1px] border-solid border-white h-[89px] left-[9px] rounded-[9px] top-[116px] w-[173px]">
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[7px] not-italic text-[12px] text-nowrap text-white top-[7px]">Click/sec</p>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[12px] not-italic text-[#115deb] text-[15px] text-nowrap top-[27px]">{clicksPerSecond}</p>
      </div>

      <div className="absolute bg-[rgba(4,4,4,0.26)] border-[0px_0px_1px] border-solid border-white h-[89px] left-[9px] rounded-[9px] top-[223px] w-[173px]">
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[7px] not-italic text-[12px] text-nowrap text-white top-[9px]">Total</p>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[12px] not-italic text-[#b20305] text-[15px] text-nowrap top-[29px]">{totalClicks}</p>
      </div>

      <div className="absolute bg-[rgba(4,4,4,0.26)] border-[0px_0px_1px] border-solid border-white h-[89px] left-[6px] rounded-[9px] top-[329px] w-[173px]">
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[10px] not-italic text-[12px] text-nowrap text-white top-[9px]">Click Power</p>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[15px] not-italic text-[#00ff00] text-[15px] text-nowrap top-[29px]">{clickPower}</p>
      </div>

      <div className="absolute h-0 left-0 top-[443px] w-[191px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 191 1">
          <line stroke="white" x2="191" y1="0.5" y2="0.5" />
        </svg>
      </div>

      {/* AFK Battery */}
      <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[9px] not-italic text-[19px] text-nowrap text-white top-[461px]">Batterie AFK</p>
      <div 
        className="absolute bg-[#d9d9d9] h-[27px] left-[6px] rounded-[6px] top-[492px] w-[167px] cursor-pointer hover:opacity-80 transition-opacity"
        onClick={collectAfk}
      >
        <div 
          className="absolute bg-[#173727] h-[27px] left-0 rounded-bl-[6px] rounded-tl-[6px] top-0 transition-all duration-300" 
          style={{ width: `${Math.min(afkProgress, 100)}%` }}
        />
        {afkCoins > 0 && (
          <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] text-[10px] text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            +{Math.floor(afkCoins)} LC
          </p>
        )}
      </div>

      <div className="absolute h-0 left-0 top-[607px] w-[191px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 191 1">
          <line stroke="white" x2="191" y1="0.5" y2="0.5" />
        </svg>
      </div>

      {/* Inventory Slots Preview */}
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[10px] rounded-[5px] top-[657px] w-[52px]" />
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[70px] rounded-[5px] top-[657px] w-[52px]" />
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[130px] rounded-[5px] top-[657px] w-[52px]" />
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[10px] rounded-[5px] top-[716px] w-[52px]" />
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[70px] rounded-[5px] top-[716px] w-[52px]" />
      <div className="absolute bg-[rgba(32,28,28,0.31)] border border-[#723308] border-solid h-[44px] left-[130px] rounded-[5px] top-[716px] w-[52px]" />

      {/* Right Sidebar - Shop */}
      <div className="absolute bg-[rgba(217,217,217,0.26)] border-[#4b1b01] border-[0px_0px_7px_7px] border-solid h-[802px] left-[1172px] rounded-bl-[14px] shadow-[-10px_11px_9px_0px_rgba(0,0,0,0.25)] top-[93px] w-[267px] overflow-y-auto">
        <div className="absolute h-0 left-[35px] top-[49px] w-[198px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 198 1">
            <line stroke="white" x2="198" y1="0.5" y2="0.5" />
          </svg>
        </div>
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[98px] not-italic text-[25px] text-nowrap text-white top-[9px]">SHOP</p>

        {/* Shop Items */}
        <div className="absolute top-[60px] left-[21px] right-[21px] space-y-3 pb-20">
          {shopItems.map((item) => {
            const currentCost = Math.floor(item.baseCost * Math.pow(1.5, item.level));
            return (
              <div 
                key={item.id}
                className="relative bg-[rgba(217,217,217,0.38)] border border-[#ff8904] border-solid h-[78px] rounded-[9px] cursor-pointer hover:bg-[rgba(217,217,217,0.5)] transition-colors"
                onClick={() => buyItem(item)}
              >
                <div className="absolute h-[60px] left-[5px] top-[9px] w-[68px]">
                  <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={item.image} />
                </div>
                <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[73px] not-italic text-[13px] text-white top-[9px]">{item.name}</p>
                <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[73px] not-italic text-[8px] text-black top-[29px]">{item.description}</p>
                <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[189px] not-italic text-[#ac0404] text-[11px] top-[59px]">{currentCost}LC</p>
                <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[25px] not-italic text-[14px] text-white top-[57px]">{item.level}/{item.maxLevel}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Volcano Platform */}
      <div className="absolute h-[482px] left-[330px] top-[202px] w-[723px] pointer-events-none">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover size-full" src={imgVolcanPlatforme1} />
      </div>

      {/* Clickable Character */}
      <div 
        className={`absolute aspect-[445/391] left-[34.86%] right-[37.57%] top-[229px] cursor-pointer select-none transition-transform ${clickAnimation ? 'scale-95' : 'scale-100 hover:scale-105'}`}
        onClick={handleClick}
      >
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full drop-shadow-[0_0_30px_rgba(255,137,4,0.6)]" src={imgImageRemoveBackground111} />
        
        {/* Floating numbers */}
        {floatingNumbers.map(floating => (
          <div
            key={floating.id}
            className="absolute font-['Rubik_Distressed:Regular',sans-serif] text-[#ff8904] text-[24px] font-bold pointer-events-none animate-float"
            style={{
              left: `${floating.x}px`,
              top: `${floating.y}px`,
              animation: 'floatUp 1s ease-out forwards'
            }}
          >
            +{floating.value}
          </div>
        ))}
      </div>

      {/* Decoration */}
      <div className="absolute flex h-[100px] items-center justify-center left-[1089px] top-[764px] w-[84px] pointer-events-none">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <div className="h-[100px] relative w-[84px]">
            <div className="absolute inset-0 overflow-hidden">
              <img alt="" className="absolute h-[118.65%] left-[-42.92%] max-w-none top-[-10.7%] w-[140.92%]" src={imgImageSansArrierePlan106} />
            </div>
          </div>
        </div>
      </div>

      {/* Combat Buttons */}
      <div 
        className="absolute h-[45px] left-[1013px] rounded-[9px] top-[24px] w-[180px] cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundImage: "linear-gradient(101.78689deg, rgb(143, 23, 29) 1.6599%, rgb(71, 24, 24) 100%)" }}
        onClick={() => setMouliDialog(true)}
      >
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] h-[30px] leading-[normal] left-[17px] not-italic text-[20px] text-white top-[9px] w-[183px]">Combat Mouli</p>
      </div>

      <div 
        className="absolute h-[45px] left-[1233px] rounded-[9px] top-[24px] w-[180px] cursor-pointer hover:opacity-80 transition-opacity"
        style={{ backgroundImage: "linear-gradient(101.78689deg, rgb(99, 23, 143) 1.6599%, rgb(56, 24, 71) 100%)" }}
        onClick={() => setAlarmaDialog(true)}
      >
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] h-[30px] leading-[normal] left-[21px] not-italic text-[20px] text-white top-[9px] w-[137px]">Alarma Quiz</p>
      </div>

      {/* Inventory Section */}
      <div className="absolute bg-[rgba(0,0,0,0.15)] border border-[#ff8904] border-solid h-[311px] left-[294px] rounded-[15px] top-[914px] w-[796px]">
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[27px] not-italic text-[25px] text-nowrap text-white top-[22px]">Inventaire({usedSlots}/{inventorySlots})</p>
        
        <div 
          className="absolute h-[45px] left-[560px] rounded-[9px] top-[14px] w-[216px] cursor-pointer hover:opacity-80 transition-opacity"
          style={{ backgroundImage: "linear-gradient(104.058163deg, rgb(8, 56, 32) 1.6599%, rgb(38, 72, 55) 100%)" }}
          onClick={expandInventory}
        >
          <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] h-[30px] leading-[normal] left-[15px] not-italic text-[17px] text-white top-[12px] w-[201px]">Agrandir (+4 -800LC)</p>
        </div>

        {/* Inventory Items */}
        <div className="absolute top-[74px] left-[28px] grid grid-cols-4 gap-4">
          {inventory.slice(0, inventorySlots).map((item, index) => (
            <div 
              key={item.id}
              className="bg-[rgba(217,217,217,0.49)] border border-[#00a955] border-solid h-[155px] rounded-[12px] w-[164px] flex flex-col items-center justify-center"
            >
              <img src={item.image} alt={item.name} className="w-[60px] h-[60px] object-contain" />
              <p className="font-['Rubik_Distressed:Regular',sans-serif] text-[12px] text-white text-center mt-2">{item.name}</p>
              <p className="font-['Rubik_Distressed:Regular',sans-serif] text-[10px] text-[#00ff00] text-center">+{item.clickBonus} power</p>
            </div>
          ))}
          
          {/* Empty slots */}
          {Array.from({ length: Math.max(0, inventorySlots - inventory.length) }).map((_, index) => (
            <div 
              key={`empty-${index}`}
              className="bg-[rgba(217,217,217,0.49)] border border-[#00a955] border-solid h-[155px] rounded-[12px] w-[164px] flex items-center justify-center opacity-50"
            >
              <p className="font-['Rubik_Distressed:Regular',sans-serif] text-[14px] text-white">Vide</p>
            </div>
          ))}
        </div>

        <div className="absolute bg-[rgba(0,0,0,0.38)] border border-[#ff6900] border-solid h-[33px] left-[92px] rounded-[8px] bottom-[12px] w-[611px]">
          <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[15px] not-italic text-[18px] text-white top-[6px]">Les items se dropent en battant des boss et dans les caisses !!</p>
        </div>
      </div>

      {/* Loot Box Button */}
      <div 
        className="absolute h-[60px] left-[524px] rounded-[12px] top-[808px] w-[220px] cursor-pointer hover:scale-105 transition-transform"
        style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 215, 0) 0%, rgb(255, 165, 0) 100%)" }}
        onClick={() => setLootBoxDialog(true)}
      >
        <p className="absolute font-['Rubik_Distressed:Regular',sans-serif] leading-[normal] left-[30px] not-italic text-[22px] text-black top-[16px]">🎁 Caisse (500LC)</p>
      </div>

      {/* Dialogs */}
      <ChatGPTDialog
        open={chatGPTDialog}
        onOpenChange={setChatGPTDialog}
        onAccept={handleChatGPTAccept}
        onRefuse={handleChatGPTRefuse}
      />

      <MouliBossDialog
        open={mouliDialog}
        onOpenChange={setMouliDialog}
        onComplete={handleMouliComplete}
        bossHealth={bossHealth}
        maxBossHealth={maxBossHealth}
      />

      <AlarmaQuizDialog
        open={alarmaDialog}
        onOpenChange={setAlarmaDialog}
        onComplete={handleQuizComplete}
      />

      <LootBoxDialog
        open={lootBoxDialog}
        onOpenChange={setLootBoxDialog}
        onItemReceived={handleLootBoxItem}
        cost={500}
        canAfford={lavaCoins >= 500}
      />

      <style>{`
        @keyframes floatUp {
          0% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-100px) scale(1.5);
          }
        }
        
        .animate-float {
          animation: floatUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}