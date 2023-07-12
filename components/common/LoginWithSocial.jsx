import { setError, setUser } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { signInWithGoogle, signInWithFacebook } from "../../utils/auth";

const LoginWithSocial = () => {
  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const userCredential = await signInWithGoogle();
      const user = userCredential.user;
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  const handleFacebookAuth = async () => {
    try {
      const userCredential = await signInWithFacebook();
      const user = userCredential.user;
      dispatch(setUser(user));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };

  return (
    <>
      <div className="col-md-6 col-12">
        <button
          onClick={handleFacebookAuth}
          className="button col-12 -outline-blue-1 text-blue-1 py-15 rounded-8 "
        >
          <i className="icon-apple text-15 mr-10" />
          Facebook
        </button>
      </div>

      <div className="col-md-6 col-12">
        <button
          onClick={handleGoogleAuth}
          className="button col-12 -outline-red-1 text-red-1 py-15 rounded-8 "
        >
          <i className="icon-apple text-15 mr-10" />
          Google
        </button>
      </div>
    </>
  );
};

export default LoginWithSocial;
