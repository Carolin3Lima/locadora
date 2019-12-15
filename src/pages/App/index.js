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

import Games from './components/Games/index'

import AddProperty from "../AddProperty";

import { Container, ButtonContainer, PointReference } from "./styles";
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';

const TOKEN =
  "pk.eyJ1IjoiaGlnb3JvY2tldCIsImEiOiJjamlrdWJuY3gyaHYxM3Bvbmg0cGRwY3R0In0._TdjX9rYrjZ6Q6FFXOGwsQ";

  
  class App extends Component {
    constructor (props) {
      this.state = {
            Games: [],
      }
      api.get("/games")
       .then(res => {
           this.setState({ Games: res.data });  
      });
   }

//   state = {
//     games: null,
//     loading: false
//   };

//   static propTypes = {

//   };

//  constructor() {
 
//     super();

//   }

//   state = {
//     viewport: {
//       latitude: -27.2108001,
//       longitude: -49.6446024,
//       zoom: 12.8,
//       bearing: 0,
//       pitch: 0
//     },
//     properties: [],
//     addActivate: false
//   };

  // async componentDidMount() {
  //   try {
  //     const response = await api.get("/games", {
  //     });
  //     this.setState({ games: response.data });
      
      
  //     console.log(response)
  //   } catch (err) {
  //     console.log(err);
  //   }
  
  
  }

//   updatePropertiesLocalization() {
//     this.loadProperties();
//   }

//   loadProperties = async () => {
//     const { latitude, longitude } = this.state.viewport;
//     try {
//       const response = await api.get("/properties", {
//         params: { latitude, longitude }
//       });
//       this.setState({ properties: response.data });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   handleLogout = e => {
//     logout();
//     this.props.history.push("/");
//   };

//   handleAddProperty = () => {
//     const { match, history } = this.props;
//     const { latitude, longitude } = this.state.viewport;
//     history.push(
//       `${match.url}/properties/add?latitude=${latitude}&longitude=${longitude}`
//     );

//     this.setState({ addActivate: false });
//   };

//   renderActions() {
//     return (
//       <ButtonContainer>
//         <Button
//           color="#fc6963"
//           onClick={() => this.setState({ addActivate: true })}
//         >
//           <i className="fa fa-plus" />
//         </Button>
//         <Button color="#222" onClick={this.handleLogout}>
//           <i className="fa fa-times" />
//         </Button>
//       </ButtonContainer>
//     );
//   }

//   renderButtonAdd() {
//     return (
//       this.state.addActivate && (
//         <PointReference>
//           <i className="fa fa-map-marker" />
//           <div>
//             <button onClick={this.handleAddProperty} type="button">
//               Adicionar
//             </button>
//             <button
//               onClick={() => this.setState({ addActivate: false })}
//               className="cancel"
//             >
//               Cancelar
//             </button>
//           </div>
//         </PointReference>
//       )
//     );
//   }

//   render() {
//     const {
//       containerWidth: width,
//       containerHeight: height,
//       match
//     } = this.props;
//     const { properties, addActivate } = this.state;
//     return (
//       <Fragment>
//         <MapGL
//           width={width}
//           height={height}
//           {...this.state.viewport}
//           mapStyle="mapbox://styles/mapbox/dark-v9"
//           mapboxApiAccessToken={TOKEN}
//           onViewportChange={viewport => this.setState({ viewport })}
//           onViewStateChange={this.updatePropertiesLocalization.bind(this)}
//         >
//           {!addActivate && <Properties match={match} properties={properties} />}
//         </MapGL>
//         {this.renderActions()}
//         {this.renderButtonAdd()}
//         <ModalRoute
//           path={`${match.url}/properties/add`}
//           parentPath={match.url}
//           component={AddProperty}
//         />
//         <ModalRoute
//       path={`${match.url}/property/:id`}
//       parentPath={match.url}
//       component={Property}
//     />
  
//       </Fragment>
//     );
//   }
// }


// const DimensionedMap = withRouter(Dimensions()(Map));
// const App = () => (
//   <Container>
//     <DimensionedMap />
//   </Container>
// );

// ****************************************new******************************

console.log(this.state.Games);
  render() {
    return (
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
</nav>
<ul>
       {Object.keys(elem).map((v, i) => <li key={i}>{v} {this.state.games[v]}</li> )}
     </ul>
</div>
    )
  }

}



export default App;