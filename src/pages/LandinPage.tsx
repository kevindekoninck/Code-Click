import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  // Fonction pour aller à la page de login
  const handleStartGame = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col rubik bg-gradient-to-br from-[#3b2424] to-[#100a0a] text-white ">
      <div className="bg-[url('/bgVolcan.png')] bg-cover bg-center h-screen w-full ">
        <div className="h-screen w-full bg-[#000000bd]">
          {" "}
          <div className="flex justify-center  ">
            <div className="flex flex-col">
              <div className=" flex justify-center">
                <img src="/slogan.png" className="mt-40 w-[110%]" alt="" />
              </div>
              <p className="text-center">
                Transforme ton parcours à l'ETNA en un clicker RPG : <br />{" "}
                clique, code et combats la Mouli pour devenir la légende du{" "}
                <br />
                campus.
              </p>
              <div className="flex justify-center">
                <img src="/logo_code_click.webp" className="w-[40%]" alt="" />
              </div>
              <div className="flex gap-17 justify-center">
                <div>
                  {/* MODIFICATION ICI : Navigation vers /login */}
                  <button 
                    onClick={handleStartGame}
                    className="border-2 p-1.5 rounded-lg cursor-pointer hover:border-red-950 text-2xl hover:text-amber-100 hover:animate-pulse"
                  >
                      Start Eruption
                  </button>
                </div>
                <div>
                  <button className="border-2 p-1.5 rounded-lg cursor-pointer">
                    <h1 className="text-2xl hover:text-blue-950">
                      En savoir plus
                    </h1>
                  </button>
                </div>
              </div>
              <div className="flex justify-center  mt-64">
                <h1 className="mT-20 animate-bounce text-6xl flex justify-center">
                  <img className="w-[10%]" src="/arrow.png" alt="" />
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="w-full bg-[#48252598]">
        <div className="grid grid-cols-3">
          <div className="p-10 ml-4  w-[40%]">
            <h1 className="flex justify-center items-center text-2xl text-center">
              Made By ETNA Students
            </h1>
            <img className="w-[100%]" src="p4.png" alt="" />
          </div>
          <div className="p-10 ml-4  w-[40%]">
            <h1 className="flex justify-center items-center text-2xl text-center">
              Made to learn with FUN
            </h1>
            <img className="w-[100%]" src="p1.png" alt="" />
          </div>
          <div></div>
        </div>
      </section>
      <section>
        <div className="flex justify-center">
          <img src="/leaf.png" alt="" />
        </div>
        <div className="flex justify-between p-10   ">
          <div className="border-2 rounded-lg  p-6 w-[30%] bg-gradient-to-br from-[#9E6161] to-[#0B0101]">
            <div className="flex flex-col items-start ml-5">
              <div className="">
                <img className="w-[70%] " src="/lavacoins.png" alt="" />
              </div>
              <div>
                <h1 className="text-4xl">Click to Erupt</h1>

                <p>
                  Un gameplay simple, mais incroyablement addictif. Chaque clic
                  déclenche des éruptions volcaniques et vous rapporte des Lava
                  Coins.
                </p>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg  p-6 w-[30%] bg-gradient-to-br from-[#9E6161] to-[#0B0101]">
            <div className="flex flex-col items-start ml-5">
              <div className="">
                <img className="mb-9 w-[70%] " src="/powerUp.png" alt="" />
              </div>
              <div>
                <h1 className="text-4xl">Epic Power Ups</h1>

                <p>
                  Débloquez des améliorations puissantes, des mineurs
                  automatisés et des amplificateurs volcaniques pour augmenter
                  votre puissance d'éruption.
                </p>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-lg  p-6 w-[30%] bg-gradient-to-br from-[#9E6161] to-[#0B0101]">
            <div className="flex flex-col items-start ml-5">
              <div className="">
                <img className="w-[70%] " src="/trophe.png" alt="" />
              </div>
              <div>
                <h1 className="text-4xl">Classement Inter-ETNA</h1>

                <p>
                  Affrontez les étudiants de l'ETNA (IDV/ISR) et grimpez dans
                  les classements pour vous imposer comme le meilleur
                  développeur du campus et le maître incontesté du Clic & Code.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-end absolute right-0">
          <img src="harris2.jpg" alt="" />
        </div>
        <div className=" flex justify-between mb-64   p-5 mt-64">
          <div className="flex justify-center ml-20 ">
            <div className=" ">
              <div className="  flex justify-start   items-center">
                <h1 className="text-6xl ">
                  Simple et <br />{" "}
                  <h1 className="text-red-900 text-shadow-2xl  ">addictif</h1>
                </h1>
                <img className="w-[25%]" src="p3.png" alt="" />
              </div>
              <div>
                <p className="text-2xl">
                  Commencez avec un volcan dormant et transformez-le en <br />{" "}
                  une catastrophe d'ampleur mondiale. Chaque clic vous <br />
                  rapproche de la suprématie volcanique ultime.
                </p>{" "}
                <br />
                <p className="text-lg">
                  1-Cliquez sur le volcan pour déclencher des éruptions (votre
                  progression). <br /> <br />
                  2-Gagnez des points ardents (votre monnaie/score) à chaque
                  éruption. <br /> <br />
                  3-Améliorez votre volcan et vos compétences pour des bonus
                  massifs de production.
                </p>
              </div>
            </div>
          </div>
          <div className="border-2 w-[30%] mr-11 flex justify-center items-center rounded-2xl">
            <h1>Images du jeu</h1>
          </div>
        </div>
      </section>

      <section className="  mb-64">
        <section className="flex justify-center w-[100%] items-center">
          <div>
            <img src="/TopVolcanoMasters.png" alt="" />
          </div>
        </section>

        <div className="flex  mt-6">
          <div className="absolute">
            <img src="/kevin2.png" alt="" />
          </div>
          <div className="w-[100%] flex justify-center">
            <div className="border-2 bg-amber-950/10 border-red-700 w-[60%] rounded-2xl ">
              <div className="flex justify-center p-5">
                <div className="border-2 w-[100%] p-5 rounded-xl text-start border-amber-500 bg-amber-300/10">
                  <h1 className="text-4xl">🏆 Harris</h1>
                  <p>Niveau 999</p>
                </div>
              </div>
              <div className="flex justify-center p-5">
                <div className="border-2 w-[100%] p-5 rounded-xl border-red-500 bg-red-300/10">
                  <h1 className="text-4xl">Damien</h1>
                  <p>Niveau 900</p>
                </div>
              </div>
              <div className="flex justify-center p-5">
                <div className="border-2 w-[100%] p-5 rounded-xl border-orange-500 bg-orange-300/10">
                  <h1 className="text-4xl">Kevin</h1>
                  <p>Niveau 160</p>
                </div>
              </div>
              <div className="flex justify-end p-2">
                <button className="p-2.5 border-2 rounded-lg hover:border-red-950 cursor-pointer hover:text-red-800">
                  Voir le classements
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;