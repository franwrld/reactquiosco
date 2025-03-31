import { formatearDinero } from "../helpers";
import useQuiosco from "../hooks/useQuiosco"
import ResumenProducto from "./ResumenProducto";

export default function Resumen() {

  const {pedido, total} = useQuiosco();

  const comprobarPedido = () => pedido.length === 0;

  return (
    <aside className="w-72 bg-cyan-200 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">
        Resumen de tu pedido
      </p>

      <div className="py-10">
        {pedido.length === 0 ? (
          <p className="text-center text-2xl">No hay elementos aun</p>
        ) : (
          pedido.map(producto => (
            <ResumenProducto 
              key={producto.id}
              producto={producto}
            />
          ))
        )}
      </div>

      <p className="text-xl mt-10">
        Total: {''}
        {formatearDinero(total)}
      </p>

      <form className="w-full">
        <div className="mt-5">
          <input 
            type="submit"
            value="Confirmar Pedido"
            disabled={comprobarPedido()}
            className={`${comprobarPedido() ? 'bg-green-200 text-gray-400' :'bg-green-400 hover:bg-green-400'} px-5 py-2 rounded uppercase font-bold text-white 
              text-center w-full cursor-pointer`}/>
        </div>
      </form>
    </aside>
  )
}
