import React from 'react';
import * as yup from 'yup';

import { Button, Input, Spin } from 'antd';

import { DataSource, AppService } from '@essenza/core';
import { useControl, useForm, useGraph, Formix, FormixItem } from '@essenza/react';

function SigninController(c) {
    c.skin = Signin;
    c.command = {
        SIGNIN: async (name, {model, app, route}) => {
            name = name || "signin-form";
            const result = await c.form(name).validate();
            if(result.isValid){
                const data = result.values;
                c.openPopup(<Spin />, "SIGNIN");
                c.request(AppService, m=>m.signinWithConfirm(data.temail, data.tpassword, route)).then(r=>{
                    c.openPopup(<div>Check your email to confirm registration.</div>, "Email Verification", null, {onconfirm: ()=>window.close()});
                    c.navigate("/onsignin");
                }, ()=> {c.openPopup(<div>Email already registered. Please login or recover your password.</div>, "WARNING"); c.navigate("/login");});
            }
        }
    }
}

export function Signin({ vmodel }) {
    const [control] = useControl(SigninController);
    const settings = useGraph("system.settings").data;
    const form = useForm("signin-form", new DataSource({}), control, null, yup.object({
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
        tpassword: yup.string().required("Password è una informazione richiesta.").matches(
            ///^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@#$%^&(){}[]:;<>,.?~_+-=|\]).{8,32}$/,
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/,
            "Deve contenere Almeno 8 Caratteri, almeno una maiuscola, almeno una minuscola, almeno un umero ed almeno un carattere speciale"
          ),
          cpassword: yup.string().required("Conferma password richiesta.").test('passwords-match', 'Passwords non corrispondenti', function(value){
            return this.parent.tpassword === value;
          }),
    }));

    return (
        <Formix control={control} form={form} layout='vertical' className="layout-form">
            <FormixItem label="E-mail" name="temail">
                <Input placeholder="email"></Input>
            </FormixItem>
            <FormixItem label="New Password" name="tpassword">
                <Input.Password placeholder="password"></Input.Password>
            </FormixItem>
            <FormixItem label="Confirm Password" name="cpassword">
                <Input.Password placeholder="confirm password"></Input.Password>
            </FormixItem>
            <FormixItem>
                <Button className='block-pri h6' onClick={() => control.execute("SIGNIN", "signin-form", null, null, {route: settings.BaseUrl})}>
                    Signin
                </Button>
            </FormixItem>
            <p className="bold">Signed? <Button className='' type="link" onClick={() => control.navigate("/login")}>
                Go to Login
            </Button></p>
        </Formix>
    )
}