import React, {useState, useEffect, useCallback, useContext} from 'react'
import TopAlertBar from "./TopAlertBar";
import ProjectContext from "../context/projects/ProjectContext";

export const Header = (props) => {

    const [showNavbar, setNavbarVisibility] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isAlertVisible,setAlertVisibility] = useState(false);
    const context = useContext(ProjectContext);
    const {alert} = context;

    useEffect(()=>{
        if(alert.message && alert.message.trim() !== ""){
            setAlertVisibility(true);
            setTimeout(()=>{
                setAlertVisibility(false);
            },3000)
        }
        return ()=>{
            setAlertVisibility(false);
        }
    },[alert])


    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY) {
            setNavbarVisibility(false);
        } else {
            setNavbarVisibility(true);
        }
        setLastScrollY(currentScrollY);
    },[lastScrollY])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll])
    return (
        <div>
            <header id="header" className={`${!showNavbar || isAlertVisible ? "alt" : ""}`}>
                <h1><a href="/">Samarth Gupta</a></h1>
                <nav>
                    <div onClick={props.toggleMenu}>Menu</div>
                </nav>
            </header>
            {
                isAlertVisible ?
                    <TopAlertBar/> : <span/>
            }
        </div>
    )
}
