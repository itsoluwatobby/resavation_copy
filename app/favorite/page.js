"use client";
import { useState } from "react";
import FavoriteApartment from "../../components/FavoriteApartment";
import FavoriteFlatmate from "../../components/FavoriteFlatmate";
// import FlatmateBooking from "../../components/FlatmateBooking";

// export const metadata = {
//   title: "Resavation | Favorite",
//   description: "Flat and apartment booking",
// };

const Favorite = () => {
  const [activeComponent, setActiveComponent] = useState("Component1");

  const switchComponent = (component) => {
    setActiveComponent(component);
  };

  console.log(activeComponent);

  return (
    <div className="w-full overflow-hidden">
      <div className="bg-white text-black">
        <section className="flex justify-around py-6 text-lg font-semibold px-4">
          <button
            onClick={() => switchComponent("Component1")}
            style={{
              backgroundColor:
                activeComponent === "Component1" ? "blue" : "inherit",
              color: activeComponent === "Component1" ? "white" : "black",
            }}
            className=" py-8 px-16 bg-gray-100 shadow-lg"
          >
            Flatmates
          </button>
          <button
            onClick={() => switchComponent("Component2")}
            style={{
              backgroundColor:
                activeComponent === "Component2" ? "blue" : "inherit",
              color: activeComponent === "Component2" ? "white" : "black",
            }}
            className="  py-8 px-16 bg-gray-100 shadow-lg"
          >
            {" "}
            Apartments
          </button>
        </section>

        <section>
          {" "}
          {activeComponent === "Component1" && (
            <div>
              <FavoriteFlatmate />
              <FavoriteFlatmate />
              <FavoriteFlatmate />
              <FavoriteFlatmate />
            </div>
          )}
          {activeComponent === "Component2" && (
            <div>
              <FavoriteApartment />
              <FavoriteApartment />
              <FavoriteApartment />
              <FavoriteApartment />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Favorite;
