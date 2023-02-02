
import { useDispatch } from 'react-redux'
import { PRODUCT } from "../constants/utils"
import Button from './button'
import Notificacion from './notificacion'

export default function Card({ data, onClick, type, onButtonClick }) {


  return (
    <div key={data.id} className="group flex flex-col relative p-5 border-solid rounded-lg
     bg-gray-200 hover:bg-gray-300 border-2  border-gray-400 hover:border-gray-600 "
      onClick={onClick} >

      <div className="w-full min-h-44 bg-gray-200 rounded-md relative overflow-hidden group-hover:opacity-75">
        <img
          src={data.imageSrc}
          alt={data.imageAlt}
          className="w-full h-full object-center absolute object-cover"
        />
      </div>
      <div className="mt-4 flex justify-center">
        <div>
          <h3 className="text-lg text-gray-700 font-bold ">
            <a href={data.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {data.name}
            </a>
          </h3>
          {
            type === PRODUCT &&
            <div className='flex justify-center'>
              <p className="text-2xl mt-4 font-bold text-gray-900">${data.price}</p>

            </div>

          }


        </div>

      </div>
      {

        type === PRODUCT &&
        <>
          <div className='flex justify-center'>
            <h3 className="text-lg text-gray-700 font-bold ">
              <span aria-hidden="true" className="absolute inset-0" />
              Stock: {data.stock}
            </h3>
          </div>
          <div className='flex flex-col items-center mt-4'>
            <Button onButtonClick={onButtonClick} pad="px-20">
              Agregar
            </Button>
          </div>

        </>
      }
    </div>

  )
}
