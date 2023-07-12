import React, { useState } from "react";
import { algoliaClient } from "../../../clients/algoliaClient";
import {
  InstantSearch,
  Hits,
  Configure,
  SearchBox,
} from "react-instantsearch-dom";
import SearchResult from "../../search-result";

const SearchBar = ({ query, setQuery }) => {
  const handleInputChange = (event) => {
    let val = event.target.value;
    val = val.replace(/^\s+|\s+$/g, "");
    setQuery(val);
  };

  const handleReset = (e) => {
    setQuery("");
  };

  return (
    <InstantSearch indexName="prod_propBuying" searchClient={algoliaClient}>
      <Configure hitsPerPage={3} />
      <div className="flex items-start flex-col relative w-1/1">
        <div className="relative w-1/1 searchMenu">
          <SearchBox
            onReset={handleReset}
            onChange={handleInputChange}
            value={query}
            className="border w-1/1 rounded-1"
            translations={{
              placeholder:
                "Search for property, location, price, units or developer",
            }}
          />
        </div>
        <div
          className="absolute z-10"
          style={{ top: "45px", left: 0, right: 0 }}
        >
          {query && <Hits hitComponent={SearchResult} />}
        </div>
      </div>
    </InstantSearch>
  );
};

export default SearchBar;
