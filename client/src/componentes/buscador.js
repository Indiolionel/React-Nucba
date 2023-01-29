import React, { useState } from 'react'
import Button from './button'
import products from "../mocks/productos.json"
import { useDispatch, useSelector } from 'react-redux'


export default function Buscador() {
  

  const dispatch = useDispatch()
  const value = useSelector(state=>state?.nameProducto)

  return (
    <form className="flex items-center max-w-2xl mx-auto py-16 px-4 sm:pt-24 sm:px-6 lg:max-w-4xl lg:px-8">   
    <label htmlFor="simple-search" className="sr-only">Search</label>
    <div className="relative w-full mr-1">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input onInput={(e)=>dispatch({type:"producto-filtrado", value: e.target.value})} value={value} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
    </div>
    <Button pad="px-2" wit="w-10">
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>

    </Button>
</form>
  )
}
