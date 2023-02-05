import { Vista } from "@essenza/react";
import { useModel, useVista, useGraph } from "@essenza/react";

export function HomeVistaControl(c) {
    c.skin = HomeVista;
    let store = null;
    c.command = {
        SEARCH: (list, { data }) => {
            if (!store)
                store = list;
            const txt = data.state;
            c.setSource("procedure.list", store.filter((item) => (txt === '' || (item.istate === txt))));
        }
    }
}

export function HomeVista(info) {
    const [ctx, control] = useVista(HomeVistaControl);
    /*const [model] = useModel();

    const procedures = useGraph(ProcedureModel, "list");
    const filter = useRef({ state: '' }).current;

    useEffect(() => {
        console.log("MODEL ", model);
        if (model) {
            //model.read(ProcedureModel, m => m.list());
        }
    }, [model]);*/

    console.log("HOME-VISTA");

    return (
        <Vista context={ctx} >
            <div className="w100">
                <div className="centered max-width-sm">
                    <h1 className="mt-sm text-center">HOME</h1>
                </div>
            </div>
        </Vista>
    )
}