"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../search/search.module.css"
import ListingFlatmates from "../../components/ListingFlatmate";
import { ApartmentCard } from "../../components/ListingApartment";
import SearchTop from "../search/SearchTop"
import ListTop from "./ListTop"
import { IsLoadingModal } from "../../components/IsLoading";
import "../search/search.module.css";


const initialState = { isLoading: false, isError: false, success: false, error: '', data: [] }

const page = () => {
  const [flatmateData, setFlatmateData] = useState([]);
  const [apartmentData, setApartmentData] = useState(null)
  const [activeType, setActiveType] = useState(true);
  const [sortType, setSortType] = useState('GRID');

  const API_ENDPOINT = 'https://resavation-service.onrender.com/api/v1/roommates/profile';
  const userToken =
    typeof window !== "undefined"
      ? window.localStorage.getItem("loggedIn_User")
      : false;

  const token = JSON.parse(userToken);
  const tokens = token.token;
  console.log(tokens);
  console.log(apartmentData);

  const fetchProfileListing = async (is_roommate, location) => {
    try {
      const response = await axios.get(API_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
      });

      console.log("Sucessful", response.data);

      setApartmentData(response.data)
      return response.data;

    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchProfileListing(); // Load all data on first render
  }, []);


  let searchContent;
  if (!apartmentData) {
    searchContent = (
      <div className='w-full h-full grid place-content-center'>
        <IsLoadingModal />
      </div>
    );
  } else {
    searchContent = <ApartmentCard data={apartmentData} sortType={sortType} />;
  }



  return (
    <div>
      <main
        className={`mobile:text-sm mt-8 bg-gray-100 flex-grow text-sm p-3 pt-0 flex flex-col gap-5 w-full sm:m-auto lg:w-[65%] md:w-[80%]`}>
        <ListTop
          data={apartmentData}
          setActiveType={setActiveType}
          activeType={activeType}
        />




        results
        <section
          className={`flex-auto shadow-inner grid shadow-slate-200 min-h-[25rem] maxscreen:grid-cols-1 ${sortType === 'GRID' ? 'grid-cols-2' : 'grid-cols-1'} gap-x-3 gap-y-3.5 transition-all p-1 py-2 w-full`}
        >
          {searchContent}
        </section>

      </main>
    </div>

  );
};

export default page;
