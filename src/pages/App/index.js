import React, { Component, Fragment } from "react";
import Dimensions from "react-dimensions";
import { withRouter } from "react-router-dom";
import { ModalRoute } from "react-router-modal";
import MapGL from "react-map-gl";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import Property from "../Property";
import api from "../../services/api";
import { logout } from "../../services/auth";

import Properties from "./components/Properties";
import Button from "./components/Button";

import GamesComponent from './components/Games/index'

import AddProperty from "../AddProperty";

import { Index } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

  
  class App extends Component {

    state = {
      games: null,  
      loading: true
    };


 constructor() {
 
    super();

  }

     async componentDidMount() {
    try {
      const response = await api.get("/games", {
      });
      this.setState({ games: response.data,
      loading: false });  
      console.log(this.state)
    } catch (err) {
      console.log(err);
    }
  }

  
   


 render() {

const {games,loading} = this.state;




if(loading){
  return (
  <span>Carregando</span>
  )
}
else{

  console.log(games)
      return(

        
          <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <a className="dropdown-item" href="#">Action</a>
          <a className="dropdown-item" href="#">Another action</a>
          <div className="dropdown-divider"></div>
          <a className="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>        <Index>
              <div className="newReleases">
              <p>Lançamentos</p>
              <ul>
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                              <img src={games.images} alt={games.name} ></img>
                              <p>{games.name}</p>
                              <button>Tenho</button>
                              <button>Alugar</button>
                          </div>
                      </li>
                  ))
              }
              </ul>
              </div>
              </Index>
          </div>

          
      );
    }    
  }

  
}




export default App;




