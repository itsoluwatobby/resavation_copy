import Image from "next/image";
import { GrFavorite } from "react-icons/gr";
import { BsPeople } from "react-icons/bs";
import { LiaBedSolid } from "react-icons/lia";
import { BiScreenshot } from "react-icons/bi";
import { BsFillPatchCheckFill } from "react-icons/bs";

const FavoriteApartment = ({ data }) => {
  return (
    <div>
      {/* <h2>Dynamic Component</h2>
      <p>{data}</p> */}

      <div className="mt-8 text-black">
        <section className="container px-4 md:px-12 lg:px-12 mx-auto">
          <div className="w-full relative shadow-lg ">
            <Image
              className="w-full  "
              src="/flatmate.png"
              alt="flatmate"
              height={400}
              width={1214}
              priority
            />
            <div className="absolute w-full sm:top-[5%] md:top-[10%] px-2 flex justify-between items-center">
              <div className="text-gray-100  rounded-md  p-2 bg-[#0867A7] ml-2">
                <p>80% match</p>
              </div>

              <div className="bg-white p-2 rounded-full mr-2">
                <GrFavorite />
              </div>
            </div>

            <div className="px-3 shadow-2xl pt-2 pb-4">
              <div className=" flex justify-between items-start sm:gap-1 md:gap-3 w-full">
                <div>
                  <h2 className="font-bold  sm:text-base md:text-xl">
                    Looking for a student roommate
                  </h2>
                  <p className="text-slate-700 sm:text-[14px]">Lekki, lagos</p>
                </div>
                <div className="md:text-sm text-xs">
                  <p>
                    From{" "}
                    <span className="font-semibold text-base">#100,000</span>{" "}
                    per month
                  </p>
                </div>
              </div>

              <div className="py-2 flex text-slate-700 text-sm">
                <div className="flex mr-3 items-center">
                  <BsPeople />
                  <p className="pl-1"> 3 Guest</p>
                </div>

                <div className="flex mr-3 items-center">
                  <LiaBedSolid /> <p className="pl-1"> 3 Bedroom</p>
                </div>

                <div className="flex mr-3 items-center">
                  <BiScreenshot />
                  <p className="pl-1">
                    300m2{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="">
                  <img
                    src="/flatmate-avatar.png"
                    alt="avatar"
                    className="object-contain md:h-[120] md:w-[120] sm:h-[50] sm:w-[50px] rounded-full"
                  />
                </div>
                <div className="flex-col pl-2 sm:text-[14px] md:text-xl">
                  <div className="flex justify-start items-center gap-2 font-bold ">
                    Stephen, 27 <BsFillPatchCheckFill color="green" />
                  </div>
                  <span className="text-[#074ce5]  bg-[#cddcff] py-1 px-2 rounded-full font-normal sm:text-[10px] md:text-[14px] ">
                    Student
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FavoriteApartment;
