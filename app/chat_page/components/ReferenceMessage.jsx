import { FaTimes } from 'react-icons/fa';
import { format } from 'timeago.js';
import { reduceTextLength } from '../../../lib/helperFunction';
export const ReferencedMessage = ({ isMessageReferenced, setIsMessageReferenced, editMessage, setEditMessage, setMessage }) => {

  const cancelPopMessage = () => {
    setEditMessage({})
    setMessage('')
    setIsMessageReferenced({})
  }
  
  return (
    <article className={`absolute p-1 pt-0.5 pb-0.5 h-14 text-xs rounded-md rounded-b-none bg-gray-400 w-full -top-[58px] left-0 right-1 flex items-center gap-0.5 md:text-xs mobile:text-sm transition-all ${(isMessageReferenced?.message || isMessageReferenced?.imageUrls?.length || editMessage?.message) ? 'scale-[1]' : 'scale-[0] hidden'}`}>
      <div className={`flex-auto bg-gray-200 ${editMessage?.message ? 'opacity-80' : ''} w-full h-full p-1 pt-0.5 pb-0.5 rounded-sm flex flex-col`}>
        <p className='text-gray-800 text-[10px] bg-gray-300 w-fit font-medium rounded-md p-0.5 pt-0 pb-0'>
          . {editMessage?.message ? '' : isMessageReferenced?.displayName}
        </p>
        {
          !isMessageReferenced?.imageUrls?.length ?
              <div className='relative h-full w-full rounded-sm text-xs mobile:text-xs'>
                  <span>
                    {
                      reduceTextLength(editMessage?.message ? editMessage?.message : isMessageReferenced?.message, 25, 'word')
                    }
                  </span>
                <span className='absolute right-2 bottom-0.5 text-[9px] text-gray-600'>
                  {
                    format(editMessage?.message ? editMessage?.date : isMessageReferenced?.date)
                  }
                </span>
              </div>
              :
              <div className='relative h-full w-full rounded-sm text-xs mobile:text-xs flex items-center gap-2'>
                <span className='flex-none w-[75%]'>
                  {
                    reduceTextLength(editMessage?.message ? editMessage?.message : isMessageReferenced?.message, 15, 'word')
                  }
                </span>
                <div className='flex-auto absolute right-0 -top-4 flex items-center gap-0.5'>
                  {
                    isMessageReferenced?.imageUrls?.slice(0,2)?.map((image, index) => (
                      <figure
                        key={index}
                        className='w-12 h-12 rounded-md border border-gray-300'
                      >
                        <img 
                          src={image}
                          loading='eager'
                          className='w-full h-full object-cover rounded-md'
                          alt='image'
                        />
                      </figure>
                    ))
                  }
                </div>
              </div>
        }
      </div>
      <button 
        type='button'
        role={editMessage?.message ? 'cancel edit' : 'close reply'}
        title={editMessage?.message ? 'cancel edit' : 'close'}
        onClick={cancelPopMessage}
        className={`flex-none h-full w-8 text-lg grid place-content-center p-2 pt-1 pb-1 hover:scale-[1.03] transition-all active-scale-[1] bg-gray-300 rounded-md shadow-sm focus:outline-none border-none`}>
        <FaTimes className='text-lg text-gray-600'/>
      </button>
    </article>
  )
}
