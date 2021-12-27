import React from 'react'

export const Banner = () => {
    return (
        <section id="banner">
            <div className="inner">
                <h2>Hi, I am Samarth.</h2>
                <p>I am an Android Developer.<br/>
                    I build Android Apps using Kotlin and Backend using Ktor and Node.js
                </p>
                <br/>
                <a href="https://www.linkedin.com/in/samarth-gupta-049120193/" target="_blank" rel="noreferrer">
                    <i className="fa fa-linkedin me-3" style={{fontSize:"24px"}}/>
                </a>
                <a href="https://www.instagram.com/sk_singla02/" target="_blank" rel="noreferrer">
                    <i className="fa fa-instagram me-3" style={{fontSize: "24px"}}/>
                </a>
                <a href="https://github.com/Sk-singla/" target="_blank" rel="noreferrer">
                    <i className="fa fa-github me-3" style={{fontSize: "24px"}}/>
                </a>
            </div>
        </section>
    )
}

/**
 * todo: get single project by id route
 * todo: showing Loading and Errors
 * todo: remove anchor tag if not a link(project detail)
 */