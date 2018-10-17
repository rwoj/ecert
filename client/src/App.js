import React, { Component } from 'react'
import CertificateCreator from "./contracts/CertificateCreator.json"
import Certificate from "./contracts/Certificate.json"
import getWeb3 from "./utils/getWeb3"

import IssueCertificate from "./components/IssueCertificate"

import "./App.css";

class App extends Component {
  state = { 
    web3: null, 
    accounts: null, 
    contract: null, 
    certificates: []
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const instanceCertCreator = await new web3.eth.Contract(
        CertificateCreator.abi, 
        '0x690d3ca0e0d3a932db81549f1d4b16d1975b0d5d');
      instanceCertCreator.methods.howManyCert().call({from: accounts[0]}, 
        (err, ile)=> {
          let i=0
          console.log(ile)
          while(i<ile){
            instanceCertCreator.methods
            .getCertAddress(i.toString()).call({from: accounts[0]}, 
              (err, certAddress)=> {
                if (err) console.log(err);
                this.setState({certificates: [...this.state.certificates, certAddress]});
              })
              i++;
            }
            this.setState({web3, accounts, 
              contract: instanceCertCreator})
        })
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  }

  createCertyfikateHandler = async (quantity, opis, liczba) => {
    const {contract, accounts, certificates} = this.state
    const nextCert = certificates.length.toString()
    console.log(quantity, opis, liczba)
    const trans = await contract.methods
            .createCertificate(quantity.toString(), opis, liczba.toString())
            .send({from: accounts[0], gas: '1000000'})
    console.log("wysłana transakcja dodania certyfikatu", trans, nextCert)

    contract.methods.getCertAddress(nextCert).call({from: accounts[0]}, 
      (err, res)=> {
        this.setState({ certificates: [...certificates, res] })
        if(err) {console.log(err)} else {console.log("certyfikat dodany")}
      })
  }
  showCert = async (certAdr) => {
    console.log(certAdr)
    const instanceCert = await new this.state.web3.eth.Contract(
      Certificate.abi, 
      certAdr);
    instanceCert.methods.getCerfificateDetails().call({from: this.state.accounts[0]}, 
      (err, res)=> {
        console.log(res, err)
        alert(`Szczegóły certyfikatu to:
        opis:     ${res.description} 
        liczba:   ${res.liczba}`)
      }) 
  }

  render() {
    const {certificates, web3} = this.state;
    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    // console.log(certificates)
    const listOfCert = certificates.map((x)=>
      <li key={x}>kod:{x} 
        <button onClick={() => this.showCert(x)}>szczegóły</button> 
        <button>tranfer</button>
      </li>)
    return (
      <div className="App">
        <h1>Aplikacja do certyfikacji!</h1>
        <h3>wersja prototypowa</h3>
        <h2>Funkcjonalność aplikacji:</h2>
        <ul>
          <li><strong>done</strong>  wystawienie certyfikatu - certyfikat jest zapisany w blockchain.</li>
          <li><strong>done</strong>  szczegóły certyfikatu - wyświetlany jest certyfikat pobierany z blockchain.</li>
          <li><strong>to do</strong>  transfer certyfikatu - certyfikat jest transferowany na innego właściciela (cały lub cześć ton) </li>
        </ul>
        <IssueCertificate 
          createCertyfikateHandler={this.createCertyfikateHandler}
        />
        <br></br>        
        <p>Obecnie zostały wystawione {this.state.certificates.length} certyfikaty.</p>
        <ol>
          {listOfCert}
        </ol>
      </div>
    );
  }
}
export default App