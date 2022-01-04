import React from 'react';

function AndroidImageItem({imageUrl,onLoad}) {
    return (
        <div className="d-flex justify-content-center">
            <img
                src="/empty_phone.png"
                className="empty_phone"
                alt=""
            />
            <img
                src={imageUrl}
                className="screenshot"
                onLoad={onLoad}
                alt=""
            />
        </div>
    );
}

export default AndroidImageItem;