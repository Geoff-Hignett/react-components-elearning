import React from 'react'
import { Link } from "react-router-dom";


function Header({ title, homePage, description }) {
    return (
        <div className="bg-slate-300">
            <div className="container mx-auto text-center py-5">
                <h1 className="mb-5">{title}</h1>
                <p className="mb-5">{description}</p>
                {!homePage && <Link className="p-3 bg-white rounded" to="/">Back to home</Link>}
            </div>
        </div>
    )
}

export default Header;