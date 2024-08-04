import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { FaSearch, FaFilter, FaChevronLeft } from "react-icons/fa";
import { Input } from "../../../../@/components/ui/input";

import { useDispatch, useSelector } from "react-redux";
import { toggleIsList, setIsList } from "../../../../store/slices/isListSlice";
import { setKeyword } from "../../../../store/slices/searchFilterSlice";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [left, setLeft] = useState(false);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchFilter.keyword); // Redux 스토어에서 검색어 가져오기

  const searchInputRef = useRef(null);

  const handleClickFilter = () => {
    if (!search) setLeft(!left);
    dispatch(toggleIsList());
  };
  const handleClickSearch = () => {
    setLeft(!left);
    setSearch(!search);
  };
  const handleClickLeft = () => {
    setLeft(!left);
    setSearch(!search);
    dispatch(setIsList(true));
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
          <form onSubmit={handleSubmit} className="flex w-full">
            <Input
              value={searchText}
              onChange={handleInputChange}
              className="flex-grow"
              ref={searchInputRef}
            />
            <button type="submit" className="hidden">
              Search
            </button>
            <button type="button" onClick={handleX}>
              X
            </button>
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
