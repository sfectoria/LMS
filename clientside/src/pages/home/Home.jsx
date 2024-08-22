import React, { Component } from 'react'
import CarousselSfectoria from '../../components/CarousselSfectoria'
import Categories from '../../components/Categories'
import AboutHome from '../../components/AboutHome'
import Allpacks from '../../components/Allpacks'
import AllCards from '../../components/AllCards'
import OurTeachers from '../../components/OurTeachers'
import AllReviews from '../../components/reviews/AllReviews'


export default class Home extends Component {
    constructor(props) {
      super()
          

    }

    
    render() {
      return (
        <div>
          
          <CarousselSfectoria />
          <Categories />
          <AboutHome />
          <Allpacks />
          <AllCards
            // showForm={this.props.showForm}
            searchValue={this.props.searchValue}
          />
          <OurTeachers />
          <AllReviews />
        </div>
      );
    }
}
