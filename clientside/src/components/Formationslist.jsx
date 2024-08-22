import React, { Component } from 'react'
import data from '../data/formations.json'
import OneCard from './OneCard'


export default class Formationslist extends Component {
  render() {
  
    return (
     
      <div className='d-flex flex-wrap  justify-content-center p-5 gap-5 '>
        {data.map(card=>(
            <OneCard key={card.id} image={card.image} nom={card.title} descrp={card.description} duree={card.duration} lev={card.level} pri={card.price} showForm={this.props.showForm} />
        ))}
      </div>
    )
  }
}
