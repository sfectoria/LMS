import { Outlet } from "react-router-dom";
import AboutUs from "../Components/AboutUs";
import Carrousel from "../Components/Carrousel";
import Courses from "../Components/Courses";
import Programs from "../Components/Programs";
import Header from "../Layouts/Header.jsx";
import Footer from "../Layouts/Footer.jsx";
import Form from "../Components/Form.jsx";
import '@fontsource/inter';





function App() {
  return (
    <div>
      <Header />

      <Outlet />

      <Footer />
    </div>
  );
}

export default App;
