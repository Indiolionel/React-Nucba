import React from 'react'

export default function ProductCard({product}) {
  return (
    <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    <img className="w-full hidden md:block object-fill" src={product.imageSrc} alt="dress" />
                                    <img className="w-full md:hidden" src={product.imageSrc} alt="dress" />
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product.name}</h3>
                                        <div className="flex justify-start items-start flex-col space-y-2">
                                         
                                        </div>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                        <p className="text-base dark:text-white xl:text-lg leading-6">{"$"+product.price} </p>
                                        <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.quantity}</p>
                                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{"$"+product.price*product.quantity}</p>
                                    </div>
                                </div>
                            </div>
  )
}
