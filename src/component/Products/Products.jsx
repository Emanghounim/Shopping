import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaHeart } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader, CircleLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { WhishesContext } from "../Context/WhishesContext";
import stylee from "./Product.module.css";

export default function Product() {
  const [loadingButton, setLoadingButton] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(null);

  const { addAllWhishes } = useContext(WhishesContext);
  const { AddToCart, numberItemCard, setnumberItemCard } = useContext(CartContext);

  async function fetchProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isError, isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: fetchProducts,
    gcTime: 10000,
    retry: 3,
    refetchOnWindowFocus: false,
  });

  async function addCartItem(id) {
    setCurrentId(id);
    setLoadingButton(true);
    let response = await AddToCart(id);

    if (response.status === "success") {
      toast.success(response.message);
      setnumberItemCard((prev) => prev + 1);
    } else {
      toast.error(response.message);
    }
    setLoadingButton(false);
  }

  async function addWhishes(id) {
    try {
      setLoadingFavorite(id);
      let response = await addAllWhishes(id);
      setIsFavorite(true);
      
      if (response.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Failed to add to wishes");
    }
    setLoadingFavorite(null);
  }

  return (
    <>
      {isLoading ? (
        <div className={stylee.loading}>
          <CircleLoader className="text-warning" loading={true} size={100} />
        </div>
      ) : (
        <div className="container mt-5">
          <input
            type="text"
            className="form-control rounded-pill shadow-sm m-auto w-50 p-1 m-5"
            placeholder="Search for products..."
          />

          <div className="row">
            {data?.data?.data.map((product) => (
              <div key={product._id} className="col-md-3 col-sm-6 col-12 gy-3">
                <div className="card text-center p-3 shadow-sm">
                  <Link
                    to={`/ProductDetails/${product.id}/${product.category.name}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="w-100 rounded"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                      <h6>{product.title.split(" ").slice(0, 3).join(" ")}</h6>
                      <h5 className="text-warning">{product.price} EGP</h5>
                      <h6>{product.brand?.name || "No Brand"}</h6>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-around">
                    <span>
                      {product.ratingsAverage}{" "}
                      <FaStar className="mb-1" color={"#ffc107"} />
                    </span>
                    <span>
                      <FaHeart
                        onClick={() => addWhishes(product.id)}
                        className="mb-1"
                        color={
                          isFavorite && loadingFavorite === product.id
                            ? "red"
                            : "#ffc107"
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                  </div>
                  <button
                    onClick={() => addCartItem(product.id)}
                    type="button"
                    className="btn btn-outline-warning mt-2"
                    disabled={loadingButton && currentId === product.id}
                  >
                    {loadingButton && currentId === product.id ? (
                      <ClipLoader size={20} color="#fff" />
                    ) : (
                      "Add To Cart"
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
