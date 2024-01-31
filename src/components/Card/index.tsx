import PlusSVG from "./SVG/PlusSVG.tsx";
import React from "react";
import { addItemToCart, setTotalPrice, setTotalCount } from "../../redux/slices/cart.tsx";
import { Link } from "react-router-dom";
import { RootState, useAppDispatch } from "../../redux/store.tsx";
import { useSelector } from "react-redux";

type typesCardProps = {title:string, price:number, imageUrl:string, types:number[], sizes:number[], id:string}

const Card:React.FC<typesCardProps> = ({ title, price, imageUrl, types, sizes, id }) => {
  const [count, setCount] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(types[0]);
  const typeNames = ["тонкое", "традиционное"];
  const dispatch = useAppDispatch();
  const {itemsCart} = useSelector((state:RootState)=> state.cart)

  React.useEffect(() => {
    dispatch(setTotalPrice());
    dispatch(setTotalCount());
  }, [count, dispatch]);

  React.useEffect(()=> {
    const countItem = itemsCart.filter(item => item.id === id).reduce((acc, item)=> acc + item.count, 0)
    localStorage.setItem(`Pizza_id:${id}`, JSON.stringify(countItem))
  }, [count, id, itemsCart])

  React.useEffect(()=> {
    if(localStorage.getItem(`Pizza_id:${id}`)){
      setCount(()=> Number(localStorage.getItem(`Pizza_id:${id}`)))
    }
  }, [id])

  

  
  
  
  return (
    <div className="pizza-card">
      <Link to={`/pizza/${id}`}>
        <img src={imageUrl} alt="" />
        <h2>{title}</h2>
      </Link>
      <div className="info">
        <div className="thickness">
          {types.map((typeId:number, index:number) => {
            return (
              <button
                onClick={() => {
                  setActiveType(index);
                }}
                className={activeType === types[index] ? "active" : ""}
                key={index}
              >
                {typeNames[typeId]}
              </button>
            );
          })}
        </div>
        <div className="sizes">
          {sizes.map((size:number, index:number) => {
            return (
              <button
                onClick={(e) => {
                  setActiveSize(index);
                }}
                className={activeSize === index ? "active" : ""}
                key={index}
              >
                {size} см.
              </button>
            );
          })}
        </div>
      </div>
      <div className="info-2">
        <span className="price">
          {" "}
          {activeSize === 0
            ? price
            : activeSize === 1
            ? Math.round(price * 1.3)
            : Math.round(price * 1.6)}{" "}
          ₽
        </span>
        <button
          className="add"
          onClick={() => {
            setCount((prev) => prev + 1);
            dispatch(
              addItemToCart({
                title,
                price,
                imageUrl,
                types: types[activeType],
                sizes: sizes[activeSize],
                id,
              })
            );
          }}
        >
          <PlusSVG />
          <span>Добавить</span>
          <span className="count">{count}</span>
        </button>
      </div>
    </div>
  );
}

export default Card;
