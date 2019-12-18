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
import AddProperty from "../AddProperty";

import { Index, Item } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { timingSafeEqual } from "crypto";


const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

  
  class User extends Component {

    state = {
      username:'',
      email:'',
      state:'',
      city:'',
      region:'',
      address:'',
      time:'',
      others:'',
      allGamesData:null,
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
      const allGamesData = await api.get(`/games`)
      this.setState({
        allGamesData:allGamesData.data,  
        users: userData.data,
        username:userData.data.username,
        email:userData.data.email,
        state:userData.data.state,
        city:userData.data.city,
        address:userData.data.address,
        region:userData.data.region,
        others:userData.data.others,
        games: gameData.data,
        loading: false });
        console.log(this.state.games)  
    } catch (err) {
      console.log(err);
    }
  }

  async Rent(e,id){
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

  async Remove(e,id){
    try {
      const response = await api.delete("/games/delete/"+id);
      window.location.reload();
      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async AddGame(e,id){
    try {
      const response = await api.post("/games/add", { 
        'user_id':localStorage.getItem('userId'),
        'game_id':id,
        'available':1,
        'region':this.state.region,
        'time':this.state.time
      }
      );
      window.location.reload();
      return response;
    } catch (err) {
      console.log(err);
    }
  }


  async Save(){
    try {
      const response = await api.post("/user/update", { 
        'id':localStorage.getItem('userId'),
        'username':this.state.username,
        'email': this.state.email,
        'address': this.state.address,
        'region': this.state.region,
        'time': this.state.time,
        'others': this.state.others,
        'cpf': this.state.cpf,
        'state': this.state.state,
        'city': this.state.city
      }
      );

     console.log(response)
      return response;
    } catch (err) {
      console.log(err);
    }
  }



  handleInputChange(e, field) {
    e.preventDefault()
		this.setState({
				[field]: e.target.value
      }, function () {
        console.log(this.state.username)}
        );
      
	}


  myAccount(){
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
  
const {users,allGamesData,games,loading} = this.state;

if(loading){
  return (
  <span>Carregando</span>
  )
}
else{

  
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
              <div className="data">
                <p className="data-title">Meus Dados</p>  

                <div className="row">
                    <div className="column">
                      <form>
                        <p className="data-text">Username:</p>
                        <input type="text" name="username" 
                        onChange={(event) => {this.handleInputChange(event,'username')}}
                         value={this.state.username}/>
                        <p className="data-text">E-mail:</p>
                        <input type="text" name="email" 
                        onChange={(event) => {this.handleInputChange(event,'email')}}
                         value={this.state.email}/>
                        <p className="data-text">Estado:</p>
                        <input  onChange={(event) => {this.handleInputChange(event,'state')}}
                         value={this.state.state}/>
                        <p className="data-text">Cidade:</p>
                        <input onChange={(event) => {this.handleInputChange(event,'city')}}
                         value={this.state.city}/>
                        <p className="data-text">Endereço:</p>
                        <input onChange={(event) => {this.handleInputChange(event,'address')}}
                         value={this.state.address}/>
                        </form>
                    </div>
                    <form>
                    <div className="column">
                      <p className="data-text">Região:</p>
                      <select value={this.state.region} onChange={(event) => {this.handleInputChange(event,'region')}}>
                      <option value="0">Centro</option>
                      <option value="1">Leste</option>
                      <option value="2">Norte</option>
                      <option value="3">Oeste</option>
                      <option value="4">Sul</option>
                    </select>
                      <p className="data-text">Hora para retirada: </p>
                      <select value={this.state.time} onChange={(event) => {this.handleInputChange(event,'time')}}>
                      <option value="0">Manhã</option>
                      <option value="1">Tarde</option>
                      <option value="2">Noite</option>
                      </select>
                      <p className="data-text">Observações:</p>
                      <input onChange={(event) => {this.handleInputChange(event,'others')}}
                         value={this.state.others}/>
                    </div>
                    </form>
                </div>



                <div className="buttons">
                  <button className="btn btn-outline-success" onClick={this.Save.bind(this)} value= "edit">Salvar</button>
                  </div>
                </div> 

                  <div className="data-games">
                    <p className="data-title">Meus Jogos</p>
                                  
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
                                        <p className="game-title">Disponível: {games.available==1?'Sim':'Não'}</p>
                                        <p className="game-title">Console: {games.console}</p>
                                        <p className="game-title">Alugador: {games.username}</p>
                                        <p className="game-title">Email alugador:{games.email}</p>
                                        <p className="game-title">CPF Alugador: {games.cpf}</p>
                                        
                                        <div className="button">
                                        <button className="btn btn-outline-success"  value= {games.id} onClick={(e) => this.Remove(e,games.id)} >Remover</button>
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


              <p className="data-title">Selecione Jogos</p>

              <Item>
              <div className="container-fluid">
                  <div className="row flex-nowrap">
                      <div className="col-3">
                          <div className="card card-block d-flex flex-row bd-highlight mb-3 justify-content-between">
                          {
                            allGamesData.map(allGamesData => (
                                <div key={allGamesData.id}>
                                    <div className="row-games">
                                        <img src={allGamesData.images} alt={allGamesData.name} ></img>
                                        <p className="game-title">{allGamesData.name}</p>
                                        <p className="game-title">Console: {allGamesData.console}</p>
                                       
                                        <div className="button">
                                        <button className="btn btn-outline-success" 
                                         value= {allGamesData.id} onClick={(e) => this.AddGame(e,allGamesData.id)}
                                        >Tenho</button>
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




export default User;
