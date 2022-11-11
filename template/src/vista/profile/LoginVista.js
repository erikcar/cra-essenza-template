import { Col, Row } from "antd";
import {Vista, useVista} from "@essenza/react";
import Logo from "../../assets/img/logo.png";
import LoginScreen from '../../assets/img/login.jpg';
import { Login } from "../../view/profile/login_form";

function LoginVistaController(c) {
    c.skin = LoginVista;
}

export function LoginVista() {
    const [ctx] = useVista(LoginVistaController);
    return (
        <Vista context={ctx} >
            <div className='w100'>
                <div className='block-max-width centered'>
                    <Row className='content-max-width h-main padding-sm' align="middle">
                        <Col span={0} md={12} className="">
                            <div>
                                <img src={LoginScreen} className="round-sm " style={{ width: "760px" }} alt="Etna Cover"></img>
                            </div>
                        </Col>
                        <Col span={24} md={12} className="bg-sec padding-xl h-md round-sm">
                            <img src={Logo} style={{ verticalAlign: "top"}} alt="Logo" className="mb-sm img-resize" />
                            <h1>
                                Login App!
                            </h1>
                            <Login />
                        </Col>
                    </Row>
                </div>
            </div>
        </Vista>
    )
}