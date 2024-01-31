import React from "react";
import MinusSVG from "./SVG/MinusSVG.tsx";
import DeleteSVG from "./SVG/DeleteSVG.tsx";
import PlusSVG from "./SVG/PlusSVG.tsx";
import {
  deleteItem,
  setTotalPrice,
  setTotalCount,
  minusCount,
  plusCount,
} from "../../redux/slices/cart.tsx";
import { useAppDispatch } from "../../redux/store.tsx";

type itemCartProps = {title:string; count:number; imageUrl: string; types:number; sizes:number; price:number; index:number}



const ItemCart:React.FC <itemCartProps> = ({ title, count, imageUrl, types, sizes, price, index }) => {
  const dispatch = useAppDispatch();
  const typeNames = ["тонкое", "традиционное"];
  return (
    <div className="pizza">
      <div className="info">
        <img src={imageUrl} alt="" />
        <div className="text">
          <h2>{title}</h2>
          <span>
            {typeNames[types]}, {sizes} см.
          </span>
        </div>
      </div>
      <div className="count">
        <button
          onClick={() => {
            dispatch(minusCount(index));
            dispatch(setTotalPrice());
            dispatch(setTotalCount());
          }}
        >
          <MinusSVG />
        </button>
        <span>{count}</span>
        <button
          onClick={() => {
            dispatch(plusCount(index));
            dispatch(setTotalPrice());
            dispatch(setTotalCount());
          }}
        >
          <PlusSVG />
        </button>
      </div>
      <div className="price">{count * price} ₽</div>
      <div
        className="delete"
        onClick={() => {
          dispatch(deleteItem(index));
          dispatch(setTotalPrice());
          dispatch(setTotalCount());
        }}
      >
        <DeleteSVG />
      </div>
    </div>
  );
}

export default ItemCart;
