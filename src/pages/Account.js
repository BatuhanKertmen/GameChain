import React from 'react'
import Navbar from '../components/Navbar'
import GameBlock from '../components/GameBlock'
import BigContainer from '../components/design-components/BigContainer'
import GameSellerBlock from '../components/GameSellerBlock'
import SubmitText from '../components/SubmitText'

const Account = (props) => {
    const lorem = "1 GameToken = 1 $"
  return (
    <>
           <div className="row mt-5 ">
             <div className="container">
               <div className = "row justify-content-center  bg-dark text-white  p-5" > Your Wallet Address : {props.account}</div>
                <div className = "row justify-content-center  p-5" > You have  {props.gameTokenBalance} game token  </div>
               <div className="form-outline w-25 row justify-content-start  p-5">
                   <input type="number" id="typeNumber" class="form-control" />
                   <label class="form-label" for="typeNumber">Number input</label>
               </div>
                <form 
                    onSubmit={(event) => {
                        event.preventDefault()
                        let amount
                        amount = 22222
                        amount = window.web3.utils.toWei(amount.toString(), 'Ether')
                        console.log(amount)
                        props.buyTokens(amount)
                    }}
                    className='mb-3'>
                        <div style={{borderSpacing:'0 1em'}}>
                            <label className='float-left' style={{marginLeft:'15px'}}><b>Stake Tokens</b></label>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                <div className = "row justify-content-center p-5" > The .container class provides a responsive fixed width container.</div>    
                </div>
            </div>

       
    </>
  )
}

export default Account


