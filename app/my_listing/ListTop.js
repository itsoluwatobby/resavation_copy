export default function ListTop({
    data, sortType, setSortType, setActiveType, activeType,
}) {
    return (
        <div className="flex flex-col gap-5 z-30 bg-gray-100 pb-2 pt-4">
            {/* flatmate and apartment button */}
            <div className="flex-none h-8 py-2 flex items-center gap-1 self-start text-white">
                <button
                    onClick={() => setActiveType(true)}
                    className={`py-2 ${!activeType ? 'bg-gray-200 text-black' : 'bg-blue-600'} px-6 grid place-content-center p-1 rounded-sm shadow-sm border-none cursor-pointer hover:opacity-80 active:opacity-100 transition-all focus:outline-none`}
                >
                    Flatmates
                </button>
                <button
                    onClick={() => setActiveType(false)}
                    className={`py-2 ${!activeType ? 'bg-blue-600' : 'bg-gray-200 text-black'} px-4 grid place-content-center rounded-sm shadow-sm border-none cursor-pointer hover:opacity-80 active:opacity-100 transition-all focus:outline-none`}
                >
                    Apartments
                </button>
            </div>
        </div>
    )
}