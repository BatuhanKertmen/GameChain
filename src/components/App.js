import React, { Component, useState } from 'react'
import Navbar from './Navbar'
import Web3 from 'web3'
import "../Style/Navbar.css"
import gt from '../truffle_abis/GameToken.json'
import vg from '../truffle_abis/VideoGames.json'
import Row from './ProductRow'
import BigContainer from './design-components/BigContainer'
import GameBlock from './GameBlock'

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

        const gtId = await web3.eth.net.getId()
        const gtData = gt.networks[gtId]
        if(gtData)
        {
            const gameToken =  await new web3.eth.Contract(gt.abi, gtData.address)
            this.setState({gameToken:gameToken})

            let gtBalance = await gameToken.methods.balanceOf(this.state.account).call()
            this.setState({gameTokenBalance: gtBalance.toString() })
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

    const lorem = "Dolore aliqua dolore cillum anim enim excepteur minim eiusmod eiusmod tempor aliquip. Incididunt non Lorem sunt ea ad fugiat quis in id. Deserunt ipsum nulla consequat nulla laboris. Veniam do in enim quis eiusmod nisi esse ex est eiusmod qui. Fugiat exercitation duis incididunt incididunt adipisicing sit quis dolore exercitation officia nostrud Lorem. Lorem labore anim elit est qui Lorem laboris duis id nulla veniam quis culpa consequat"


    return (
        <>
            <BigContainer className="BURADA">
                <Navbar account={this.state.account}/>
                <GameBlock img="https://cdn.wallpapersafari.com/73/50/JbtAa5.jpg" title="Grand Theft Auto 5" desc={lorem} price={99.99}/>
                <GameBlock/>
                <GameBlock/>
                <GameBlock/>
            </BigContainer>
        </>
    )
  }
}
