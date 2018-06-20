import React, { Component } from 'react'
import ListElement from './ListElement'

class Listador extends Component {

  buildList(){
    return this.props.list.map((listElement) => {
      return(
        <ListElement 
        id={listElement.id_exercise} 
        title={listElement.title} 
        texto={listElement.text} 
        resultado={listElement.answer} />
      )
    })
  }

  render() {
    return (
      <div id="listador" className="List-container">
        {this.buildList()}
      </div>

    )
  }

}

export default Listador
