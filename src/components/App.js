import React, { Component, useState } from 'react'
import Web3 from 'web3'
import "../Style/Navbar.css"
import gt from '../truffle_abis/GameToken.json'
import vg from '../truffle_abis/VideoGames.json'
import Navbar from './Navbar'

import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home'
import Account from '../pages/Account'
import Game from '../pages/Game'
import { isVariableDeclarationList } from 'typescript'

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

            let gameTokenOwner = await gameToken.methods.getowner().call()
            this.setState({tokenowner: gameTokenOwner.toString()})
            
            let games = await videoGames.methods.getInfo().call()
            this.setState({games:games})

        } else {
            window.alert("Error! Token network is down!")
        }
    
    }


    buyTokens = (amount) => {
        this.setState({loading: true })
        if(this.state.gameToken.methods.totalSupply_() > amount)
        {
            this.state.gameToken.methods.transfer(this.state.account, amount).send({from: this.state.tokenowner}).on('transactionHash', (hash) => {
                this.setState({loading:false})
            }) 
        }
        else
        {
            this.setState({loading:false})
        }
    }
       
    AddGame = (_name,_producer,_description,_imageLink,_price) => {
        this.setState({loading: true })
        this.state.videoGames.methods.addGames(this.state.account,_name,_producer,_description,_imageLink,_price).send({from: this.state.tokenowner}).on('transactionHash', (hash) => {
            this.setState({loading:false})
        })            
    }

    BuyGame = (_name,_producerAddress, _price) => {
        this.setState({loading: true })
        _price = window.web3.utils.toWei(_price.toString(), 'Ether')
        if(_price < this.state.gameTokenBalance)
        {
            this.state.gameToken.methods.transfer(_producerAddress,_price).send({from: this.state.account}).on('transactionHash', (hash) => {
            })
            return true;
        }
        else
        {
            this.setState({loading:false})
            return false;
        }      
    }

    DeleteGame = (_name) => {
        this.setState({loading: true })
        
        var promise = new Promise( (resolve, reject) => {

            let value = this.state.videoGames.methods.getGamesInfoBasedProducer(_name).call()
          
            if (value !== 'undefined') {
             resolve(value);
            }
            else {
                console.log(reject)
            }
           });
           promise.then( result => {
            
            if(result[0] == this.state.account)
            {
                this.state.videoGames.methods.deleteGame(result[0],_name).send({from: this.state.account}).on('transactionHash', (hash) => {
                    this.setState({loading:false})
                })  
            }
            else
            {
                console.log("This is not your game!")
            }
                      
           }, function(error) {
            console.log("Error Promise")
           });
       
       
        this.setState({loading: false })
    }

    

    async UNSAFE_componentWillMount()
    {
        await this.loadWeb3();
        await this.loadBlockChainData();
    }

    constructor(props)
    {
        super(props)
        this.AddGame = this.AddGame.bind(this);
        this.BuyGame = this.BuyGame.bind(this);

        this.state = {
            account:  '0x0',
            gameToken: {},
            videoGames:{},
            gameTokenBalance: '0',
            loading: true,
            tokenowner: '1x1',
        }
    }
    

  render() {

    const lorem = "Dolore aliqua dolore cillum anim enim excepteur minim eiusmod eiusmod tempor aliquip. Incididunt non Lorem sunt ea ad fugiat quis in id. Deserunt ipsum nulla consequat nulla laboris. Veniam do in enim quis eiusmod nisi esse ex est eiusmod qui. Fugiat exercitation duis incididunt incididunt adipisicing sit quis dolore exercitation officia nostrud Lorem. Lorem labore anim elit est qui Lorem laboris duis id nulla veniam quis culpa consequat"
    const dummy = [] 
    dummy.push({
        img:"https://cdn.wallpapersafari.com/73/50/JbtAa5.jpg",
        name:"Grand Theft Auto 5",
        desc:lorem,
        price:99.99,
        producer:"Rockstar"
    })

    return (
        <>
            <Navbar account={this.state.account} />
            <Routes>
                <Route exact path="/" element={<Home games={this.state.games} dummy={dummy} AddGame={this.AddGame} BuyGame = {this.BuyGame} DeleteGame = {this.DeleteGame} tokenowner={this.state.tokenowner} />} />
                {this.state.games && this.state.games.map((elm, idx) => {
                    return <Route key={idx} exact path={`games/${elm.name.replace(/\s/g, '')}`} 
                    element={
                    <Game 
                        title={elm.name}
                        company={elm.producer}
                        img={elm.imageLink}
                        price={elm.price}
                        desc={elm.description}
                        companyAddress={elm.producerAddress}
                        buy={this.BuyGame}
                    />
                    }/>
                })}
            </Routes>
        </>
    )
  }
}
