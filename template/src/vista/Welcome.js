import { Button, Spin } from 'antd';
import { Vista, useVista, useApp } from "@essenza/react";
import { AppService } from "@essenza/core";
import Logo from "../assets/img/logo.png";
import { FirstAccess } from '../view/profile/login_firstaccess';

function WelcomeController(c) {
    c.skin = Welcome;
    c.command = {
        EMAIL_CHECK : (request, { data })=>{
            c.request(AppService, m => m.emailConfirm(request).then(r => data.login(r)));
        }
    }
}

export function Welcome({content, token}) {
    const [ctx, control] = useVista(WelcomeController);
    const app = token.current;

    if (!app.irequest)
        content = content || <>
            {Logo && <img src={Logo} className="img-resize centered" style={{ marginTop: "120px"}} alt="Logo" />}
            {/* <Spin /> */}
            <h1 className='text-center'>Benvenuto</h1>
            <Button className="centered" style={{ fontSize: '1.2em' }} type="link" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    else if (app.irequest.type === "FA")
        content = <FirstAccess request={app.irequest} />;
    else if (app.irequest.type === "EM"){
        control.execute("EMAIL_CHECK", {id: app.irequest.data.get("emid"), token: app.irequest.data.get("emreq")}, app);
        content = <Spin />;
    }
    else
        content = <>
            {Logo && <img src={Logo} className="centered" style={{ marginTop: "120px" }} alt="Logo" />}
            <Button className="centered" style={{ fontSize: '2.6em' }} type="link" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    return (
        <Vista context={ctx} >
            <div className='content-max-width'>
                <div className='block-middle-width centered'>
                    {content}
                </div>
            </div>
        </Vista>
    )
}