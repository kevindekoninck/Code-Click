import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    // Header Sticky + Effet verre fumé + Bordure lumineuse en bas
    <header className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-md border-b border-white/5">
      
      {/* Ligne de lave décorative en bas du header */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70 shadow-[0_0_10px_#f97316]"></div>

      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo + Titre */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate('/')}
        >
          <img
            src="/logo_code_click.webp"
            alt="logo_code_and_click"
            className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,100,0,0.5)] group-hover:rotate-12 transition-transform duration-300"
          />
          <h1 className="text-2xl text-white rubik tracking-wider group-hover:text-amber-500 transition-colors">
            Code<span className="text-orange-500">&</span>Click
          </h1>
        </div>

        {/* Navigation / Actions */}
        <nav className="flex items-center gap-6">            
            <button className="bg-white/5 hover:bg-orange-600/20 border border-white/10 hover:border-orange-500/50 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-bold uppercase tracking-wider font-sans backdrop-blur-sm group">
                <span className="group-hover:text-amber-400 transition-colors">Nous contacter</span>
            </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;