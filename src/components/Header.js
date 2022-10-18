import React from 'react'

function Header({ title }) {
    return (
        <div className="bg-slate-300">
            <div className="container mx-auto text-center py-5">
                <h1>{title}</h1>
            </div>
        </div>
    )
}

export default Header;