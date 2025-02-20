import axios from "axios";
import { createContext,useState } from "react";

export let CartContext = createContext();
export function CartContextProvider(props) {

  const [cardId, setcardId] = useState(0);
  const [numberItemCard, setnumberItemCard] = useState(0);

  let header = {
    headers: {
      token: localStorage.getItem("useTokken"),
    },
  };

  async function AddToCart(productId) {
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        header
      );
      return res.data;
    } catch (error) {
      console.error("Error adding to cart:", error);
      return error.response?.data || error.message;
    }
  }

  async function GetLoggedUserCart() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        header
      );
      console.log(data.numOfCartItems);
      setnumberItemCard(data.numOfCartItems)
      setcardId(data.data._id); console.log(cardId);
      return data;
    } catch (error) {
      console.log(data.error);
    }
  }

  async function UpdateCartProductQuantity(productId, count) {
    try {
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        header
      );
      return data;
    } catch (error) {
      console.error("Error updating cart quantity: ", error.message);
      return error.response?.data || error.message;
    }
  }

  async function RemoveSpecifiCcartItem(productId) {
    try {
      let response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        header
      );
      return response.data;
    } catch (error) {
      console.error("Error removing item:", error);
      return { status: "error", message: error.message };
    }
  }
  async function ClearItem() {
    try {
      response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        header
      );
      return response.data;
    } catch (error) {
      console.error("Error removing item:", error);
      return { status: "error", message: error.message };
    }
  }

  async function CheakOut(id, url, formData) {
    try {
      let res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
        { shippingAddress: formData },  
        header 
      );
      return res.data;
    } catch (error) {
      console.error("Error during checkout:", error);
      return error.response?.data || error.message;
    }
  }
  
  
  return (
    <CartContext.Provider
      value={{
        ClearItem,
        AddToCart,
        GetLoggedUserCart,
        UpdateCartProductQuantity,
        RemoveSpecifiCcartItem,
        CheakOut,
        cardId,
        setnumberItemCard,numberItemCard
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
