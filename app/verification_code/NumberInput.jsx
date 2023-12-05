export default function NumberInput({
  name,
  value,
  refValue,
  placeholder,
  handleChange,
}) {
  return (
    <input
      type="numeric"
      name={name}
      value={value}
      ref={refValue}
      maxLength="1"
      autoComplete="off"
      required
      placeholder={placeholder}
      onChange={handleChange}
      className={`rounded-md focus:outline-none border border-gray-300 p-2 text-center placeholder:text-gray-400 text-sm placeholder:text-xs w-10 h-10 bg-gray-200 font-bold shadow-lg`}
    />
  );
}
