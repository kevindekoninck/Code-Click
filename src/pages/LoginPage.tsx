import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  // État pour savoir si on est en mode "Connexion" (true) ou "Inscription" (false)
  const [isLoginMode, setIsLoginMode] = useState(true);
  
  // États du formulaire unifié
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    confirmPassword: "" // Utilisé uniquement pour l'inscription
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Gestion générique des champs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 1. Validation basique (Inscription uniquement)
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas !");
      setIsLoading(false);
      return;
    }

    // 2. Choix de l'URL selon le mode
    // Vérifie bien ces routes avec ton back-end (ex: /login vs /register)
    const endpoint = isLoginMode ? "/users/login" : "/users/register";
    const url = `http://localhost:3000${endpoint}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          login: formData.login,
          password: formData.password,
          // Ajoute d'autres champs si besoin pour l'inscription (team, etc.)
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      // 3. Scénarios de succès
      if (isLoginMode) {
        // Cas Connexion : On stocke et on redirige
        localStorage.setItem("token", data.token);
        navigate(`/principale/${data.etna_id}`);
      } else {
        // Cas Inscription réussie :
        // Option A : On connecte directement l'utilisateur (si le back renvoie un token)
        if (data.token) {
           localStorage.setItem("token", data.token);
           navigate(`/principale/${data.etna_id}`);
        } else {
           // Option B : On le force à se connecter
           alert("Compte créé avec succès ! Connectez-vous.");
           setIsLoginMode(true);
           setFormData({ ...formData, password: "", confirmPassword: "" });
        }
      }

    } catch (err: any) {
      setError(err.message || "Erreur serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center rubik bg-[#050505] relative overflow-hidden text-white p-4">
      
      {/* --- FOND DÉCORATIF (Amélioration des couleurs) --- */}
      {/* Un cercle rougeoyant en haut à gauche */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/40 blur-[120px] rounded-full pointer-events-none"></div>
      {/* Un cercle orangé en bas à droite */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-900/30 blur-[100px] rounded-full pointer-events-none"></div>
      
      {/* Bouton Retour */}
      <button 
        onClick={() => navigate('/')} 
        className="self-start mb-6 md:absolute md:top-8 md:left-8 md:mb-0 flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors z-30 font-bold"
      >
        <span>←</span> Retour accueil
      </button>

      {/* --- CARTE PRINCIPALE --- */}
      <div className="relative w-full max-w-4xl flex flex-col md:flex-row shadow-2xl shadow-black/50 rounded-3xl mt-12 md:mt-0 z-10 animate-fade-in-up">
        
        {/* === PARTIE GAUCHE (Formulaire Dynamique) === */}
        <div className="relative w-full md:w-1/2 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8 flex flex-col justify-center">
            
            {/* Yagan (Mascotte) - Positionné à cheval sur le bord haut */}
            <img
                src="/yagan.png"
                alt="Yagan"
                className="absolute left-1/2 transform -translate-x-1/2 -top-28 w-40 drop-shadow-2xl z-20 pointer-events-none hover:scale-110 transition duration-500"
            />

            <div className="mt-12 mb-6 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-200 to-orange-500 bg-clip-text text-transparent">
                  {isLoginMode ? "Connexion" : "Rejoindre l'ETNA"}
                </h1>
                <p className="text-gray-400 text-sm mt-2">
                  {isLoginMode ? "Bon retour parmi nous, légende." : "Créez votre légende volcanique."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 md:px-6 transition-all duration-300">
                
                {/* Champ Login */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Login</label>
                    <input
                        type="text"
                        name="login"
                        className="bg-black/40 border border-white/10 p-3 rounded-xl text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all"
                        placeholder="Ex: dekon_k"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Champ Password */}
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Mot de passe</label>
                    <input
                        type="password"
                        name="password"
                        className="bg-black/40 border border-white/10 p-3 rounded-xl text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Champ Confirm Password (Visible uniquement en mode Inscription) */}
                {!isLoginMode && (
                  <div className="flex flex-col gap-1 animate-fade-in">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Confirmation</label>
                      <input
                          type="password"
                          name="confirmPassword"
                          className="bg-black/40 border border-white/10 p-3 rounded-xl text-white placeholder-gray-600 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none transition-all"
                          placeholder="••••••••"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required
                      />
                  </div>
                )}

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-200 text-sm text-center p-3 rounded-lg mt-2 flex items-center justify-center gap-2">
                        ⚠️ {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full bg-gradient-to-r from-orange-700 to-red-700 hover:from-orange-600 hover:to-red-600 border border-orange-500/30 text-white font-bold py-3.5 px-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Chargement..." : (isLoginMode ? "S'émarger" : "Créer mon volcan 🌋")}
                </button>
            </form>
            
             <div className="text-center mt-6 pb-2">
                <p className="text-sm text-gray-400">
                    {isLoginMode ? "Pas encore de compte ?" : "Déjà un compte ?"}
                    <button 
                      type="button"
                      onClick={() => {
                        setIsLoginMode(!isLoginMode);
                        setError(null); // Reset erreur au changement
                      }} 
                      className="ml-2 text-amber-400 hover:text-amber-300 font-bold underline decoration-amber-500/30 hover:decoration-amber-300 transition-all"
                    >
                        {isLoginMode ? "Inscrivez-vous" : "Connectez-vous"}
                    </button>
                </p>
            </div>
        </div>

        {/* === PARTIE DROITE (Visuel / Marketing) === */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-[#1a0505] to-black rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none border-t border-b border-r border-white/10 p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group">
            
            {/* Effet de brillance au survol */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col items-center h-full justify-center">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {isLoginMode ? "Prêt à cliquer ?" : "Rejoignez l'élite"}
                </h2>
                
                <p className="text-gray-300 leading-relaxed mb-8 max-w-xs">
                    {isLoginMode 
                      ? "Sauvegardez votre progression, grimpez dans le classement et dominez le campus ETNA." 
                      : "Créez votre compte maintenant pour commencer l'aventure Code & Click. La gloire vous attend."}
                </p>
                
                {/* Image dynamique selon le mode */}
                <img 
                  src={isLoginMode ? "/p2.png" : "/harris.png"} 
                  alt="Illustration" 
                  className="max-h-[220px] object-contain drop-shadow-[0_10px_20px_rgba(255,100,0,0.2)] transition-all duration-500 key={isLoginMode}" 
                />
            </div>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;