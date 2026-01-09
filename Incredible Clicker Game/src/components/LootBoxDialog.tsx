import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Package, Sparkles, Zap } from 'lucide-react';
import imgDisk01 from "figma:asset/57f6cad8499661b0ab7840623ffe0d06ddcbb26c.png";
import imgDisk02 from "figma:asset/92f38e861872ad38e90c583b7049f81feeca88b9.png";
import imgDisk03 from "figma:asset/8ac7d6144c8b2d525393a3f03c7d4ab377ac1fb0.png";
import imgDisk05 from "figma:asset/4b7275ca68839e5d422ecba763e8c3e997dda403.png";
import imgDisk06 from "figma:asset/41de13aadfc9e3147ad1bc37aa084ec22cc209fe.png";

export type Rarity = 'Commun' | 'Rare' | 'Épique' | 'Légendaire' | 'Immortel';

export interface LootItem {
  id: string;
  name: string;
  rarity: Rarity;
  clickBonus: number;
  passiveBonus?: number;
  image: string;
  immortal?: boolean;
  autoClicker?: boolean;
}

interface LootBoxDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onItemReceived: (item: LootItem) => void;
  cost: number;
  canAfford: boolean;
}

const LOOT_POOL: LootItem[] = [
  // Commun (50%)
  { id: 'battery', name: 'Batterie USB', rarity: 'Commun', clickBonus: 5, image: imgDisk01 },
  { id: 'cable', name: 'Câble HDMI', rarity: 'Commun', clickBonus: 8, image: imgDisk01 },
  { id: 'mouse', name: 'Souris cassée', rarity: 'Commun', clickBonus: 10, image: imgDisk01 },
  
  // Rare (30%)
  { id: 'keyboard', name: 'Clavier mécanique', rarity: 'Rare', clickBonus: 25, passiveBonus: 5, image: imgDisk02 },
  { id: 'screen', name: 'Écran 24"', rarity: 'Rare', clickBonus: 30, passiveBonus: 8, image: imgDisk02 },
  
  // Épique (15%)
  { id: 'gpu', name: 'GPU RTX 3060', rarity: 'Épique', clickBonus: 75, passiveBonus: 20, image: imgDisk03 },
  { id: 'cpu', name: 'CPU i7-12700K', rarity: 'Épique', clickBonus: 100, passiveBonus: 25, image: imgDisk03 },
  
  // Légendaire (4%)
  { id: 'ssd', name: 'SSD NVMe 2To', rarity: 'Légendaire', clickBonus: 200, passiveBonus: 50, image: imgDisk05 },
  { id: 'server', name: 'Serveur ETNA', rarity: 'Légendaire', clickBonus: 300, passiveBonus: 75, image: imgDisk05 },
  
  // Immortel (1%)
  { id: 'autoclicker', name: 'Auto-Clicker Supreme', rarity: 'Immortel', clickBonus: 500, passiveBonus: 200, image: imgDisk06, immortal: true, autoClicker: true },
];

const RARITY_CHANCES = {
  'Commun': 0.50,
  'Rare': 0.30,
  'Épique': 0.15,
  'Légendaire': 0.04,
  'Immortel': 0.01
};

const RARITY_COLORS = {
  'Commun': 'text-gray-400 border-gray-500 bg-gray-900/50',
  'Rare': 'text-blue-400 border-blue-500 bg-blue-900/50',
  'Épique': 'text-purple-400 border-purple-500 bg-purple-900/50',
  'Légendaire': 'text-orange-400 border-orange-500 bg-orange-900/50',
  'Immortel': 'text-yellow-400 border-yellow-500 bg-yellow-900/50'
};

export function LootBoxDialog({ open, onOpenChange, onItemReceived, cost, canAfford }: LootBoxDialogProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [revealedItem, setRevealedItem] = useState<LootItem | null>(null);

  const getRandomItem = (): LootItem => {
    const roll = Math.random();
    let cumulativeChance = 0;
    
    for (const [rarity, chance] of Object.entries(RARITY_CHANCES)) {
      cumulativeChance += chance;
      if (roll <= cumulativeChance) {
        const itemsOfRarity = LOOT_POOL.filter(item => item.rarity === rarity);
        return itemsOfRarity[Math.floor(Math.random() * itemsOfRarity.length)];
      }
    }
    
    return LOOT_POOL[0];
  };

  const handleOpen = () => {
    if (!canAfford) return;
    
    setIsOpening(true);
    setRevealedItem(null);

    setTimeout(() => {
      const item = getRandomItem();
      setRevealedItem(item);
      setIsOpening(false);
    }, 2000);
  };

  const handleClaim = () => {
    if (revealedItem) {
      onItemReceived(revealedItem);
      setRevealedItem(null);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Package className="w-8 h-8 text-yellow-400" />
            Caisse Mystère
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {!revealedItem && !isOpening && (
            <>
              <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500 rounded-lg p-6 text-center">
                <Package className="w-24 h-24 mx-auto text-yellow-400 mb-4 animate-pulse" />
                <p className="text-lg font-bold mb-2">Ouvre une caisse pour obtenir un item !</p>
                <p className="text-sm text-gray-400">Contient des équipements de différentes raretés</p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Commun</span>
                  <span className="text-gray-400">50%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400">Rare</span>
                  <span className="text-blue-400">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-purple-400">Épique</span>
                  <span className="text-purple-400">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-orange-400">Légendaire</span>
                  <span className="text-orange-400">4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400">Immortel ⚡</span>
                  <span className="text-yellow-400">1%</span>
                </div>
              </div>

              <Button
                onClick={handleOpen}
                disabled={!canAfford}
                className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold text-lg py-6"
              >
                {canAfford ? `Ouvrir (${cost} LC)` : 'Pas assez de LC'}
              </Button>
            </>
          )}

          {isOpening && (
            <div className="bg-black/60 rounded-lg p-8 text-center">
              <div className="animate-spin mx-auto">
                <Sparkles className="w-16 h-16 text-yellow-400" />
              </div>
              <p className="mt-4 text-lg font-bold animate-pulse">Ouverture en cours...</p>
            </div>
          )}

          {revealedItem && (
            <div className="space-y-4">
              <div className={`border-2 rounded-lg p-6 text-center ${RARITY_COLORS[revealedItem.rarity]}`}>
                <div className="relative">
                  {revealedItem.immortal && (
                    <div className="absolute -top-2 -right-2">
                      <Zap className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                  )}
                  <img src={revealedItem.image} alt={revealedItem.name} className="w-24 h-24 mx-auto object-contain mb-4" />
                </div>
                <p className="text-sm font-bold mb-1">{revealedItem.rarity}</p>
                <p className="text-xl font-bold mb-3">{revealedItem.name}</p>
                <div className="space-y-1 text-sm">
                  <p className="text-green-400">+{revealedItem.clickBonus} power de clic</p>
                  {revealedItem.passiveBonus && (
                    <p className="text-blue-400">+{revealedItem.passiveBonus} LC/sec</p>
                  )}
                  {revealedItem.immortal && (
                    <p className="text-yellow-400 font-bold">⚡ Conservé après renaissance</p>
                  )}
                  {revealedItem.autoClicker && (
                    <p className="text-purple-400 font-bold">🤖 Auto-Clicker activé !</p>
                  )}
                </div>
              </div>

              <Button
                onClick={handleClaim}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg py-4"
              >
                Récupérer l'item !
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
