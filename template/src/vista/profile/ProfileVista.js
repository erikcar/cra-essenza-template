import { Row, Col, Button} from 'antd';
import React, { useEffect } from 'react';
import {useGraph, useModel, useVista, Vista } from '@essenza/react';
import { ProfileForm } from '../../view/profile/ProfileForm';
import { UserModel } from '../../model/UserModel';

function ProfileVistaController(c) {
    c.skin = ProfileVista;
}

export function ProfileVista({ vmodel }) {
    const [ctx, control] = useVista(ProfileVistaController);
    const [model] = useModel();
    const user = useGraph(UserModel, "profile");

    useEffect(() => {
        if (model) {
            model.read(UserModel, m => m.profile());
        }
    }, [model]);

    if (!user.data) return null;

    return (
        <Vista context={ctx} >
            <div className="w100">
                <div className="block-middle-width centered">
                    <Row className='content-max-width h-main padding-sm' align='middle'>
                        <Col span={24}><h1 style={{ marginBottom: '0' }} className='pt-md pb-sm'>Gestisci il tuo profilo</h1></Col>
                        <Col span={24} >
                            <Button type="link" onClick={() => control.navigate(-1)}>
                                Torma alla App 
                            </Button>
                            <Button type="link" onClick={() => control.navigate(0)}>
                                Logout
                            </Button>
                        </Col>
                    </Row>
                    <ProfileForm source={user} />
                </div>
            </div>
        </Vista>
    )
}