import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import Button from '../componentes/button'
import Loader from '../componentes/loader'
import Orders from '../componentes/Orders'
import *  as  Yup from 'yup';
import { dataUser, loginLocal, signInGoogle } from '../firebase/firebase-utils'
import { Field, Form, Formik } from 'formik'
import Input from '../componentes/input'

export default function Login() {
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.modal)
    const navigate = useNavigate();
    const user = useSelector(state => state.user)

    const onClose = () => {
        dispatch({ type: "change", value: false })
    }



    const [cargando, setCargando] = useState(false)



    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Email invalido').required('Required'),
        password: Yup.string()
            .min(6, 'Minimo 6 caracteres')
            .max(14, 'Maximo 14 caracteres')
            .required('Required'),

    });


    const onGoogleSignHandler = async () => {
        const user = await signInGoogle();

        // const { displayName, email, photoURL } = user
        // dispatch({ type: "login", value: { name: displayName.split(" ")[0], email, photoURL } })
        return navigate('/login');
    }

    useEffect(() => {

        if (user.name) {
            navigate('/');
        }


    }, [])






    return (
        <>
            {cargando && <Loader />}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className=''>
                        <img className="mx-auto w-44 h-auto" src="./CONCIENCIA.png" alt="Conciencia" />
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Inicia sesion con su cuenta</h2>

                    </div>
                    <Formik


                        initialValues={{
                            email: '',
                            password: ''

                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { resetForm }) => {
                            let response;
                            try {
                                setCargando(true)
                                const { email, password } = values
                                // si response.succes = false entonces muestro el error
                                // si es true devuelvo el user
                                response = await loginLocal(email, password)
                                const user = response.success && response.data.user
                                const { firstname, email: _email, id } = user

                                dispatch({ type: "login", value: { name: firstname, email: _email, id } })
                                swal({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Logueo exitoso!!',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate('/');

                            } catch (err) {

                                if (response.code == "auth/wrong-password") {
                                    swal({
                                        title: 'La contraseña es incorrecta',
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        },
                                        timer: 1500
                                    })
                                    resetForm({ values: { ...values, password: "" } })

                                }
                                if (response.code == "auth/user-not-found") {
                                    swal({
                                        title: 'El email no tiene una cuenta creada',
                                        showClass: {
                                            popup: 'animate__animated animate__fadeInDown'
                                        },
                                        hideClass: {
                                            popup: 'animate__animated animate__fadeOutUp'
                                        },
                                        timer: 1500
                                    })
                                    resetForm({ values: { email: "", password: "" } })

                                }
                              

                                setCargando(false)
                            }

                            setCargando(false)
                        }}
                    >
                        {({ errors, touched }) => (

                            <div className="w-full max-w-md space-y-8">

                                <Form className='flex flex-col mt-8 space-y-6'>


                                    <Field style={errors.email && { border: "solid 1px rgb(214,47,39)" }} name="email" type="email" placeholder="Email" as={Input} />
                                    {errors.email && touched.email ? (

                                        <div className='text-red-600'>{errors.email}</div>
                                    ) : null}

                                    <Field style={errors.password && { border: "solid 1px rgb(214,47,39)" }} name="password" type="password" placeholder="Password" as={Input} />
                                    {errors.password && touched.password ? (
                                        <div className='text-red-600'>{errors.password}</div>
                                    ) : null}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Recordarme</label>
                                        </div>

                                        <div className="text-sm">
                                            <Link to="/forgot-password" className="font-medium text-indigo-600 hover:text-gray-500">Olvide mi contraseña</Link>
                                        </div>
                                    </div>

                                    <div className='flex flex-col justify-center items-center'>
                                        <Button pad="px-12 sm:px-24">
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                            Ingresar
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        )}

                    </Formik>

                    <div className='flex flex-col justify-center items-center'>
                        <p className='mb-8 mt-10'>O podes ingresar con:</p>
                        <Button onButtonClick={onGoogleSignHandler} pad="px-4">
                            <div className='w-24 flex flex-row justify-around'>
                                <img src="https://res.cloudinary.com/dcatzxqqf/image/upload/v1656648432/coding/NucbaZappi/Assets/google-icon_jgdcr1.png" alt="Google logo" />
                                Google
                            </div>
                        </Button>
                        <Link to="/registrer" className="font-medium text-orange-600 hover:text-orange-500 mt-10">No tenes cuenta, crea una</Link>

                    </div>
                </div>
                <Orders showModal={showModal} onClose={onClose} />

            </div>
        </>
    )
}
