import React, {Component} from "react";

class IssueCertificate extends Component {
  state = { 
    stackId: null, 
    ileTon: 0,
    opis: '',
    liczba: 0
  }

  onChangeHandler = (e) => this.setState({[e.target.name]: e.target.value})
  
  // handleKeyDown = e => {
  //   // if the enter key is pressed, set the value with the string
  //   if (e.keyCode === 13) {
  //     // this.setValue(e.target.value);
  //   }
  // }
  
  handleSubmit = () =>{
    const {ileTon, opis, liczba} = this.state
    if (ileTon > 0 && opis !== '') {
      this.props.createCertyfikateHandler(ileTon, opis, liczba)
      this.setState({ileTon: 0, opis: '', liczba: 0})
    } else {
      if (ileTon<=0){
        alert ("nie wpisałeś ile ton - tak nie można")
      } else {
        alert ("nie będziemy zapisywać certyfikatów bez opisu - no no")
      }
    }
  }
 
  render() {
    const {ileTon, opis, liczba} = this.state

    return (
      <div>
          <h5>Wprowadz dane do wystawienia certyfikatu</h5>
          Ile ton : 
          <input type="text" name="ileTon" value={ileTon} 
          onChange={this.onChangeHandler}/><br></br>
          Jakiś opis :  
          <input type="text" name="opis" value={opis} 
          onChange={this.onChangeHandler}/>
          Jakaś liczba : 
          <input type="text" name="liczba" value={liczba} 
          onChange={this.onChangeHandler}/><br></br>
          <button onClick = {this.handleSubmit}>Wystaw Certyfikat</button>
      </div>
    )
  }
}
export default IssueCertificate