import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    let isAuth = false
    return (
        <header className="flex justify-between bg-gray-900  items-center p-6">
            <div className="svg-name text-white">Svg+name</div>
            <div className="login-register flex gap-4">
                <button className="login-button border rounded-md p-2 text-white">
                    Log-in
                </button>
                <button className="register-button border rounded-md p-2 text-white">
                    Sign Up
                </button>
            </div>
        </header>
    )
}

export default Header
