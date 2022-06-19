import React, { Component } from 'react'
import bank from '../bank.png'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
  render() {
    return (
        <nav className='navbar navbar-dark fixed-top shadow p-0 bg-black height-50' style={{backgroundColor:"black", height:'50px'}}> 
            <Link to="/" className='navbar-brand col-sm-3 col-md-2 mr-0' style={{color:"white"}} >
                <img src={bank} width="50" height="30" className="d-inline-block align-top" alt="logo" />
                &nbsp;&nbsp; DAPP Game-chain (Decentralized Video Game Shopping) 
            </Link>
            <ul className='navbar-nav px-3'>
                <li className='text-nowrap d-none nav-item d-sm-none d-sm-block'>
                    <small style={{color:"white"}}>ACCOUNT NUNMBER: {this.props.account}</small>
                </li>
            </ul>
        </nav>
    )
  }
}

