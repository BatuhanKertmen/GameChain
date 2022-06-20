import React, {useState} from 'react'
import {ReactComponent as Up} from '../svg/arrow-up-left-svgrepo-com.svg'
import {ReactComponent as Down} from '../svg/arrow-down-right-svgrepo-com.svg'
import {ReactComponent as Coin} from '../svg/coin-svgrepo-com.svg'
import Popup from '../components/Popup'

const Token = (props) => {
    const [buyAmount, setBuyAmount] = useState(0)
    const [sellAmount, setSellAmount] = useState(0)
    const [buyPopup, setBuyPopup] = useState(false)
    const [sellPopup, setSellPopup] = useState(false)

    const buy = <div className='buy_svg'>
            <Coin style={{height:"100px", width:"auto"}} />
            <Up fill="lightgreen" style={{transform:"translate(-25px, 25px)", height:"55px", width:"auto"}}/>
            <Up fill="lightgreen" style={{transform:"translate(-55px, 30px)", height:"55px", width:"auto"}}/>
        </div>

    const sell = <div className='sell_svg'>
        <Coin style={{height:"100px", width:"auto"}} />
        <Down fill="darkred" style={{transform:"translate(-35px, 25px)", height:"55px", width:"55px"}}/>
        <Down fill="darkred" style={{transform:"translate(-65px, 30px)", height:"55px", width:"auto"}}/>
    </div>

    const buy_popup_style = {
        title: "Success!",
        text: `You successfully bought ${buyAmount} amount of Tokens.`,
        class: "popup-succes"
    }

    const sell_popup_style = {
        title: "Success!",
        text: `You successfully sold ${sellAmount} amount of Tokens.`,
        class: "popup-succes"
    }

    const handleBuy = (e) => {
        e.preventDefault()
        const amt = e.target.amount.value;
        if(amt && amt > 0)
        {
            setBuyPopup(true)
            props.buyToken(buyAmount)
        }
    }

    const handleSell = (e) => {
        e.preventDefault()
        const amt = e.target.amount.value;
        if(amt && amt > 0)
        {
            setSellPopup(true)
            props.sellToken(sellAmount)
        }
    }


  return (
    <>
        {buyPopup && <Popup isOpen={setBuyPopup} styles={buy_popup_style} />}
        {sellPopup && <Popup isOpen={setSellPopup} styles={sell_popup_style} />}
        <br/>
        <br/>
        <br/>
        <main className='token_page'>
            <div className='buy_token med_container'>
               {buy}
               <h2 className='token_header'> Buy Tokens</h2>
               <form onSubmit={handleBuy}>
                <br/>
                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Card No:</label>
                        <input name="card" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />

                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Billing Address:</label>
                        <input name="addr" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}} value="Definetly valid info"  readOnly className='input' />
                    </div>

                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Name:</label>
                        <input name="name" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />

                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Surname:</label>
                        <input name="surname" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}} value="Definetly valid info"  readOnly className='input' />
                    </div>

                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Country:</label>
                        <input name="country" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />
                        
                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Amount:</label>
                         <input name="amount" style={{gridRow:"2 / 3", gridColumn:"2 / 3", color:"black"}} type="number" className='input' 
                            onChange={(e) => setBuyAmount(e.target.value)}
                        />
                    </div>
                    <input type="submit" value={`BUY TOKEN 🟡`} className='game_detailed_btn' style={{marginLeft:"auto", display:"table", marginRight:"45px"}} />
               </form>
            </div>
            <div className='sell_token med_container'>
                {sell}
                <h2 className='token_header'> Sell Tokens</h2>
               <form onSubmit={handleSell}>
                <br/>
                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Card No:</label>
                        <input name="card" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />

                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Billing Address:</label>
                        <input name="addr" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}} value="Definetly valid info"  readOnly className='input' />
                    </div>

                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Name:</label>
                        <input name="name" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />

                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Surname:</label>
                        <input name="surname" style={{gridRow:"2 / 3", gridColumn:"2 / 3"}} value="Definetly valid info"  readOnly className='input' />
                    </div>

                    <div className='add_game_row'>
                        <label style={{gridRow:"1 / 2", gridColumn:"1 / 2", alignSelf:"end"}}>Country:</label>
                        <input name="country" style={{gridRow:"2 / 3", gridColumn:"1 / 2"}} value="Definetly valid info"  readOnly className='input' />
                        
                        <label style={{gridRow:"1 / 2", gridColumn:"2 / 3", alignSelf:"end"}}>Amount:</label>
                         <input name="amount" style={{gridRow:"2 / 3", gridColumn:"2 / 3", color:"black"}} type="number" className='input' 
                            onChange={(e) => setSellAmount(e.target.value)}
                        />
                    </div>
                    <input type="submit" value={`SELL TOKEN 🟡`} onChange={handleSell}className='game_detailed_btn' style={{marginLeft:"auto", display:"table", marginRight:"45px", backgroundColor:"red"}} />
               </form>
            </div>
        </main>
    </>
  )
}

export default Token