import { Row, Col, Button } from 'antd';
import React, { useEffect } from 'react';
import { useGraph, useModel, useVista, Vista } from '@essenza/react';
import { StartForm } from '../../view/profile/StartForm';
import { UserModel } from '@essenza/core';
import { useLocation } from 'react-router-dom';

function Controller(c) {
    c.skin = StartVista;
}

export function StartVista({ vmodel }) {
    const [ctx, model, control] = useVista(StartVista, Controller);

    const user = useGraph(UserModel, "profile");
    const info = useLocation().state;

    useEffect(() => {
        if (model) {
            if (info.user === "F")
                model.read(UserModel, m => m.eprofile(info.email));
            else {
                model.setSource(UserModel, { temail: info.email }, "profile");
            }
        }
    }, [model]);

    if (!user.data) return null;

    return (
        <Vista context={ctx} >
            <div className="w100">
                <div className="max-width-md centered padding-sm">
                    <h1 style={{ marginBottom: '0' }} className='py-lg'>Completa il tuo profilo</h1>
                    <StartForm source={user} />
                </div>
            </div>
        </Vista>
    )
}