import React from 'react';
import Classes from './slide2.module.css';

const Slide2= () =>{
    return (
        <div>
        <img className={Classes.images}
      src="/image2.jpg"
      alt="Second slide"
    />
    <h1>This is Second slide</h1>
    </div>
    )
}

export default Slide2;