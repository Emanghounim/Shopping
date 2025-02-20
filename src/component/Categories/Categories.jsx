import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircleLoader } from "react-spinners"; 
import { Link } from "react-router-dom";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  

  async function getAllCategories() {
    try {
      let response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      if (response.status === 200) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);  
    }
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center text-warning">All Categories</h1>

      {loading ? (
       
        <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <CircleLoader color="black" size={80} />
        </div>
      ) : (
        <div className="row mt-4">
          {categories.length > 0 ? (
            categories.map((category) => (
              <div key={category._id} className="col-md-4 col-lg-3 mb-4">
         <Link to={`/getSpificCategories/${category._id}`} style={{ textDecoration: "none"} }>
         <div className="card border-0 shadow-lg text-center ">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="card-img-top rounded"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark">{category.name}</h5>
                  </div>
                </div>
         
         </Link>       
              </div>
            ))
          ) : (
            <h3 className="text-center text-danger">No categories found.</h3>
          )}
        </div>
      )}
    </div>
  );
}
