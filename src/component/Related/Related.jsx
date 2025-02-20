import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import { FaStar } from "react-icons/fa";  
import axios from "axios";
import stylee from "./Related.module.css";

export function Related({ currentCategory }) {
  const [relatedCategory, setRelatedCategory] = useState([]);  

  useEffect(() => {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        const filteredProducts = res.data?.data?.filter(
          (product) => product.category?.name === currentCategory
        );
        setRelatedCategory(filteredProducts);
      })
      .catch((err) => {
        console.error("Error fetching related products:", err);
      }); 
  }, [currentCategory]);

  return (
    <>
      <div className="row">
        {relatedCategory.length > 0 ? (  
          relatedCategory.map((product) => (
            <div key={product._id} className="col-md-2 gy-3">
              <div className="card-total text-center">
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
                    <h4>
                      {product.title.split(" ").slice(1, 2).join(" ")}
                    </h4>
                    <h5>{product.price} EGP</h5>
                    <h6>{product.brand?.name || "No Brand"}</h6>
                    <span>
                      {product.ratingsAverage}{" "}
                      <FaStar className="mb-1" color={"#ffc107"} />
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center">No related products found.</h4> 
        )}
      </div>
    </>
  );
}
