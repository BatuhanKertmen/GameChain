import React from 'react'

const Popup = (props) => {

    let styles = props.fail ? 
    {
        title: "Failed",
        text: "Unable to add the game. One or more of the fields left empty.",
        class: "popup-fail"
    } :
    {
        title: "Succes",
        text: "Succesfully added your game to the blockchain. It is ready for the market.",
        class: "popup-succes"
    }

    styles = props.styles ? props.styles : styles

  return (
    <>
        <div id="popup1" className="overlay">
            <div className={styles.class}>
                <h2>{styles.title}</h2>
                <a className="close" href="#"
                    onClick={() => props.isOpen(false)}
                    onBlur={() => props.isOpen(false)}
                >&times;</a>
                <div className="content">
                    {styles.text}
                </div>
            </div>
        </div>
    </>
  )
}

export default Popup