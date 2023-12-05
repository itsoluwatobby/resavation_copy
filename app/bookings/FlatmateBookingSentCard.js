import Image from "next/image";
import { GrFavorite } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import { BsFillPatchCheckFill } from "react-icons/bs";
import SentReceived from "./Sent_Received";

const FlatmateBookingSentCard = ({ status }) => {
  const statusClasses = {
    accepted: "bg-green-600",
    pending: "bg-yellow-400",
    cancelled: "bg-red-600",
  };
  return (
    <div className="mt-4 bg-white">
      <section className="container px-4 md:px-12 lg:px-12 mx-auto">
        <div className="w-full relative shadow-lg pb-8 ">
          <Image
            className="w-full object-contain   "
            src="/flatmate.png"
            alt="flatmate"
            height={450}
            width={1214}
          />
          <div className="absolute w-full sm:top-[5%] md:top-[10%] px-2 flex justify-between items-center">
            <div
              className={`text-white rounded-md p-2 ${statusClasses[status]}`}
            >
              <p className=" ">
                {status === "accepted"
                  ? "Accepted"
                  : status === "pending"
                  ? "Pending"
                  : "cancelled"}
              </p>
            </div>

            <div className="bg-white p-2  rounded-full">
              <GrFavorite />
            </div>
          </div>
          <h3 className=" absolute top-[29%] right-3 md:hidden lg:hidden bg-[#0867A7]  font-regular px-2 py-1  text-white text-sm  rounded-md  p-2">
            80% match
          </h3>
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
                  <div className="flex justify-center items-center gap-2">
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
              <div className=" hidden md:block bg-[#0867A7] font-regular px-3 py-1 rounded-md text-white ">
                {" "}
                <span>80% match</span>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </div>
  );
};

export default FlatmateBookingSentCard;
