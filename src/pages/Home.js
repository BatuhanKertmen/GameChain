import React, { Component, useState, useEffect }  from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import GameBlock from '../components/GameBlock'
import BigContainer from '../components/design-components/BigContainer'
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import popup from '../components/Popup';
import Popup from '../components/Popup';

const Home = (props) => {
    const lorem = "Dolore aliqua dolore cillum anim enim excepteur minim eiusmod eiusmod tempor aliquip. Incididunt non Lorem sunt ea ad fugiat quis in id. Deserunt ipsum nulla consequat nulla laboris. Veniam do in enim quis eiusmod nisi esse ex est eiusmod qui. Fugiat exercitation duis incididunt incididunt adipisicing sit quis dolore exercitation officia nostrud Lorem. Lorem labore anim elit est qui Lorem laboris duis id nulla veniam quis culpa consequat"
    const [filter, setFilter] = useState("")
    const [addGame, setAddGmae] = useState(false)
    const [title, setTitle] = useState("")
    const [company, setCompany] = useState("")
    const [image, setImage] = useState("")
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [error, setError] = useState(false)
    const [succes, setSucces] = useState(false)
  
    
    const add_game_btn_style = {
      transform: addGame ? "rotate(45deg)" : "rotate(0deg)"
    }

    const filterGames = (elm) => {   
      console.log("burada", filter == "");     
      if(elm.name && elm.name.includes(filter) )
       {
        return true
       }

       if(elm.producer && elm.producer.includes(filter))
       {
        return true
       }
       if(filter == "")
       {
        return true
       }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      const game = {
        title: e.target.title.value,
        desc: e.target.desc.value,
        price: e.target.price.value,
        image: e.target.image.value,
        company: e.target.company.value
      }

      let isFull = true

      for (const key in game){
        if (game[key] == ""){
          isFull = false
          setError(true)
        }
      }

      if(isFull)
      {
        setAddGmae(false)
        props.AddGame(game.title, game.company, game.desc, game.image, game.price)
        setSucces(true)
      }
    }

    return (
    <>
      {error && <Popup isOpen={setError} fail={true}></Popup>}
      {succes && <Popup isOpen={setSucces} fail={false}></Popup>}
      {addGame && <div style={{height:"100%", position:"realtive"}}>
        <div className='black_out'></div>
        <div className='modal_add_game'>
          <form className='add_game_form' onSubmit={handleSubmit}>
            <h1 className='add_game_header'>Add Your Game</h1>
            <div className='add_game_row'>
              <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Title:</label>
              <input name="title" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}}
                onChange={(e) => setTitle(e.target.value)}
              />
                
              <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Company:</label>
              <input name="company" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className='add_game_row'>
              <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Image:</label>
              <input name="image" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}}
                onChange={(e) => setImage(e.target.value)}
              />
                
              <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Price:</label>
              <input name="price" type="number" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <label>Description:</label>
            <textarea name="desc" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
      }
      <form 
        onSubmit={(event) => {
        event.preventDefault()
        let _producerAddress = '0x54f8B3461c2D599f141bF9980f659b6d04f459d6'
        let _name = "Age of Empires IV "
        let _producer = "Xbox Game Studios"
        let _description = "Mükemmel bir strateji oyunu"
        let _imageLink = "https://cdn.akamai.steamstatic.com/steam/apps/1466860/header.jpg?t=1649360851"
        let _price = 300
        props.AddGame(_name,_producer,_description,_imageLink,_price)
        }}
        className='mb-3'>
        <div style={{borderSpacing:'0 1em'}}>
          <label className='float-left' style={{marginLeft:'15px'}}><b>Stake Tokens</b></label>
          <button type='submit' className='btn btn-primary btn-lg btn-block'>buyGames</button>
        </div>
        </form>
      <div className='add_game_btn' style={add_game_btn_style} onClick={() => setAddGmae(!addGame)}>
        <div className='plus_sign_left' />
        <div className='plus_sign_right'/>
      </div>
      <div style={{marginTop: "50px"}} ></div>
      
      <BigContainer>
        <div className='select_container'>
          <div  className="select">
            <TextField
              id="outlined-with-placeholder"
              label="Search"
              placeholder="Search"  
              margin="normal"
              variant="outlined"
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </div>
        
        
        {props.games && props.games.filter(filterGames).map((elm, idx) => {
          const [address, name, producer, description, img, price] = elm
          return <Link key={idx} to={`games/${name.replace(/\s/g, '')}`} ><GameBlock img={img} title={name} desc={description} price={price} producer={producer} /></Link>
        }) }
        
        <Link to={`games/"GrandTheftAuto3"`} ><GameBlock img="https://cdn.wallpapersafari.com/73/50/JbtAa5.jpg" title="Grand Theft Auto 3" desc={lorem} price={99.99} producer="Rockstar"/></Link>
      </BigContainer>
    </>
  )
}

export default Home
