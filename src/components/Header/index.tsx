import CartSVG from "./SVG/CartSVG.tsx";
import React from "react";
import { Link } from "react-router-dom";
import Search from "../Search/index.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector} from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store.tsx";
import { addItemsFromLocalStorage } from '../../redux/slices/cart.tsx'

const Header:React.FC = ()=> {
  const { totalPrice, totalCount, itemsCart } = useSelector((state:RootState) => state.cart);

  const dispatch = useAppDispatch();

  const location = useLocation();

  React.useEffect(()=> {
    const cartItem = localStorage.getItem('cart');
    if(cartItem){
      const cartLocalStorage = JSON.parse(cartItem)
      dispatch(addItemsFromLocalStorage(cartLocalStorage))
    }
}, [dispatch])

  React.useEffect(()=> {
      localStorage.setItem('cart', JSON.stringify(itemsCart))
  }, [itemsCart])

  return (
    <header>
      <a
        href="/?urlParameterSort=rating&urlParameterFilter=&currentPage=1"
        className="header-left"
      >
        <img src="images/header/Logo.png" alt="" />
        <div className="info">
          <h1>REACT PIZZA</h1>
          <span>самая вкусная пицца во вселенной</span>
        </div>
      </a>
      <Routes>
        <Route path="/" element={<Search />}></Route>
      </Routes>
      {location.pathname !== "/cart" ? (
        <Link to="/cart" className="header-right">
          <button className="button-1">
            <span>{totalPrice} ₽</span>
          </button>
          <button className="button-2">
            <CartSVG />
            <span>{totalCount} </span>
          </button>
        </Link>
      ) : (
        ""
      )}
    </header>
  );
}
export default Header;
