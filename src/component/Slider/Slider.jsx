import React from "react";
import IMG1 from '../Img/1.png'
import IMG2 from '../Img/2.jpg'
import IMG3 from '../Img/3.jpg'
 
     export default function Slider() {
  return (
    <div
      id="carouselExample"
      className="carousel slide"
      data-bs-ride="carousel"  
    >
      <div className="carousel-inner">
        <div className="carousel-item active"> 
          <img src={IMG1} className="d-block w-100" alt="First Slide" />
        </div>
        <div className="carousel-item">
          <img src={IMG2} className="d-block w-100 " alt="Second Slide" />
        </div>
   
      </div>
      
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
  