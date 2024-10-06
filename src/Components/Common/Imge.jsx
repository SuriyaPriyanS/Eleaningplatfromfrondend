import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component'

const Imge = ({src,className, alt}) => {
    return (
        <LazyLoadImage className={`${className}`} alt={alt ||'image'} effect='blur' src={src} />
    );
};

export default Imge;