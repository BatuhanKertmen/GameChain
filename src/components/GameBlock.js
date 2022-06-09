import React from 'react'

const GameBlock = ({children, img, desc, title, price, producer}) => {
    const style_game_container = {
        
        backgroundColor: "#fff",
        borderRadius: "4px",
        height: "20rem",
        overflow: "hidden",

        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(6, 1fr)",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    }
  
    const style_game_img = {
        height: "20rem",
        maxWidth: "100%",
        overflow: "hidden",
        objectFit: "cover"
    }
  
    const style_game_img_container = {
        maxHeight: "20rem",
        overflow: "hidden",
        objectFit: "cover",
        
        gridRow: "1 / -1",
        gridColumn: "1 / 3"
    }

    const style_game_title = {
        fontWeight: "400",
        fontSize: "2.5rem",
        color: "#030506",
        lineHeight: "1",
        padding: "10px",

        gridColumn: "3 / 7",
        gridRow: "1 / 2",
        marginLeft: "auto",
        marginRight: "auto"
    }

    const style_game_desc = {
        fontSize: "12px",
        padding: "30px",
        paddingTop: "10px",

        gridColumn: "3 / 7",
        gridRow: "2 / -6"
    }

    const style_game_price = {
        marginRight: "10%",
        marginBottom: "5%",
        borderRadius: "5px",

        gridRow: "6 / 7",
        gridColumn: "3 / -1",
        marginLeft: "auto",

        padding: "5px",
    }
    
    const style_game_producer = {
        gridRow: "6 / 7",
        gridColumn: "3 / -1",
        marginLeft: "7%"
    }


    return (
        <div style={style_game_container}>
            <div style={style_game_img_container}>
                <img style={style_game_img} src={img} />
            </div>
            <h1 style={style_game_title}>{title}</h1>
            <p style={style_game_desc} >{desc} <strong style={{color:"darkblue", fontWeight:"600"}}> &nbsp;&nbsp; More...</strong></p>
            <h3 style={style_game_producer}> {producer} </h3>
            <h3 className='btn' style={style_game_price} >{price}$</h3>
        </div>
    )
}

export default GameBlock