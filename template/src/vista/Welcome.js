import { Button, Spin } from 'antd';
import { Vista, useVista, useApp } from "@essenza/react";
import { AppService } from "@essenza/core";
import { FirstAccess } from '../view/profile/login_firstaccess';
import { Logo } from '../layout/logo';

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
            <h1 className='text-center py-lg'>Benvenuto</h1>
            <Button className="centered btn-dark" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    else if (app.irequest.type === "FA")
        content = <FirstAccess request={app.irequest} />;
    else if (app.irequest.type === "EM"){
        control.execute("EMAIL_CHECK", {id: app.irequest.data.get("emid"), token: app.irequest.data.get("emreq")}, app);
        content = <Spin />;
    }
    else
        content = <>
            <Button className="centered btn-dark" onClick={() => app.navigate("/login")}>Vai al Login</Button>
        </>;
    return (
        <Vista context={ctx} >
            <div className='content-max-width'>
                <div className='max-width-md centered'>
                    <Logo className="centered" style={{ marginTop: "120px", }} />
                    {content}
                </div>
            </div>
        </Vista>
    )
}