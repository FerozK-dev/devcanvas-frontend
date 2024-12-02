import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./authentication/Auth";
import Registration from "./authentication/Registration";
import Portfolio from "./pages/Portfolio";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";



// import NotFound from "./NotFound";

function RouterSetup() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Registration />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default RouterSetup;
