import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../componentes/button'
import Loader from '../componentes/loader'
import swal from 'sweetalert';
import Orders from '../componentes/Orders'
import *  as  Yup from 'yup';
import { userRegistration } from '../firebase/firebase-utils'
import { Field, Form, Formik } from 'formik'
import Input from '../componentes/input'

export default function Registrer() {
  const dispatch = useDispatch()
  const showModal = useSelector(state => state.modal)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const onClose = () => {
    dispatch({ type: "change", value: false })
  }

  const [cargando, setCargando] = useState(false)


  const SignupSchema = Yup.object().shape({
    fullname: Yup.string()
      .matches(/^[a-z/A-Z]+$/, 'Solo letras')
      .min(4, 'Minimo 4 caracteres')
      .max(20, 'Maximo 20 caracteres')
      .required('Required'),
    email: Yup.string().email('Email invalido').required('Required'),
    password: Yup.string()
      .min(6, 'Minimo 6 caracteres')
      .max(14, 'Maximo 14 caracteres')
      .required('Required'),
    passwordCheck: Yup.string()
      .oneOf([Yup.ref('password'), null], 'La contraseña no coincide')
      .required('Required'),

  });

  useEffect(() => {

    if (user.name) {
      navigate("/")
    }


  }, [])


  return (
    <>
      {cargando && <Loader />}


      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto w-44 h-auto" src="./CONCIENCIA.png" alt="Conciencia" />
            <h2 className="mt-2 text-center text-3xl font-bold tracking-tight text-gray-900">Registrate</h2>

          </div>

          <Formik
            initialValues={{
              fullname: "",
              email: '',
              password: '',
              passwordCheck: ''

            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { resetForm }) => {
              setCargando(true)
              let response;

              try {

                const { email, password, fullname } = values;

                response = await userRegistration(email, password, fullname)
                const user = response.success && response.user
                const { token } = user
                swal({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Cuenta creada con exito!!',
                  showConfirmButton: false,
                  timer: 1500
                })
                navigate("/login")


              } catch (error) {
                if (response.code === "auth/email-already-in-use") {

                  swal({
                    title: 'El email ya tiene una cuenta creada',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    timer: 1500
                  })
                  resetForm({ values: { ...values, email: "" } })


                }

                setCargando(false)

              }
            }}
          >
            {({ errors, touched }) => (

              <div className="w-full max-w-md space-y-8">

                <Form className='flex flex-col mt-8 space-y-6'>
                  <label>Nombre Completo
                    <Field style={errors.fullname && { border: "solid 1px rgb(214,47,39)" }} name="fullname" type="text" placeholder="Nombre Completo" as={Input} />
                    {errors.fullname && touched.fullname ? (
                      <div className='text-red-600'>{errors.fullname}</div>
                    ) : null}
                  </label>
                  <label>Email
                    <Field style={errors.email && { border: "solid 1px rgb(214,47,39)" }} name="email" type="email" placeholder="Email" as={Input} />
                    {errors.email && touched.email ? (

                      <div className='text-red-600'>{errors.email}</div>
                    ) : null}
                  </label>

                  <label>Contraseña
                    <Field style={errors.password && { border: "solid 1px rgb(214,47,39)" }} name="password" type="password" placeholder="Password" as={Input} />
                    {errors.password && touched.password ? (
                      <div className='text-red-600'>{errors.password}</div>
                    ) : null}
                  </label>
                  <label>Repetir Contraseña
                    <Field style={errors.passwordCheck && { border: "solid 1px rgb(214,47,39)" }} name="passwordCheck" type="password" placeholder="Password" as={Input} />

                    {errors.passwordCheck && touched.passwordCheck ? (
                      <div className='text-red-600'>{errors.passwordCheck}</div>
                    ) : null}
                  </label>

                  <div className='flex justify-center mt-8'>
                    <Button pad="px-20 sm:px-24" >
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                        </svg>
                      </span>
                      Registrar
                    </Button>
                  </div>
                  <div className="flex flex-col items-center mt-5">
                    <p className="mt-1 text-sm font-medium text-gray-500">
                      Ya estas registrado?<Link to="/login" className="ml-1 text-blue-400">Inicia Sesion</Link>
                    </p>
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
