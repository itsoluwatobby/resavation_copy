import Image from "next/image";
import { GrFavorite } from "react-icons/gr";
import { BsFillPatchCheckFill } from "react-icons/bs";

const FavoriteFlatmate = () => {
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
            <div className="text-gray-100  rounded-md  p-2 bg-[#0867A7] ml-2">
              <p>80% match</p>
            </div>

            <div className="bg-white p-2  rounded-full">
              <GrFavorite />
            </div>
          </div>

          <div className=" sm:mt-[-40px] md:mt-[-3rem]">
            <img
              src="/flatmate-avatar.png"
              alt="avatar"
              className="object-contain md:h-[120] md:w-[126] sm:h-[100] sm:w-[100px] rounded-full"
            />
          </div>
          <div className="px-3">
            <div className="flex justify-between items-center w-full">
              <div className=" flex justify-center  items-center sm:gap-1 md:gap-3">
                <div className="font-bold  sm:text-[14px] md:text-xl">
                  <div className="flex justify-center items-center gap-2 text-black">
                    Stephen, 27 <BsFillPatchCheckFill color="green" />
                  </div>
                  <p className="text-slate-700 font-normal pb-4 text-[15px]">
                    Lekki, lagos
                  </p>
                  <span className="text-[#074ce5]  bg-[#cddcff] py-1 px-4 rounded-full font-normal sm:text-[10px] md:text-[16px] ">
                    Student
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default FavoriteFlatmate;
