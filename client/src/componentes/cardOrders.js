import ProductCard from './productCard'
import { v4 as uuidv4 } from 'uuid';

export default function CardOrders({ order, oddEven }) {
    const shipping = 500;
    const products = order?.buys
    const subTotal = products.reduce((acc, value) => acc + parseInt(value.price) * value.quantity, 0)

    const parImpar =(oddEven%2 == 0) ? 'bg-gray-100' : 'bg-gray-0'

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const check = <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    const pendding = <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">  <circle cx="12" cy="12" r="10" />  <polyline points="12 6 12 12 16 14" /></svg>
    return (

        <>
            <div className={`py-14 px-4 mt-12 md:px-6 2xl:px-20 ${parImpar} 2xl:container 2xl:mx-auto`}>
                <div className="flex justify-start item-start space-y-2 flex-col">
                    <div className='flex'>
                        <h1 className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">{`Order: #${order.id}`}</h1>
                        <p className='ml-4'>{order.shipping ? check : pendding}</p>
                    </div>
                </div>
                <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                        <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                            <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
                            {order.buys?.map((product) => {
                                const id = uuidv4()
                                return <ProductCard key={id} product={product} />

                            })}


                        </div>
                        <div className="flex justify-center flex-col md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                            <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                                <h3 className="text-xl dark :text-white font-semibold leading-5 text-gray-800">Summary</h3>
                                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                                    <div className="flex justify-between w-full">
                                        <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{"$" + subTotal}</p>
                                    </div>

                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
                                        <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{"$" + shipping}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
                                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{"$" + (subTotal + shipping)}</p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
