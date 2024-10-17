import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from "../config/firebase.js";
import googleLogo from "/search.png"; // Ensure this path is correct
import Cookie from "universal-cookie";
import PhotoModal from './PhotoModal.jsx';
import { uploadBytes } from 'firebase/storage';

// eslint-disable-next-line react/prop-types
const Auth = ({ setIsAuth }) => {
  const [formState, setFormState] = useState({
    email: '',
    password: '',
    rememberUser: false,
    loginState: false, // `true` for login, `false` for sign up
  });
  const cookie = new Cookie();

  const { email, password, rememberUser, loginState } = formState;

  const updateState = (key, value) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const validateInputs = () => {
    if (email.length < 10) {
      alert("Email should be at least 10 characters long.");
      return false;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const setAuthCookie = (refreshToken) => {
    const options = rememberUser ? { path: '/', maxAge: 2592000 } : { path: '/' }; // 30 days for "Remember me"
    cookie.set("auth-token", refreshToken, options);
  };

  const createUser = async (photo) => {
    uploadBytes('profilePhotos/' + auth.currentUser.uid, photo)
    await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
  
    console.log(email, password);  // Check the values here
    
    try {
      const status = loginState
        ? await signInWithEmailAndPassword(auth, email.trim(), password.trim())
        : await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
  
      setAuthCookie(status.user.refreshToken);
      setIsAuth(true);
    } catch (error) {
      console.error("Error with authentication:", error);
      alert(error.message); // Firebase error message
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const status = await signInWithPopup(auth, googleProvider);
      if (status?.user?.refreshToken) {
        setAuthCookie(status.user.refreshToken);
        setIsAuth(true);
      }
    } catch (error) {
      console.error("Error with Google login:", error);
    }
  };

  return (
    <div className="auth-container">
      <PhotoModal photoTaken={createUser} />
      <main className="form-signin w-60 m-auto">
        <div className="toggle-login-signup text-black flex justify-center py-3">
          <button
            className={`${loginState ? "bg-white" : "bg-slate-300"} px-3 rounded-l-lg`}
            onClick={() => updateState('loginState', true)}
          >
            Login
          </button>
          <button
            className={`${loginState ? "bg-slate-300" : "bg-white"} px-3 rounded-r-lg`}
            onClick={() => updateState('loginState', false)}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => updateState('email', e.target.value)}
              required
              aria-label="Email address"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => updateState('password', e.target.value)}
              required
              aria-label="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={rememberUser}
              onChange={() => updateState('rememberUser', !rememberUser)}
              id="flexCheckDefault"
              aria-label="Remember me"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-primary w-100 py-2" type="submit">
            {loginState ? "Login" : "Sign up"}
          </button>
          <p className="w-full text-center py-2">or</p>
          <div
            onClick={handleGoogleLogin}
            className="w-full flex hover:cursor-pointer justify-center items-center bg-blue-600 rounded-sm py-2 text-white gap-2"
          >
            <img src={googleLogo} alt="Google logo" className="w-8 h-8 p-1 bg-white" />
            <div>Sign In With Google</div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default Auth;

