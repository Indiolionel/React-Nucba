import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Orders from '../componentes/Orders'
import Shopping from '../componentes/shopping'

export default function CheckOut() {
    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)
    const products = useSelector(state => state.compra)

    const subTotal = products.reduce((acc, value) => acc + parseInt(value.price) * value.quantity, 0)
    const onClose = () => {
        dispatch({ type: "change", value: false })
    }
    const [show, setShow] = useState(false)
    return (
        <>
            <div class="bg-gray-300">
                <div class="py-12">
                    <div class="h-container mx-auto shadow-lg rounded-lg max-w-7xl px-2 bg-white sm:px-6 lg:px-8 flex flex-row flex-around">
                        <div class="md:flex w-full">
                            <div class="w-full p-4 px-5 py-5">

                                <div class="flex flex-row pt-2 text-xs pt-6 pb-5">
                                    <span class="font-bold">Information</span>

                                </div>
                                <span>Customer Information</span>
                                <div class="relative pb-5">
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="E-mail" />
                                </div>
                                <span>Shipping Address</span>
                                <div class="grid md:grid-cols-2 md:gap-2">
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="First name*" />
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Last name*" />
                                </div>
                                <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Address*" />
                                <div class="grid md:grid-cols-3 md:gap-2">
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Zipcode*" />
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="City*" />
                                    <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="State*" />
                                </div>
                                <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Country*" />
                                <input type="text" name="mail" class="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Phone Number*" />
                                <div class="flex flex-row justify-between items-center pt-4 md:mt-16">
                                    <button onClick={() => dispatch({ type: "change", value: true })} type="button" class="h-12 w-24 text-blue-500 text-xs font-medium">Return to cart</button>
                                    <button type="button" class="h-12 w-24 text-blue-500 text-xs font-medium">Comprar</button>

                                </div>
                            </div>

                        </div>
                        <div className='w-full flex flex-col justify-around'>
                        <div className='w-full overflow-y-scroll h-4/6'>
                            <div class="flex flex-row text-xs  pb-5">
                                <span class="font-bold">Shopping</span>
                            </div>

                            <div className='mt-6'>
                                <Shopping />
                            </div>
                            
                        </div>
                        <div className="flex justify-around text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${subTotal}</p>
                        </div>
                        </div>
                       
                    </div>
                </div>
            </div>
            <Orders showModal={modal} onClose={onClose} />
        </>

    )
}
