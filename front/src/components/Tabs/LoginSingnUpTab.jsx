import React from 'react'
import classes from './LoginSignUpTab.module.css'
import { Tab, Tabs, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import LoginForm from '../LoginSignUp/LoginForm';
import SignUpForm from '../LoginSignUp/SignUpForm';

// --- Tab관련 부분 -------------------------------------------------------

const TabPanel = (props) => {

    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
};

TabPanel.propTypes = {

    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,

};

const a11yProps = (index) => {

    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
};

// ------------------------------------------------------------------------

const LoginSingnUpTab = (props) => {

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
    <>
        <Tabs value={value} onChange={handleChange} className={classes.login__modal__tabs}>  
            <Tab label="로그인" {...a11yProps(0)} className={classes.login__modal__tab} />
            <Tab label="회원가입" {...a11yProps(1)} className={classes.login__modal__tab} />
        </Tabs>
        <TabPanel value={value} index={0}>
            <LoginForm onClose={props.onClose}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
            <SignUpForm onClose={props.onClose}/>
        </TabPanel>
    </>
  )
}

export default LoginSingnUpTab