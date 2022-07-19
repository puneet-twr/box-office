import React from "react";
import { useState, useEffect } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";
import {
  RadioInputsWrapper,
  SearchButtonWrapper,
  SearchInput,
} from "./Home.styled";
const Home = () => {
  const [input, setInput] = useLastQuery();
  const [results, setResults] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");
  const isShowsSearch = searchOption === "shows";

  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then((result) => {
      setResults(result);
    });
  };
  const onKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSearch();
    }
  };
  const onRadioChange = (e) => {
    setSearchOption(e.target.value);
  };
  const renderResults = () => {
    // console.log("Working");
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return results[0].show ? (
        <ShowGrid data={results} />
      ) : (
        <ActorGrid data={results} />
      );
    } else return null;
  };

  return (
    <MainPageLayout>
      <SearchInput
        type="text"
        placeholder="Search for something"
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      <RadioInputsWrapper>
        <div>
          <label htmlFor="shows-search">
            Shows
            <input
              id="shows-search"
              type="radio"
              value="shows"
              checked={isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor="actors-search">
            Actors
            <input
              id="actors-search"
              type="radio"
              value="people"
              checked={!isShowsSearch}
              onChange={onRadioChange}
            />
          </label>
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button type="button" onClick={onSearch}>
          Search
        </button>
      </SearchButtonWrapper>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
