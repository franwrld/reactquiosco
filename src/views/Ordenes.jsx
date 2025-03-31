import useSWR from 'swr'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'
import { formatearDinero } from '../helpers'

export default function Ordenes() {
    const token = localStorage.getItem('AUTH_TOKEN')

    const fetcher = async () => {
      const response = await clienteAxios.get('/api/pedidos', {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      return response.data;
    };
  
  
    const { data, error, isLoading } = useSWR('/api/pedidos', fetcher, { refreshInterval: 1000 });

    console.log(data?.data)
    console.log(error)
    console.log(isLoading)

    const { handleClickCompletarPedido, cargando } = useQuiosco();

    return (
        <div>
            <h1 className='text-4xl font-black'>Ordenes</h1>
            <p className='text-2xl my-10'>
            Administra las ordenes desde aquí.
            </p>

            <div className='grid grid-cols-2 gap-5'>
            {data?.data?.map(pedido => (
                    <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b">
                        <p className='text-xl font-bold text-slate-600'>
                            Contenido del Pedido:
                        </p>

                        {pedido.productos.map(producto => (
                            <div
                                key={producto.id}
                                className='border-b border-b-slate-200 last-of-type:border-none py-4'
                            >
                                <p className='text-sm'>ID: {producto.id}</p>
                                <p>{producto.nombre}</p>
                                <p>
                                    Cantidad: {''}
                                    <span className='font-bold'>{producto.pivot.cantidad}</span>
                                </p>

                            </div>
                        ))}

                        <p className='text-lg font-bold text-slate-600'>
                            Cliente: {''}
                            <span className='font-normal'>{pedido.user.name}</span>
                        </p>

                        <p className='text-lg font-bold text-amber-500'>
                            Total a Pagar: {''}
                            <span className='font-normal text-slate-600'>{ formatearDinero( pedido.total )}</span>
                        </p>

                        <button
        type="button"
        className="bg-yellow-600 hover:bg-yellow-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer flex items-center justify-center"
        onClick={() => handleClickCompletarPedido(pedido.id)}
        disabled={cargando}
    >
        {cargando ? (
            <div className="animate-spin h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
        ) : (
            "Completar"
        )}
    </button>
                    </div>
                ))}
            </div>
        </div>
    )
}