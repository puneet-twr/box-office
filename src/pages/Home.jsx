import React from "react";
import { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";
const Home = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState(null);
  const onInputChange = (e) => {
    setInput(e.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result=>{
        setResults(result);
    })
    // fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
    //   .then((r) => r.json())
    //   .then((result) => {
    //     setResults(result);
    //     console.log(result);
    //   });
  };
  const onKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      onSearch();
    }
  };
  const renderResults = () => {
    console.log("Working");
    if (results && results.length === 0) {
      return <div>No results</div>;
    }
    if (results && results.length > 0) {
      return (
        <div>
          {results.map((item)=>(
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    } else return null;
  };
  return (
    <MainPageLayout>
      <input type="text" onChange={onInputChange} onKeyDown={onKeyDown} />
      <button type="button" onClick={onSearch}>
        Search
      </button>
      {renderResults()}
    </MainPageLayout>
  );
};

export default Home;
