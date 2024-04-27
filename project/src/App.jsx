import { useEffect, useState } from 'react'

import './App.css'

import { useSelector, useDispatch } from "react-redux";
import { setCurrency, setSearch, setCurrentPage } from "./features/currency/CurrencySlice";
import axios from "axios";

function App() {
  const { currency, search, currentPage, itemsPerPage } = useSelector((state) => state.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("https://openapiv1.coinstats.app/coins?currency=INR", {
        headers: {
          accept: "application/json",
          "X-API-KEY": "aYNIoh8kFdQ1TYNgHxlq6u6NxtmU6rrNlMOXcD0WaCo=",
        },
      })
      .then((res) => dispatch(setCurrency(res.data.result)));
  }, [dispatch]);

  if (!currency) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (e) => {
    dispatch(setSearch(e.target.value));
    dispatch(setCurrentPage(1)); 
  };

  const handleNext = () => {
    dispatch(setCurrentPage((prevPage) => prevPage + 1));
  };

  const handlePrev = () => {
    dispatch(setCurrentPage((prevPage) => prevPage - 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currency
    .filter((val) => val.name.toLowerCase().includes(search.toLowerCase()))
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className='App'>
        <h2 className='h-24 flex justify-center bg-sunil semibold'>Crypto Tracker App</h2>
        <div className='flex justify-center'>
          <input
            className='w-96 h-10  pt-4 py-6 pb-5 mt-6 border-solid border-2 border-indigo-600'
            type='text'
            placeholder='Search...'
            value={search}
            onChange={handleSearchChange}
          />
        </div>
        <div className='flex justify-center  pt-4'>
          <table>
            <thead className='bg-slate-200 pt-4'>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Symbol</th>
                <th>Price Data</th>
                <th>Market Cap</th>
                <th>Available supply</th>
                <th>Volume (24hr)</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((val, index) => {
                return (
                  <tr key={index} className={index % 2 === 0 ? "odd:bg-white even:bg-slate-50" : "even:bg-white"}>
                    <td className='h-12 w-12 py-5 px-5'>{val.rank}</td>
                    <td className='h-12 w-12 py-5 px-5'>
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt='' />
                      </a>
                      <p>{val.name}</p>
                    </td>
                    <td className='h-12 w-12 py-5 px-5'>{val.symbol}</td>
                    <td className='h-12 w-12 py-5 px-5'>INR {val.price.toFixed(2)}</td>
                    <td className='h-12 w-12 py-5 px-5'>${val.marketCap}</td>
                    <td className='h-12 w-12 py-5 px-5 justify-center'>{val.availableSupply}</td>
                    <td className='h-12 w-12 py-5 px-5'>{val.volume.toFixed(0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className='flex justify-center mt-4'>
          <div>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={handlePrev} disabled={currentPage === 1}>
              Prev
            </button>
            {[...Array(Math.ceil(currency.length / itemsPerPage)).keys()].map((number) => (
              <button key={number} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => dispatch(setCurrentPage(number + 1))}>
                {number + 1}
              </button>
            ))}
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleNext}
              disabled={currentPage === Math.ceil(currency.length / itemsPerPage)}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
