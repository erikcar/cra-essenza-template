import React, { useEffect } from 'react';
import * as yup from 'yup';
import { Button, Input } from 'antd';

import { DataSource, AppModel } from '@essenza/core';
import { useModel, useForm, Formix, FormixItem } from '@essenza/react';

function Controller(c) {
    c.skin = Login;
    c.command = {
        LOGIN: async (info, { model, app }) => {
            let name = info.name || "login-form";
            const result = await info.form.validate();
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
                    model.request(AppModel, call[info.mode]).then(s => {
                        const settings = app.settings;
                        if(settings.usertype !== parseInt(s.itype) && settings.router){
                            localStorage.setItem("_session", JSON.stringify(s));
                            window.location = window.location.origin + settings.router[s.itype] + "?loginreq=y";
                        }
                        else
                            app.login(s);
                    });
                }
            }
        }
    }
}

export function Login({ nosignin, mode, role }) {
    mode = mode || 0;
    const [model, control] = useModel(Login, Controller);
    const form = useForm("form", new DataSource({}), model, null, yup.object({
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
                <Button className='btn-dark' onClick={() => control.execute("LOGIN", {mode: mode, role: role, form: form})}>
                    Login
                </Button>
            </FormixItem>
            {!nosignin && <p className="">Primo Accesso? <Button className='bolder h6 primary' type="link" onClick={() => control.navigate("/signin")}>
                Registrati
            </Button></p>}
        </Formix>
    )
}