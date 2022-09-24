import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../componentes/button'
import Orders from '../componentes/Orders'
import *  as  Yup from 'yup';
import Input from '../componentes/input'
import Textarea from '../componentes/textarea'
import Loader from '../componentes/loader'

export default function Contact() {
    const dispatch = useDispatch()
    const showModal = useSelector(state => state.modal)

    // const [borderColor, setBorderColor] =useState("")


    const validationMessages = {
        firstName: {
            required: 'El campo fullname es obligatorio',
            fieldLength: 'El campo nombre debe tener entre 4 y 50 caracteres',
            format: 'El campo nombre solo puede contener letras'
        },
        subject: {
            required: 'El campo age es obligatorio',
            numbers: 'El campo edad solo puede contener numeros',
            fieldLength: 'El campo edad debe tener un valor entre 18 y 99'
        },
        email: {
            required: 'El campo email es obligatorio',
            format: 'El campo email debe tener un formato válido'
        }
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(4, 'Minimo 4 caracteres')
            .max(20, 'Maximo 20 caracteres')
            .required('Required'),
        subject: Yup.string()
            .min(4, 'Minimo 4 caracteres')
            .max(40, 'Maximo 40 caracteres')
            .required('Required'),
        email: Yup.string().email('Email invalido').required('Required'),
        message: Yup.string()
            .min(6, 'Minimo 6 caracteres')
            .max(125, 'Maximo 125 caracteres')
            .required('Required'),

    });


    const onClose = () => {
        dispatch({ type: "change", value: false })
    }

    const [cargando, setCargando] = useState(false)



    return (
        <>
            {cargando && <Loader />}

            <div className='flex flex-col min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
                <Formik
                    initialValues={{
                        firstName: '',
                        subject: '',
                        email: '',
                        message: ''
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={values => {
                        setCargando(false)
                    }}
                >
                    {({ errors, touched }) => (

                        <div class="w-full max-w-md space-y-8">
                            <div>
                                <img class="mx-auto w-44 h-auto" src="./CONCIENCIA.png" alt="Conciencia" />
                                <h1 className='"mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"'>Contact</h1>
                            </div>
                            <Form className='flex flex-col mt-8 space-y-6'>


                                <Field style={errors.firstName && { border: "solid 1px rgb(214,47,39)" }} name="firstName" type="text" placeholder="First Name" as={Input} />
                                {errors.firstName && touched.firstName ? (

                                    <div className='text-red-600'>{errors.firstName}</div>
                                ) : null}

                                <Field style={errors.subject && { border: "solid 1px rgb(214,47,39)" }} name="subject" type="text" placeholder="Subject" as={Input} />
                                {errors.subject && touched.subject ? (
                                    <div className='text-red-600'>{errors.subject}</div>
                                ) : null}

                                <Field style={errors.email && { border: "solid 1px rgb(214,47,39)" }} name="email" type="email" placeholder="Email" as={Input} />
                                {errors.email && touched.email ? (
                                    <div className='text-red-600'>{errors.email}</div>
                                ) : null}

                                <Field
                                    style={errors.message && { border: "solid 1px rgb(214,47,39)" }}
                                    name="message"
                                    type="text"
                                    placeholder="Message"
                                    as={Textarea}
                                />
                                {errors.message && touched.message ? (<div className='text-red-600'>{errors.message}</div>
                                ) : null}

                                <div className='flex flex-col justify-center items-center'>
                                    <Button pad="px-12 sm:px-24">
                                        Contact
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    )}

                </Formik>
            </div>
            <Orders showModal={showModal} onClose={onClose} />

        </>
    )
}
