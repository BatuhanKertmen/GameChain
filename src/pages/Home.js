import React, { Component }  from 'react';
import Navbar from '../components/Navbar'
import GameBlock from '../components/GameBlock'
import BigContainer from '../components/design-components/BigContainer'

const Home = (props) => {
    const lorem = "Dolore aliqua dolore cillum anim enim excepteur minim eiusmod eiusmod tempor aliquip. Incididunt non Lorem sunt ea ad fugiat quis in id. Deserunt ipsum nulla consequat nulla laboris. Veniam do in enim quis eiusmod nisi esse ex est eiusmod qui. Fugiat exercitation duis incididunt incididunt adipisicing sit quis dolore exercitation officia nostrud Lorem. Lorem labore anim elit est qui Lorem laboris duis id nulla veniam quis culpa consequat"


    
    return (
    <>
      <BigContainer>  
        <Navbar account={props.account} />

        {props.games && props.games.map((elm, idx) => {
          const [address, title, producer, desc, img, price] = elm
          return <GameBlock img={img} title={title} desc={desc} price={price} producer={producer} key={idx}/>
        })}
        <GameBlock img="https://cdn.wallpapersafari.com/73/50/JbtAa5.jpg" title="Grand Theft Auto 5" desc={lorem} price={99.99} producer="Rockstar"/>
      </BigContainer>
    </>
  )
}

export default Home
