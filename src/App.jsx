import "./App.css";
import { ContextProviderComponent } from "./component/Context/Context";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Wishes from "./component/Wishes/Wishes";
import Categories from "./component/Categories/Categories";
import Cart from "./component/Cart/Cart";
import Home from "./component/Home/Home";
import CheakOut from "./component/CheakOut/CheakOut";
import Login from "./component/Login/Login";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import GetSpificCategories from "./component/GetSpificCategories/GetSpificCategories";
import SignIn from "./component/SignIn/SignIn";
import NotFound from "./component/NotFound/NotFound";
import ProtectedRoute from "./component/protectedRoute/protectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartContextProvider } from "./component/Context/CartContext";
import { WhishesContextProvider } from "./component/Context/WhishesContext";
import Product from "./component/Products/Products";

let queryClient = new QueryClient();
const routeritems = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            {" "}
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            {" "}
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "product",
        element: (
          <ProtectedRoute>
            {" "}
            <Product />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "cheakOut",
        element: (
          <ProtectedRoute>
            <CheakOut />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "getSpificCategories/:id",
        element: (
          <ProtectedRoute>
            <GetSpificCategories />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "Wishes",
        element: (
          <ProtectedRoute>
            <Wishes />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "ProductDetails/:id/:getRelatedCategory",
        element: (
          <ProtectedRoute>
            {" "}
            <ProductDetails />{" "}
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "signin", element: <SignIn /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <ContextProviderComponent>
      <QueryClientProvider client={queryClient}>
        {" "}
        <CartContextProvider>
          <WhishesContextProvider>
            <RouterProvider router={routeritems} />
            <Toaster />
            <ReactQueryDevtools />
          </WhishesContextProvider>
        </CartContextProvider>
      </QueryClientProvider>
    </ContextProviderComponent>
  );
}

export default App;
