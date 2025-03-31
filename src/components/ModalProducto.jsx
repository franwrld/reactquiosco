import { useState, useEffect } from "react";
// El useState solo lo usaremos en este modal
import useQuiosco from "../hooks/useQuiosco"
// Importamos useQuiosco para tener acceso al producto
import { formatearDinero } from "../helpers";

export default function ModalProducto() {
    // Agregamos las funciones que usaremos definidas en QuioscoProvider
    const { producto, handleClickModal, handleAgregarPedido, pedido }= useQuiosco();
    // Definiendo state para las cantidades minimo sera 1
    const [cantidad, setCantidad] = useState(1)
    // Si tengo 3 productos agregados que no me permita agregar otra vez 3 mas al volver elegir el producto mismo ya agregado
    const [edicion, setEdicion] = useState(false)
    // Mantenemos la cantidad en el modal misma cantidad que agregamos al pedido
    useEffect(() => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const productoEdicion = pedido.filter( pedidoState => pedidoState.id === producto.id)[0]

            setCantidad(productoEdicion.cantidad)
            setEdicion(true)
        }
    }, [pedido])

    return (
        <div className="md:flex gap-10 items-center">
            <div className="md:w-1/3">
                <img 
                    src={`/img/${producto.imagen}.jpg`} 
                    alt={`Imagen Producto ${producto.nombre}`}
                />
            </div>

            <div className="md:w-2/3">
                <div className="flex justify-end">
                    <button
                        onClick={handleClickModal}
                        className='cursor-pointer'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <h1 className="text-3xl font-bold mt-5">
                    {producto.nombre}
                </h1>
                <p className="mt-5 font-black text-5xl text-amber-500">
                    { formatearDinero(producto.precio) }
                </p>
                {/* Cantidades */}
                <div className="flex gap-4 mt-5">
                    {/* Menos */}
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1);
                        }} 
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                    <p className="text-3xl">{cantidad}</p>
                    {/* Mas */}
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={() => {
                            if(cantidad >= 10) return
                            setCantidad(cantidad + 1);
                        }}   
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 text-white font-bold uppercase rounded cursor-pointer"
                    // los 3 puntos usamos para meter cantidad en producto
                    onClick={() => {
                        handleAgregarPedido({...producto, cantidad})
                        // Al darle click al agregar pedido se cierra con handleclickmodal
                        handleClickModal()
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Agregar al pedido'}
                </button>
            </div>

        </div>
    )
}
