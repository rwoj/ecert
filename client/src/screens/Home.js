import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { contract } from 'truffle-contract';
import { getWeb3, setLocalWeb3 } from "../utils/getWeb3";
import { setWeb3 } from '../store/actions/bc';


import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuAppBar from '../components/MenuAppBar/MenuAppBar';

import CertificateCreatorJSON from "../contracts/CertificateCreator.json";
import CertificateJSON from "../contracts/Certificate.json";

class Home extends Component {
  state={
    web3ind: {
      mode: false,
      label: 'checking...'
    }
  }
  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      this.props.setWeb3({web3});
      this.setState({web3ind: {mode: true, label: 'używam MetaMask'}})
    } catch(error) {
      this.setState({web3ind: {mode: true, label: 'brak MetaMask'}})
    }
  }
  toggleProvider = async event => {
    if (!event.target.checked){
      try {
        const web3 = await setLocalWeb3();
        const networkId = await web3.eth.net.getId();
        const certificateCreatorInstance = await new web3.eth.Contract(
          CertificateCreatorJSON.abi, 
          CertificateCreatorJSON.networks[networkId].address);
        const accounts = await web3.eth.getAccounts();
        this.props.setWeb3({web3, accounts, certificateCreatorInstance});

        const trans = await certificateCreatorInstance.methods
                      .createCertificate('56', 'jakiś opis', '784445')
                      .send({from: accounts[0], gas: '1000000'})
        console.log("wysłana transakcja dodania certyfikatu", trans)
        certificateCreatorInstance.methods.getCertAddress(1).call({from: accounts[0]}, 
          (err, res)=> {
            if(err) {console.log(err)} 
            else {console.log("certyfikat dodany", res)}
          })

        this.setState({web3ind: {mode: false, label: 'używam lokalny blockchain'}})
      } catch (error) {
        this.setState({web3ind: {mode: false, label: 'brak lokalnego blockchain'}})
      }
    }
    // todo: change to metamask??..
  }
  // onChangeHandler = (e) => this.setState({[e.target.name]: e.target.value})
  // handleMoveOn = () =>{
  //   const {address} = this.state
  //   if (address !== '') {
  //     this.setState({isMainPageVisible: true});
  //   } else {
  //       alert ("nie należy klikać bez podania adresu - no no");
  //   }
  // }

  render() {
    const {web3ind} = this.state;
    const {bc} = this.props;
    // console.log("rx web3 ", this.props.bc.web3);
    const accounts = bc.accounts ? bc.accounts.map((x,i) => <li key={i}>{x}</li>): [];
    // console.log(accounts);

    return (
      <div>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={web3ind.mode} onChange={this.toggleProvider} aria-label="NetworkSwitch" />
            }
            label={web3ind.label}
          />
        </FormGroup>
        <MenuAppBar />
        <ul>
          {accounts}
        </ul>
        {
          bc.certificateCreatorInstance && 
          <footer>Adres kontraktu do tworzenia certyfikatów: {bc.certificateCreatorInstance.options.address}</footer>
        }
      </div>
    )
  }
}
const mapStateToProps = state =>({
  bc: state.bc
})
const mapDispatchToProps = dispatch => ({
  setWeb3: data => dispatch(setWeb3(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Home)
