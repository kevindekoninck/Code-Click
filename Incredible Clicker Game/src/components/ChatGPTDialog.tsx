import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Bot, AlertTriangle, Sparkles } from 'lucide-react';

interface ChatGPTDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept: (success: boolean) => void;
  onRefuse: () => void;
}

export function ChatGPTDialog({ open, onOpenChange, onAccept, onRefuse }: ChatGPTDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccept = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      const random = Math.random();
      const success = random > 0.75; // 25% de chance de succès
      onAccept(success);
      setIsProcessing(false);
      onOpenChange(false);
    }, 2000);
  };

  const handleRefuse = () => {
    onRefuse();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-purple-500 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Bot className="w-8 h-8 text-purple-400" />
            ChatGPT propose son aide
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4">
            <p className="text-sm leading-relaxed">
              "Salut ! Je peux t'aider à progresser plus vite dans ton projet... 
              mais attention, mes suggestions ne sont pas toujours fiables 🤖"
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-red-900/20 border border-red-500/50 rounded p-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mb-1" />
              <p className="font-bold">Si tu acceptes:</p>
              <p className="text-red-300">75% de pénalité</p>
              <p className="text-green-300">25% de bonus</p>
            </div>
            
            <div className="bg-green-900/20 border border-green-500/50 rounded p-3">
              <Sparkles className="w-5 h-5 text-green-400 mb-1" />
              <p className="font-bold">Si tu refuses:</p>
              <p className="text-green-300">+2 FairPlay Points</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleRefuse}
              variant="outline"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white border-green-500"
              disabled={isProcessing}
            >
              Refuser (+2 FPP)
            </Button>
            
            <Button
              onClick={handleAccept}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isProcessing}
            >
              {isProcessing ? 'Génération...' : 'Accepter'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
