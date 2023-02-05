import { Button, Col, Input, Select } from "antd";
import { Formix, FormixItem, useForm, useControl, useApp } from "@essenza/react";
import { AppModel } from "@essenza/core";
import * as yup from 'yup';
import { useState } from "react";
const { Option } = Select;
function UserFormController(c) {
    c.skin = UserForm;
    c.command = {
        SAVE: async (path, { control, data }) => {
            //console.log("SAVE", source);
            let form = control.form("user-form");
            let result = await form.validate();
            console.log("COURSE FORM VALIDATION", form, result);
            if (result.isValid) {
                result.node.save().then((r) => {
                    if (path)
                        control.navigate(path, data);
                });
                //In futuro dovrà avvenire automaticamente in datagraph model, così come save su error ripristina dati originali
            }
        },
        INVITEIN: async (info, { model, app }) => {
            let form = c.form("user-form");
            let result = await form.validate();
            console.log("COURSE FORM VALIDATION", form, result);
            if (result.isValid) {
                const route = info.route || app.settings.route[result.data.itype];
                model.read(AppModel, m => m.invitein(result.data, route).then(r => c.navigate("/settings")));
            }
        }
    }
}

export function UserForm({ source, label, isUpdate, route, npath, noroles }) {
    const app = useApp();
    const [control] = useControl(UserFormController);
    const form = useForm("user-form", source, control, null, yup.object({
        tname: yup.string().required("Nome è una informazione richiesta."),
        tsurname: yup.string().required("Cognome è una informazione richiesta."),
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
    }));
    const [value, setValue] = useState();
    let roles = [];
    if(!noroles && app.settings.roles)
        roles = app.settings.roles;

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onclick = isUpdate
        ? () => control.execute("SAVE", npath)
        : () => control.execute("INVITEIN", {route: route, noroles: noroles});
    return (
        <Formix control={control} form={form} layout='vertical' className="ec-form bg-block radius-md padding-xl">
            <FormixItem label="Nome" name="tname">
                <Input placeholder="Mario"></Input>
            </FormixItem>
            <FormixItem label="Cognome" name="tsurname">
                <Input placeholder="Rossi"></Input>
            </FormixItem>
            {source?.data.itype === 2 && <FormixItem label="Azienda" name="tbusinessname">
                <Input placeholder="Nome Azienda"></Input>
            </FormixItem>}
            <FormixItem label="Email" name="temail">
                <Input placeholder="email@email.it"></Input>
            </FormixItem>
            {!noroles && <FormixItem label="Tipo" name="itype">
                <Select placeholder="Tipo Utente" className="w100">
                    {roles.map((v,i)=><Option value={i}>{v}</Option>)}
                </Select>
            </FormixItem>}
            <Col span={24} className="text-center">
                <Button className="btn-dark " onClick={onclick}> {label || "Inserisci"} </Button>
            </Col>
        </Formix>
    )
}