import { useState, useEffect } from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setError, selectUser } from "../../features/auth/authSlice";
import { auth } from "../../config/firebase";
import { RecaptchaVerifier } from "firebase/auth";
import {
  PhoneAuthProvider,
  signInWithPhoneNumber,
  signInWithCredential,
} from "firebase/auth";
import Link from "next/link";
import { setUser } from "../../features/auth/authSlice";

const SignUpForm = () => {
  const [iPhoneNumber, setIPhoneNumber] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [otp, setOtp] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [appVerifier, setAppVerifier] = useState(null);
  const [numberError, setNumberError] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const user = useSelector(selectUser);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (window) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
        },
        auth
      );
      window.recaptchaVerifier.verify();
      setAppVerifier(window.recaptchaVerifier);
    }
  }, [window]);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    if (recaptchaToken) {
      const submitButton = document.querySelector("#submit-button");
      submitButton.click();
    }
  }, [recaptchaToken]);

  const onRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const preventNonNumericKeys = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    const isNumericKey = /^\d$/.test(e.key);

    if (!isNumericKey && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();
    setNumberError("");
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setVerificationId(result.verificationId);
    } catch (err) {
      dispatch(setError(err.message));
    }
    setIsSubmitted(true);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const credential = PhoneAuthProvider.credential(verificationId, otp);
      const res = await signInWithCredential(auth, credential);
      dispatch(
        setUser({
          ...res.user.providerData[0],
          displayName: `${firstName} ${lastName}`,
          email,
        })
      );
      //console.log(res.user);
    } catch (err) {
      console.log("errorrr", err);
    }
  };

  const handleOtpChange = (e) => {
    if (e.target.value.split("").length <= 6) {
      setOtp(e.target.value);
    } else {
      return;
    }
  };

  const handlePhoneNumberChange = (val, countryData, object, number) => {
    setIPhoneNumber(countryData)
    if (!val) {
      setNumberError("Invalid phone number");
      return;
    } else {
      setNumberError("");
      setPhoneNumber(number);
    }
  };

  return (
    <form
      className="row y-gap-20"
      onSubmit={(e) =>
        isSubmitted ? handleOtpSubmit(e) : handlePhoneNumberSubmit(e)
      }
    >
      <div className="col-12">
        <h1 className="text-22 fw-500">Welcome back</h1>
        <p className="mt-10">
          Already have an account?{" "}
          <Link href="/others-pages/login" className="text-blue-1">
            Log in
          </Link>
        </p>
      </div>
      {/* End .col */}

      {!isSubmitted ? (
        <>
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                required
                className="pt-20"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <label className="lh-1 text-14 text-light-1">First Name</label>
            </div>
          </div>
          {/* End .col */}
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                required
                className="pt-20"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <label className="lh-1 text-14 text-light-1">Last Name</label>
            </div>
          </div>
          {/* End .col */}
          <div className="col-12">
            <div className="form-input">
              <input
                type="text"
                required
                className="pt-20"
                onChange={(e) => setEmail(e.target.value.trim())}
                value={email}
              />
              <label className="lh-1 text-14 text-light-1">Email</label>
            </div>
          </div>

          <div className="col-12">
            <div className="form-input ">
              <IntlTelInput
                containerClassName="intl-tel-input"
                inputClassName="form-control"
                value={iPhoneNumber}
                separateDialCode={true}
                onPhoneNumberChange={handlePhoneNumberChange}
                required
                defaultCountry="in"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="col-12">
          <div className="form-input">
            <input
              type="number"
              placeholder="Enter OTP"
              maxLength={4}
              required
              onKeyDown={(e) => preventNonNumericKeys(e)}
              onChange={(e) => handleOtpChange(e)}
              value={otp}
            />
          </div>
        </div>
      )}
      {/* End .col */}

      <div id="recaptcha-container"></div>
      {/* End .col */}
      <div className="col-12 flex items-center justify-start">
        <button
          disabled={numberError || !phoneNumber}
          type="submit"
          href="#"
          className={`button py-20 -dark-1 bg-blue-1 text-white cursor-pointer ${
            isSubmitted ? "w-1/3" : "w-100"
          }`}
          style={{ opacity: numberError ? 0.5 : 1 }}
          id={`submit-button`}
        >
          {!isSubmitted ? "Sign up" : "Verify OTP"}
          <div className="icon-arrow-top-right ml-15" />
        </button>
        {isSubmitted && (
          <button
            className="button py-20 px-10 ml-10 -dark-1 bg-blue-2 text-black w-1/2"
            onClick={() => setIsSubmitted(false)}
          >
            Edit phone number
          </button>
        )}
      </div>
      {numberError && (
        <p className="text-red-1 text-sm text-center">{numberError}</p>
      )}
      {/* End .col */}
    </form>
  );
};

export default SignUpForm;
