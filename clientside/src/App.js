import "./App.css";
import Header from "./layouts/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import CarousselSfectoria from "./components/CarousselSfectoria";
import AllCards from "./components/AllCards";
import Allpacks from "./components/Allpacks";
import Formulaire from "./pages/Formulaire";
import { Component } from "react";
import FooterSfectoria from "./layouts/FooterSfectoria";
import Categories from "./components/Categories";
import OurTeachers from "./components/OurTeachers";
import OneReview from "./components/reviews/OneReview";
import AllReviews from "./components/reviews/AllReviews";
import AboutHome from "./components/AboutHome";
import Home from "./pages/home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Courses from "./pages/Courses";
import Course from "./components/OneCard"



class App extends Component {
  constructor() {
    super()
    this.state = {
      showform: false,
      selectedItem: {},
      searchValue :"",
    };
    // this.showHome = this.showHome.bind(this);
    // this.showForm = this.showForm.bind(this);
    this.changeSearchValue = this.changeSearchValue.bind(this);
  }



  // showHome() {
  //   this.setState({ showform: false });
  // }
  // showForm(item) {
  //   this.setState({ showform: true, selectedItem: item });
  // }

  changeSearchValue(e) {
    this.setState({ searchValue: e.target.value });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header changeValueSearch={this.changeSearchValue} />

          <Routes>
            <Route
              index
              element={
                // this.state.showform === false ? (
                <Home
                  // showForm={this.showForm}
                  searchValue={this.state.searchValue}
                />
                // ) : (
                //   <Formulaire
                //     showHome={this.showHome}
                //     selectedItem={this.state.selectedItem}
                //   />
                // )
              }
            />

            <Route path="aboutus" element={<AboutUs />} />
            <Route path="courses" element={<Courses />} />
            <Route path="/:id" element={<Formulaire/>} />
          </Routes>
        </BrowserRouter>

        <FooterSfectoria />
      </div>
    );
  }
}

export default App;