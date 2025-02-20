import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleLoader } from "react-spinners";
 import stylee from './GetSpificCategories.module.css'
export default function CategoryDetails() {
  const { id } = useParams();
  const [categoryDetails, setCategoryDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCategoryDetails(id) {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}`
      );
      setCategoryDetails(data.data);
    } catch (error) {
      console.error("Error fetching category details:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategoryDetails(id);
  }, [id]);

  return (
    <>
      <h2 className="text-center m-5 fw-bold text-warning">Category Details</h2>
      {loading ? (
       <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
       <CircleLoader color="black" size={80} />
     </div>
      ) : categoryDetails ? (
        <div className="container text-center">
          <img
            src={categoryDetails.image}
            className="img-fluid rounded shadow-lg"
            alt={categoryDetails.name}
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
          <h3 className="mt-4">{categoryDetails.name}</h3>
          <p className="text-muted">
            {categoryDetails.description || "No description available"}
          </p>
        </div>
      ) : (
        <h3 className="text-center text-danger">Category not found</h3>
      )}
    </>
  );
}
