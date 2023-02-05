import { Button, Table } from 'antd';

import React from 'react';
import { useControl } from '@essenza/react';
import { DataSource } from '@essenza/core';

function UserController(c) {
    c.skin = UserList;
    c.command = {
        EDIT: (source) => {
            //c.setSource("lesson.item", item); //Forse dovrebbe farlo Model? si che dovrebbe avere anche varie source
            c.setSource("users.item", source.data);
            c.navigate("userform", { state: { label: 'Aggiorna', isUpdate: true  } });
            //c.openPopup(<UserForm source={source} label="Aggiorna" />, "Modifica Utente", null, { excludeOk: true, excludeCancel: true });
        },

        UPDATE: (item, { value, node, field }) => {
            console.log("USER TYPE", value)
            node.mutate(field, value, item);
            node.save();
        },

        DELETE: (node, { data }) => {
            c.openPopup("Sei sicuro di voler eliminare l'utente selezionato?", "Elimina", 400, {
                onconfirm: () => {
                    node.delete(data.id);
                }
            });
        },
    }
}

export function UserList({ source }) {
    const [control] = useControl(UserController);
    console.log("USER-LIST", source);
    return (
        <div className="scrolling-section-104">
            <Table rowKey="id" columns={UserCols(control, source)} dataSource={source?.getData(null, true)} pagination={false} className="setting-table" >
            </Table>
        </div>
    )
}

const users = ["Amministratore", "Operatore", "Partner", "Utente"];
function UserCols(control, source) {
    //const npatient = node.discendant("patient");
    return [
        {
            title: "Cognome",
            dataIndex: "tsurname",
            key: "id",
        },
        {
            title: "Nome",
            dataIndex: "tname",
            key: "id",
        },
        {
            title: "Email",
            dataIndex: "temail",
            key: "id",
        },
        {
            title: "Ruolo",
            dataIndex: "itype",
            key: "id",
            render: (text, record) => {
                return (<>{users[record.itype]}</>)
            },
            width: "100%"
        },
        {
            //title: "Elimina",
            //dataIndex: "id",
            key: "id",
            render: (text, record) => {
                return (<Button className='btn-lite' onClick={() => control.execute("DELETE", source.node, record)}>Elimina</Button>)
            },
        },
        {
            //title: "Modifica",
            //dataIndex: "id",
            key: "id",
            //"EDIT", record
            render: (text, record) => {
                return (<Button className='btn-pri'  onClick={() => control.execute("EDIT", new DataSource(record, source.node))} >Modifica</Button>)
            },
        },
    ]
}