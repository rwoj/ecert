import React, {Component} from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class NewCert extends Component {
  state = { 
    stackId: null, 
    ileTon: 0,
    opis: '',
    liczba: 0
  }

  onChangeHandler = (e) => this.setState({[e.target.name]: e.target.value})
  
  handleSubmit = () =>{
    const {ileTon, opis, liczba} = this.state
    if (ileTon > 0 && opis !== '') {
      this.props.createCertyfikateHandler(ileTon, opis, liczba)
      this.props.handleNewCert();
      this.setState({ileTon: 0, opis: '', liczba: 0})
    } else {
      if (ileTon<=0){
        alert ("nie wpisałeś ile ton - tak nie można")
      } else {
        alert ("nie będziemy zapisywać certyfikatów bez opisu - no no")
      }
    }
  }
  handleCancel = ()=>{
    this.props.handleNewCert();
  }
 
  render() {
    const {ileTon, opis, liczba} = this.state

    return (
      <div>
          <h4>Wprowadz dane do wystawienia certyfikatu</h4>
          <TextField
            id="ileTon"
            name="ileTon" 
            value={ileTon}
            label="ile ton?"
            onChange={this.onChangeHandler}
            margin="normal"
          />
          {/* Ile ton : <input type="text" name="ileTon" value={ileTon} 
            onChange={this.onChangeHandler}/> */}
          <br></br>
          <TextField
            id="opis"
            name="opis" 
            value={opis}
            label="jakiś opis"
            onChange={this.onChangeHandler}
            margin="normal"
          />
          {/* Jakiś opis :  <input type="text" name="opis" value={opis} 
                        onChange={this.onChangeHandler}/> */}
          <br></br>
          <TextField
            id="liczba"
            name="liczba" 
            value={liczba} 
            label="jakaś liczba"
            onChange={this.onChangeHandler}
            margin="normal"
          />
          {/* Jakaś liczba : <input type="text" name="liczba" value={liczba} 
                            onChange={this.onChangeHandler}/><br></br> */}
          <div>
            <Button variant="contained" color="secondary" onClick = {this.handleCancel}>Anuluj</Button>
            <Button variant="contained" color="primary" onClick = {this.handleSubmit}>Wystaw Certyfikat</Button>
          </div>
          {/* <button onClick = {this.handleCancel}>Powrót/Anuluj</button>
          <button onClick = {this.handleSubmit}>Wystaw Certyfikat</button> */}
      </div>
    )
  }
}
export default NewCert