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
      games:null,
      ps4games: null,
      xboxgames:null,  
      loading: true,
      userId:null
    };


    constructor (props) {
      super(props)

  }
  

 
     async componentDidMount() {
      this.setState({
        userId: localStorage.getItem('userId')
      })
    try {
      const response = await api.get("/games/available", {
      });
      const ps4response = await api.get("/games/available/ps4", {
      });
      const xboxresponse = await api.get("/games/available/xbox", {
      });

      this.setState({ games: response.data,
        ps4games: ps4response.data,
        xboxgames: xboxresponse.data,
        loading: false });    
      // console.log(this.state)
    } catch (err) {
      console.log(err);
    }
  }


  async Rent(e,id){
    console.log(id)
    try {
      const response = await api.post("/games/rent", { 
        "renter_id":localStorage.getItem('userId'),
        'id':id,
        'available':0}
      );
      window.location.reload();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  



  myAccount(){
    console.log(localStorage.getItem('userId'))
    this.props.history.push({
      pathname: "/user/"+localStorage.getItem('userId')
      });
  }

  Rented(){
    this.props.history.push({
      pathname: "/rented/"+localStorage.getItem('userId')
      });
  }
  
   
  

 render() {
  
const {games,ps4games,xboxgames,loading} = this.state;




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
        <a className="nav-link" href="/app">Início <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={this.Rented.bind(this)}>Alugados</a>
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
              <Item>
              <div className="container-fluid">
                  <div className="row flex-nowrap">
                      <div className="col-3">
                          <div className="card card-block d-flex flex-row bd-highlight mb-3 justify-content-between">
                          {
                            games.map(games => (
                                <div key={games.id}>
                                    <div className="row-games">
                                        <img src={games.images} alt={games.name} ></img>
                                        <p className="game-title">{games.name}</p>
                                      <p className="game-title">Região:
                                      {games.region==0 ?'Centro' :games.region==1 ?'Leste': games.region==2 ?'Norte':games.region==3 ?'Oeste':'Sul'}</p>
                                      <p className="game-title">Genero:{games.genre}
                                      </p>
                                      <p className="game-title">Offline:{games.offline}
                                      </p>
                                      <p className="game-title">Online:{games.online}
                                      </p>
                                        <div className="buttons">
                                        <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.Rent(e,games.id)}>Alugar</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                          }
                        </div>
                      </div> 
                  </div>
              </div>
              </Item>
      
              </div>

              <div className="ps4Only">
              <p className="title">Playstation 4</p>

              <Item>
              <div className="container-fluid">
                  <div className="row flex-nowrap">
                      <div className="col-3">
                          <div className="card card-block d-flex flex-row bd-highlight mb-3 justify-content-between">
                          {
                            ps4games.map(ps4games => (
                                <div key={ps4games.id}>
                                    <div className="row-games">
                                        <img src={ps4games.images} alt={ps4games.name} ></img>
                                        <p className="game-title">{ps4games.name}</p>
                                        <div className="buttons">
                                        <button className="btn btn-outline-success" value= {ps4games.id} onClick={(e) => this.Rent(e,ps4games.id)}>Alugar</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                          }
                        </div>
                      </div> 
                  </div>
              </div>
              </Item>

              
              </div>

              <div className="xboxOnly">
              <p className="title">Xbox One</p>

              <Item>
              <div className="container-fluid">
                  <div className="row flex-nowrap">
                      <div className="col-3">
                          <div className="card card-block d-flex flex-row bd-highlight mb-3 justify-content-between">
                          {
                            xboxgames.map(xboxgames => (
                                <div key={xboxgames.id}>
                                    <div className="row-games">
                                        <img src={xboxgames.images} alt={ps4games.name} ></img>
                                        <p className="game-title">{xboxgames.name}</p>
                                        <div className="buttons">
                                        <button className="btn btn-outline-success" value= {xboxgames.id} onClick={(e) => this.Rent(e,xboxgames.id)}>Alugar</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            ))
                          }
                        </div>
                      </div> 
                  </div>
              </div>
              </Item>
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




