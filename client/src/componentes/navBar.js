/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOutUser } from '../firebase/firebase-utils'


export default function NavBar() {
  const [stateCurrentHome, setStateCurrentHome] = useState(false)
  const [stateCurrentContacto, setStateCurrentContacto] = useState(false)

  const navigation = [
    { name: 'Home', href: '/', current: stateCurrentHome },
    { name: 'Contacto', href: 'contacto', current: stateCurrentContacto },
  ]

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  const state = useSelector(state => state.compra)
  const dispatch = useDispatch()

  const total = state.reduce((acc, item) => (acc += item.quantity), 0);

  const { name, photoURL } = useSelector(state => state.user)
  const loginoutHandler = () => {
    const aceptar = window.confirm("Estas seguro que quieres salir??")
    aceptar && dispatch({ type: "logout" })
    signOutUser()
    return navigate("/")
  }

  const [hidden, setHidden] = useState(false)
  const navigate = useNavigate()
  const linkNav = useLocation();
  return (
    
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
        {linkNav.pathname==="/" ? setStateCurrentHome(true) : setStateCurrentHome(false)}
        {linkNav.pathname==="/contacto" ? setStateCurrentContacto(true) : setStateCurrentContacto(false)}
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex  items-start justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="./CONCIENCIA.png"
                    alt="Conciencia"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="./CONCIENCIA.png"
                    alt="Conciencia"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (

                      <Link
                       
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >

                        {item.name}
                      </Link>



                    ))}
                  </div>
                </div>
              </div>

              <div className="w-28  absolute inset-y-0 right-0 flex items-center justify-around sm:justify-around sm:w-56 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  onClick={() => dispatch({ type: "change", value: true })}
                  type="button"
                  className="bg-gray-800 p-1 flex flex-row rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <circle cx="9" cy="19" r="2" />  <circle cx="17" cy="19" r="2" />  <path d="M3 3h2l2 12a3 3 0 0 0 3 2h7a3 3 0 0 0 3 -2l1 -7h-15.2" /></svg>
                  <span id="monto-carrito">{total}</span>

                </button>

                {name ? <p className='text-slate-200'>{name}</p> : <Link className='text-gray-200' to="login"> Login </Link>}
                <div className='flex flex-col justify-center items-center' >
                  <button
                    onClick={() => name != "" && setHidden(!hidden)}
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    {photoURL ? <img className='rounded-full w-10' src={photoURL}></img> : <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>}
                  </button>
                  {hidden !== false ?
                    <div className='absolute mt-32 py-2 px-2 z-10 bg-slate-600 flex flex-col justify-center items-start w-36' onBlur={() => setHidden(false)}
                    >
                      <Link className='text-slate-200 text-lg hover:text-slate-400' to="/ordenes">Mis ordenes</Link>
                      <button onClick={loginoutHandler} type="button" className=''>
                        <p className=' text-slate-200 text-lg hover:text-slate-400'>Cerrar sesion</p></button>
                    </div> : null}

                </div>

                {/* Profile dropdown */}
                {<Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button style={{ visibility: "hidden" }} className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>

                      <img

                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >

                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  <Link
                    key={item.name}
                    to={item.href}
                  >
                    {item.name}
                  </Link>
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}