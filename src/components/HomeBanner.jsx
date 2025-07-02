import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { fetchSuggestions } from "../slices/items.slice";
import useDebounce from "../hook/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeBanner = () => {
  const [query, setQuery] = useState(null);
  const input = useDebounce(query, 1000);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { suggestions } = useSelector((state) => state.items);

  const username = localStorage.getItem("username");
  const userid = localStorage.getItem("user");

  useEffect(() => {
    if (input) {
      dispatch(fetchSuggestions(input));
    }
  }, [input]);

  function saveSearchQuery(query) {
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Remove duplicates and add new query to the beginning
    history = [query, ...history.filter((item) => item !== query)];

    // Limit to 10 recent searches
    if (history.length > 10) {
      history = history.slice(0, 10);
    }

    localStorage.setItem("searchHistory", JSON.stringify(history));
  }

  const localSuggestions = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("searchHistory")) || [];
    } catch (err) {
      return [];
    }
  }, []);

  return (
    <div className="w-full py-4 px-2 lg:py-10 bg-gray-100">
      <img
        className="hidden lg:block rounded-lg mx-auto"
        src="https://utils.imimg.com/imsrchui/imgs/Investor-banner.webp"
        alt=""
      />

      <div className="w-full flex items-center justify-center lg:hidden">
        <form
          className=" rounded w-full flex flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full bg-white flex">
            <Autocomplete
              disablePortal
              freeSolo
              id="free-solo-2-demo"
              options={query?.trim() ? suggestions : localSuggestions}
              getOptionLabel={(option) => option}
              sx={{width:"100%", fontSize: 20, fontWeight: 500 }}
              onChange={(event, newValue) => {
                if (newValue) {
                  setQuery(newValue); // or setQuery(newValue.id) if needed
                } else {
                  setQuery(null);
                }
              }}
              onInputChange={(event, inputValue) => {
                setQuery(inputValue); // For two-way binding
              }}
              renderOption={(props, option) => {
                const isFromHistory = localSuggestions.includes(option);
                const { key: itemKey, ...restProps } = props;
                return (
                  <li
                  key={itemKey}
                  {...restProps}
                    className="flex text-lg font-medium items-center gap-2 px-2"
                  >
                    {isFromHistory && (
                      <i className="ri-time-line text-gray-500 " />
                    )}
                    <span className="font-semibold">{option}</span>
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (query?.trim()) {
                        saveSearchQuery(query);
                        navigate(`/sercheditem/${query}`);
                      }
                    }
                  }}
                  placeholder="Enter Product/Service to search"
                  className="border outline-none w-[380px] font-medium h-full py-2 px-1 text-lg border-gray-500"
                />
              )}
            />
          </div>
          <div>
            <button onClick={() => {
                    navigate(`/sercheditem/${query}`);
                    saveSearchQuery(query);
                  }} className="mx-auto flex justify-center gap-2 px-2.5 h-full items-center text-sm bg-emerald-500 text-white w rounded-r py-2 text-left font-medium">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HomeBanner;
