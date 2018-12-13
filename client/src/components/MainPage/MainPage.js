import React, { Component } from 'react';
import CertificateCreator from "../../contracts/CertificateCreator.json";
import Certificate from "../../contracts/Certificate.json";

import CertificatesList from '../Certificates/CertificatesList';
import CertificateDetails from '../Certificate/Certificate';
import NewCert from "../NewCert/NewCert";

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';


class MainPage extends Component {
  state = { 
    isVisibleNewCert: false,
    isVisibleShowCert: false,
    web3: this.props.web3, 
    accounts: null, 
    contract: null, 
    certificates: [], 
    certDetails: '',
  };

  componentDidMount = async () => {
    const {web3} = this.props;
    try {
      const accounts = await web3.eth.getAccounts();
      const instanceCertCreator = await new web3.eth.Contract(
        CertificateCreator.abi, 
        this.props.address);
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
        `Failed to load web3, accounts, or contract. Verify if you are running blockchain, if address is correct. Check console for details.`
      );
      console.log(error);
    }
  }

  createCertyfikateHandler = async (quantity, opis, liczba) => {
    const {contract, accounts, certificates} = this.state
    console.log(this.state)
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
    // console.log(certAdr)
    const instanceCert = await new this.state.web3.eth.Contract( Certificate.abi, certAdr);
    const certDetails = await instanceCert.methods.getCerfificateDetails().call({from: this.state.accounts[0]})
    // console.log(certDetails)
    this.setState({certDetails: certDetails, isVisibleShowCert: true});
  }
  handleNewCert = () =>{
    this.setState({isVisibleNewCert: !this.state.isVisibleNewCert});
  }
  handleShowCert = () =>{
    this.setState({isVisibleShowCert: !this.state.isVisibleShowCert});
  }

  render() {
    const {certificates, certDetails, isVisibleNewCert, isVisibleShowCert} = this.state;

    return (
      <div className="App">
        {!isVisibleShowCert && 
            <Fab color="primary" aria-label="Add" >
              <AddIcon onClick={this.handleNewCert} />
            </Fab>
          // <button onClick={this.handleNewCert}> Chcesz wystawić Nowy Certyfikat? </button>
        }
        {isVisibleNewCert && 
          <NewCert 
            handleNewCert={this.handleNewCert} 
            createCertyfikateHandler={this.createCertyfikateHandler}
          />
        }
        {!isVisibleNewCert && !isVisibleShowCert &&
          <CertificatesList 
            certificates={certificates}
            showCert={this.showCert}
          />
        }
        {isVisibleShowCert && 
          <CertificateDetails handleShowCert={this.handleShowCert} certDetails={certDetails} />}
      </div>
      );
  }
}
export default MainPage
