import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/user-slice"


function AboutMe() {

  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  {/* <Link to="/profile/edit">Edit Profile</Link> */}


  return (
    <div className="container max-w-screen-xl mx-auto px-4">

      <div className="flex items-center justify-between mb-40">
        {/* <img src="assets/image/divbar-logo.png" alt="Logo"> */}

        <button className="px-7 py-3 md:px-9 md:py-4 bg-white font-medium md:font-semibold text-gray-700 text-md rounded-md hover:bg-gray-700 hover:text-white transition ease-linear duration-500">Get my CV</button>
      </div>

      <div className="text-center">
      <div className="flex justify-center mb-16">
        <img 
          src={profileData.profile_picture} 
          alt="Profile" 
          className="w-64 h-64 rounded-full" 
        />
      </div>

        <h6 className="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">{profileData?.first_name} {profileData?.last_name}</h6>

        <h1 className="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">{profileData?.title}</h1>

        <p className="font-normal text-gray-600 text-md md:text-xl mb-16">{profileData?.headline}</p>

        <a href="#" className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500">Hire me</a>
      </div>
    </div> 
  )
}

export default AboutMe;
