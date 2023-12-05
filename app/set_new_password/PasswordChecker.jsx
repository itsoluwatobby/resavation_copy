import { MdOutlineCancel } from 'react-icons/md'
import { BsCheckCircle } from 'react-icons/bs'

const passwordClass = 'flex items-center gap-1.5'
const errorSymbol = "text-lg text-red-500 shadow-lg"
const successSymbol = "text-base text-green-500 shadow-lg"

export default function PasswordChecker({password, verifyPassword, strongPassword}) {

  return (
    <div className={`text-xs ${password?.length ? 'flex flex-col gap-1' : 'hidden'}`}>
      <p className={passwordClass}>
        { 
          (strongPassword && (password === verifyPassword))  ?
            <BsCheckCircle className={successSymbol} />
            : <MdOutlineCancel className={errorSymbol} /> 
        }
        <span>Password strength: 
          {
            (strongPassword && (password === verifyPassword)) ? 
              <span className='text-green-700'> strong</span>
              : <span className='text-red-500'>{strongPassword ? 'strong' : 'weak'}/conflict</span>
          }
        </span>
      </p>
      <p className={passwordClass}>
        {
          (password === verifyPassword) ? 
          <BsCheckCircle className={successSymbol} />
          : <MdOutlineCancel className={errorSymbol} />
        }
        <span>same inputs</span>
      </p>
      <p className={passwordClass}>
        {(password?.length >= 8) ? 
          <BsCheckCircle className={successSymbol} />
          : <MdOutlineCancel className={errorSymbol} /> 
        }
        <span>At least 8 characters</span>
      </p>
      <p className={passwordClass}>
        {/^(?=.*\d)/.test(password) ? 
          <BsCheckCircle className={successSymbol} />
          : <MdOutlineCancel className={errorSymbol} /> 
        }
        <span>Contains a number</span>
      </p>
    </div>
  )
}
