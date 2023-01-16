import React from 'react'
import categories from "../mocks/categorias.json"
import Card from "./card"


export default function Categorias({ setCategorySelected }) {
  const change = (item) => {
    return setCategorySelected(item)
  }
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">Categoria de Plantas</h2>

      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {categories.map((category) => (
          <Card key={category.id} data={category} onClick={() => change(category.name)}/>
        ))}
      </div>
    </div>
  )
}
