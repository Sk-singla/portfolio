import React, {useState, useEffect, useCallback} from 'react'

export const Header = (props) => {

    const [showNavbar, setNavbarVisibility] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);


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
        <header id="header" className={`${!showNavbar ? "alt" : ""}`}>
            <h1><a href="/">Samarth Gupta</a></h1>
            <nav>
                <div onClick={props.toggleMenu}>Menu</div>
            </nav>
        </header>
    )
}
