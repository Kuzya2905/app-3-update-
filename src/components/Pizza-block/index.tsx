import React from "react";

import ItemContentLoader from "../Item-content-loader/index.tsx";
import Card from "../Card/index.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.tsx";

type typesCurrentItems = {id:string, imageUrl:string, title:string, types:number[], sizes:number[], price:number}

const PizzaBlock: React.FC = () =>  {
  const { status } = useSelector((state:RootState) => state.pizzaSlice);
  const { currentItems } = useSelector((state:RootState) => state.pagination);
  

  return (
    <div className="pizza-cards">
      {status === "loading" ? (
        [...new Array(10)].map((item, index) => (
          <ItemContentLoader key={index} />
        ))
      ) : status === "error" ? (
        <div>Ошибка</div>
      ) : (
        currentItems.map((item:typesCurrentItems) => {
          return <Card {...item} key={item.id} />;
        })
      )}
    </div>
  );
}

export default PizzaBlock;
