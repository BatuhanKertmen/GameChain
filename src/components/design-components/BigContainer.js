import React, { Component } from 'react'

export default class BigContainer extends Component {
  render() {
    const style = {
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#eee",
        width: "80%"
    }
  
    return (
    <div style={style}>{ this.props.children }</div>
  )
  }
}
