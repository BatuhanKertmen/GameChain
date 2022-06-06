import React, { Component } from 'react'

export default class BigContainer extends Component {
  render() {
    const style = {
        marginTop: "6rem",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#eee",
        width: "90%",
        padding: "1rem",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        borderRadius:"5px",

        display: "grid" ,
        gridTemplateColumns: "1fr 1fr",
        gridGap:"1rem",
        justifyContent: "center"
    }
  
    return (
    <main style={style}>{ this.props.children }</main>
  )
  }
}
