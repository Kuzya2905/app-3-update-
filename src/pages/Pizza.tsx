import PlusSVG from "../components/Card/SVG/PlusSVG.tsx";
import CheckMark from "./Cart-SVG/Сheck-markSVG.tsx";
import React from "react";
import { addItemToCart, setTotalPrice, setTotalCount } from "../redux/slices/cart.tsx";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useAppDispatch } from "../redux/store.tsx";

const Pizza: React.FC = ()=> {
  const [pizza, setPizza] = React.useState<{
    imageUrl: 'string';
    title: 'string';
    types: number[];
    sizes: number[];
    price: number;
    id: number;
  }>();
  const [count, setCount] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);
  const [activeType, setActiveType] = React.useState(0);
  const typeNames = ["тонкое", "традиционное"];
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(setTotalPrice());
    dispatch(setTotalCount());
  }, [count, dispatch]);
  
  
  const params = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function getPizza() {
      try {
        const { data } = await axios.get(
          "https://65776583197926adf62e373f.mockapi.io/Items/" + params.id
        );
        setPizza(data);
        setActiveType(data.types[0]);
      } catch (error) {
        alert("Ошибка");
        navigate("/");
      }
    }
    getPizza();
  }, [params.id, navigate]);

  return (
    <>
      {pizza ? (
        <div className="one-pizza-info">
          <img src={pizza.imageUrl} alt="" />
          <h2>{pizza.title}</h2>
          <div className="info">
            <div className="thickness">
              {pizza.types.map((typeId, index) => {
                return (
                  <button
                    onClick={() => {
                      setActiveType(index);
                    }}
                    className={
                      activeType === pizza.types[index] ? "active" : ""
                    }
                    key={index}
                  >
                    {typeNames[typeId]}
                  </button>
                );
              })}
            </div>
            <div className="sizes">
              {pizza.sizes.map((size, index) => {
                return (
                  <button
                    onClick={() => {
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
            <span className="price">от {pizza.price} ₽</span>
            <button
              className="add"
              onClick={() => {
                setCount((prev) => prev + 1);
                dispatch(
                  addItemToCart({
                    title: pizza.title,
                    price: pizza.price,
                    imageUrl: pizza.imageUrl,
                    types: pizza.types[activeType],
                    sizes: pizza.sizes[activeSize],
                    id: String(pizza.id),
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
      ) : (
        "Загрузка..."
      )}
      <Link to="/">
        <button className="button-back">
          <CheckMark />
          <span>Вернуться назад</span>
        </button>
      </Link>
    </>
  );
}
export default Pizza;
