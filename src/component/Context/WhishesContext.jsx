import axios from "axios";
import { createContext } from "react";

export const WhishesContext = createContext();

export function WhishesContextProvider({ children }) {
  const header = {
    headers: {
      token: localStorage.getItem("useTokken"),
    },
  };

  async function addAllWhishes(productId) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },  
        header
      );
      return data;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      return error.response?.data || error.message;
    }
  }

  async function GetLoggedProductWhishes() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        header
      );
      console.log("Fetched Wishlist:", data);  
      return data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return error.response?.data || error.message;
    }
  }

  async function deletWhishes(id) {
    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
       header
      );
      console.log("Fetched Wishlist:", data);  
      return data;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      return error.response?.data || error.message;
    }
  }



  return (
    <WhishesContext.Provider value={{ addAllWhishes, GetLoggedProductWhishes,deletWhishes }}>
      {children}
    </WhishesContext.Provider>
  );
}