import React, { useState } from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import { useSelector} from "react-redux";
import {
  setValueFilter,
  setFilterAndSortByUrl,
} from "../redux/slices/filterAndSort.tsx";
import {
  setUrlParameterSort,
  setOrderSort,
  setUrlParameterFilter,
} from "../redux/slices/urlParameters.tsx";
import { setCurrentPageFromUrl } from "../redux/slices/pagination.tsx";
import { fetchPizzas } from "../redux/slices/pizzaSlice.tsx";

import FilterAndSort from "../components/FilterAndSort/index.tsx";
import Pagination from "../components/Pagination/Pagination.tsx";
import PizzaBlock from "../components/Pizza-block/index.tsx";
import { RootState, useAppDispatch } from "../redux/store.tsx";

function Home() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();



  const [isLocationSearch, setIsLocationSearch] = useState(false);

  const { valueSearch } = useSelector((state:RootState) => state.visibleItems);
  const { currentPage } = useSelector((state:RootState) => state.pagination);

  //Filter and sort
  const { valueFilter, valueSort } = useSelector(
    (state:RootState) => state.filterAndSort
  );

  const { urlParameterSort, orderSort, urlParameterFilter } = useSelector(
    (state:RootState) => state.urlParameters
  );

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.slice(1));
      dispatch(setFilterAndSortByUrl(params));
      dispatch(setCurrentPageFromUrl(params));
    }
    setIsLocationSearch(true);
  }, [dispatch]);

  React.useEffect(() => {
    if (isLocationSearch) {
      const nameLink = qs.stringify({
        urlParameterSort,
        urlParameterFilter,
        currentPage,
      });
      navigate(`?${nameLink}`);
    }
  }, [
    urlParameterSort,
    urlParameterFilter,
    currentPage,
    isLocationSearch,
    navigate,
  ]);

  //Get items from backend
  React.useEffect(() => {
    async function getItems() {
      dispatch(
        fetchPizzas({ urlParameterSort, orderSort, urlParameterFilter })
      );
      window.scrollTo(0, 0);
    }
    if (isLocationSearch) {
      getItems();
    }
  }, [
    urlParameterSort,
    urlParameterFilter,
    orderSort,
    isLocationSearch,
    dispatch,
  ]);

  // Sort;
  React.useEffect(() => {
    const changeSort = () => {
      if (valueSort === 0) {
        dispatch(setUrlParameterSort("rating"));
        dispatch(setOrderSort("desc"));
      }
      if (valueSort === 1) {
        dispatch(setUrlParameterSort("price"));
        dispatch(setOrderSort("desc"));
      }
      if (valueSort === 2) {
        dispatch(setUrlParameterSort("title"));
        dispatch(setOrderSort("asc"));
      }
    };
    changeSort();
  }, [valueSort, dispatch]);

  // Filter
  React.useEffect(() => {
    const changeFilter = () => {
      if (valueSearch !== "") {
        dispatch(setValueFilter(0));
      }
      if (valueFilter === 0) {
        dispatch(setUrlParameterFilter(""));
      } else dispatch(setUrlParameterFilter(valueFilter));
    };
    changeFilter();
  }, [valueFilter, valueSearch, dispatch]);

  return (
    <main>
      <FilterAndSort />
      <section className="pizza">
        <h1>Все пиццы</h1>
        <PizzaBlock />
        <Pagination />
      </section>
    </main>
  );
}

export default Home;
