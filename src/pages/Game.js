import React, {useState} from 'react'

const Game = (props) => {
   
    return (
        <>
            <br/>
            <br/>
            <br/>
            <div style={{display:"flex"}}>
                <h2> &nbsp; Games &nbsp; </h2>
                <h2> &#8250; </h2>
                <h2> &nbsp; {props.company} &nbsp; </h2>
                <h2> &#8250; </h2>
                <h2> &nbsp; {props.title} &nbsp;</h2>
            </div>
            <main className='game_detailed_container'>
                <div className='game_detailed_img_container'>
                    <img className='game_detailed_img' src={props.img} alt={`${props.title} logo`} />
                </div>
                <div className='game_detailed_info'>
                    <h1 className='game_detailed_header'>{props.title}</h1>
                    <div className='game_detailed_desc'> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.desc} </div>
                    <input type='submit' className='game_detailed_btn' value={`BUY ${props.price}₺` }/>
                </div>
            </main>
        </>
        
    )
}

export default Game