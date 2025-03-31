import { createBrowserRouter } from 'react-router-dom'
import React from "react";
import Layout from './layouts/Layout'
import Inicio from './views/Inicio'
import Login from './views/Login'
import AuthLayout from './layouts/AuthLayout'
import Registro from './views/Registro'
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [{
            index: true,
            element: <Inicio />
        }]
    },
    {
        path: '/auth',  // La ruta base para Auth
        element: <AuthLayout />,
        children: [
            {
                path: 'login',  // La ruta es relativa, no es necesario "/auth"
                element: <Login />
            },
            {
                path: 'registro',  // Ruta relativa bajo "/auth"
                element: <Registro />
            }
        ]
    }
]);

export default router;