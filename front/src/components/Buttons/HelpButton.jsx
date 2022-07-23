import React, { useState } from 'react';
import classes from './HelpButton.module.css';
import { Button } from '@mui/material';
import HelpModal from '../../layout/Header/HelpModal';
import logo_img from '../../static/images/help.png'

const HelpButton = () => {

    const [helpModalOpen, setHelpModalOpen] = useState(false);
    const helpModalOnClick = () => {
        setHelpModalOpen(true);
    };
    const helpModalOnClose = () => {
        setHelpModalOpen(false);
    };

    return (
        <>
        <div className={classes.button}>
            <Button className={classes.helpModal__button} variant='outline-light' onClick={helpModalOnClick}>
                <img src={logo_img} alt="logo" />
                    <h2>도움말</h2>
            </Button>
        </div>
            <HelpModal open={helpModalOpen} onClose={helpModalOnClose}/>
        </>
    )
}

export default HelpButton