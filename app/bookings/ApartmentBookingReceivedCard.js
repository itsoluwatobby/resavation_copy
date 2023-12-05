import Image from "next/image";
import { GrFavorite } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import { BsFillPatchCheckFill } from "react-icons/bs";

const ApartmentBookingReceivedCard = () => {

  return (
    <div className="mt-8">
      <section className="container px-4 md:px-12 lg:px-12 mx-auto">
        <div className="w-full relative shadow-lg pb-8 ">
          <Image
            className="w-full  "
            src="/flatmate.png"
            alt="flatmate"
            height={400}
            width={1214}
            priority
          />
          <div className="absolute w-full sm:top-[5%] md:top-[10%] px-2 flex justify-between items-center">
            <h3
              className={`text-white rounded-md p-2 bg-[#0867a7] `}
            >
              80% match
            </h3>
            <h3 className=" md:hidden lg:hidden bg-[#0867A7] font-regular px-2 py-1  text-white text-sm  rounded-md  p-2">
              80% match
            </h3>
            <div className="bg-white p-2 hidden md:block rounded-full">
              {/* <Image src="/icon-love.png" alt="icon" height={20} width={20} /> */}
              <GrFavorite />
            </div>
          </div>
          <div className="px-6">
            <div className=" sm:mt-[15px] md:mt-[2rem]">
              <h3 className=" text-xl md:text-2xl text-slate-900  font-bold">
                Looking for a student roommate
              </h3>
              <p className="sm:text-[14px] md:text-xl text-slate-600">
                Lekki, lagos
              </p>
              <div className="mt-[2rem] mb-5 flex justify-between items-center w-full ">
                <div className="flex gap-3">
                  <div className="flex gap-2  items-center">
                    <Image
                      src="/icon-family.png"
                      alt="icon"
                      height={20}
                      width={20}
                      priority
                    />{" "}
                    <span>3 Guests</span>
                  </div>
                  <div className="flex gap-2  items-center">
                    <Image
                      src="/icon-bed.png"
                      alt="icon"
                      height={20}
                      width={20}
                      priority
                    />{" "}
                    <span>3 Guests</span>
                  </div>
                  <div className="flex gap-2  items-center">
                    <Image
                      src="/icon-area.png"
                      alt="icon"
                      height={20}
                      width={20}
                      priority
                    />{" "}
                    <span>3 Guests</span>
                  </div>
                </div>
                <p className="hidden md:block">
                  {" "}
                  From <span className="font-bold text-[1.2rem]">#100,000</span>
                  /month{" "}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className=" flex justify-center  items-center sm:gap-1 md:gap-3">
                <RxAvatar className="sm:w-[2.9rem] sm:h-[2rem]  md:w-[3.9rem] md:h-[4rem]" />
                <div className="font-bold  sm:text-[14px] md:text-xl">
                  <div className="flex justify-center items-center gap-2">
                    Stephen, 27 <BsFillPatchCheckFill color="green" />
                  </div>
                  <span className="text-[#074ce5] font-normal sm:text-[10px] md:text-[16px] ">
                    Student
                  </span>
                </div>
              </div>
              <div className=" hidden md:block bg-[#0867A7] font-regular px-3 py-1 rounded-md text-white ">
                {" "}
                <span>80% match</span>
              </div>
              <p className=" md:hidden lg:hidden">
                <span className="font-bold sm:text-[15px]  md:text-[1.2rem]">
                  #100,000
                </span>
                /month{" "}
              </p>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default ApartmentBookingReceivedCard;
