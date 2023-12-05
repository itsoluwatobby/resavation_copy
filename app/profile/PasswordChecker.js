import { MdOutlineCancel } from "react-icons/md";
import { BsCheckCircle } from "react-icons/bs";

const passwordClass = "flex items-center gap-1.5";
const errorSymbol = "text-lg text-red-500 shadow-lg";
const successSymbol = "text-base text-green-500 shadow-lg";

export default function PasswordChecker({
  password,
  verifyPassword,
  strongPassword,
}) {
  const isSameInputs = password === verifyPassword;
  const isStrongPassword =
    // strongPassword &&
    password.length >= 8 &&
    isSameInputs &&
    /^(?=.*\d)(?=.*[!@#$%^&*])/.test(password);

  return (
    <div
      className={`text-xs ${
        password?.length ? "flex flex-col gap-1" : "hidden"
      }`}
    >
      <p className={passwordClass}>
        {isStrongPassword ? (
          <BsCheckCircle className={successSymbol} />
        ) : (
          <MdOutlineCancel className={errorSymbol} />
        )}
        <span>
          Password strength:{" "}
          {isStrongPassword ? (
            <span className="text-green-700">strong</span>
          ) : (
            <span className="text-red-500">
              {isSameInputs ? "weak" : "weak/conflict"}
            </span>
          )}
        </span>
      </p>
      <p className={passwordClass}>
        {isSameInputs ? (
          <BsCheckCircle className={successSymbol} />
        ) : (
          <MdOutlineCancel className={errorSymbol} />
        )}
        <span>{isSameInputs ? "Same inputs" : "Different inputs"}</span>
      </p>
      <p className={passwordClass}>
        {password?.length >= 8 ? (
          <BsCheckCircle className={successSymbol} />
        ) : (
          <MdOutlineCancel className={errorSymbol} />
        )}
        <span>At least 8 characters</span>
      </p>
      <p className={passwordClass}>
        {/^(?=.*\d)(?=.*[!@#$%^&*])/.test(password) ? (
          <BsCheckCircle className={successSymbol} />
        ) : (
          <MdOutlineCancel className={errorSymbol} />
        )}
        <span>Contains a number or symbol</span>
      </p>
    </div>
  );
}
