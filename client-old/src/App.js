import React, { Component } from 'react'

import getWeb3 from "./utils/getWeb3"
import MainPage from "./components/MainPage/MainPage"

import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

import "./App.css";


class App extends Component {
  state = {
    web3: '',
    address: '',
    isMainPageVisible: false,
  }
  componentDidMount = async () => {
    const web3 = await getWeb3();
    this.setState({web3});
  }

  onChangeHandler = (e) => this.setState({[e.target.name]: e.target.value})
  handleMoveOn = () =>{
    const {address} = this.state
    if (address !== '') {
      this.setState({isMainPageVisible: true});
    } else {
        alert ("nie należy klikać bez podania adresu - no no");
    }
  }

  render() {
    const {isMainPageVisible, address, web3} = this.state;
    if (!web3) {
      return <div>Loading Web3...</div>;
    }
    return (
      <div>
        <CssBaseline />
        { !isMainPageVisible && 
          <div className="App">
            <h1>Aplikacja do certyfikacji (prototyp)!</h1>
            <br></br>
            <h4>Żeby rozpocząć pracę podaj adres Smart Contract'u: </h4>
            <TextField
              id="contractAddress"
              name="address"
              label="adres Smart Contract'u"
              value={address}
              onChange={this.onChangeHandler}
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick = {()=>this.handleMoveOn()}>
              Przejdz dalej
              {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
              <Icon >send</Icon>
            </Button>
            {/* <button onClick = {()=>this.handleMoveOn()}> Przejdz dalej </button> */}
            <br></br>
            <h4>Funkcjonalności:</h4>
            <ul>
              <li><strong>done</strong>  wystawienie certyfikatu - certyfikat jest zapisany w blockchain.</li>
              <li><strong>done</strong>  szczegóły certyfikatu - wyświetlany jest certyfikat pobierany z blockchain.</li>
              <li><strong>to do</strong>  transfer certyfikatu - certyfikat jest transferowany na innego właściciela (cały lub cześć ton) </li>
            </ul>
          </div>
        }
        { isMainPageVisible && <MainPage web3={web3} address = {address}/> }
      </div>
    )
  }
}
export default App