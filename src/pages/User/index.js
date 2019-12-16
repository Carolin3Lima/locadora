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



import AddProperty from "../AddProperty";

import { Index } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

  
  class User extends Component {

    state = {
      users: null, 
      games:null, 
      loading: true
    };


 constructor() {
 
    super();

  }
  

     async componentDidMount() {
      const { id } = this.props.match.params;
      try {
      const userData = await api.get(`/user/${id}`)
      const gameData = await api.get(`/user/games/${id}`)
      this.setState({ 
        users: userData.data,
        games: gameData.data,
        loading: false });
        console.log(this.state.games)  
    } catch (err) {
      console.log(err);
    }
  }

  
  start(){
    this.props.history.push({
      pathname: "/app",
      state: { userId: this.props.location.state.userId }
      });
  }

 

 render() {
  
const {users,games,loading} = this.state;

if(loading){
  return (
  <span>Carregando</span>
  )
}
else{

  
      return(

        
          <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">LOCADORA</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" onClick={this.start.bind(this)}  >Início <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={this.start.bind(this)} href="#">Alugados</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={this.start.bind(this)}>Minha Conta</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">Logout</a>
      </li>
     
    </ul>
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Procurar jogo" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
    </form>
  </div>
</nav>     
              <div>
              <p>Meus Dados</p>  
              <p>Username: {users.username}</p>
              <ul>
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                    
                              <p>{games.name}</p>
                              <p>{games.region}</p>
                          </div>
                      </li>
                  ))
              }
              </ul>
              <button href="#">Editar</button>
              </div>
              
               

          </div>

          
      );
    }    
  }

  
}




export default User;
