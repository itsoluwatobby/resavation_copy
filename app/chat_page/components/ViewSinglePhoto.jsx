import { FiMinimize2 } from "react-icons/fi"

export const ViewSinglePhoto = ({ chatBody, imageUrl, setImageUrl }) => {

  return (
    <div className={`absolute w-full h-80 ${chatBody ? 'top-20 left-5' : 'top-10'} grid place-content-center`}>
      <figure className={`relative ${imageUrl ? 'scale-[1]' : 'scale-0 hidden'} ${chatBody ? 'w-[85%] h-80' : 'w-[95%] h-[98%]'} border-2 border-gray-500 rounded-md shadow-lg`}>
        <img src={chatBody ? imageUrl : URL.createObjectURL(imageUrl)} alt="photo" loading='eager' className='w-full h-full rounded-md object-cover' />
        <button
          onClick={() => setImageUrl(null)}
          className="absolute top-1 right-1 grid place-content-center  rounded-sm p-1 bg-slate-700 hover:opacity-80 transition-all focus:outline border-none"
        >
          <FiMinimize2 className="text-red-500" />
        </button>
      </figure>
    </div>
  )
}
