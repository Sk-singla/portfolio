import React from 'react'

export const Banner = () => {
    return (
        <section id="banner">
            <div className="inner">
                <h2>Hi, I am Samarth.</h2>
                <p>A Software Developer, Who converts Ideas to System. <br/> <br/>
                <span style={{fontWeight:"500"}}>Few technologies, I've been working with:</span><br/>
                Android (Kotlin), React.js, Node.js, Ktor...
                </p>
                <br/>
                <a href="https://www.linkedin.com/in/samarth-gupta-049120193/" target="_blank" rel="noreferrer">
                    <i className="fa fa-linkedin me-3" style={{fontSize:"24px"}}/>
                </a>
                <a href="https://github.com/Sk-singla/" target="_blank" rel="noreferrer">
                    <i className="fa fa-github me-3" style={{fontSize: "24px"}}/>
                </a>
                <a href="https://www.youtube.com/channel/UCSAUbaI3Y14XxhX0T_RJwTw/" target="_blank" rel="noreferrer">
                    <i className="fa fa-youtube me-3" style={{fontSize: "24px"}}/>
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