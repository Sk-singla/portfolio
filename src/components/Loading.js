import React from 'react';

function Loading(props) {
    const {vertically_center, isAbs, text} = props
    return (
        <div className={`align-center ${isAbs ? "pos_center_fixed" : ""} ${vertically_center ? "d-flex justify-content-center align-items-center screen_size" : ""}`}
             style={{width:"100%"}}
        >
            <div>
                <div className="loadingio-spinner-ripple-1o3hulieva4">
                    <div className="ldio-dj8ghc4tgwi">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div>
                    {text ? <h3 className="align-text-bottom">{text}</h3> : <div/>}
                </div>
            </div>
        </div>
    );
}

export default Loading;