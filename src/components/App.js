import React, { Component, useState } from 'react'
import Web3 from 'web3'
import "../Style/Navbar.css"
import gt from '../truffle_abis/GameToken.json'
import vg from '../truffle_abis/VideoGames.json'

import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
export default class App extends Component {

    

    async loadWeb3(){
        if(window.ethereum){
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
        } else if ( window.web3)
        {
            window.web3 = new Web3(window.web3.currentProvider)
        } else
        {
            window.alert("NO eth browser detected!")
        }
    }

    async loadBlockChainData() {
        const web3 = window.web3;
        const account = await web3.eth.getAccounts()
        this.setState({account:account[0]})

        const Id = await web3.eth.net.getId()
        const gtData = gt.networks[Id]
        const vgData = vg.networks[Id]
        
        if(gtData && vgData)
        {
            const gameToken =  await new web3.eth.Contract(gt.abi, gtData.address)
            this.setState({gameToken:gameToken})

            const videoGames = await new web3.eth.Contract(vg.abi, vgData.address)
            this.setState({videoGames:videoGames})

            let gtBalance = await gameToken.methods.balanceOf(this.state.account).call()
            this.setState({gameTokenBalance: gtBalance.toString()})

            let games = await videoGames.methods.getInfo().call()
            this.setState({games:games})

        } else {
            window.alert("Error! Token network is down!")
        }
    
    }

    async UNSAFE_componentWillMount()
    {
        await this.loadWeb3();
        await this.loadBlockChainData();
    }

    constructor(props)
    {
        super(props)
        this.state = {
            account:  '0x0',
            gameToken: {},
            videoGames:{},
            gameTokenBalance: '0',
            loading: true
        }
    }

  render() {

    


    return (
        <>
            <Routes>
                <Route path="/" element={<Home account ={this.state.account} games={this.state.games}/>} />
            </Routes>
        </>
    )
  }
}
