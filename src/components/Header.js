import React, {useState, useEffect} from 'react'

export const Header = (props) => {

    const [showNavbar, setNavbarVisibility] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);


    const handleScroll = () => {
        // if(window.location.href.includes("http://localhost:3000/projectDetail")){
        //     setNavbarVisibility(false)
        //     return;
        // }

        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY) {
            setNavbarVisibility(false);
        } else {
            setNavbarVisibility(true);
        }
        // console.log(currentScrollY)
        // console.log(lastScrollY);
        // console.log(showNavbar);
        setLastScrollY(currentScrollY);
    };
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
