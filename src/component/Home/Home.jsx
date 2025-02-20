import React from "react";
import stylee from "./Home.module.css";
import { ClipLoader, MoonLoader, CircleLoader } from "react-spinners";
import axios from "axios";

import { useContext, useState } from "react";
import Slider from "../Slider/Slider";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import SliderGatCategories from "../SliderGatCategories/SliderGatCategories";
import { useQuery } from "@tanstack/react-query";

import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { WhishesContext } from "../Context/WhishesContext";

export default function Home() {
  const [lodingButton, setlodingButton] = useState(false);
  const [currentId, setcurrentId] = useState(0);
  const [numberItem, setnumberItem] = useState(0);
  let { addAllWhishes } = useContext(WhishesContext);
  async function queryProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const { AddToCart, numberItemCard, setnumberItemCard } =
    useContext(CartContext);
  async function addCartItem(id) {
    setcurrentId(id);
    setlodingButton(true);
    let data = await AddToCart(id);
    setnumberItemCard(numberItemCard + 1)
    console.log(numberItem);

    if (data.status == "success") {
      toast.success(data.message);
      setlodingButton(false);
    } else {
      toast.error(data.message);
      setlodingButton(false);
    }
  }

  let { data, isError, isLoading, isFetched, error } = useQuery({
    queryKey: ["requseAllProduct"],
    queryFn: queryProduct,
    gcTime: 10000,
    retry: 4,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  // FUNCTION TO AllWhishes
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoddingFavorite, setisLoddingFavorite] = useState(0);
  async function addWhishes(id) {
    try {
      let res = await addAllWhishes(id);
      setIsFavorite(true);
      setisLoddingFavorite(id);
      if (res.status == "success") {
        toast.success(res.message);
        console.log(res);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error adding to wishes:", error);
      toast.error("Failed to add to wishes");
    }
  }

  return (
    <>
      {isLoading ? (
        <div className={stylee.loading}>
          <CircleLoader className="text-warning" loading={true} size={100} />{" "}
        </div>
      ) : null}

      <>
        <Slider />
        <SliderGatCategories />
        <div className="container mt-5">
          <input
            type="text"
            className="form-control rounded-pill shadow-sm m-auto w-50 p-1 m-5"
            placeholder="Search for products..."
          />

          <div className="row">
            {data?.data?.data.map((product) => (
              <div key={product._id} className="col-md-2 gy-3">
                <div className=" card-total text-center">
                  <Link
                    to={`/ProductDetails/${product.id}/${product.category.name}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100"
                    />

                    <div className="card-body">
                      <h4>{product.title.split(" ").slice(1, 2).join(" ")}</h4>
                      <h5>{product.price} EGP</h5>
                      <h6>{product.brand?.name || "No Brand"}</h6>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-around ">
                    <span>
                      {" "}
                      {product.ratingsAverage}{" "}
                      <FaStar
                        className="mb-1"
                        color={"#ffc107"}
                        style={{ fontSize: "1 rem" }}
                      />
                    </span>{" "}
                    <span>
                      {" "}
                      <FaHeart
                        onClick={() => {
                          addWhishes(product.id);
                        }}
                        className="mb-1"
                        color={
                          isFavorite && isLoddingFavorite == product.id
                            ? "red"
                            : "#ffc107"
                        }
                        style={{ cursor: "pointer", fontSize: "1 rem" }}
                      />{" "}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      addCartItem(product.id);
                    }}
                    type="button"
                    className="btn btn-outline-warning  "
                  >
                    {lodingButton && currentId == product.id ? (
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                      ></span>
                    ) : (
                      " Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    </>
  );
}
