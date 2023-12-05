import React from 'react'
import { BiHeart } from "react-icons/bi";
import rectangle from "../image/Rectangle683.png";
import rectangle1 from "../image/Rectangle691.png";
import eclipse1 from "../image/Ellipse128.png";
import vector1 from "../image/Vector1.png";
import vector2 from "../image/Vector2.png";
import vector3 from "../image/Vector3.png";
import eclipse2 from "../image/Ellipse133.png";
import burg from "../image/burg.png";
import box from "../image/box.png";
import Image from "next/image";
const SearchApartment = ({style}) => {
  return (
    <div>
      <div className="bg-white shadow-lg">
        <div className="image-div my-3 relative">
          <span className="bg-blue-800 absolute top-5 left-5 w-24 h-9 flex items-center justify-center">
            <h3 className="text-white text-xs flex items-center justify-center">
              80% Match
            </h3>
          </span>
          <span className="bg-white absolute top-5 right-5 w-7 h-7 flex items-center justify-center rounded-full">
            <BiHeart />
          </span>
          <Image src={rectangle1} alt="rec" className={`${style["rec33"]}`} />
        </div>

        <div className="">
          <h3 className="font-montserrat font-semibold text-base leading-6 ml-2">
            Looking for a student roomate
          </h3>
          <h5 className="font-montserrat font-normal text-xs leading-4 ml-2">
            Lekki, Lagos
          </h5>
        </div>

        <div className="flex flex-row items-center justify-around my-5">
          <div className="flex flex-row mr-10 gap-2">
            <Image src={vector1} alt="guests" width={14} />
            <h4 className="font-montserrat font-normal text-xs leading-4">
              3 Guests
            </h4>
          </div>
          <div className="flex flex-row mr-10 gap-2">
            <Image src={vector2} alt="bedrooms" width={14} />
            <h4 className="font-montserrat font-normal text-xs leading-4">
              3 Bedroom
            </h4>
          </div>
          <div className="flex flex-row gap-2">
            <Image src={vector3} alt="m2" width={14} />
            <h4 className="font-montserrat font-normal text-xs leading-4">
              300m2
            </h4>
          </div>
        </div>

        <div className="flex flex-row md:justify-around">
          <div className="flex flex-row items-center justify-around">
            <Image src={eclipse2} alt="eccs" />
            <div className="mr-9">
              <h3 className="font-montserrat font-semibold text-xs leading-6">
                Stephen, 27
              </h3>
              <h5 className="font-montserrat font-medium text-xs leading-3 text-blue-600">
                Student
              </h5>
            </div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <h2 className="font-montserrat font-medium text-xs leading-6 text-center">
              #100000/Month
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchApartment