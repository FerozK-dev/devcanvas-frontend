import './css/App.css'
import AppHeader from './components/shared/AppHeader';
import Auth from './components/authentication/Auth'
import Registration from './components/authentication/Registration';
import AboutMe from './components/portfolio/AboutMe';
import Portfolio from './components/pages/portfolio';
import RouterSetup from "./components/RouterSetup";

function App() {
  return (
    <div className="App">
      <AppHeader/>ß
      {/* <Auth/> */}
      {/* <Registration/> */}
      {/* <Portfolio/> */}
      <RouterSetup/>

    </div>
  );
}

export default App;
