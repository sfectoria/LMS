import React from "react";
import App from "../Pages/App";
import Header from "../Layouts/Header";
import Footer from "../Layouts/Footer";
import Programs from "../Components/Programs";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import CourseDetails from "../Pages/CourseDetails";
import ProgramDetails from "../Pages/ProgramDetails";
import Home from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import AboutUs from "../Components/AboutUs";
import SessionDetails from "../Pages/SessionDetails";
export default function Router() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path=":id" element={<CourseDetails />} />
              <Route path="program/:id" element={<ProgramDetails />} />
              <Route path="session/:id" element={<SessionDetails />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
