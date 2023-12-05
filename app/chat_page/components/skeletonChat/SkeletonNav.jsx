
import SkeletonLoading from '../../../../components/SkeletonLoading'

export const SkeletonNav = () => {

  return (
    <nav className="sticky top-0 bg-inherit hidden flex-grow w-full md:flex items-center justify-between p-3 pr-5 text-sm pb-0 pt-0 border">
      <div className='flex items-center gap-2'>
        <SkeletonLoading classes={'profile-circle'} />
        <div className='flex flex-col'>
          <SkeletonLoading classes={'title-plain width-10'} />
          <SkeletonLoading classes={'text-plain width-10'} />
        </div>
      </div>
      <SkeletonLoading classes={'profile-circle-min'} />
    </nav>
  )
}
