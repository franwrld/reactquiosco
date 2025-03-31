import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Registro() {

  const nameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const passwordConfirmationRef = createRef();

  const [errores, setErrores] = useState([])
  const {registro} = useAuth({middleware: 'guest', url: '/'})

  const handleSubmit = async e => {
    e.preventDefault();
    const datos = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }
    
    registro(datos, setErrores)
  }

  return (
    <>
      {/* <> Fragment */}
      <h1 className="text-4xl font-black">Crea tu cuenta</h1>
      <p>Crea tu cuenta llenando tu formulario</p>

      <div className="bg-white shadow-sm rounded-md mt-10 px-5 py-10">
        <form 
          onSubmit={handleSubmit} 
          noValidate
        >
          { errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null }
          
          <div className="mb-4">
            <label 
              htmlFor="name" 
              className="text-slate-800"
            >
              Nombre:
            </label>
            <input 
              type="text" 
              id="name"
              className="mt-2 w-full p-3 bg-gray-50"
              name="name"
              placeholder="Escribe tu nombre"
              ref={nameRef}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="email" 
              className="text-slate-800"
            >
              Email:
            </label>
            <input 
              type="email" 
              id="email"
              className="mt-2 w-full p-3 bg-gray-50"
              name="email"
              placeholder="Correo Electronico"
              ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="password" 
              className="text-slate-800"
            >
              Password:
            </label>
            <input 
              type="password" 
              id="password"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password"
              placeholder="Password"
              ref={passwordRef}
            />
          </div>

          <div className="mb-4">
            <label 
              htmlFor="password_confirmation" 
              className="text-slate-800"
            >
              Repite tu password:
            </label>
            <input 
              type="password" 
              id="password_confirmation"
              className="mt-2 w-full p-3 bg-gray-50"
              name="password_confirmation"
              placeholder="Repite tu password"
              ref={passwordConfirmationRef}
            />
          </div>

          <input 
            type="submit" 
            value="Crear Cuenta" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white uppercase w-full mt-5 p-3 font-bold cursor-pointer" />
        </form>
      </div>
      <nav>
        <Link 
          to="/auth/login"
          className="mt-5"
        >
          Iniciar Sesion
        </Link>
      </nav>
    </>
  )
}
