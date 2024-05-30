import React from 'react';
import google from "../../assets/icons/google.png";
import { Link } from 'react-router-dom';
import logo from "../../assets/Sanchari logo high.png";



const SignUp = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-md rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md overflow-hidden">
        <div className="lg:w-2/5 w-full flex flex-col items-center p-8">
          <div className="flex items-center mb-6">
            <div className=" p-4">
              <span className="text-white w-28 text-xl font-bold"><img className='w-32' src={logo} alt="" /></span>
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold">Hi 👋</h2>
          <p className="mb-6 text-gray-600">Join to the adventure Trips!</p>
          <form className="w-full">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full pl-4 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  className="w-full pl-4 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
            <p className="mb-4 text-xs text-gray-600">
              Already have an account? <Link to='/sign-up' className="text-orange-400 hover:underline">Sign up</Link>
            </p>
            <button
              type="submit"
              className="w-full py-2 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500"
            >
             Sign In
            </button>
          </form>
          <div className="flex items-center justify-between mt-6 w-full">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <button className="w-full py-2 mt-4 border rounded-lg text-gray-700 hover:bg-gray-100">
            <img
              src={google}
              alt="Google"
              className="inline w-4 h-4 mr-2"
            />
            Sign in with Google
          </button>
        </div>
        <div className="hidden lg:block lg:w-3/5 w-full h-64 lg:h-auto bg-cover bg-center lg:p-4 lg:overflow-hidden">
          <div className="h-full rounded-tl-3xl rounded-bl-md rounded-tr-md rounded-br-3xl w-full bg-cover bg-center" style={{ backgroundImage: "url('https://cdn.gencraft.com/prod/user/ec6159e6-829c-450a-91ca-fb1d237920fe/cf5b009a-813e-440d-9abc-b7f1526ce7f9/image/image1_0.jpg?Expires=1717141692&Signature=PGmtrt7Eqdo4br4SDxkksAQWQ24rofvgNtAhUBNrCdYrFgMyemCfuVXlWnxgFayAiNY8g5JtUgZNgIbDyPZY0IF0Qw8b8XlZoMHxeUUdMmMp9kkYi-XdJjJOdJ8kOrSBVntwCLlSn0Q~ZaIpoMqtXoV-QUvXqNEO19h7xdSVyQZPeombSiDpUdS26YrwXSS0OKa0tgEpapLbnKrKKOWV5lP1ppWv7SckCzqF4S3BVh4kdIiza9nbV8F-UQ3Zw1s45X6gsSIYaH1k0m8NatBQG98xjmMfuh90nYzqkMyoi23I8jAFbppITpL5tWsittwtiEEWswRpJoq7OeX7mXXjLw__&Key-Pair-Id=K3RDDB1TZ8BHT8')" }}></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
