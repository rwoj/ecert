import React, { Component } from 'react';
import CertificateCreator from "./contracts/CertificateCreator.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const instanceCertCreator = await new web3.eth.Contract(
        CertificateCreator.abi, 
        '0xac332e55748a42288c2a0424e46a3dd58a150361');

      const tran = await instanceCertCreator.methods.createCertificate('100')
                  .send({from: accounts[0], gas: '1000000'})
      console.log(tran)
      
      instanceCertCreator.methods.howManyCert().call({from: accounts[0]}, 
        (err, res)=> console.log(res))
      this.setState({ web3, accounts, contract: instanceCertCreator })
    } catch (error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  // runExample = async () => {
  //   const { accounts, contract } = this.state;

  //   // Stores a given value, 5 by default.
  //   await contract.set(5, { from: accounts[0] });

  //   // Get the value from the contract to prove it worked.
  //   const response = await contract.get();

  //   // Update state with the result.
  //   this.setState({ storageValue: response.toNumber() });
  // };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Aplikacja do certyfikacji!</h1>
        <p>wersja prototypowa</p>
        <p>
          Dostępna funkcjonalność obejmuje:
            1. wystawienie certyfikatu - certyfikat jest zapisany w blockchain.
        </p>
      </div>
    );
  }
}

export default App;
