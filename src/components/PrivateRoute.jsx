import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    /* заглушка */

    return isAuth ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
