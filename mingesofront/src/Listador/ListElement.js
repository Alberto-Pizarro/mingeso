import React, { Component } from 'react'
import Axios from 'axios'
import {Button} from 'react-bootstrap'
//import './ListElement.css'

class ListElement extends Component {



fetchElement(id){
    //console.log("fetcheando");
    //console.log(id);
    Axios.get('http://localhost:8090/exercises/'+id)
    .then(response => {
      console.log("respuesta al get")
      //this.setState({list:response.data});
      console.log(response);
      //localStorage.setItem('id_enunciado', id);
      //localStorage.setItem('nombre_enunciado', response.data.title);
      var myWindow = window.open("", "", "width=800,height=600");
      myWindow.document.write("<div>Nombre del Problema: "+response.data.title+"\n</div>");
      myWindow.document.write("<p>"+response.data.text+"\n</p>");
      myWindow.document.write("<p>------------"+"\n</p>");
      myWindow.document.write("<div>Solución esperada: "+"\n</div>");
      myWindow.document.write(response.data.answer);
      

    })
    .catch(function (error) {
      console.log("ErroR!!!!")
      console.log(error)
    })
  }
  setEnunciado(id){
    //localStorage.setItem('id_enunciado', id);
    //console.log(this.props.id);
    Axios.get('http://localhost:8090/exercises/'+id)
    .then(response => {
      localStorage.setItem("expected_answer",response.data.answer);
      

    })
  }

  render() {
    return (
<a id={this.props.id} 
//href="#" 

data-toggle="tooltip" 
title="" 
className="list-group-item">{this.props.title} 
<Button className="button btn-right btn-info btn-xs" onClick={()=>this.fetchElement(this.props.id)} > Ver </Button>
<Button className="button btn-right btn-danger btn-xs btn-right-margin btn-right" onClick={()=>this.setEnunciado(this.props.id)} id="codigo-button" > Escoger para resolver </Button>

</a>

    )
  }

}
//<button className="button" onClick={this.onClickNewWindow(this.props.data,this.props.answer)}> Ver </button>

export default ListElement
