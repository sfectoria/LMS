import React, { Component } from 'react'
import desc from '../assets/desc.jpg';

export default class Discription extends Component {
  render() {
    return (
      <div className='font-weight-normal d-flex border border-dark py-0'>
        <img src={desc} alt="" style={{height:"17rem"}} className='rounded float-left '/>
       <div className=' px-3 py-5 texte-centre'>
        <p> L’univers de l'informatique évolue à toute vitesse et l’adaptation aux tendances mondiales est un élément clé de cette industrie. En choisissant nos programmes, vous profiterez d'une formation correspondant aux exigences les plus élevées du domaine.</p>
        <p>Démarrez votre formation et spécialisez-vous dès maintenant dans l'un des secteurs clés du milieu informatique.</p>

       </div>
      <img src={desc} alt="" style={{height:"17rem"}} className='rounded float-right '/>
      </div>

    )
  }
}
