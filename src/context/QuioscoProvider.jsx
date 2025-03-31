import {createContext, useState,useEffect} from 'react'
import {categorias as categoriasDB} from '../data/categorias'
import clienteAxios from '../config/axios'
import {toast} from 'react-toastify'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    // {} porque es un objeto inicia como vacio
    const [producto, setProducto] = useState({});
    // Stado para el pedido
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    // Calcular Total
    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0 )
        setTotal(nuevoTotal)
    }, [pedido])

    // API desde Laravel Categorias
    const obtenerCategorias = async () => {
      //  const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('/api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias();
    }, [])

    

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }
    // !modal nos permitira cambiar estado entre false y true automaticamente, en vez de ponerle true
    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setProducto(producto)
    }
    // categoria_id y imagen no nos interesan para agregar al pedido asi que los sacamos del arreglo
    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        
        // Si al cambiar cantidad que ponga la misma y no que sume (editar mismo producto agregado)
        if(pedido.some( pedidoState => pedidoState.id === producto.id )) {
            const pedidoActualizado = pedido.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState)

            setPedido(pedidoActualizado)
            toast.success('Guardado Correctamente')
        } else {
            // Toma una copia de lo que haya en pedido (pedido), y agregale este producto nuevo (producto)
            // cuando agregamos un producto primera vez
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido')
        }
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setProducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.success('Eliminado del pedido')
    }

    // Hacemos disponible las funciones globalmente aca
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