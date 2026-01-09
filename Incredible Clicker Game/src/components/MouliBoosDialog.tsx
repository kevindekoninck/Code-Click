import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Swords, Timer, Code } from 'lucide-react';

interface MouliBossDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (damage: number) => void;
  bossHealth: number;
  maxBossHealth: number;
}

const CODE_CHALLENGES = [
  { code: 'console.log("Hello ETNA")', solution: 'console.log("Hello ETNA")' },
  { code: 'for(let i=0; i<10; i++)', solution: 'for(let i=0; i<10; i++)' },
  { code: 'function attack() { return 100; }', solution: 'function attack() { return 100; }' },
  { code: 'const damage = power * 2;', solution: 'const damage = power * 2;' },
  { code: 'if(boss.health <= 0) win();', solution: 'if(boss.health <= 0) win();' },
];

export function MouliBossDialog({ open, onOpenChange, onComplete, bossHealth, maxBossHealth }: MouliBossDialogProps) {
  const [challenge, setChallenge] = useState(CODE_CHALLENGES[0]);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (open) {
      setChallenge(CODE_CHALLENGES[Math.floor(Math.random() * CODE_CHALLENGES.length)]);
      setUserInput('');
      setTimeLeft(30);
      setStreak(0);
    }
  }, [open]);

  useEffect(() => {
    if (!open || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete(streak * 50);
          onOpenChange(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [open, timeLeft, streak, onComplete, onOpenChange]);

  const handleSubmit = () => {
    if (userInput.trim() === challenge.solution) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setChallenge(CODE_CHALLENGES[Math.floor(Math.random() * CODE_CHALLENGES.length)]);
      setUserInput('');
      setTimeLeft(prev => Math.min(prev + 5, 30)); // Bonus de 5 secondes
    } else {
      setStreak(0);
      setTimeLeft(prev => Math.max(prev - 3, 0)); // Pénalité de 3 secondes
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-red-950 to-orange-950 border-2 border-red-500 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Swords className="w-8 h-8 text-red-400" />
            Combat contre Mouli
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Boss Health Bar */}
          <div className="bg-black/40 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-red-400">Boss Mouli</span>
              <span className="text-sm">{bossHealth} / {maxBossHealth} HP</span>
            </div>
            <div className="bg-gray-700 h-4 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-red-600 to-orange-500 h-full transition-all duration-300"
                style={{ width: `${(bossHealth / maxBossHealth) * 100}%` }}
              />
            </div>
          </div>

          {/* Timer and Streak */}
          <div className="flex gap-3">
            <div className="flex-1 bg-blue-900/30 border border-blue-500/50 rounded-lg p-3 flex items-center gap-2">
              <Timer className="w-5 h-5 text-blue-400" />
              <span className="font-bold text-xl">{timeLeft}s</span>
            </div>
            <div className="flex-1 bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-3 flex items-center gap-2">
              <Swords className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">Combo: x{streak}</span>
            </div>
          </div>

          {/* Code Challenge */}
          <div className="bg-black/60 border border-purple-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Code className="w-5 h-5 text-purple-400" />
              <span className="font-bold">Tape ce code rapidement :</span>
            </div>
            <div className="bg-gray-900 rounded p-3 mb-3 font-mono text-green-400 text-sm">
              {challenge.code}
            </div>
            <Input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Tape le code ici..."
              className="bg-gray-800 border-gray-600 text-white font-mono"
              autoFocus
            />
          </div>

          <div className="text-center text-sm text-gray-400">
            Chaque code correct = +1 combo | Dégâts finaux = {streak * 50} | Erreur = -3s
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold"
          >
            Attaquer ! (Enter)
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
