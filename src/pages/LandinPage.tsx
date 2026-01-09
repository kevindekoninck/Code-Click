import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col bg-[#050505] text-white font-sans selection:bg-orange-600 selection:text-white overflow-x-hidden">
      
      <div className="relative min-h-[90vh] w-full overflow-hidden flex flex-col items-center justify-center pt-20 pb-10">
        
        {/* Background Image avec Overlay */}
        <div className="absolute inset-0 bg-[url('/bgVolcan.png')] bg-cover bg-center z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505] z-0"></div>
        
        {/* Particules d'ambiance */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.1)_0%,transparent_60%)] z-0 animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center max-w-4xl px-4 text-center">
                        
            {/* Titre réduit (6xl -> 5xl sur desktop) */}
            <h1 className="rubik text-5xl md:text-7xl bg-gradient-to-r from-amber-200 via-orange-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg mb-4 tracking-wide leading-tight">
                CODE & CLICK
            </h1>
            
            {/* Texte descriptif plus fin */}
            <p className="text-gray-300 text-base md:text-xl max-w-xl mb-8 leading-relaxed font-light font-chakra">
                Transforme ton parcours à l'ETNA en un <span className="text-amber-500 font-bold">clicker RPG</span>. 
                <br className="hidden md:block"/> Clique, code et combats la Mouli pour devenir la légende du campus.
            </p>

            {/* Boutons d'action compacts (py-3 au lieu de py-4) */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <button 
                  onClick={handleStartGame}
                  className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(234,88,12,0.5)] uppercase tracking-widest border border-white/10"
                >
                    Start Eruption
                </button>
                <button className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all hover:border-amber-500/50 uppercase tracking-widest">
                    En savoir plus
                </button>
            </div>
        </div>

        {/* Flèche de scroll remontée un peu */}
        <div className="absolute bottom-6 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
            <img className="w-6 md:w-8 invert drop-shadow-lg" src="/arrow.png" alt="Scroll Down" />
        </div>
      </div>

      {/* === SECTION "FEATURES" (Cartes) === */}
      <section className="relative py-20 px-4 bg-[#0a0a0a]">
        
        {/* Déco Feuille */}
        <div className="absolute top-[-40px] left-10 opacity-20 rotate-12 pointer-events-none">
             <img src="/leaf.png" className="w-24 grayscale brightness-50" alt="" />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Carte 1 */}
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 rounded-2xl hover:border-orange-500/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(234,88,12,0.15)] flex flex-col items-center text-center">
                <div className="bg-orange-500/10 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img className="w-16 h-16 object-contain" src="/lavacoins.png" alt="Coins" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-chakra uppercase tracking-wider">Click to Erupt</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                    Un gameplay simple et addictif. Chaque clic déclenche des éruptions et vous rapporte des <span className="text-amber-500">Lava Coins</span>.
                </p>
            </div>

            {/* Carte 2 */}
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 rounded-2xl hover:border-red-500/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(220,38,38,0.15)] flex flex-col items-center text-center">
                <div className="bg-red-500/10 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img className="w-16 h-16 object-contain" src="/powerUp.png" alt="PowerUp" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-chakra uppercase tracking-wider">Epic Power Ups</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                    Débloquez des améliorations, des mineurs automatisés et des amplificateurs pour booster votre <span className="text-red-400">puissance</span>.
                </p>
            </div>

            {/* Carte 3 */}
            <div className="group bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 rounded-2xl hover:border-amber-400/50 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(251,191,36,0.15)] flex flex-col items-center text-center">
                <div className="bg-amber-500/10 p-3 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                    <img className="w-16 h-16 object-contain" src="/trophe.png" alt="Trophy" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-chakra uppercase tracking-wider">Classement ETNA</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                    Affrontez les étudiants (IDV/ISR) et grimpez dans le leaderboard pour devenir le <span className="text-yellow-400">Maître du Code</span>.
                </p>
            </div>
        </div>
      </section>

      {/* === SECTION "GAMEPLAY" === */}
      <section className="relative py-24 px-4 bg-black overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-red-900/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
            
            {/* Texte à gauche */}
            <div className="w-full md:w-1/2 relative z-10">
                <div className="inline-block bg-orange-900/30 border border-orange-500/30 px-3 py-1 rounded-full text-orange-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                    Gameplay Loop
                </div>
                <h2 className="rubik text-4xl md:text-5xl text-white mb-6 leading-tight">
                    Simple et <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">ADDICTIF</span>
                </h2>
                
                <p className="text-lg text-gray-300 mb-6 font-light">
                    Commencez avec un volcan dormant et transformez-le en une catastrophe d'ampleur mondiale.
                </p>

                <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                        <div className="bg-white/10 p-2 rounded-lg text-lg">🌋</div>
                        <div>
                            <h4 className="font-bold text-white text-base">Cliquez pour l'éruption</h4>
                            <p className="text-gray-500 text-sm">Générez de la lave à la sueur de votre souris.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-white/10 p-2 rounded-lg text-lg">💰</div>
                        <div>
                            <h4 className="font-bold text-white text-base">Amassez des Lava Coins</h4>
                            <p className="text-gray-500 text-sm">Votre fortune grandit à chaque seconde.</p>
                        </div>
                    </li>
                    <li className="flex items-start gap-4">
                        <div className="bg-white/10 p-2 rounded-lg text-lg">🚀</div>
                        <div>
                            <h4 className="font-bold text-white text-base">Upgrades Massifs</h4>
                            <p className="text-gray-500 text-sm">Automatisez tout et regardez les chiffres s'envoler.</p>
                        </div>
                    </li>
                </ul>
            </div>

            {/* Image droite */}
            <div className="w-full md:w-1/2 relative">
                <div className="relative rounded-2xl border border-white/20 bg-black/50 p-2 backdrop-blur-xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none rounded-2xl"></div>
                    <img src="/p3.png" className="w-full rounded-xl opacity-90" alt="Interface Jeu" />
                    
                    <div className="absolute -bottom-4 -left-4 bg-[#1a1a1a] border border-white/10 p-3 rounded-xl shadow-xl flex items-center gap-3 animate-bounce">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-white uppercase tracking-wider">Serveur en ligne</span>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* === SECTION CLASSEMENT === */}
      <section className="relative py-20 px-4 bg-[#080808] border-t border-white/5">
        
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="rubik text-3xl md:text-4xl text-white mb-3">
                Les Maîtres du Volcan
            </h2>
            <p className="text-gray-400 text-sm">Rejoignez l'élite et gravez votre nom dans la roche en fusion.</p>
        </div>

        <div className="max-w-4xl mx-auto relative">
            <img src="/kevin2.png" className="hidden lg:block absolute -left-50 bottom-0 w-40" alt="Kevin" />
            
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md relative z-10">
                
                <div className="flex flex-col gap-3">
                    {/* 1er Place */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-amber-500/20 to-transparent border border-amber-500/30 p-4 rounded-xl transform hover:scale-[1.01] transition-transform">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🥇</span>
                            <div>
                                <h3 className="text-lg font-bold text-amber-400">Harris</h3>
                                <p className="text-[10px] text-amber-500/60 uppercase font-bold tracking-wider">Grand Magus</p>
                            </div>
                        </div>
                        <div className="text-xl font-mono font-bold text-white">LVL 999</div>
                    </div>

                    {/* 2eme Place */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-gray-400/10 to-transparent border border-gray-400/20 p-4 rounded-xl transform hover:scale-[1.01] transition-transform">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🥈</span>
                            <div>
                                <h3 className="text-lg font-bold text-gray-300">Damien</h3>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Seigneur des Cendres</p>
                            </div>
                        </div>
                        <div className="text-xl font-mono font-bold text-gray-400">LVL 900</div>
                    </div>

                    {/* 3eme Place */}
                    <div className="flex items-center justify-between bg-gradient-to-r from-orange-700/10 to-transparent border border-orange-700/20 p-4 rounded-xl transform hover:scale-[1.01] transition-transform">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">🥉</span>
                            <div>
                                <h3 className="text-lg font-bold text-orange-400">Kevin</h3>
                                <p className="text-[10px] text-orange-600 uppercase font-bold tracking-wider">Apprenti Pyro</p>
                            </div>
                        </div>
                        <div className="text-xl font-mono font-bold text-orange-500">LVL 160</div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <button className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-white transition-all pb-1">
                        Voir le classement complet →
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* === SECTION ETUDIANTS === */}
      <section className="py-16 bg-black text-center">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 opacity-70">
             <div className="flex flex-col items-center gap-3">
                <img className="w-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-80" src="p3.png" alt="Etna" />
                <h3 className="font-bold text-gray-500 uppercase tracking-widest text-xs">Made by ETNA Students</h3>
             </div>
             <div className="flex flex-col items-center gap-3">
                <img className="w-24 grayscale hover:grayscale-0 transition-all duration-500 opacity-80" src="p1.png" alt="Fun" />
                <h3 className="font-bold text-gray-500 uppercase tracking-widest text-xs">Made to learn with FUN</h3>
             </div>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;