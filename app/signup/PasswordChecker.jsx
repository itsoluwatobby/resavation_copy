"use client"
import { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { BsCheckCircle } from 'react-icons/bs';

const passwordClass = 'flex items-center gap-1.5'
const errorSymbol = "text-lg text-red-500 shadow-lg"
const successSymbol = "text-base text-green-500 shadow-lg"

export default function PasswordChecker({password, firstname, lastname, verifyPassword, email, strongPassword}) {
  const [isUniquePassword, setIsUniquePassword] = useState(false)

  useEffect(() => {
    if(password?.length >= 1){
      const isNotPresentInPassord = !password.includes(email) && !password.includes(firstname) && !password.includes(lastname)
      setIsUniquePassword(isNotPresentInPassord)
    }else return
  }, [password, firstname, lastname, email])

  const isNotNul = [email, firstname, lastname].every(Boolean)
  
  return (
    <div className={`text-xs ${password?.length ? 'flex flex-col gap-1' : 'hidden'}`}>
      <p className={passwordClass}>
        { 
          (strongPassword && isUniquePassword) ? 
            <BsCheckCircle className={successSymbol} />
            : <MdOutlineCancel className={errorSymbol} /> 
        }
        <span>Password strength: 
          {
            (strongPassword && isUniquePassword) ? 
            <span className='text-green-700'> strong</span>
            : <span className='text-red-500'> weak</span>
          }
        </span>
      </p>
      <p className={passwordClass}>
        {
          (isNotNul && password?.length && isUniquePassword) ? 
          <BsCheckCircle className={successSymbol} />
          : <MdOutlineCancel className={errorSymbol} />
        }
        <span>{isNotNul ? "Can't contain your name or email" : "firstname, lastname or email requred first"}</span>
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
      <p className={passwordClass}>
        {(password === verifyPassword) ? 
          <BsCheckCircle className={successSymbol} />
          : <MdOutlineCancel className={errorSymbol} /> 
        }
        <span>confirm password same as password</span>
      </p>
    </div>
  )
}
