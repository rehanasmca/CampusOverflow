import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Classes from './carasol.module.css';
import Slide1 from './slide1';
import Slide2 from './slide2';
import Slide3 from './slide3';
const Carasol = () => {
    return (
        <Carousel>
            <Carousel.Item>

                <Slide1 />
            </Carousel.Item>
            <Carousel.Item>
                <Slide2 />
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Slide3 />
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default Carasol;