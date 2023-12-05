import { useCallback } from "react";

const valueClass =
  "flex-auto flex text-xs mobile:text-sm items-start w-[15%] mobile:w-[25%] text-gray-600 font-normal capitalize";

const attributeClass =
  "flex-auto w-[40%] flex items-start font-normal text-left capitalize";

export const ApartmentSentWithdraw = ({}) => {
  return (
    <div className="flex flex-col w-full gap-1 mobile:text-sm">
      <p className="text-base font-medium">Rent Details</p>
      <div className="flex flex-col text-xs w-full rounded-md border border-gray-200 p-1 pr-2 mobile:p-1.5">
        <PropertyAttributes attribute="Booking Id" value="#123" />
        <PropertyAttributes attribute="Order Date" value="5/12/2021" />
        <PropertyAttributes attribute="Check in Date" value="5/12/2021" />
        <PropertyAttributes attribute="Check out Date" value="5/12/2021" />
        <PropertyAttributes attribute="Number of Month" value="1 Month" />
        <PropertyAttributes attribute="Rent" value="#20,000" />
        <PropertyAttributes attribute="Resavation fee" value="#5,000" />
        <PropertyAttributes attribute="VAT " value="#1,000" />
        <PropertyAttributes attribute="Total " value="#32,000" />
      </div>
      <div className="flex items-center justify-center gap-5">
        <button className="bg-[#139D31] hover:bg-blue-600 active:bg-blue-700 px-[4rem] py-[.7rem] text-xs transition-all text-white  rounded-md cursor-pointer w-fit">
          Paid
        </button>
      </div>
    </div>
  );
};

const PropertyAttributes = ({ attribute, value }) => {
  const propertyClass = useCallback((last = false) => {
    return `
      flex w-full items-center font-medium justify-between mobile:pr-2  pr-6 mobile:text-sm whitespace-pre-wrap text-left p-3 mobile:p-2 border border-r-0 border-l-0 border-t-0 ${
        last ? "border-b-0" : "border-b-1"
      }`;
  }, []);

  return (
    <p className={propertyClass()}>
      {attribute !== "Length of stay" ? (
        <>
          <span className={attributeClass}>{attribute}</span>
          <span className={valueClass}>{value}</span>
        </>
      ) : (
        <>
          <span className={attributeClass}>{attribute}</span>
          {/* <span className={valueClass}>{`${value[0]} - ${value[1]}`}</span>  */}
          {/* <span className='flex items-center gap-2'>
            {
              value?.map(val => (
                <span key={val} className={valueClass}>{val}</span>
              ))
            }
          </span> */}
        </>
      )}
    </p>
  );
};
