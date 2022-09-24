import { updatePassword } from "firebase/auth";
import { combineReducers } from "redux";
import { listaCompra } from "../reducers/listaCompra";
import { modal } from "../reducers/modal";
import { nameProducto } from "../reducers/nameProduct";
import { user } from "../reducers/user";



const rootReducers = combineReducers({
    compra: listaCompra,
    modal: modal,
    nameProducto: nameProducto,
    user: user
})

export default rootReducers;