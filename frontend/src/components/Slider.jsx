import sliderPic1 from '../images/slider-pic-1.jpeg';
import sliderPic2 from '../images/slider-pic-2.jpg';
import sliderPic3 from '../images/slider-pic-3.jpg';

import '../styles/Slider.css';

export default function Slider() {
    return(
        <>
            <div id="carouselExampleAutoplaying" className="carousel slide slider-width slider-height" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={sliderPic1} className="d-block w-100 slider-image-height" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderPic2} className="d-block w-100 slider-image-height" alt="..."/>
                    </div>
                    <div className="carousel-item">
                        <img src={sliderPic3} className="d-block w-100 slider-image-height" alt="..."/>

                        {/* <img src="https://www.vocso.com/blog/wp-content/uploads/2022/02/eCommerce-Website-Features-1920-x-1080.jpg" 
                            className="d-block w-100" alt="..."/> */}
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}