import { AppModel } from "@essenza/core";
import { Formix, FormixItem, useForm, useControl } from "@essenza/react";
import { Col, Button, Form, Input, Row } from 'antd';
import React from "react";
import * as yup from 'yup';

function ProfileFormController(c) {
    c.skin = ProfileForm;
    c.command = {
        SAVE: async (path, { control, model }) => {
            let form = control.form("profile-form");
            let result = await form.validate();
            if (result.isValid) {
                if (result.isValid) {
                    model.request(AppModel, m => m.updateProfile(result.data).then((r) => {
                        if (path)
                            control.navigate(path);
                        else
                            control.closePopup();
                    }));
                }
            }
        },
        CHANGE_PASSWORD: async (path, { control, model }) => {
            let form = control.form("password-form");
            let result = await form.validate();
            if (result.isValid) {
                model.request(AppModel, m => m.changePassword(result.data).then((r) => {
                    if (path)
                        control.navigate(path);
                    else
                        control.closePopup();
                }));
            }
        }
    }
}

export function ProfileForm({ source, label, title, npath }) {
    const [control] = useControl(ProfileFormController);
    const form = useForm("profile-form", source, control);
    const pform = useForm("password-form", source, control, null, yup.object({
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
        npassword: yup.string().required("Password è una informazione richiesta.").matches(
            /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,24}$/,
            "Deve contenere Almeno 8 Caratteri, almeno una maiuscola, almeno una minuscola, almeno un umero ed almeno un carattere speciale"
        ),
        cpassword: yup.string().required("Conferma password richiesta.").test('passwords-match', 'Passwords non corrispondenti', function (value) {
            return this.parent.npassword === value;
        }),
    }));
    return (
        <>
            <div className="custom-form bg-sec round-sm mt-sm padding-xl text-left">
                <Formix control={control} form={form} layout='vertical' >
                    <h2 className="pb-md">Profilo</h2>
                    <FormixItem label="Name" name="tname">
                        <Input>
                        </Input>
                    </FormixItem>
                    <FormixItem label="Surname" name="tsurname">
                        <Input >
                        </Input>
                    </FormixItem>
                    <div className="right-align">
                        <Button className="primaryButton" onClick={() => control.execute("SAVE", "/home")}>
                            Aggiorna
                        </Button>
                    </div>
                </Formix>
            </div>
            <div className="custom-form bg-sec round-sm mt-sm padding-xl text-left">
                <Formix control={control} form={pform} layout='vertical'>
                    <h2 className="pb-md" >Credenziali</h2>
                    <FormixItem label="E-mail" name="temail">
                        <Input >
                        </Input>
                    </FormixItem>
                    <FormixItem label="Actual Password" name="tpassword">
                        <Input.Password >
                        </Input.Password>
                    </FormixItem>
                    <FormixItem label="New password" name="npassword">
                        <Input.Password>
                        </Input.Password>
                    </FormixItem>
                    <FormixItem label="Confrim new password" name="cpassword">
                        <Input.Password>
                        </Input.Password>
                    </FormixItem>
                    <div className="right-align">
                        <Button className="primaryButton" onClick={() => control.execute("CHANGE_PASSWORD", "/home")}>
                            Aggiorna
                        </Button>
                    </div>
                </Formix>
            </div>
        </>
    )
}