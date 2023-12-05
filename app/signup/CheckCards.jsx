
export default function CheckCards({ content, name, checked, handleCheck }) {

  return (
    <label htmlFor={name} className={`border focus:bg-blue-600 border-gray-400 cursor-pointer p-3 pt-4 pb-4 gap-1 rounded flex flex-col`}>
      <div className='flex items-center justify-between gap-2 whitespace-pre-wrap'>
        <p className='font-bold capitalize'>{content}</p>
        <input 
          type="checkbox" 
          checked={checked} 
          name={name}
          id={name} 
          className='rounded-full w-3.5 h-3.5 cursor-pointer focus:outline-0 border'
          onChange={handleCheck}
        />
      </div>
      <p>Would you like to schedule an inspection for this time?</p>
    </label>
  )
}
