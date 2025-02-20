import React, { useContext, useEffect, useState } from "react";
import stylee from "./Cart.module.css";

import { CartContext } from "../Context/CartContext";
import { CircleLoader } from "react-spinners";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    GetLoggedUserCart,
    ClearItem,
    UpdateCartProductQuantity,
    RemoveSpecifiCcartItem,
    numberItemCard,
    setnumberItemCard,
  } = useContext(CartContext);
  const [data, setData] = useState(null); // تخزين بيانات السلة
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل
  const [error, setError] = useState(null); // تخزين الأخطاء

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await GetLoggedUserCart();
        if (response.status === "success") {
          setData(response.data);
          setnumberItemCard(numberItemCard)
          console.log(data);
        } else {
          throw new Error("Error fetching cart data");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (isLoading) {
    return (
      <div className={stylee.loading}>
        <CircleLoader className="text-warning" loading={true} size={100} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  async function UpdateCartProduct(id, count) {
    let response = await UpdateCartProductQuantity(id, count);
    if (count == 0) {
      RemoveCart(id);
    } else {
      setData(response.data);
    }
    if (response.status == "success") {
      setData(response.data);
      console.log(data);

      toast.success("Product Updated Successfully");
    } else {
      toast.error("Product Un Updated ");
    }
  }

  async function RemoveCart(productId) {
    let data = await RemoveSpecifiCcartItem(productId);
    if (data) {
      setnumberItemCard(numberItemCard-1)
      setData(data.data);
    }
  }
  async function RemoveALLCart() {
    let data = await ClearItem();
    if (data) {
      setData(data.data);
      setnumberItemCard(0)

      toast.success("Product Cleared Successfully");
    }
  }

  return (
    <>
      {data?.products.length > 0 ? (
        <>
          <h2 className="text-center mt-4 fw-bold">
            Total Price: {data ? data.totalCartPrice : 0} $
          </h2>

          <div className="table-responsive mt-2 p-5">
            <table className="table table-hover align-middle text-center">
              <thead className="table-light text-white">
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col">Product</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.products?.map((item, index) => (
                  <tr key={index} className="border-bottom">
                    <td className="text-center">
                      <img
                        src={item.product.imageCover}
                        className="rounded shadow"
                        style={{ width: 150, height: 150, objectFit: "cover" }}
                        alt={item.product.title}
                      />
                    </td>

                    <td className="">{item.product.title}</td>

                    {/* التحكم في الكمية */}
                    <td>
                      <div className="d-flex justify-content-center align-items-center">
                        <button
                          onClick={() => {
                            UpdateCartProduct(item.product._id, item.count - 1);
                          }}
                          className="btn btn-outline-danger btn-sm px-3 mx-2"
                        >
                          -
                        </button>

                        <span className="px-3 py-1 bg-light rounded border">
                          {item.count}
                        </span>
                        <button
                          onClick={() => {
                            UpdateCartProduct(item.product._id, item.count + 1);
                          }}
                          className="btn btn-outline-danger btn-sm px-3 mx-2"
                        >
                          +
                        </button>
                      </div>
                    </td>

                    <td className="">{item.price} $</td>

                    <td>
                      <button
                        onClick={() => {
                          RemoveCart(item.product._id);
                        }}
                        className="btn btn-danger btn-sm px-3"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tr>
                <td colSpan="5" className="text-center  ">
                  <Link to={"/cheakOut"}>
                    <button className="btn btn-success px-4 py-2 w-50 mt-2 mb-2">
                      Cheak Out
                    </button>{" "}
                  </Link>
                </td>
              </tr>
              <tr>
                <td colSpan="5" className="text-center  ">
                  <button
                    onClick={() => {
                      RemoveALLCart();
                    }}
                    className="btn btn-danger px-4 py-2 w-50 mt-2"
                  >
                    CLEAR ALL
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </>
      ) : (
        <h1 className="text-warning text-center m-5">
          No Products In Cart
        </h1>
      )}
    </>
  );
};

export default Cart;
