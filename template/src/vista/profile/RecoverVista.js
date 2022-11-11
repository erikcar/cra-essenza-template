import { Col, Row } from "antd";
import { Vista, useVista } from "@essenza/react";
import Logo from "../../assets/img/logo.png";
import { LoginRecover } from "../../view/profile/login_recover";

function RecoverVistaController(c) {
    c.skin = RecoverVista;
}

export function RecoverVista() {
    const [ctx] = useVista(RecoverVistaController);
    return (
        <Vista context={ctx} >
            <div className='w100'>
                <div className='block-middle-width centered'>
                    <Row className='content-max-width h-main padding-sm' align="middle">
                        <Col span={24} className="bg-sec padding-xl">
                            <img src={Logo} style={{ verticalAlign: "top", width: "560px" }} alt="Logo" className="elements-spacing-b16 img-resize" />
                             <h1>
                                Recupero Password
                            </h1> 
                            <LoginRecover />
                        </Col>
                    </Row>
                </div>
            </div>
        </Vista>
    )
}