import { combineReducers } from "redux";
import { listaCompra } from "../reducers/listaCompra";
import { modal } from "../reducers/modal";



const rootReducers = combineReducers({
    compra: listaCompra,
    modal: modal
})

export default rootReducers;