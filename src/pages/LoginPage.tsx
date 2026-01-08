import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Identifiants incorrects");
        return;
      }

      // Sauvegarde du token
      localStorage.setItem("token", data.token);

      // Redirection
      navigate(`/principale/${data.etna_id}`);
    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <div className="flex flex-col rubik bg-gradient-to-br from-[#3b2424] to-[#100a0a] text-white min-h-screen justify-center items-center">
      
      <button 
        onClick={() => navigate('/')} 
        className="absolute top-25 left-5 text-gray-400 hover:text-white"
      >
        ← Retour à l'accueil
      </button>

      <section className="flex justify-center w-full mt-20" id="form">
        <div className="relative w-[50%] flex justify-between">
          <img
            src="/yagan.png"
            alt="personnage"
            className="absolute -top-[148px] left-[400px] -translate-x-1/2 w-40 z-20"
          />

            <form
            onSubmit={handleSubmit}
            className="border-b-2 border-l-2 border-t-2 bg-[#ffffff40] rounded-l-2xl w-[50%]"
            >
                <div className="flex justify-center text-2xl mt-6">
                    <h1>Connexion</h1>
                </div>

                <div className="p-3 mt-8">
                    <h1>
                        Renseignez vos identifiants <br /> ETNA
                    </h1>
                </div>

                <div className="flex justify-center">
                    <div className="flex flex-col justify-center w-[60%] gap-5">
                        <input
                        type="text"
                        className="border-2 p-2 rounded-lg text-white"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                        />

                        <input
                        type="password"
                        className="border-2 p-2 rounded-lg text-white"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </div>
                </div>

                {error && <p className="text-red-500 text-center mt-4 bg-black/50 p-1 rounded">{error}</p>}

                    <div className="flex justify-center w-[100%] gap-28 mt-12 mb-20">
                        <div className="flex gap-14">
                            <button
                            type="submit"
                            className="border-2 p-2 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
                            >
                            Émarger vous
                            </button>
                        </div>
                    </div>
          </form>

          <section
            className="w-[50%] flex bg-gradient-to-br from-[#653535] to-[#040404]"
            id="droite"
          >
            <div className="border-amber-50 flex-col rounded-r-2xl border-t-2 border-b-2 border-r-2 w-full flex justify-center text-center">
                <p className="mt-5 px-4">
                    Prêt à débloquer toutes les fonctionnalités et à sauvegarder
                    votre progression ? Connectez-vous en quelques secondes pour
                    démarrer l'aventure !
                </p>
                <div className="flex justify-center mt-4">
                    <img src="/p2.png" alt="" className="max-h-[200px] object-contain" />
                </div>
            </div>
            </section>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;