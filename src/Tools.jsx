import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { words } from './assets/data.js';

const Tools = () => {
  const [activeSearch, setActiveSearch] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchInput(inputValue);

    if (inputValue === '') {
      setActiveSearch([]);
      return;
    }

    const filteredWords = words
      .filter((word) => word.includes(inputValue))
      .slice(0, 8);

    setActiveSearch(filteredWords);
  };

  const handleItemClick = (item) => {
    setSearchInput(item);
    setActiveSearch([]);
  };

  return (
    <div className='bigdiv'>
      <form className='w-[500px] relative'>
        <div className="relative">
          <input
            type="search"
            placeholder='Search Your State Here'
            className='w-full p-4 rounded-full bg-slate-800'
            value={searchInput}
            onChange={(e) => handleSearch(e)}
          />
          <button className='absolute right-1 top-1/2 -translate-y-1/2 p-4 bg-slate-600 rounded-full'>
            <AiOutlineSearch />
          </button>
        </div>

        {activeSearch.length > 0 && (
          <div className="absolute top-full mt-2 p-4 bg-slate-800 text-white w-full rounded-xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
            {activeSearch.map((s) => (
              <span
                key={s}
                onClick={() => handleItemClick(s)}
                className="cursor-pointer"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </form>
    </div>
  );
};

export default Tools;
