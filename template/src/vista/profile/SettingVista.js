import { Row, Col, Button, Input, Select, Badge } from 'antd';
import { MailOutlined, SearchOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { UserList } from '../../view/profile/UserList';
import { useGraph, useModel, useVista, useApp, Vista } from '@essenza/react';
import { UserModel } from '@essenza/core';

const { Option } = Select;

function SettingVistaController(c) {
    c.skin = SettingVista;
    let store;
    c.command = {
        ADD: (platform, { model, source, app }) => {
            //Aggiungo una lezione che appartiene ad elenco lezioni ma nel form devo gestire un singolo item lession ???
            //Forse possiamo gestire tutto tramite classe DataSource.
            let obj = { itype: app.settings.usertype || 0 };
            if(platform)
                obj.idplatform = app.session.id;
            
            const item = model.addData(source, obj); //
            c.setSource("users.item", item);
            c.navigate("userform");
            //c.openPopup(<UserForm source={new DataSource(data, source.node)} />, "Nuovo Utente", null, {excludeOk: true, excludeCancel: true});
        },

        SEARCH: (list, { data }) => {
            if (!store)
                store = list;
            const txt = data.text.toLowerCase();
            const d = data.domain;
            c.setSource("users.list", store.filter((item) => (txt === '' || (item.tsurname?.toLowerCase() + ' ' + item.tname?.toLowerCase()).indexOf(txt) > -1 || item.temail?.toLowerCase().indexOf(txt) > -1) && (d === '' || item.itype === d)));
        }
    }
}

export const domains = ['bvlg.bcc.it', 'bancavaldarno.bcc.it', 'bancacentro.it', 'bancadipisa.it', 'bancaelba.it', 'bancatema.bcc.it', 'bancofiorentino.it', 'bat.bcc.it',
    'bccas.it', 'bccvaldarnofiorentino.it', 'bpc.bcc.it', 'ft.bcc.it', 'pontassieve.bcc.it', 'vivalbanca.bcc.it'];

export function SettingVista({ platform }) {
    const [ctx, model, control] = useVista(SettingVista, SettingVistaController);
    const users = useGraph(UserModel, "list");
    const app = useApp();
    //const [count, setCount] = useState(0);
    const filter = useRef({ text: '', domain: '' }).current;

    console.log("USER-LIST-SETTING", users);
    let count = 0;
    if (users.data)
        count = users.data.length;
    const isadmin = app.isAdmin();

    useEffect(() => {
        console.log("MODEL ", model);
        if (model && isadmin) {
            if(platform)
                model.read(UserModel, m => m.platformList());
            else
                model.read(UserModel, m => m.list());
        }
    }, [model]);

    if(!isadmin){
        return null;
    }

    return (
        <Vista context={ctx}>
            <div className="w100">
                <Row gutter={16} align="middle" className="padding-md mx-0">
                    <Col flex="none">
                        <h2 style={{ marginBottom: "0" }}>Elenco utenti</h2>
                    </Col>
                    <Col flex="none">
                        <Badge color="#264395" count={count}>
                            <MailOutlined style={{ fontSize: '32px' }} />
                        </Badge>
                    </Col>
                    <Col flex="Auto">
                        <Input className="input search-filter" onChange={(e) => { filter.text = e.currentTarget.value; control.execute("SEARCH", users.data, filter) }} prefix={<SearchOutlined />} placeholder="Cerca utente" >
                        </Input>
                    </Col>
                    <Col flex="none">
                        <Select onChange={(v) => { filter.domain = v; control.execute("SEARCH", users.data, filter) }} placeholder="Utenti" style={{ width: '200px', padding: '0' }}>
                            <Option value="">Tutti gli utenti</Option>
                            <Option value={0}>Admin</Option>
                            <Option value={1}>Operatore</Option>
                            <Option value={2}>Partner</Option>
                            <Option value={3}>Utente</Option>
                        </Select>
                    </Col>
                    <Col flex="none">
                        <Button className='btn-pri' onClick={() => control.execute("ADD", platform, users)} >
                            Nuovo utente
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} >
                        <UserList source={users} />
                    </Col>
                </Row>
            </div>
        </Vista>
    )
}