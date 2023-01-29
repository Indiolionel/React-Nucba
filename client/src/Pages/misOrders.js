import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardOrders from '../componentes/cardOrders'
import Loader from '../componentes/loader'
import Orders from '../componentes/Orders'
import { dataOrders } from '../firebase/firebase-utils'

export default function Ordenes() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showModal = useSelector(state => state.modal)
  const onClose = () => {
    dispatch({ type: "change", value: false })
  }

  const [ordenes, setOrdenes] = useState(false)

console.log("ordenes",ordenes)
  // const onChange = (user) => {
  //   dispatch({ type: "login", value: user })
  //   dataOrders(user.id).then(setOrdenes)
  // }

  useEffect(() => {
    dispatch({ type: "login", value: user })
    try {
      dataOrders(user.id).then(setOrdenes)
    } catch (error) {
      console.log(error)
    }
    

  }, [])


  if (!ordenes) {
    return <Loader />
  }
  if (ordenes.length===0) {
    return <div className='text-center mt-12'>PRIMERO COMPRA ALGO, RATATUIL!!</div>
  }

  return (
    <>

      {ordenes.map((order,index) => <CardOrders order={order} oddEven={index} />)}

      <Orders showModal={showModal} onClose={onClose} />


    </>

  )
}