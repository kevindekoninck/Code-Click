import { useRef } from "react";

function Footer() {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    modalRef.current?.showModal();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <footer className="bg-[#3D2626] text-white rubik p-4">
      <div className="flex justify-center mb-4">
        <button
          onClick={openModal}
          className="underline hover:text-gray-300 transition-colors"
        >
          Informations légales
        </button>
      </div>
      <dialog
        ref={modalRef}
        className="m-auto inset-0 p-6 rounded-xl bg-[#3D2626] text-white backdrop:bg-black/50 border border-white/20 shadow-2xl max-w-lg w-full text-center"
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold border-b border-white/20 pb-2">
            Mentions légales
          </h2>
          <div className="text-sm space-y-2">
            <p className="italic">
              Ce site est un projet étudiant réalisé à des fins pédagogiques. Il
              ne poursuit aucun but commercial.
            </p>
            <div className="mt-4">
              <p className="font-bold underline mb-1">
                Responsables du projet :
              </p>
              <ul className="space-y-1">
                <li>Harris Mohammad</li>
                <li>Kévin De Koninck</li>
                <li>Damien Le Caillec</li>
              </ul>
            </div>
            <p className="text-xs text-gray-300 mt-4">
              Les éléments graphiques et noms utilisés sont fictifs ou utilisés
              dans un cadre pédagogique. Les données sont utilisées uniquement
              dans le cadre du jeu et ne sont pas partagées.
            </p>
          </div>
          <button
            onClick={closeModal}
            className="mt-4 bg-white text-[#3D2626] px-4 py-2 rounded font-bold hover:bg-gray-200 transition-colors"
          >
            Fermer
          </button>
        </div>
      </dialog>
      <div className="flex justify-center">
        <div className="flex flex-col text-center">
          <p className="">© 2025 Code & Click — Projet étudiant ETNA.</p>
          <p>Tous droits réservés.</p>
          <p>
            Ce projet est fictif et n'est pas affilié officiellement à l'ETNA.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
