import React from 'react'
import useSWR from 'swr'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'

export default function Inicio() {

  const {categoriaActual} = useQuiosco()

  //consulta SWR  
  const token = localStorage.getItem('AUTH_TOKEN')
  const fetcher = () => clienteAxios('api/productos',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(data => data.data)

  const { data, error, isLoading} = useSWR('/api/productos',fetcher,{
    refreshInterval: 1000 * 10,
    fallbackData: [], 
  })

  if(isLoading) return <p className='text-center'>Cargando...</p>
  
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)

  return (
    <>
    <h1 className='text-4xl font-black text-center'>{categoriaActual.nombre}</h1>

    <p className='text-lg text-center mt-5 mb-10'>
      Elige tu pedido a continuación y personaliza tu orden
    </p>
    
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      {productos.map(producto => (
        <Producto
          key={producto.imagen}
          producto={producto}
          botonAgregar={true}
        />
      ))}
    </div>  
    </>
  )
}