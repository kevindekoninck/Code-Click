import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

function PrincipalePage() {
  const { etna_id } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  type User = {
    etna_id: number;
    login: string;
    lava_coins: number;
    student_type: string[];
    current_clicks: number;
    team_name: string;
    fairplay_points: number;
    battery_level: number;
    logged_in: boolean;
    user_token: string;
    token_expiration: string;
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:3000/users/${etna_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Accès refusé");
          return;
        }

        setUser(data);
      } catch (err) {
        console.error("Erreur fetch:", err);
        setError("Erreur serveur");
      }
    };

    fetchUser();
  }, [etna_id]);
  if (!user) return <p>Chargement...</p>;

  return (
    <main className="flex justify-center text-white text-2xl">
      <div className="p-6">
        <p>Bienvenu {user.login}</p>
      </div>
    </main>
  );
}

export default PrincipalePage;
