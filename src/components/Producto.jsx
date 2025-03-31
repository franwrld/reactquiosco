import React, { useState, useEffect } from 'react';
import { formatearDinero } from '../helpers';
import useQuiosco from '../hooks/useQuiosco';

export default function Producto({ producto, botonAgregar = false, botonDisponible = false }) {
    const { handleClickModal, handleSetProducto, handleClickProductoAgotado } = useQuiosco();
    const { id, nombre, imagen, precio, disponible: disponibleInicial } = producto;
    const [disponible, setDisponible] = useState(disponibleInicial);
    const toggleDisponible = async () => {
        await handleClickProductoAgotado(id);
        setDisponible(prev => (prev === 1 ? 0 : 1));
    };

    return (
        <div className="border p-3 shadow bg-white">
            <img alt={`imagen ${nombre}`} className="w-full" src={`/img/${imagen}.jpg`} />

            <div className="p-5">
                <h3 className="text-2xl font-bold">{nombre}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatearDinero(precio)}
                </p>

                {botonAgregar && (
                    <button
                        type="button"
                        className="bg-yellow-950 hover:bg-yellow-800 text-white w-full mt-5 p-3 uppercase font-bold"
                        onClick={() => {
                            handleClickModal();
                            handleSetProducto(producto);
                        }}
                    >
                        Agregar
                    </button>
                )}

                {botonDisponible && (
                    <button
                        type="button"
                        className={`w-full mt-5 p-3 uppercase font-bold ${
                            disponible === 0 ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'
                        } text-white`}
                        onClick={toggleDisponible}
                    >
                        {disponible === 0 ? 'Producto Agotado' : 'Producto Disponible'}
                    </button>
                )}
            </div>
        </div>
    );
}