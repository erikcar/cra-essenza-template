import { Button, Col, Input, Select } from "antd";
import { Uploader, Formix, FormixItem, useForm, useModel, useApp } from "@essenza/react";
import { AppModel } from "@essenza/core";
import * as yup from 'yup';
import { useState } from "react";
const { Option } = Select;
function Controller(c) {
    c.skin = UserForm;
    c.command = {
        SAVE: async (path, { control, data, form }) => {
            //console.log("SAVE", source);
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
        INVITEIN: async (info, { model, app, form }) => {
            let result = await form.validate();
            console.log("COURSE FORM VALIDATION", form, result);
            if (result.isValid) {
                const route = info.route || app.settings.route[result.data.itype];
                model.read(AppModel, m => m.invitein(result.data, route).then(r => c.navigate("/settings")));
            }
        }
    }
}

export function UserForm({ source, label, isUpdate, route, npath, noroles, upload }) {
    const app = useApp();
    const [model, control] = useModel(UserForm, Controller);
    const form = useForm("user-form", source, model, null, yup.object({
        tname: yup.string().required("Nome è una informazione richiesta."),
        tsurname: yup.string().required("Cognome è una informazione richiesta."),
        temail: yup.string().required("Email è una informazione richiesta.").email("Formato email non corretto"),
    }));
    const [value, setValue] = useState();
    let roles = [];
    if (!noroles && app.settings.roles)
        roles = app.settings.roles;

    const files = source.data?.url && source.data.url!== "" ? [{name: 'attach', id: source.data.id, url: source.data.url }] : null;

    const onChange = (e) => {
        console.log('radio checked', e.target.value);
        //setValue(e.target.value);
    };

    const onsuccess = (r, file) => {
        file.url = r.data;
        model.emit("ON_SUCCESS", r.data, null, source)
    }

    const onremove = (file) => {
        console.log("DOCUMENT REMOVED", file.name, file.id);
        model.emit("ON_REMOVE", file, null, source)
    }

    const onclick = isUpdate
        ? () => control.execute("SAVE", npath, null, null, { form: form })
        : () => control.execute("INVITEIN", { route: route, noroles: noroles }, null, null, { form: form });
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
                <Select onChange={onChange} placeholder="Tipo Utente" className="w100">
                    {roles.map((v, i) => <Option value={i}>{v}</Option>)}
                </Select>
            </FormixItem>}
            {
                upload && <Uploader className="w100 text-center" url="api/upload" restrictTo="png,jpg,pdf"
                    onRemove={onremove} onSuccess={onsuccess} outsource={true} fileList={files} multiple={true} name="formFile">
                    <Button className="btn-lite mb-md">Carica Allegato</Button>
                </Uploader>
            }
            <Col span={24} className="text-center">
                <Button className="btn-dark " onClick={onclick}> {label || "Inserisci"} </Button>
            </Col>
        </Formix>
    )
}