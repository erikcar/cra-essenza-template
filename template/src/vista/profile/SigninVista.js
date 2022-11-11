import { Col, Row } from "antd";
import { Vista, useVista } from "@essenza/react";
import Logo from "../../assets/img/logo.png";
import { Signin } from "../../view/profile/signin_form";

function SigninVistaController(c) {
    c.skin = SigninVista;
}

export function SigninVista() {
    const [ctx] = useVista(SigninVistaController);
    return (
        <Vista context={ctx} >
            <div className='w100'>
                <div className='block-middle-width centered'>
                    <Row className='content-max-width h-main padding-sm' align="middle">
                        <Col span={24} className="bg-sec padding-xl">
                            <img src={Logo} style={{ verticalAlign: "top", width: "560px" }} alt="Logo Banca bbc" className="elements-spacing-b16 img-resize" />
                            <h1>
                                Registarti
                            </h1>
                            <Signin />
                        </Col>
                    </Row>
                </div>
            </div>
        </Vista>
    )
}