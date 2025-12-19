

import '../../public/logo_code_click.webp'
import "../../public/boutton_click.webp"
import "../../public/monnaie.webp"

function ClickerZone() {

    const handleClick = () => {
        
    }
    return (
        <div className='clicker_zone'>
            <section id='money_indicator'>
                <img src="/monnaie.webp" alt="Monaie LavaCoins" />
                <h1 id='LavaCoins'>0</h1>
            </section>
            <section id='btn_volcano'>
                <button onClick={handleClick}><img src="/boutton_click.webp" alt="Bouton où il faut faire click" /></button>
            </section>
        </div>
    )
        
}

export default ClickerZone