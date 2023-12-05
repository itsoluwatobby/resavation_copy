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
import Image from 'next/image';
const SearchFlatmates = ({style}) => {
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
          <Image src={rectangle} alt="rec" className={`${style["rec1"]}`} />
        </div>

        <div className="eclipse absolute mt-[-50px]">
          <Image src={eclipse1} alt="ellipse" className={`${style["ec1"]}`} />
        </div>

        <div className="my-16 w-36">
          <h2 className="font-montserrat font-semibold text-base leading-6 text-center">
            Stephen, 27
          </h2>
          <h6 className="font-montserrat font-normal text-xs leading-4 text-center">
            Lekki, Lagos
          </h6>
        </div>

        <div className="absolute -mt-12 ml-7 flex items-center justify-center w-20 h-7 rounded-full border border-gray-400 bg-blue-200 bg-opacity-50">
          <button className="flex items-center justify-center font-montserrat font-medium text-xs leading-4">
            Student
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFlatmates