import React from 'react'
import Button from '../../components/Button/Button.component.jsx';
import MessageWindow from '../../components/MessageWindow/MessageWindow.component.jsx';
import './HomePage.styles.css'

const HomePage = () => {
    return (
        <div id="homePage">
         <MessageWindow/>
         <MessageWindow/>
         <Button/>     
        </div>
    )
}

export default HomePage;