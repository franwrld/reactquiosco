import { useEffect } from "react";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";
export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate();

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = async (datos, setErrores) => {
        try {
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        } catch (error) {
            if (error.response) {
                setErrores(Object.values(error.response.data.errors))
            } else if (error.request) {
                setErrores(['No se pudo conectar con el servidor'])
            } else {
                setErrores(['Error al configurar la petición'])
            }
        }
    }

    const registro = () => {
        
    }

    const logout = () => {
        
    }

    console.log(user)
    console.log(error)

    useEffect(() => {
        if(middleware === 'guest' && url && user) {
            navigate(url)
        }
    }, [user, error])

    return {
        login,
        registro,
        logout
    }
}