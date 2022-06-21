import React from 'react'
import classes from './CustomerLoginSingnUpTab.module.css'
import { Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import CustomerLogin from '../../features/Customer/CustomerLogin';
import CustomerSignUp from '../../features/Customer/CustomerSignUp';
import TabPanel from './Commons/TabPanel';
import KakaoLoginButton from '../../features/KakaoLogin/KakaoLoginButton'

const CustomerLoginSingnUpTab = (props) => {

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
            <CustomerLogin onClose={props.onClose}/>
            <KakaoLoginButton />
        </TabPanel>
        <TabPanel value={value} index={1}>
            <CustomerSignUp onClose={props.onClose}/>
        </TabPanel>
    </>
  )
}

export default CustomerLoginSingnUpTab