import React, { useContext, useState, useEffect } from "react";
import { WhishesContext } from "../Context/WhishesContext";
import stylee from "./wishes.module.css";
import { ClipLoader, MoonLoader, CircleLoader } from "react-spinners";

export default function Wishes() {
  const { GetLoggedProductWhishes, deletWhishes } = useContext(WhishesContext);
  const [getLogged, setGetLogged] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchWhishesData = async () => {
      try {
        const { data } = await GetLoggedProductWhishes();
        console.log("API Full Response:", data);
        if(Array.isArray(data)){
          setGetLogged(data);
        }
        if (data?.status === "success" && Array.isArray(data.data)) {
          setGetLogged(data.data);
        } else {
          throw new Error("Failed to fetch wishlist data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // ✅ إيقاف التحميل بعد جلب البيانات
      }
    };

    fetchWhishesData();
  }, []);

  // ✅ دالة حذف المنتج وتحديث القائمة بعد الحذف
  const deleteProduct = async (id) => {
    try {
      await deletWhishes(id);
      setGetLogged((prev) => prev.filter((item) => item._id !== id)); // ✅ تحديث القائمة بدون العنصر المحذوف
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  return (
    <>
      {loading ? (  
         <div className={stylee.loading}>
         <CircleLoader className="text-warning" loading={true} size={100} />{" "}
       </div>
     
     
     
      ) : getLogged.length > 0 ? (
        <div className="table-responsive mt-2 p-5">
          <table className="table table-hover align-middle text-center">
            <thead className="table-light text-white">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {getLogged.map((item) => (
                <tr key={item._id} className="border-bottom">
                  <td className="text-center">
                    <img
                      src={item.imageCover}
                      className="rounded shadow"
                      style={{ width: 150, height: 150, objectFit: "cover" }}
                      alt={item.name}
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>{item.price} $</td>
                  <td>
                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="btn btn-danger btn-sm px-3"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-danger text-center mt-5 fw-bold">No products in wishlist</p>
      )}
    </>
  );
}
