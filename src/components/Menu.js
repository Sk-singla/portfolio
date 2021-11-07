import React from 'react'
import {Link, useHistory} from 'react-router-dom'

export const Menu = (props) => {
    const history = useHistory();
    const handleLogout = (event) => {
        try{
            event.preventDefault();
            localStorage.removeItem("token");
            localStorage.removeItem("email");
            props.toggleMenu();
            history.push("/");
        }catch (e){
            console.log(e.message);
        }
    }
    return (
        <div>
            <nav id="menu">
                <div className="inner">
                    <h2>Menu</h2>
                    <ul className="links">
                        <li><Link to="/" onClick={props.toggleMenu}>Home</Link></li>
                        {localStorage.getItem("token")
                        ? <li><Link to="/logout" onClick={handleLogout}>Logout</Link></li>
                        :<div><li><Link to="/login" onClick={props.toggleMenu}>Log In</Link></li>
                                <li><Link to="/signup" onClick={props.toggleMenu}>Sign Up</Link></li></div>
                        }
                        {
                            localStorage.getItem("email") === process.env.REACT_APP_ADMIN_MAIL ?
                                <li><Link to="/update/newProject" onClick={props.toggleMenu}>Add New Project</Link></li>
                                : <div/>
                        }
                    </ul>
                    <div className="close" onClick={props.toggleMenu}><i className="fa fa-close"/></div>
                </div>
            </nav>
        </div>
    )
}
