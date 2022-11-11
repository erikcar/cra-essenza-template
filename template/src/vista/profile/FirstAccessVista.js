import { Vista, useVista } from "@essenza/react";
import { FirstAccess } from "../../view/profile/login_firstaccess";

function FirstAccessVistaController(c) {
    c.skin = FirstAccessVista;
}

export function FirstAccessVista() {
    const [ctx] = useVista(FirstAccessVistaController);
    return (
        <Vista context={ctx} >
            <div className='content-max-width'>
                <div className='block-middle-width centered'>
                    <FirstAccess />
                </div>
            </div>
        </Vista>
    )
}