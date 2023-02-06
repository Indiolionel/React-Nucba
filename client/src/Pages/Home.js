import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import ListaItem from '../componentes/lista-item'
import Orders from '../componentes/Orders'

export default function Home() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modal)
  const navigate = useNavigate()
  useEffect(() => {
  
    navigate('/', { state: { login: false } });

    dispatch({ type: "producto-filtrado", value: "" })

  }, [])

  const onClose = () => {
    dispatch({ type: "change", value: false })
  }

  return (
    <div className='mx-6 my-24'>
      <ListaItem />
      <Orders showModal={showModal} onClose={onClose} />
    </div>

  )
}
