import styled from "styled-components";
import { darken } from "polished";


export const Index = styled.div`

.body{
  background-color: black;
  padding-top: 30px;
}

.data-title{
    margin-left: 40px;
    font-weight: bold;
    color: #1eeca8;
    padding-top: 20px;
}

.data-text{
  color:white;
  font-weight: bold;
  padding-top: 10px;
  // margin-left: -10px;
  // margin-right: 30px;
}

.data-games{
  padding-top: 50px;
}

.buttons{
  margin-left: 280px;
  padding-bottom: 20px;
  padding-top: 80px;
}

.data{
  border: 2px solid #1eeca8;
  border-radius: 5px;
  width: 50%;
  margin-left: 330px;


}
.usergame{
  padding-top: 10px;
  color: white;
}
.text-user{
  margin-left: 30px;
}

form{
  padding-left: 60px;

}

select{
  width: 200px;
}

img {
  width: 200px;
  height: 280px;
  padding-left: 15px;
}



.game-title {
  text-align: center;
  line-height: 0.9;
  margin-top: 10px;
}

.button {
  margin-left: 55px;
  padding-bottom: 20px;
  // padding-top: 30px;
}

.column {
  float: left;
  width: 50%;
  padding: 10px;
  // padding-right: 50px;
  height: 300px; /* Should be removed. Only for demonstration */
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
  
}

`;

export const Item = styled.div`

.card-block {
  min-height: 300px;
  background-color: black;
}

.container-fluid {
  width: 78em;
  overflow-x: auto;
  white-space: nowrap;
}

.container-fluid::-webkit-scrollbar {
  display: none;
}

`;