import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, togglePublish } from "../../store/user-slice"
import EditUserModal from "./EditUserModal"

function AboutMe({ data, isPublic }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState(
    useSelector((state) => state.profile)
  );

  const [portfolioPublished, setPortfolioPublished] = useState(
    useSelector((state) => state.profile.publish_portfolio)
  );

  useEffect(() => {
    if (isPublic) {
      setProfileData(data);
    } else if (!isPublic) {
        dispatch(fetchUser())
        .unwrap()
        .then((result) => {
          setProfileData(result);
        });
    }
  }, [dispatch, isPublic, data]);

  const updatePortfolioStatus = () => {
    dispatch(
      togglePublish())
      .unwrap()
      .then((originalPromiseResult) => {
        setPortfolioPublished(!portfolioPublished)
      })
      .catch((rejectedValueOrSerializedError) => {
        alert(rejectedValueOrSerializedError.message);
      });
  };

  return (
    <section className="py-8 md:py-10 bg-gray-100">
      <div className="container max-w-screen-xl mx-auto px-4">

        <div className="flex items-center justify-between mb-40">
          {/* <img src="assets/image/divbar-logo.png" alt="Logo"> */}
          <button className="px-7 py-5 mt-5 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500">Get my CV</button>
        </div>

        <div className="text-center">
          <div className="flex justify-center mb-16">
            <img 
              src={profileData?.profile_picture} 
              alt="Profile" 
              className="w-64 h-64 rounded-full" 
            />
          </div>

          <h6 className="font-medium text-gray-600 text-lg md:text-5xl uppercase mb-8">{profileData?.first_name} {profileData?.last_name}</h6>

          <p className="font-normal text-gray-900 text-3xl md:text-4xl leading-none mb-8">{profileData?.title}</p>

          <p className="font-normal text-gray-600 text-md md:text-xl mb-16">{profileData?.headline}</p>

          {!isPublic && (
            <div className="grid grid-cols-2 gap-4 justify-items-center">
              <button
                onClick={() => setModalOpen(true)}
                className="w-24 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
              >
                Edit
              </button>
              <button
                onClick={() => updatePortfolioStatus(true)}
                className="w-24 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-500 hover:text-gray-700 transition ease-linear duration-500"
              >
                {portfolioPublished? "Publish" : "Unpublish" } Portfolio
              </button>
              <EditUserModal  
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            </div>
          )}

          {/* <a href="#" className="px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500">Hire me</a> */}
        </div>
      </div>
    </section>
  )
}

export default AboutMe;
