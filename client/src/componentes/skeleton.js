import React from 'react'
import Button from './button'

export default function skeleton({ expand }) {

    

    return (
        <div className="animate-pulse  group flex flex-col relative p-5 border-solid rounded-lg
        bg-gradient-to-r from-gray-400 via-gray-200 to-gray-100 hover:bg-gray-300 border-2  border-gray-400 hover:border-gray-600 "
        >

            <div className="w-full min-h-44 bg-gray-200 rounded-md relative overflow-hidden group-hover:opacity-75">
                <img

                    className="w-full h-full object-center absolute object-cover"
                />
            </div>
            <div className="mt-4 flex justify-center" >
                <h3 className="text-lg text-gray-700 font-bold ">
                    <a >
                        <span aria-hidden="true" className="absolute inset-0" />

                    </a>
                </h3>
                {

                    <div className='flex justify-center'>
                        <Button pad="px-20">

                        </Button>

                    </div>

                }
            </div>
            {


                expand && <>
                    <div className='flex justify-center'>
                        <h3 className="text-lg text-gray-700 font-bold ">
                            <span aria-hidden="true" className="absolute inset-0" />

                        </h3>
                    </div>
                    <div className='flex flex-col items-center mt-4 from-gray-400 via-gray-200 to-gray-100 hover:bg-gray-300'>
                        <div className='from-gray-400 via-gray-200 to-gray-100 '> </div>
                        <Button pad="px-20">

                        </Button>

                    </div>
                    <div className='flex flex-col items-center mt-4 from-gray-400 via-gray-200 to-gray-100 hover:bg-gray-300'>
                        <div className='from-gray-400 via-gray-200 to-gray-100 '> </div>
                        <Button pad="px-20">

                        </Button>
                        <div className='flex flex-col items-center mt-4 from-gray-400 via-gray-200 to-gray-100 hover:bg-gray-300'>
                            <div className='from-gray-400 via-gray-200 to-gray-100 '> </div>
                            <Button pad="px-20">

                            </Button>

                        </div>

                    </div>

                </>
            }
        </div>
    )
}
