import React from 'react'

export default function ProductCard({product}) {
  return (
    <div class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div class="pb-4 md:pb-8 w-full md:w-40">
                                    <img class="w-full hidden md:block object-fill" src={product.imageSrc} alt="dress" />
                                    <img class="w-full md:hidden" src={product.imageSrc} alt="dress" />
                                </div>
                                <div class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div class="w-full flex flex-col justify-start items-start space-y-8">
                                        <h3 class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product.name}</h3>
                                        <div class="flex justify-start items-start flex-col space-y-2">
                                         
                                        </div>
                                    </div>
                                    <div class="flex justify-between space-x-8 items-start w-full">
                                        <p class="text-base dark:text-white xl:text-lg leading-6">{"$"+product.price} </p>
                                        <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.quantity}</p>
                                        <p class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">{"$"+product.price*product.quantity}</p>
                                    </div>
                                </div>
                            </div>
  )
}
