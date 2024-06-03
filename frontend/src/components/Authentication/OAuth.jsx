import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user/UserSlice.js';
import { useNavigate } from 'react-router-dom';
import google from "../../assets/icons/google.png";


export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:3000/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
 
       <button 
       onClick={handleGoogleClick}
       className="w-full py-2 mt-4 border rounded-lg text-gray-700 hover:bg-gray-100"
       type='button'
       
       >
       <img
         src={google}
         alt="Google"
         className="inline w-4 h-4 mr-2"
       />
       Sign in with Google
     </button>
  );
}