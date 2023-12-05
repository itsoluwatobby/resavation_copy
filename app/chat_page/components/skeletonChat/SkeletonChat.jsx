import SkeletonLoading from '../../../../components/SkeletonLoading';

export const SkeletonChat = () => {

  return (
    <article
      className={`flex flex-col max-w-[75%] min-w-[55%] text-xs p-1 pt-2.5 gap-1.5 $self-start}`}
    >
      <div className={`relative p-2.5 pb-3 rounded-md text-justify whitespace-pre-wrap w-full`}>
        <SkeletonLoading classes={'width-65 title-plain'} />
      </div>
      <span className={`text-right text-gray-500`}>
        <SkeletonLoading classes={'text-plain'} />
      </span>
    </article>
  )
}
