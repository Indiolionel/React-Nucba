import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './button'


export default function Shopping() {
    const products = useSelector(state => state.compra)
    const subTotal = products.reduce((acc, value) => acc + parseInt(value.price) * value.quantity, 0)
    const dispatch = useDispatch()
    return (
        <div className="flow-root">
            <ul role="list" className="-my-6 divide-y  divide-gray-200">
                {products.map((product) => (
                    <li key={product.id} className="flex py-6">
                        <div className="h-28 sm:h-24 md:h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>

                        <div className="ml-4 w-full flex justify-center">
                            <div className='w-full'>
                                <div className="flex justify-center flex-col items-center text-base font-medium text-gray-900  sm:justify-around sm:flex-row sm:items-center">
                                    <h3 className='sm:w-36'>
                                        <a href={product.href}>{product.name}</a>
                                    </h3>
                                    <p>${product.price}</p>
                                    <div className="flex justify-around items-center text-sm mt-6 w-1/2 sm:w-2/5">

                                        <Button onButtonClick={() => dispatch({ type: "delete-row", value: product })} pad="px-4" wit="w-2" >
                                            -
                                        </Button>
                                        <span className='text-center flex items-center text-lg'>{product.quantity}</span>
                                        <Button disabled={product.quantity===product.stock}  onButtonClick={() => dispatch({ type: "add", value: product })} pad="px-4" wit="w-2" >
                                            +
                                        </Button>
                                    </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            </div>

                        </div>
                    </li>
                ))}
            </ul>

        </div>

    )
}
