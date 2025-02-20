import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import stylee from "./SliderGatCategories.module.css"; 

export default function SliderGatCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategories(res.data?.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);  

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:3 ,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="container my-5">
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className="text-center">
            <img
              src={category.image}
              className="w-100 rounded"
              style={{ height: "200px", backgroundSize: "cover" }}
              alt={category.name}
            />
            <h6 className="mt-2">{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
