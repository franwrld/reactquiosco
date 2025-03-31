import { createRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Alerta from '../components/Alerta';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  // Referencias a lo que se ingresa a los inputs

  const emailRef = createRef();
  const passwordRef = createRef();

  const [errores, setErrores] = useState([])
  const { login } = useAuth({
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async e => {
    e.preventDefault();
    const datos = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }
    login(datos, setErrores)
  }

  return (
    <>
      {/* <> Fragment */}
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido necesitas inciar sesión</p>

      <div className="bg-white shadow-sm rounded-md mt-10 px-5 py-10">
        <form onSubmit={handleSubmit} noValidate>
        { errores ? errores.map((error, i) => <Alerta key={i}>{error}</Alerta>) : null }
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

          <input 
            type="submit" 
            value="Iniciar Sesion" 
            className="bg-indigo-600 hover:bg-indigo-800 text-white uppercase w-full mt-5 p-3 font-bold cursor-pointer" 
          />
        </form>
      </div>

      <nav>
        <Link
          to="/auth/registro"
          className="mt-5"
        >
          Crear Cuenta
        </Link>
      </nav>
    </>
  )
}
