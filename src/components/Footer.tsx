import { useRef } from "react";

function Footer() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  // Fermer la modale si on clique en dehors (sur le backdrop)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      closeModal();
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-gray-400 py-8 relative overflow-hidden font-sans">
      
      {/* Effet de lueur en fond */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[50%] h-32 bg-orange-900/10 blur-[80px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-6 relative z-10">
        
        {/* Logo rappel */}
        <h2 className="rubik text-2xl text-white/20 select-none">Code&Click</h2>

        {/* Liens */}
        <div className="flex gap-6 text-sm font-medium tracking-wide">
             <button
                onClick={openModal}
                className="hover:text-amber-500 transition-colors uppercase text-xs"
                >
                Mentions Légales
            </button>
            <span className="text-white/10">|</span>
            <a href="#" className="hover:text-amber-500 transition-colors uppercase text-xs">Support</a>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-600 space-y-1">
          <p>© 2025 Code & Click — Projet étudiant ETNA.</p>
          <p>Fait avec <span className="text-red-800 animate-pulse">❤</span> (et beaucoup de café) par la Team Volcan.</p>
        </div>
      </div>

      {/* --- MODALE --- */}
      <dialog
        ref={modalRef}
        onClick={handleBackdropClick}
        className="backdrop:bg-black/80 backdrop:backdrop-blur-sm m-auto p-0 rounded-2xl bg-transparent shadow-2xl max-w-md w-full text-center border border-white/10 open:animate-fade-in"
      >
        <div className="bg-[#111] text-white p-8 rounded-2xl border border-white/5 relative overflow-hidden">
            
            {/* Déco modale */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600"></div>

            <h2 className="text-2xl font-bold mb-6 rubik text-amber-500">
                Mentions Légales
            </h2>
            
            <div className="text-sm space-y-4 text-gray-300 text-left font-sans leading-relaxed">
                <p>
                    <span className="text-amber-500 font-bold block mb-1 uppercase text-xs">Contexte</span>
                    Ce site est un projet étudiant réalisé à des fins pédagogiques à l'ETNA. Il ne poursuit aucun but commercial.
                </p>

                <div>
                    <span className="text-amber-500 font-bold block mb-1 uppercase text-xs">L'Équipe Volcanique</span>
                    <ul className="list-disc pl-4 space-y-1 text-gray-400">
                        <li>Harris Mohammad</li>
                        <li>Kévin De Koninck</li>
                        <li>Damien Le Caillec</li>
                    </ul>
                </div>

                <p className="text-xs text-gray-500 border-t border-white/10 pt-4 mt-4">
                    Les éléments graphiques et noms utilisés sont fictifs. Les données collectées (pseudo, email) restent en local ou sur notre API de test et ne sont jamais partagées à des tiers.
                </p>
            </div>

            <button
                onClick={closeModal}
                className="mt-8 w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors uppercase text-xs tracking-widest"
            >
                Fermer la fenêtre
            </button>
        </div>
      </dialog>
    </footer>
  );
}

export default Footer;