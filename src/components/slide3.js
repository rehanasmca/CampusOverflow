import React from 'react';
import Classes from './slide3.module.css';
const Slide3= () =>{
    return (
        <div>
        <img className={Classes.images}
      src="/image3.jpg"
      alt="Third slide"
    />
    <h1>This is Third slide</h1>
    </div>
    )
}

export default Slide3;