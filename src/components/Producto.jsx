import { formatearDinero } from "../helpers"
import useQuiosco from "../hooks/useQuiosco"

export default function Producto({producto}) {
    // Hook
    const { handleClickModal, handleSetProducto } = useQuiosco();
    // producto se lo pasamos al handleSetProducto para verlo en el modal
    const {nombre,imagen,precio} = producto

    return (
        <div className="border p-3 shadow bg-emerald-200">
            <img 
                src={`/img/${imagen}.jpg`} 
                alt={`imagen ${nombre}`}
                className="w-full"
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">
                    {nombre}
                </h3>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(precio)}</p>

                <button 
                    onClick={() => {
                        handleClickModal();
                        handleSetProducto(producto);
                    }}
                    type="button" 
                    className="bg-green-500 hover:bg-green-400 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                >
                    Agregar
                </button>
            </div>
        </div>
    )
}
