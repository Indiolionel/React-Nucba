import Buscador from "./buscador"
import products from "../mocks/categorias.json"
import Productos from "./productos"
import { useState } from "react"
import Categorias from "./categorias"


export default function ListaItem() {
  const [categorySelected, setCategorySelected] = useState("")


  return (
    <div className="bg-white">
      <Buscador />
      {categorySelected && <Productos categorySelected={categorySelected} setCategorySelected={setCategorySelected} />}
      {!categorySelected && <Categorias setCategorySelected={setCategorySelected} />}
    </div>
  )
}