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
  const { left, search, isList } = useSelector((state) => state.isList);

  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.searchFilter.keyword);
  const searchParams = useSelector((state) => state.searchFilter);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const filterChk = isExactMatch(searchParams);

  const handleLogout = () => {
    console.log("logout!!!!!!!!!!!");
    logout();
    navigate("/login");
  };

  const handleClickFilter = () => {
    if (!search) dispatch(setLeft(!left));
    dispatch(toggleIsList());
  };
  const handleClickSearch = () => {
    if (isList) {
      dispatch(setLeft(!left));
      dispatch(setSearch(!search));
    } else {
      // dispatch(setLeft(!left));
      dispatch(setSearch(!search));
    }
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
    dispatch(setPage(1));

    if (isList) {
      dispatch(setLeft(false));
      dispatch(setSearch(false));
    } else {
      dispatch(setSearch(false));
    }
  };

  return (
    <div className="header max-w-[500px] flex items-center fixed top-0 left-0 w-full h-12 px-4 py-8 bg-white z-10">
      <div className="w-[54px] rounded-2xl flex items-center pr-4 hover:bg-gray-100">
        {left ? (
          <div
            className="cursor-pointer w-[54px] flex items-center h-[50px]"
            onClick={handleClickLeft}
          >
            <FaChevronLeft className="w-[54px]" />
          </div>
        ) : (
          <div className="w-[54px]">
            <DrawerDemo
              className="w-[54px]"
              handleLogout={handleLogout}
              direction="left"
            />
          </div>
        )}
      </div>
      <div className={`flex items-center mx-2 ${search ? "w-5/6" : "w-3/4 "}`}>
        {search && (
          <form onSubmit={handleSubmit} className="flex w-full relative ">
            <Input
              value={searchText}
              onChange={handleInputChange}
              className="flex-grow pl-2"
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
        className="relative w-[32px] flex items-center justify-center cursor-pointer"
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
