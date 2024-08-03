import React, { useState, useRef, useEffect } from "react";
import "../../../../styles/index.css";
import { TfiMenu } from "react-icons/tfi";
import { FaSearch, FaFilter, FaChevronLeft } from "react-icons/fa";
import { Input } from "../../../../@/components/ui/input";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const searchInputRef = useRef(null);

  const handleClickSearch = () => {
    setSearch(!search);
  };
  const handleClickLeft = () => {
    setSearch(!search);
  };
  useEffect(() => {
    if (search && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [search]);
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="max-w-[500px] flex fixed top-0 left-0 w-full h-12 px-4 pt-4 bg-white z-10">
      <div className="w-1/12 flex items-center pr-4">
        {search ? (
          <FaChevronLeft onClick={handleClickLeft} className="cursor-pointer" />
        ) : (
          <TfiMenu className="w-5 h-5 cursor-pointer" />
        )}
      </div>
      <div className="w-3/4 flex items-center">
        {search && (
          <form onSubmit={handleSubmit} className="flex w-full">
            <Input
              value={query}
              onChange={handleInputChange}
              className="flex-grow"
              ref={searchInputRef}
            />
            <button type="submit" className="hidden">
              Search
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
      <div className="w-1/12 flex items-center justify-center">
        <FaFilter />
      </div>
    </div>
  );
};

export default Header;
