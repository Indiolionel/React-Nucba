import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../componentes/button';
import Orders from '../componentes/Orders';
import *  as  Yup from 'yup';
import { resetPassword } from '../raywail/base-date-utils';
import { Field, Form, Formik } from 'formik';
import Input from '../componentes/input';
import Loader from '../componentes/loader';
import swal from 'sweetalert';




export default function ForgotPassword() {
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.modal)
    const navigate = useNavigate();

    const onClose = () => {
        dispatch({ type: "change", value: false })
    }

    const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Email invalido').required('Required'),
        newPassword: Yup.string()
            .min(6, 'Minimo 6 caracteres')
            .max(14, 'Maximo 14 caracteres')
            .required('Required'),
        passwordCheck: Yup.string()
            .oneOf([Yup.ref('newPassword'), null], 'La contraseña no coincide')
            .required('Required'),

    });


    const [cargando, setCargando] = useState(false)




    return (
        <>
            {cargando && <Loader />}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img className="mx-auto w-44 h-auto" src="./CONCIENCIA.png" alt="Conciencia" />
                        <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Reestablecer Contraseña</h2>

                    </div>

                    <Formik
                        initialValues={{
                            email: '',
                            newPassword: '',
                            passwordCheck: ''

                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { resetForm }) => {
                            const { email, newPassword } = values

                            try {
                                setCargando(true)
                                await resetPassword(email, newPassword, resetForm)
                                swal({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Contraseña reestablecida',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                navigate('/login');

                            } catch (error) {
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
                                    <Field style={errors.newPassword && { border: "solid 1px rgb(214,47,39)" }} name="newPassword" type="password" placeholder="New Password" as={Input} />
                                    {errors.newPassword && touched.newPassword ? (

                                        <div className='text-red-600'>{errors.newPassword}</div>
                                    ) : null}
                                    <Field style={errors.passwordCheck && { border: "solid 1px rgb(214,47,39)" }} name="passwordCheck" type="password" placeholder="Confirm Password" as={Input} />
                                    {errors.passwordCheck && touched.passwordCheck ? (

                                        <div className='text-red-600'>{errors.passwordCheck}</div>
                                    ) : null}



                                    <div className='flex flex-col justify-center items-center'>
                                        <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500 mt-4 mb-12">¿Te acordaste de la contraseña?, volve!!</Link>

                                        <Button pad="px-12 sm:px-24" wit="w-44" >
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                                                </svg>
                                            </span>
                                            Aceptar
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        )}

                    </Formik>
                </div>
                <Orders showModal={showModal} onClose={onClose} />

            </div>
        </>
    )
}
