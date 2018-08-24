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
      myWindow.document.write("<div style=\"background-color:#f5f5f5;margin:10px;height:80vh\">");
      myWindow.document.write("<div style=\"background-color:powderblue;border-bottom: 3px solid #3DB7B7;\" > Nombre del Problema: "+response.data.title+"\n</div>");
      myWindow.document.write("<p   style=\"margin:10px\">"+response.data.text+"\n</p>");
      myWindow.document.write("<div style=\"border-bottom: 2px solid #4d4d4d;\" ></div>");
      myWindow.document.write("<div style=\"background-color:#F8A500;border-bottom: 3px solid #BC7D00;\" >Solución esperada: \n</div>");
      //myWindow.document.write("</div>");
      myWindow.document.write("<div style=\"margin:10px\">"+response.data.answer+"</div>");
      

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
      localStorage.setItem("selected_name",response.data.title);
    })
  }

  render() {
    return (
<a id={this.props.id} 
//href="#" 

data-toggle="tooltip" 
title="" 
className="list-group-item">{this.props.title} 
<Button style={{color:"#1d1d1d"}} className="button btn-right btn-info btn-xs" onClick={()=>this.fetchElement(this.props.id)} > Ver </Button>
<Button style={{color:"#1d1d1d"}} className="button btn-right btn-warning btn-xs btn-right-margin btn-right" onClick={()=>this.setEnunciado(this.props.id)} id="codigo-button" > Escoger para resolver </Button>

</a>

    )
  }

}
//<button className="button" onClick={this.onClickNewWindow(this.props.data,this.props.answer)}> Ver </button>

export default ListElement
