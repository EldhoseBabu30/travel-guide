import { useSelector, useDispatch } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../../firebase';
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from '../../redux/user/UserSlice.js';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(null);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
    avatar: currentUser?.avatar,
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());

      const token = localStorage.getItem('authorization'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('Authorization token is missing');
      }
      console.log('Token for update:', token); // Debugging token
      console.log('currentUser._id:', currentUser); // Debugging currentUser._id
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const token = localStorage.getItem('authorization'); // Retrieve token from localStorage
      if (!token) {
        throw new Error('Authorization token is missing');
      }
      console.log('Token for delete:', token); // Debugging token

      const res = await fetch(`http://localhost:3000/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `${token}`, // Ensure token is prefixed with Bearer
        },
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
        return;
      }

      dispatch(deleteUserSuccess(data));
      localStorage.removeItem('authorization'); // Remove token from localStorage
      navigate('/'); // Redirect to home page after account deletion
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:3000/api/auth/sign-out');
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      console.error('Sign out error:', error.message);
    }
  };

  return (
    <div className='p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg mt-10'>
      <h1 className='text-4xl font-semibold text-center mb-8'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <div className='relative self-center'>
          <img
            onClick={() => fileRef.current.click()}
            src={formData.avatar || currentUser.avatar}
            alt='profile'
            className='rounded-full h-32 w-32 object-cover cursor-pointer border-4 border-gray-200'
          />
          <div className='absolute inset-0 flex items-center justify-center'>
            {fileUploadError ? (
              <span className='text-red-700 text-center'>
                Error Image upload (image must be less than 2 mb)
              </span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className='text-white text-center'>{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className='text-green-700 text-center'>
                Image successfully uploaded!
              </span>
            ) : (
              ''
            )}
          </div>
        </div>
        <input
          type='text'
          placeholder='Username'
          value={formData.username}
          id='username'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
          onChange={handleChange}
          autoComplete='current-username'
        />
        <input
          type='email'
          placeholder='Email'
          id='email'
          value={formData.email}
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
          autoComplete='current-email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={handleChange}
          autoComplete='current-password'
          id='password'
          className='border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500'
        />
        <button
          disabled={loading}
          className='bg-orange-400 text-white rounded-lg p-3 uppercase hover:bg-orange-500 disabled:opacity-50'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
      </form>
      <div className='flex justify-between mt-6'>
        <button
          onClick={handleDeleteUser}
          className='text-red-700 cursor-pointer hover:underline'
        >
          Delete account
        </button>
        <button
          onClick={handleSignOut}
          className='text-red-700 cursor-pointer hover:underline'
        >
          Sign out
        </button>
      </div>

      {error && <p className='text-red-700 mt-5 text-center'>{error}</p>}
      {updateSuccess && (
        <p className='text-green-700 mt-5 text-center'>
          User is updated successfully!
        </p>
      )}
    </div>
  );
}
