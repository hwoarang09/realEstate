import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { FaSearch, FaFilter, FaChevronLeft } from "react-icons/fa";
import { Input } from "../../../../@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsList,
  setIsList,
  setLeft,
  setSearch,
} from "../../../../store/slices/headerSlice";
import { setKeyword } from "../../../../store/slices/searchFilterSlice";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const isList = useSelector((state) => state.isList.isList);
  const left = useSelector((state) => state.isList.left);
  const search = useSelector((state) => state.isList.search);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchFilter.keyword);
  const searchInputRef = useRef(null);

  const handleClickFilter = () => {
    console.log("in handleClickFilter", search, left, isList);
    if (!search) dispatch(setLeft(!left));
    dispatch(toggleIsList());
  };
  const handleClickSearch = () => {
    dispatch(setLeft(!left));
    dispatch(setSearch(!search));
    console.log("in handleClickSearch", search, left);
  };
  const handleClickLeft = () => {
    dispatch(setLeft(false));
    dispatch(setSearch(false));
    dispatch(setIsList(true));
    if (searchText) {
      setSearchText("");
      dispatch(setKeyword(""));
    }
  };
  useEffect(() => {
    if (search && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setKeyword(searchText));
    console.log("in handleSubmit query:", searchQuery);
  };
  const handleX = () => {
    setSearchText("");
    dispatch(setKeyword(""));
    console.log(
      `in handleX query searchText ${searchText} searchQuery ${searchQuery}`
    );
  };

  return (
    <div className="header max-w-[500px] flex fixed top-0 left-0 w-full h-12 px-4 pt-4 bg-white z-10">
      <div className="w-1/12 flex items-center pr-4">
        {left ? (
          <FaChevronLeft onClick={handleClickLeft} className="cursor-pointer" />
        ) : (
          <TfiMenu className="w-5 h-5 cursor-pointer" />
        )}
      </div>
      <div className="w-3/4 flex items-center">
        {search && (
          <form onSubmit={handleSubmit} className="flex w-full relative ">
            <Input
              value={searchText}
              onChange={handleInputChange}
              className="flex-grow"
              ref={searchInputRef}
            />
            <button type="submit" className="hidden">
              Search
            </button>
            <div
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer
            border-white border-2 hover:rounded-xl hover:border-2 hover:border-gray-300 hover:bg-gray-300 hover:text-white"
            >
              <IoMdClose onClick={handleX} className="w-6 h-6" />
            </div>
          </form>
        )}
      </div>
      <div
        className="w-1/12 flex items-center justify-center cursor-pointer"
        onClick={handleClickSearch}
      >
        <FaSearch />
      </div>
      <div
        onClick={handleClickFilter}
        className="w-1/12 flex items-center justify-center cursor-pointer"
      >
        <FaFilter />
      </div>
    </div>
  );
};

export default Header;
