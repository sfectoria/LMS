import React, { Component } from 'react'
import data from '../data/reviews.json'
import Onereview from '../components/Onereview'

export default class Reviewslist extends Component {
  render() {
    return (
        <div className='py-5'>
      <div> <p className="fs-1 text-center " >Avis des étudiants</p>
      <p class="font-weight-bold text-center">Ils ont testé, ils ont approuvé. Toi aussi, viens découvrir l'expérience SFECTORIA.</p>
      </div>
      
        <div className='d-flex flex-wrap  justify-content-center p-8 gap-5 '>
           
        {data.map(Toast=>(
            <Onereview key={Toast.id} name={Toast.username} user={Toast.userId} rat={Toast.rating} comm={Toast.comment}  dat={Toast.date}/>
        ))}
      </div>
      </div>
    )
  }
}
