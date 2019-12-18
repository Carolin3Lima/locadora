import styled from "styled-components";
import { darken } from "polished";



export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  right: 10px;
  display: flex;
  flex-direction: column;
`;

export const PointReference = styled.div`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  i {
    color: #fc6963;
    pointer-events: all;
    font-size: 50px;
    margin-top: 112px;
    margin-left: 12px;
    -webkit-text-fill-color: #fc6963;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: ${() => darken(0.05, "#fc6963")};
  }
  div {
    margin-top: 100px;
    button {
      border: none;
      font-size: 15px;
      height: 46px;
      margin: 0 10px;
      background-color: #fc6963;
      color: #ffffff;
      padding: 0 20px;
      border-radius: 3px;
      pointer-events: all;
      text-align: center;
      &.cancel {
        background: #ffffff;
        color: #333333;
      }
    }
  }
`;

export const Index = styled.div`

.body{
  background-color: black;
}

ul {
  list-style-type:none;
}

img {
  width: 200px;
  height: 280px;
  padding-left: 15px;
}

ul {
  margin-right: 40px;
}

.title {
  margin-left: 40px;
  font-weight: bold;
  color: #1eeca8;
  padding-top: 20px;
}

button {
  margin-left: 10px;
}

.buttons{
  margin-left: 50px;
  padding-bottom: 8px;
}

.game-title {
  text-align: center;
  font-weight: bold;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}

.newReleases {
  padding-bottom: 20px;
}

.ps4Only {
  padding-bottom: 20px;
}

.xboxOnly {
  padding-bottom: 20px;
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


