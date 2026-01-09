import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  const [formData, setFormData] = useState({
    email: "",
    login: "",
    password: "",
    confirmPassword: ""
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!isLoginMode) {
        if (formData.password !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas !");
            setIsLoading(false);
            return;
        }
        if (!formData.email.includes("@") || !formData.email.includes(".")) {
            setError("L'email n'est pas valide !");
            setIsLoading(false);
            return;
        }
    }

    const endpoint = isLoginMode ? "/users/login" : "/users/register";
    const url = `http://localhost:3000${endpoint}`;

    try {
      const bodyPayload = isLoginMode 
        ? { login: formData.login, password: formData.password }
        : { email: formData.email, login: formData.login, password: formData.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyPayload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Une erreur volcanique est survenue 🔥");

      if (data.token) {
           localStorage.setItem("token", data.token);
           navigate(`/principale/${data.etna_id}`);
      } else if (!isLoginMode) {
           alert("Compte créé ! Connectez-vous.");
           setIsLoginMode(true);
           setFormData({ ...formData, password: "", confirmPassword: "" });
      }

    } catch (err: any) {
      setError(err.message || "Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[#020202] relative overflow-hidden text-white p-4 font-sans selection:bg-orange-500 selection:text-white">
      
      {/* --- FOND GLOBAL --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate('/')} 
        className="self-start mb-6 md:absolute md:top-8 md:left-8 md:mb-0 flex items-center gap-2 text-gray-500 hover:text-amber-500 transition-colors z-30 font-bold uppercase text-xs tracking-[0.2em]"
      >
        <span>←</span> Retour accueil
      </button>

      {/* --- CARTE PRINCIPALE --- */}
      <div className="relative w-full max-w-5xl flex flex-col md:flex-row shadow-2xl shadow-black/90 rounded-3xl mt-8 md:mt-0 z-10 border border-white/10 bg-[#080808] overflow-hidden">
        
        {/* === PARTIE GAUCHE (Formulaire - Inchangée) === */}
        <div className="relative w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-[#0a0a0a] to-[#050505]">
            {/* ... (Tout le contenu de gauche reste identique) ... */}

            <div className="mt-12 md:mt-16 mb-8 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-200 via-orange-400 to-red-500 bg-clip-text text-transparent rubik tracking-wide">
                  {isLoginMode ? "CONNEXION" : "REJOINDRE"}
                </h1>
                <p className="text-gray-400 text-sm mt-3 font-medium tracking-wide">
                  {isLoginMode ? "Prêt à faire entrer le volcan en éruption ?" : "Crée ta légende et domine le classement."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 transition-all duration-300">
                {/* Champ EMAIL */}
                <div className={`flex flex-col gap-1 transition-all duration-500 ease-in-out overflow-hidden ${isLoginMode ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                    <label className="text-[10px] font-bold text-amber-500/80 uppercase tracking-[0.15em] ml-1">Email académique</label>
                    <input
                        type="email"
                        name="email"
                        className="bg-black/50 border border-white/10 p-3 rounded-lg text-white placeholder-gray-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all w-full text-sm font-medium"
                        placeholder="nom@etna-alternance.net"
                        value={formData.email}
                        onChange={handleChange}
                        required={!isLoginMode}
                    />
                </div>

                {/* Champ LOGIN */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1">Login (Pseudo)</label>
                    <input
                        type="text"
                        name="login"
                        className="bg-black/50 border border-white/10 p-3 rounded-lg text-white placeholder-gray-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all text-sm font-medium"
                        placeholder="Ex: dekon_k"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Champ PASSWORD */}
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="bg-black/50 border border-white/10 p-3 rounded-lg text-white placeholder-gray-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all text-sm font-medium tracking-widest"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Champ CONFIRM PASSWORD */}
                <div className={`flex flex-col gap-1 transition-all duration-500 ease-in-out overflow-hidden ${isLoginMode ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'}`}>
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.15em] ml-1">Confirmation</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        className="bg-black/50 border border-white/10 p-3 rounded-lg text-white placeholder-gray-700 focus:border-amber-500 focus:ring-1 focus:ring-amber-500/50 focus:outline-none transition-all text-sm font-medium tracking-widest"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required={!isLoginMode}
                    />
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider text-center p-3 rounded-lg flex items-center justify-center gap-2 animate-pulse">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-500 hover:to-red-600 border-t border-white/20 text-white font-bold py-4 px-4 rounded-lg transition-all transform hover:-translate-y-1 active:scale-95 shadow-[0_4px_20px_rgba(234,88,12,0.3)] hover:shadow-[0_8px_30px_rgba(234,88,12,0.5)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
                >
                    {isLoading ? "Chargement..." : (isLoginMode ? "S'émarger au volcan" : "Créer mon compte")}
                </button>
            </form>
            
             <div className="text-center mt-6">
                <p className="text-xs text-gray-500 font-medium tracking-wide">
                    {isLoginMode ? "Pas encore de compte ?" : "Déjà membre ?"}
                    <button 
                      type="button"
                      onClick={() => {
                        setIsLoginMode(!isLoginMode);
                        setError(null);
                      }} 
                      className="ml-2 text-amber-500 hover:text-amber-400 font-bold hover:underline transition-all uppercase tracking-wider"
                    >
                        {isLoginMode ? "Rejoins l'aventure" : "Connecte-toi"}
                    </button>
                </p>
            </div>
        </div>

        {/* === NOUVELLE PARTIE DROITE (Redesign) === */}
        <div className="hidden md:flex w-1/2 relative overflow-hidden bg-[#030303] items-center justify-center group">
            
            {/* 1. Fond Abstrait "Tech Magma" */}
            <div className="absolute inset-0 opacity-20">
                {/* Grille futuriste */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                {/* Lueur rougeoyante style "circuit" */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.2)_0%,transparent_70%)] mix-blend-screen animate-pulse duration-[4000ms]"></div>
            </div>

             {/* 2. Lumières Volumétriques */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/30 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>

            {/* 3. Contenu Principal */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full w-full p-10 text-center">
                
                {/* Effet de "scan" au survol */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-[2000ms] ease-in-out pointer-events-none"></div>

                {/* Personnage avec effet de survol */}
                <div className="relative transition-all duration-700 transform group-hover:scale-105 group-hover:-translate-y-2">
                  {/* Ombre portée colorée derrière le perso */}
                  <div className={`absolute inset-0 blur-2xl opacity-40 -z-10 ${isLoginMode ? 'bg-orange-500' : 'bg-red-600'} transition-colors duration-700`}></div>
                  <img 
                    src={isLoginMode ? "/p2.png" : "/harris.png"} 
                    alt="Illustration" 
                    className={`mb-8 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-700 ${isLoginMode ? 'scale-100 rotate-0' : 'scale-110 -rotate-3'}`}
                    style={{ maxHeight: "320px" }}
                  />
                </div>

                <h2 className="text-3xl font-bold text-white mb-4 rubik shadow-black drop-shadow-lg tracking-wider">
                  {isLoginMode ? "Welcome Back" : "Deviens une Légende"}
                </h2>
                
                {/* Boite de texte style "HUD" */}
                <div className="relative max-w-sm p-5 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
                    {/* Petite barre lumineuse en haut de la boite */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50"></div>
                    <p className="text-gray-200 text-sm leading-relaxed font-medium tracking-wide">
                        {isLoginMode 
                        ? "Tes LavaCoins n'attendent que toi. Reprends le contrôle de ta production et écrase la concurrence." 
                        : "Rejoins l'élite de l'ETNA. Construis ton empire, débloque des bonus exclusifs et impose ton style."}
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;