import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/index.css";
import { FaSearch, FaFilter, FaChevronLeft } from "react-icons/fa";
import { Input } from "../../../../@/components/ui/input";
import { DrawerDemo } from "./drawer";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsList,
  setIsList,
  setLeft,
  setSearch,
} from "../../../../store/slices/headerSlice";
import {
  setKeyword,
  setPage,
} from "../../../../store/slices/searchFilterSlice";
import { IoMdClose } from "react-icons/io";
import { isExactMatch } from "../../../../utils/objectChker";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../hooks/use-auth";

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const left = useSelector((state) => state.isList.left);
  const search = useSelector((state) => state.isList.search);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchFilter.keyword);
  const searchParams = useSelector((state) => state.searchFilter);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const filterChk = isExactMatch(searchParams);

  const handleLogout = () => {
    console.log("logout!!");
    logout();
    navigate("/login");
  };

  const handleClickFilter = () => {
    if (!search) dispatch(setLeft(!left));
    dispatch(toggleIsList());
  };
  const handleClickSearch = () => {
    dispatch(setLeft(!left));
    dispatch(setSearch(!search));
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
    dispatch(setLeft(false));
    dispatch(setSearch(false));

    dispatch(setKeyword(""));
    dispatch(setPage(1));
    console.log(
      `in handleX query searchText ${searchText} searchQuery ${searchQuery}, ${JSON.stringify(
        searchParams,
        null,
        2
      )}`
    );
  };

  return (
    <div className="header max-w-[500px] flex fixed top-0 left-0 w-full h-12 px-4 py-8 bg-white z-10">
      <div className="w-1/12 flex items-center pr-4">
        {left ? (
          <FaChevronLeft onClick={handleClickLeft} className="cursor-pointer" />
        ) : (
          <DrawerDemo handleLogout={handleLogout} direction="left" />
        )}
      </div>
      <div className={`flex items-center ${search ? "w-11/12" : "w-3/4 "}`}>
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
      {!search && (
        <div className="w-1/12 flex items-center justify-center cursor-pointer">
          <FaSearch onClick={handleClickSearch} />
        </div>
      )}
      <div
        onClick={handleClickFilter}
        className="relative w-1/12 flex items-center justify-center cursor-pointer"
      >
        <FaFilter />{" "}
        {!filterChk && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </div>
    </div>
  );
};

export default Header;
