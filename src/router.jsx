
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Layout from "./layouts/Layout"; 
import AuthLayout from "./layouts/AuthLayout";  
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';
import AdminLayout from "./layouts/AdminLayout";
import Productos from "./views/Productos";
import Ordenes from "./views/Ordenes"; 

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
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'registro',
                element: <Registro />
            }
            
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [{
            index: true,
            element: <Ordenes />
        },{
            path: 'productos',
            element: <Productos />
        }    
    
    ]
    }
]);

export default router;
