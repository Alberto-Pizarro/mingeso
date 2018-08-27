import React, { Component } from 'react'
//import TablaElement from './TablaElement'

class Tabla extends Component {

  buildList(){
    let numeral =0;
    
    return this.props.list.map((listElement) => {
        numeral+=1;
      return(
        <tr key={listElement.student_id} >
            <td style={{fontWeight: "bold"}}>{numeral}</td>
            <td style={{fontStyle: "italic"}} > {listElement.name} {listElement.lastName} </td>  
            <td> {listElement.total_spend_time} </td>  
            <td> {listElement.total_wordings}</td>  
        </tr>
      )
    })
  }

  render() {
    return (
      <thead id="tabla" className="List-container">
      <tr style={{color:"#333333",backgroundColor:"#a5dec2"}} >
                <th>#</th>
                <th> Nombre </th>  
                <th> Tiempo </th>  
                <th> Ejercicios resueltos </th>  
              </tr>
        {this.buildList()}
      </thead>

    )
  }

}

export default Tabla