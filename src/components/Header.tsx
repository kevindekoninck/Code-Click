import "../../public/logo_code_click.webp";

function Header() {
  return (
    <div className="flex justify-between items-center border-b-2 text-white text-2xl p-1 border-white rubik">
      <div className="flex items-center text-white text-2xl">
        <img
          src="/logo_code_click.webp"
          alt="logo_code_and_click"
          className="logo w-[10%]"
        />

        <h1>Code&Click</h1>
      </div>
      <div className="mr-3">Nous contacter</div>
    </div>
  );
}

export default Header;
