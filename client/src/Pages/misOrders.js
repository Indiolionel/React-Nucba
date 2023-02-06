import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardOrders from '../componentes/cardOrders'
import Loader from '../componentes/loader'
import Orders from '../componentes/Orders'
import { dataOrders } from '../raywail/base-date-utils'

export default function Ordenes() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const showModal = useSelector(state => state.modal)
  const onClose = () => {
    dispatch({ type: "change", value: false })
  }

  const [ordenes, setOrdenes] = useState(false)

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
    return <div className='text-center mt-32'>No hay ninguna compra aún</div>
  }

  return (
    <>

      {ordenes.map((order,index) => <CardOrders order={order} oddEven={index} />)}

      <Orders showModal={showModal} onClose={onClose} />


    </>

  )
}
