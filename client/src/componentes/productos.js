import React, { useEffect, useState } from 'react'
import { PRODUCT } from '../constants/utils'
import Card from './card'
import { useDispatch, useSelector } from "react-redux"
import Button from './button'
import { categoryById } from '../firebase/firebase-utils'

export default function Productos({ categorySelected, setCategorySelected }) {
  const dispatch = useDispatch()
  const emptyCategory = () => {
    dispatch({type:"producto-filtrado", value:""})

    return setCategorySelected("")

  }

  

const [productsFilter, setProductsFilter ] = useState([])
 
  useEffect(() => {
    
    async function fetchData() {
      try {
        const res = await categoryById(categorySelected.id);
        setProductsFilter(res.category?.products);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();

  }, [])

  
  const valorEncontrado = useSelector(state => state.nameProducto)

  const action = (product)=> {
    dispatch({ type: "change", value: true });
    dispatch({ type: 'add', value: product });
  }
  return (
    <>

      <div className="max-w-2xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className='flex flex-row justify-center'>
          <h2 className="text-2xl text-center font-bold tracking-tight text-gray-900">{categorySelected.name}</h2>

        </div>
        <div className='flex flex-row justify-end w-full'>
          <Button onButtonClick={emptyCategory} pad="px-2">
            Volver

          </Button>

        </div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {productsFilter.map((product) => (

          ((product.name.toLowerCase().includes(valorEncontrado.toLowerCase())) || !valorEncontrado) && <Card key={product.id} data={product} type={PRODUCT} onButtonClick={()=>action(product)} />

          ))}
        </div>


      </div>

    </>
  )
}
