import React, { Component, Fragment } from "react";
import api from "../../services/api";
import Logo from "../../assets/logo.png";


import { Index, Item } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';


  class Rented extends Component {

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
      const response = await api.get("/user/games/rented/"+localStorage.getItem('userId'), {
      });
      const ps4response = await api.get("user/games/rented/ps4/"+localStorage.getItem('userId'), {
      });
      const xboxresponse = await api.get("/user/games/rented/xbox/"+localStorage.getItem('userId'), {
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


  async GiveBack(e,id){
    console.log(id)
    try {
      const response = await api.post("/games/rent", { 
        "renter_id":null,
        'id':id,
        'available':1}
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
              <ul className="d-flex flex-row bd-highlight mb-3 justify-content-between">
              {
                  games.map(games => (
                      <li key={games.id} align="start">
                          <div>
                              <img src={games.images} alt={games.name} ></img>
                              <p className="game-title">{games.name}</p>
                              <div className="buttons">
                                <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.GiveBack(e,games.id)}>Devolver</button>
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
                  ps4games.map(ps4games => (
                      <li key={ps4games.id} align="start">
                          <div>
                              <img src={ps4games.images} alt={ps4games.name} ></img>
                              <p className="game-title">{ps4games.name}</p>
                              <div className="buttons">
                              <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.GiveBack(e,games.id)}>Devolver</button>
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
                  xboxgames.map(games => (
                      <li key={xboxgames.id} align="start">
                          <div>
                              <img src={xboxgames.images} alt={xboxgames.name} ></img>
                              <p className="game-title">{xboxgames.name}</p>
                              <div className="buttons">
                              <button className="btn btn-outline-success" value= {games.id} onClick={(e) => this.GiveBack(e,games.id)}>Devolver</button>
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




export default Rented;




