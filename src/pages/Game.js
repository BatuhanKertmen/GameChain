import React, {useEffect, useState} from 'react'
import Popup from '../components/Popup'
import { Link } from 'react-router-dom'

const Game = (props) => {
    const [companyAddress, setCompanyAddress] = useState(props.companyAddress)
    const [buySuccess, setBuySuccess] = useState(false)
    const [buyFail, setBuyFail] = useState(false)

    const buyGame = () => {
        const res = props.buy(props.title, companyAddress, props.price)
        if(res){
            setBuySuccess(true)
        } else {
            setBuyFail(true)
        }
    }

    const buyGameSuccuesStyle = {
        title: "Succesful",
        text: "Transfer is made successfully. Have fun with your purchase",
        class: "popup-succes"
    }
  
    const buyGameFailStyle = {
        title: "Failed",
        text: `You do not have enough Game Tokens to purchase this game.`,
        class: "popup-fail"
    }

    return (
        <>
            {buySuccess && <Popup isOpen={setBuySuccess} styles={buyGameSuccuesStyle}></Popup>}
            {buyFail && <Popup isOpen={setBuyFail} styles={buyGameFailStyle} ></Popup>  } 
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
                    <input type='submit' className='game_detailed_btn' value={`BUY ${props.price}₺` } onClick={buyGame}/>
                </div>
            </main>
        </>
        
    )
}

export default Game