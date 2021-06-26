import React from 'react';
import Classes from './slide1.module.css';
const Slide1 = () =>{
    return(
        <div>
        <img className={Classes.images}
      src="/image1.jpg"
      alt="First slide"
    />
    <h1>This is first slide</h1>
    </div>
    )
}

export default Slide1;