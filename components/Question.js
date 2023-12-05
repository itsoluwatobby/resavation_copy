"use client";

const Question = ({
  question,
  options,
  onChange,
  selectedOption,
  showError,
}) => {
  return (
    <div>
      <h3 className="font-semibold my-1">{question}</h3>
      {showError && !selectedOption ? (
        <p className="text-red-500 text-xs">
          Please choose an option for this question.
        </p>
      ) : (
        <p className="text-grey-800 text-xs">You can only choose 1</p>
      )}
      <div className="flex flex-wrap">
        {options.map((option) => (
          <div
            key={option.id}
            className={`border border-gray-300 cursor-pointer rounded-full md:px-4 md:py-2 px-2 py-1  mr-2 mb-2 text-sm md:text-base ${
              selectedOption === option.id
                ? "text-[#074ce5] border-[#074ce5] bg-blue-100"
                : "bg-white"
            } `}
            onClick={() => onChange(option.id)}
          >
            {option.id}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Question;
