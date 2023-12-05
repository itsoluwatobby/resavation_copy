const ProfileDetails = ({
  formData,
  handleComponentChange,
  backShowProfileDetails,
}) => {
  return (
    <div>
      <div>
        <div className="w-[90%] md:w-[70%] flex items-end justify-end">
          <button
            type="submit"
            className="bg-[#074CE5] text-white md:text-base py-2 px-4 my-4 rounded-full text-xs "
            onClick={backShowProfileDetails}
          >
            Back
          </button>
        </div>
        {/* Personal */}
        <div className="flex justify-between items-center md:w-[70%] w-[90%] pb-3">
          <h1 className="font-bold py-2 text-lg">Personal information</h1>
          <button
            className="border border-gray-300 rounded-full py-2 px-3 text-xs md:text-base "
            onClick={() => handleComponentChange("editProfile")}
          >
            Edit Details
          </button>
        </div>
        <div className="w-[90%] md:w-[70%] py-2 md:py-4 px-2 md:px-4 rounded-lg border border-gray-300 hover:border  ">
          <div className="py-2">
            <p className="text-sm font-semibold py-1">
              First Name & Last Name:
            </p>
            <p className="pb-2 border-b border-gray-300">
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Date of Birth:</p>
            <p className="pb-2 border-b border-gray-300">
              {formData.dateOfBirth}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Phone Number: </p>
            <p className="pb-2 border-b border-gray-300">
              {formData.phoneNumber}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Email: </p>
            <p>{formData.email}</p>
          </div>
        </div>
      </div>

      <div>
        {/* Personal Address */}
        <div className="flex justify-between  items-end md:w-[70%] w-[90%] pb-3 mt-8">
          <h1 className="font-bold py-2 text-lg">Personal Address</h1>
          <button
            className="border border-gray-300 rounded-full py-2 px-3 text-xs md:text-base "
            onClick={() => handleComponentChange("editProfile")}
          >
            Edit Details
          </button>
        </div>
        <div className="w-[90%] md:w-[70%] py-2 md:py-4 px-2 md:px-4 rounded-lg border border-gray-300 hover:border  ">
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Country: </p>
            <p className="pb-2 border-b border-gray-300">{formData.country} </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">City: </p>
            <p className="pb-2 border-b border-gray-300">{formData.city}</p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Address </p>
            <p>{formData.address}</p>
          </div>
        </div>
      </div>

      <div>
        {/* Emergency Contact */}
        <div className="flex justify-between  items-end md:w-[70%] w-[90%] pb-3 mt-8">
          <h1 className="font-bold py-2 text-lg">Emergency Contact</h1>
          <button
            className="border border-gray-300 rounded-full py-2 px-3 text-xs md:text-base "
            onClick={() => handleComponentChange("editProfile")}
          >
            Edit Details
          </button>
        </div>
        <div className="w-[90%] md:w-[70%] py-2 md:py-4 px-2 md:px-4 rounded-lg border border-gray-300 hover:border  ">
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Name:</p>
            <p className="pb-2 border-b border-gray-300">
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Relationship: </p>
            <p className="pb-2 border-b border-gray-300">
              {formData.relationship}
            </p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Email: </p>
            <p className="pb-2 border-b border-gray-300">{formData.email}</p>
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold py-1">Phone Number: </p>
            <p>{formData.phoneNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
