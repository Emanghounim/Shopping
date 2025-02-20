import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import stylee from "./ProductDetails.module.css";
import { FaStar } from "react-icons/fa";
import { Related } from "../Related/Related";
import Slider from "react-slick";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { AddToCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);  
  
  async function addCartItem(id) {
    setLoading(true);  
    try {
      let data = await AddToCart(id);
  
      if (data.status === "success") {
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add item to cart!");
    } finally {
      setLoading(false);  
    }
  }
  
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };
  async function getProductDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products/${id}`
      );
      setProductDetails(data.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  return (
    <>
      <h2 className="text-center m-5 fw-bold">Product Details</h2>
      {productDetails ? (
        <div className="container">
          <div className="row">
            <div className="col-md-4  ">
              <Slider {...settings}>
                {productDetails.images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="w-100"
                    alt={`Product image ${index}`}
                  />
                ))}
              </Slider>
            </div>
            <div className="col-md-8 mt-5">
              <h3>{productDetails.title}</h3>
              <p>{productDetails.description}</p>
              <h5>Price: {productDetails.price} EGP</h5>
              <h6>Brand: {productDetails.brand?.name || "No Brand"}</h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => {
                    addCartItem(productDetails.id);
                  }}
                  type="button"
                  className="btn btn-outline-warning w-50"
                >
                  {loading ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                  ) : (
                    " Add To Cart"
                  )}
                </button>
                <span
                  style={{ display: "flex", alignItems: "center", gap: "5px" }}
                >
                  <FaStar color={"#ffc107"} /> {productDetails.ratingsAverage}
                </span>
              </div>
            </div>
          </div>
          <Related currentCategory={productDetails?.category?.name} />{" "}
        </div>
      ) : (
        <div className={stylee.ProductDetails}>
          <CircleLoader className="text-warning" loading={true} size={100} />
        </div>
      )}
    </>
  );
}
