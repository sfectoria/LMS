import React, { Component } from "react";
import Form from "react-bootstrap/Form";

export default class Formu extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <Form className="py-5 px-3 ">
        <p class="lead">
          Notre service des admissions prendra contact avec vous dans un délais
          de 48 heures ouvrées suivant votre demande d’inscription issue du
          formulaire de contact en ligne. Pour un traitement plus rapide, vous
          pouvez nous contacter par téléphone (+216 55 180 992) .
        </p>
        <p class="lead">
          Si vous souhaitez bien rejoindre notre école, remplissez le formulaire
          ci-dessous et vous serez convié à un entretien d’admission afin
          d’évaluer la qualité de votre candidature.{" "}
        </p>
        <p className="fs-1  ">Formulaire d'inscription</p>
        <button class="btn btn-light" onClick={() => this.props.showHome()}>
          Accueil
        </button>
        <Form.Group
          className="mb-3 d-flex p-2 gap-5"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            className="px-3 border border-info"
            type="name"
            placeholder="Prénom"
          />
          <Form.Control
            type="name"
            className="border border-info"
            placeholder="Nom"
          />
        </Form.Group>

        <Form.Group
          className="mb-3 d-flex p-2 gap-5 "
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="email"
            className="px-3 border border-info"
            placeholder="Email"
          />
          <Form.Control
            type="phone"
            className="border border-info"
            placeholder="Téléphone"
          />
        </Form.Group>

        <Form.Group
          className="mb-3 d-flex p-2 gap-5"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Control
            type="add"
            className="border border-info"
            placeholder="Adresse"
          />
          <Form.Control
            type="vill"
            className="border border-info"
            placeholder="Ville"
          />
        </Form.Group>

        <Form.Label className="py-2 px-2">
          Formation que je souhaite intégrer au sein de l'école SFECTORIA
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          className="border border-info"
        >
          <option>Veuillez choisir une option</option>
          <option value="1">Formation Développement Web</option>
          <option value="2">Formation Développement Mobile</option>
          <option value="3">Formation Data Science</option>
        </Form.Select>

        <Form.Label className="py-2 px-2">
          Session d'entretien souhaitée
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          className="border border-info "
        >
          <option>Veuillez choisir une option</option>
          <option value="1">Lundis à 14:30</option>
          <option value="2">Mercredis à 15:30</option>
          <option value="3">Vendredis à 11</option>
        </Form.Select>

        <div className="  py-4 px-2 d-flex">
          <button type="button" class="btn btn-info">
            Valider ma demande d'inscription
          </button>
          <button class="btn btn-light" onClick={() => this.props.showHome()}>
            Accueil
          </button>
        </div>
      </Form>
    );
  }
}
