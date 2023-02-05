import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Button, Input } from 'antd';

import { DataSource, AppModel } from '@essenza/core';
import { useControl, useForm, Formix, FormixItem } from '@essenza/react';

function LoginController(c) {
    c.skin = Login;
    c.command = {
        LOGIN: async (info, { model, app }) => {
            let name = info.name || "login-form";
            const result = await c.form(name).validate();
            if (result.isValid) {
                const call = [
                    m => m.login(data.temail, data.tpassword),
                    m => m.elogin(data.temail, data.tpassword, info.role),
                    m => m.platformin(data.temail, data.tpassword, info.role)
                ]
                let data = result.values;
                if (!data.temail) {
                    let instance = result.form.getFieldInstance("temail");
                    instance.focus();
                    instance.blur();

                    setTimeout(() => {
                        data = result.form.getFieldsValue(true);
                        model.request(AppModel, call[info.mode]).then(r => {
                            app.login(r);
                        });
                    }, 1000)
                }
                else {
                    model.request(AppModel, call[info.mode]).then(r => {
                        app.login(r);
                    });
                }
            }
        }
    }
}

export function Login({ nosignin, mode, role }) {
    mode = mode || 0;
    const [control] = useControl(LoginController);
    const form = useForm("login-form", new DataSource({}), control, null, yup.object({
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
        tpassword: yup.string().required("Password è una informazione richiesta."),
    }));

    useEffect(()=>{
        let instance = form.target.getFieldInstance("temail");
                    instance.focus();
    }, []);
    
    return (
        <Formix control={control} form={form} layout='vertical' className="layout-form">
            <FormixItem label="E-mail" name="temail">
                <Input></Input>
            </FormixItem>
            <FormixItem label="Password" name="tpassword">
                <Input.Password onPressEnter={() => control.execute("LOGIN", {mode: mode, role: role})} ></Input.Password>
            </FormixItem>
            <Button style={{ float: 'right' }} type="link" onClick={() => control.navigate("/loginrec")}>
                Password dimenticata ?
            </Button>
            <FormixItem>
                <Button className='btn-dark' onClick={() => control.execute("LOGIN", {mode: mode, role: role})}>
                    Login
                </Button>
            </FormixItem>
            {!nosignin && <p className="">Primo Accesso? <Button className='bolder h6 primary' type="link" onClick={() => control.navigate("/signin")}>
                Registrati
            </Button></p>}
        </Formix>
    )
}