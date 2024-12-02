import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./authentication/Auth";
import Registration from "./authentication/Registration";
// import EditUserProfile from "./EditUserProfile";
import Portfolio from "./pages/portfolio";



// import NotFound from "./NotFound";

function RouterSetup() {
  return (
    <Routes>
      {/* <Route exact path="/" element={<Home />} /> */}
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/portfolio" element={<Portfolio />} />
      {/* <Route path="/profile/edit" element={<EditUserProfile />} /> */}

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default RouterSetup;
