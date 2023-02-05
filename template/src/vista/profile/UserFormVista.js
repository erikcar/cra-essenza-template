import {Vista, useVista, useGraph} from "@essenza/react";
import { useLocation } from "react-router-dom";
import { UserForm } from "../../view/profile/user_form";
import { UserModel } from "@essenza/core";

function UserFormVistaController(c) {
    c.skin = UserFormVista;
}

export function UserFormVista() {
    const [ctx, control] = useVista(UserFormVistaController);
    const user = useGraph(UserModel, "item");
    const state = useLocation().state;
    return (
        <Vista context={ctx} >
            <div className="w100 py-md">
                <div className="centered max-width-sm ">
                    <h1 className="text-center"><span className="pointer" onClick={()=>control.navigate(-1)}>&lt;</span> {!state?.isUpdate?"Inserisci " + (state?.ulabel || "Utente"):"Modifica Utente"} </h1>
                    <UserForm label={state?.label} isUpdate={state?.isUpdate} npath="settings" source={user} noroles />
                </div>
            </div>
        </Vista>
    )
}