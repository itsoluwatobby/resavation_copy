import SkeletonLoading from '../../../../components/SkeletonLoading'

export const SkeletonMessages = () => {

  return (
    <section className={`chatHeights maxscreen:h-full text-xs p-5 pt-0 md:shadow-md md:flex-none md:z-20 md:min-w-[30%] lg:min-w-[25%] pl-0 pr-0 flex flex-col gap-2`}>
      <div className="flex-none h-10 bg-gray-100 w-full sticky z-20 top-0 md:top-[72px] md:pt-5 pt-12 pl-7 pb-10">
        <h2 className="font-bold capitalize text-lg">Messages</h2>
      </div>
      <div className="chatScroll flex-auto h-full pt-1.5 p-3 flex flex-col gap-2 overflow-y-scroll w-full">
        {
          [...Array(5).keys()].map(arr => (
            <article 
              key={arr}
              className='flex items-center h-14 w-full border rounded-md bg-gray-200 gap-2 p-1'>
              <SkeletonLoading classes={'profile-circle'} />
              <div className='flex-auto w-[85%] h-ful flex flex-col p-0'>
                <SkeletonLoading classes={'title-plain width-65'} />
                <SkeletonLoading classes={'text width-50'} />
              </div>
            </article>
          ))
        }
      </div>
    </section>
  )
}
