export default function Input(
  { type, first, check, inputRef, name, value, maxDate, checked, placeholder, handleChange 
  }) {
  
  return (
    <input
      type={type}
      ref={first && inputRef}
      name={name}
      autoFocus
      value={value}
      checked={checked}
      max={maxDate}
      required={check ? false : true}
      placeholder={placeholder}
      onChange={handleChange}
      className={`focus:border-none focus:outline-0 border border-gray-300 placeholder:text-gray-400 text-sm placeholder:text-xs ${
        type === "checkbox" ? "w-4 h-4 cursor-pointer p-1 rounded-sm" : "rounded-md  w-full p-4"
      }`}
    />
  );
}
