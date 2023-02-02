import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../componentes/button'
import Orders from '../componentes/Orders'
import Shopping from '../componentes/shopping'
import { v4 as uuidv4 } from 'uuid';
import { buy } from '../firebase/firebase-utils'
import swal from 'sweetalert'

export default function CheckOut() {

  
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const modal = useSelector(state => state.modal)
    const products = useSelector(state => state.compra)
    const user = useSelector(state=>state.user)

    const subTotal = products.reduce((acc, value) => acc + parseInt(value.price) * value.quantity, 0)
    const onClose = () => {
        dispatch({ type: "change", value: false })
    }

    const [paquete, setPaquete] = useState({
        email: "",
        firstName: "",
        lastName: "",
        addres: "",
        zipCode: "",
        city: "",
        state: "",
        country: "",
        phoneNumber: "",
        idOrder: uuidv4(),
        buys:[]
      })

      const onSubmitHandler = (e) => {
        paquete.buys= products;
        swal({
            position: 'top-end',
            icon: 'success',
            title: 'Pedido realizado exitosamente!',
            showConfirmButton: false,
            timer: 2500
        })
        navigate('/');
        e.preventDefault()
        return  buy(paquete,user)
        
      }

    
    
    return (
        <>
            <div className="bg-gray-300">
                <div className="py-12">
                    <div className=" sm:h-container md:h-container  mx-auto shadow-lg rounded-lg max-w-7xl px-2 bg-white sm:px-6 lg:px-8 flex flex-row flex-around">
                        <div className="md:flex w-full">
                            <div className="w-full p-4 px-5 py-5">

                                <div className="flex flex-row text-xs pt-6 pb-5">
                                    <span className="font-bold">Information</span>

                                </div>
                                <span>Customer Information</span>
                               <form 
                               onSubmit={onSubmitHandler}>
                                <div className="relative pb-5">
                                    <input onChange={(e) => setPaquete({ ...paquete, email: e.target.value })} type="email" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="E-mail" required/>
                                </div>
                                <span>Shipping Address</span>
                                <div className="grid md:grid-cols-2 md:gap-2">
                                    <input onChange={(e) => setPaquete({ ...paquete, firstName: e.target.value })}type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="First name*"  required/>
                                    <input onChange={(e) => setPaquete({ ...paquete, lastName: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Last name*" required />
                                </div>
                                <input type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Address*" />
                                <div className="grid md:grid-cols-3 md:gap-2">
                                    <input onChange={(e) => setPaquete({ ...paquete, zipCode: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Zipcode*" required/>
                                    <input onChange={(e) => setPaquete({ ...paquete, city: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="City*" required/>
                                    <input onChange={(e) => setPaquete({ ...paquete, state: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="State*" required/>
                                </div>
                                <input onChange={(e) => setPaquete({ ...paquete, country: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Country*" required/>
                                <input onChange={(e) => setPaquete({ ...paquete, phoneNumber: e.target.value })} type="text" name="mail" className="border rounded h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm" placeholder="Phone Number*" required/>
                                <div className="flex  flex-row justify-between items-center pt-4 md:mt-16">
                                    <Button pad="px-2 sm:px-8" wit="">
                                    <p className='text-xs sm:text-sm md:text-base'>Iniciar pedido</p>
                                    </Button>

                                </div>
                                </form>
                            </div>

                        </div>
                        <div className='w-full flex flex-col justify-around'>
                            <div className='w-full overflow-y-auto h-4/6'>
                                <div className="flex flex-row text-xs  pb-5">
                                    <span className="font-bold">Shopping</span>
                                </div>

                                <div className='mt-0'>
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
