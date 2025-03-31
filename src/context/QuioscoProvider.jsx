import {createContext, useState,useEffect} from 'react'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'
import {toast} from 'react-toastify'

const QuioscoContext = createContext()
const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setProducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategorias(data.data);
            if (data.data.length > 0) {
                setCategoriaActual(data.data[0]);
            }
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };

    useEffect(() => {
        obtenerCategorias();
    }, [])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }
    
    const handleSetProducto = producto => {
        setProducto(producto)
    }

    const handleAgregarPedido = ({categoria_id,...producto}) => {
     

        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const PedidoActualizado = pedido.map( pedidoState =>
                 pedidoState.id === producto.id ? producto : pedidoState)
                setPedido(PedidoActualizado)
                toast.success(`${producto.nombre} Guardado correctamente`)
        } else {
            setPedido([...pedido, producto])
            toast.success(`${producto.nombre} agregado al pedido`)
        }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter( producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter( producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.error('Producto eliminado correctamente')
    }

    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
         try {
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);

            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCompletarPedido = async (id) => {
        setCargando(true);
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setCargando(false);
        }
    };

    const handleClickProductoAgotado = async (id) => {
        
        const token = localStorage.getItem('AUTH_TOKEN');
        try {
            const { data } = await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                handleClickModal,
                modal,
                handleSetProducto,
                producto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                cargando , 
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
} 

export {
    QuioscoProvider
}

export default QuioscoContext