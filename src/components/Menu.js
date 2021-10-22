import React from 'react'
import { Link } from 'react-router-dom'

export const Menu = (props) => {
    return (
        <div>
            <nav id="menu">
                <div className="inner">
                    <h2>Menu</h2>
                    <ul className="links">
                        <li><Link to="/" onClick={props.toggleMenu}>Home</Link></li>
                        <li><Link to="/" onClick={props.toggleMenu}>Log In</Link></li>
                        <li><Link to="/" onClick={props.toggleMenu}>Sign Up</Link></li>
                    </ul>
                    <div className="close" onClick={props.toggleMenu}>Close</div>
                </div>
            </nav>
        </div>
    )
}
