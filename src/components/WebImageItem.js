import React from 'react';

function WebImageItem({imageUrl,onLoad}) {
    return (
        <div className="d-flex justify-content-center">
            <img
                src={imageUrl}
                className="screenshot_web"
                onLoad={onLoad}
                alt=""
            />
        </div>
    );
}

export default WebImageItem;