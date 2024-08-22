import React, { Component } from 'react'
import OneTeacher from './OneTeacher'
import axios from 'axios'

export default class OurTeachers extends Component {

    constructor(){
        super()
        this.state={
            data:[],
            loading:false

        }
    }




componentDidMount(){
    axios.get("http://localhost:3000/teachers.json").then((response)=>{
        this.setState({data:response.data,});

    }) 
    .catch((err) => console.log(err));   

}


  render() {
    return (
      <div >
        <div className="d-flex justify-content-center p-5 flex-wrap align-items-center flex-wrap">
        <h1 style={{fontFamily:'Brittany Signature'}}>Our teachers</h1>
        <div style={{height:"5px", width: "80px", backgroundColor: "rgb(66, 177, 188)", marginRight: "42px" }} >
          </div>  
        </div>
        <div className='d-flex gap-3 justify-content-center flex-wrap'>
        {this.state.data.map((teacher)=>(
            <OneTeacher id={teacher.id} nom={teacher.nom} specialite={teacher.specialite} src={teacher.src} about={teacher.about}  />
        )
        
        )}

        </div>




        
      </div>
    )
  }
}
