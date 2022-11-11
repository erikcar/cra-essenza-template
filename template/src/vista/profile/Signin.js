import Logo from "../../assets/img/logo.png";

export function CheckEmail(){
    return (
        <div className='w100'>
                <div className='block-max-width centered'>
                <img src={Logo} style={{ verticalAlign: "top"}} alt="Logo Banca bbc" className="elements-spacing-b16 img-resize" />
                    <h1>
                        Controlla la tua mail per confermare la registrazione.
                    </h1>
                </div>
            </div>
    )
}