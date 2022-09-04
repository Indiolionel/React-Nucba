import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ListaItem from '../componentes/lista-item'
import Orders from '../componentes/Orders'

export default function Home() {
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.modal)
    console.log("modal" + showModal)

    const onClose = ()=> {
        dispatch({type:"change", value:false})
    }
    
    return (
        <div className='mx-6 my-24'>
            <ListaItem />
            <Orders showModal={showModal} onClose={onClose}/>
        </div>

    )
}
