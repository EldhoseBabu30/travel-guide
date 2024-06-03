import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProfileUpdate = ({ user }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    profilePicture: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        profilePicture: user.profilePicture || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: data.message || 'Profile update failed',
        });
        setLoading(false);
        return;
      }

      Swal.fire({
        icon: 'success',
        title: 'Profile Updated',
        text: 'Your profile has been updated successfully.',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong. Please try again.',
      });
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmResult = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'Do you really want to delete your account? This process cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    });

    if (confirmResult.isConfirmed) {
      setLoading(true);

      try {
        const res = await fetch("http://localhost:3000/api/auth/delete-account", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        const data = await res.json();
        if (!res.ok) {
          Swal.fire({
            icon: 'error',
            title: 'Deletion Failed',
            text: data.message || 'Account deletion failed',
          });
          setLoading(false);
          return;
        }

        Swal.fire({
          icon: 'success',
          title: 'Account Deleted',
          text: 'Your account has been deleted successfully.',
        }).then(() => {
          navigate('/sign-up');
        });
      } catch (err) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again.',
        });
        setLoading(false);
      }
    }
  };

  const handleSignOut = () => {
    Swal.fire({
      icon: 'info',
      title: 'Signed Out',
      text: 'You have been signed out.',
    }).then(() => {
      navigate('/sign-in');
    });
  };

  if (!user) {
    return <div>Loading...</div>; // You can replace this with a loading spinner if you prefer
  }

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="flex flex-col w-full max-w-2xl bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center mb-4">Update Profile</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Profile Picture URL
                </label>
                <input
                  type="text"
                  id="profilePicture"
                  value={formData.profilePicture}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-orange-400 text-white px-5 py-3 rounded-lg hover:bg-orange-500 transition"
            >
              {loading ? 'Loading...' : 'Update Profile'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <button
              onClick={handleSignOut}
              className="w-full bg-gray-300 text-black px-5 py-3 rounded-lg hover:bg-gray-400 transition mt-2"
            >
              Sign Out
            </button>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={handleDeleteAccount}
              className="w-full bg-red-500 text-white px-5 py-3 rounded-lg hover:bg-red-600 transition mt-2"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
