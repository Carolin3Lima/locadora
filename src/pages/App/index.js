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
import Logo from "../../assets/logo.png";

import Properties from "./components/Properties";
import Button from "./components/Button";
import AddProperty from "../AddProperty";

import { Index, Item } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

  
  class App extends Component {

    state = {
      games: null,  
      loading: true,
      userId:null
    };


    constructor (props) {
      super(props)

  }
  

 
     async componentDidMount() {
       console.log(this)
      this.setState({
        userId: this.props.location.state.userId
      })


    try {
      const response = await api.get("/games", {
      });
      this.setState({ games: response.data,
      loading: false });  
      // console.log(this.state)
    } catch (err) {
      console.log(err);
    }
  }


  async sendData(){
    try {
      const response = await api.post("/games/add", { 
        "user_id":"1",
        "game_id":"1",
        "available":"1",
        "region":"1",
        "time":"1",
        "price":"1"}
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }


//   async getId(){
//     try {
//       const { id } = this.props.match.params;
//       const { data } = await api.get(`/user/${id}`);
//       this.setState({ user: data });
//     } catch (err) {
//       console.log(err);
//   }
// }


  myAccount(){
    this.props.history.push({
      pathname: "user/"+this.props.location.state.userId,
      state: { userId: this.props.location.state.userId }
      });
  }
  
   
  

 render() {
  
const {games,loading} = this.state;




if(loading){
  return (
  <span>Carregando</span>
  )
}
else{

  // console.log(games)
      return(

        
          <div>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#"><img src={Logo} alt="switching" /></a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#">Início <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Alugados</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={this.myAccount.bind(this)}>Minha Conta</a>
      </li>
      <li className="nav-item logout">
        <a className="nav-link" href="/">Sair</a>
      </li>
     
    </ul>
     
    <form className="form-inline my-2 my-lg-0">
      <input className="form-control mr-sm-2" type="search" placeholder="Procurar jogo" aria-label="Search"/>
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
    </form>
  </div>
</nav>        
<Index>
  <div className="body">
              <div className="newReleases">
              <p className="title">Lançamentos</p>
              <ul className="d-flex flex-row bd-highlight mb-3 justify-content-between">
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                              <img src={games.images} alt={games.name} ></img>
                              <p className="game-title">{games.name}</p>
                              <div className="buttons">
                                <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.sendData(e)}>Tenho</button>
                                <button className="btn btn-outline-success" href="#">Alugar</button>
                              </div>
                          </div>
                      </li>
                  ))
              }
              </ul>
              <a className="more" href="#">VER MAIS ></a>
              </div>

              <div className="ps4Only">
              <p className="title">Playstation 4</p>
              <ul className="d-flex flex-row bd-highlight mb-3 justify-content-between">
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                              <img src={games.images} alt={games.name} ></img>
                              <p className="game-title">{games.name}</p>
                              <div className="buttons">
                                <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.sendData(e)}>Tenho</button>
                                <button className="btn btn-outline-success" href="#">Alugar</button>
                              </div>
                          </div>
                      </li>
                  ))
              }
              </ul>
              <a className="more" href="#">VER MAIS ></a>
              </div>

              <div className="xboxOnly">
              <p className="title">Xbox One</p>
              <ul className="d-flex flex-row bd-highlight mb-3 justify-content-between">
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                              <img src={games.images} alt={games.name} ></img>
                              <p className="game-title">{games.name}</p>
                              <div className="buttons">
                                <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.sendData(e)}>Tenho</button>
                                <button className="btn btn-outline-success" href="#">Alugar</button>
                              </div>
                          </div>
                      </li>
                  ))
              }
              </ul>
              <a className="more" href="#">VER MAIS ></a>
              </div>
              </div>
              </Index>
              
                <footer className="page-footer font-small blue bg-success">
                  <div className="footer-copyright text-center py-3 text-white">© 2019 Copyright:
                    <a> IronHacker</a>
                  </div>
                </footer>
               
          </div>

          
      );
    }    
  }

  
}




export default App;




