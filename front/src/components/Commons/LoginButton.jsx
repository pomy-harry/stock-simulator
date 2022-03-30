import React, { useRef, useState } from 'react';
import classes from './LoginButton.module.css'
import Modal from '@mui/material/Modal';
import { Button, Input, Tab, Tabs, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo_img from '../../images/logo1.png'

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



const LOGIN_URL = 'http://localhost:8090/login';
const SIGNUP_URL = 'http://localhost:8090/join';


const LoginButton = (props) => {

    const [userStatus, setUserStatus] = useState(null);

    // POST로 로그인 정보 전송 함수
    const loginHandler = async(userData) => {        
        console.log(userData);
        console.log(JSON.stringify({
        email: userData.email,
        password: userData.password,
        }));
        
        await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password,
        })
        }).then((res) => {
            if(res.ok){
            res.json().then((res2 => {
                console.log(res2.id);
                setUserStatus(res2.id);
                sessionStorage.setItem('USER', res2.id);
            }))
            }
        }
        );
    };

    // 로그인 버튼 클릭시 작동하는 함수
    // 로그인 -> 서버 -> 유효성 검사 -> customer 객체 받아옴 -> user로 상태 변경 -> 로그인 창 닫기 
    const loginEmailInputRef = useRef();
    const loginPasswordInputRef = useRef();

    const loginButtonHandler = (event) => {
        event.preventDefault();

        const enteredLoginEmail = loginEmailInputRef.current.value;
        const enteredLoginPassword = loginPasswordInputRef.current.value;

        loginHandler({
            email: enteredLoginEmail,
            password: enteredLoginPassword,
        });

        props.onClose();
    
    };




    // POST로 회원가입 정보 전송 함수
    const signUpHandler = async(userData) => {
        console.log(userData);
        console.log(JSON.stringify({
            name: userData.name,
            email: userData.email,
            password: userData.password,
        }));

        await fetch(SIGNUP_URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email,
                password: userData.password,
            })
        })
    };

    // 회원가입 버튼 클릭시 작동하는 함수
    const signUpUserNameInputRef = useRef();
    const signUpEmailInputRef = useRef();
    const signUpPasswordInputRef = useRef();

    const signUpButtonHandler = async(event) => {
        event.preventDefault();

        const enteredSignUpUserName = signUpUserNameInputRef.current.value;
        const enteredSignUpEmail = signUpEmailInputRef.current.value;
        const enteredSignUpPassword = signUpPasswordInputRef.current.value;

        await signUpHandler({
            name:enteredSignUpUserName ,
            email: enteredSignUpEmail,
            password: enteredSignUpPassword,
        });

        props.onClose();
    }


    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  return (
      <>
        <div className={classes.header__loginbutton}>
            {(!userStatus) ? (
                <Button className={classes.button} variant="outline-light" onClick={props.onClick}>로그인</Button>
                ) : (
                <>
                    <Button className={classes.button} variant="outline-light">
                    <Link to="/MyPage" className={classes.link}>마이페이지</Link>
                    </Button>
                    <Button className={classes.button} variant="outline-light" onClick={() => {
                    setUserStatus(null);
                    sessionStorage.removeItem('USER');
                    }}>
                    <Link to="/" className={classes.link}>로그아웃</Link>
                    </Button>
                </>
            )}
        </div>

        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.loginModal}>

                <div className={classes.loginModal__header}>
                    <img src={logo_img} alt="logo" />
                    <h2>주린이 구원소</h2>
                </div>
                
                <Tabs value={value} onChange={handleChange} className={classes.loginModal__Tabs}>  
                    <Tab label="로그인" {...a11yProps(0)} className={classes.loginModal__Tab} />
                    <Tab label="회원가입" {...a11yProps(1)} className={classes.loginModal__Tab} />
                </Tabs>
                
                <TabPanel value={value} index={0}>
                    <form className={classes.loginModal__form}>
                        <Input inputRef={loginEmailInputRef} placeholder="이메일" type='text'/>
                        <Input inputRef={loginPasswordInputRef} placeholder="비밀번호" type='password'/>
                        <Button type="submit" onClick={loginButtonHandler}>로그인</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form className={classes.loginModal__form}>
                        <Input inputRef={signUpUserNameInputRef} placeholder="이름" label="이름" type='text'/>
                        <Input inputRef={signUpEmailInputRef} placeholder="이메일" type='text'/>
                        <Input inputRef={signUpPasswordInputRef} placeholder="비밀번호" type='password'/>
                        <Button type="submit" onClick={signUpButtonHandler}>회원가입</Button>
                    </form>
                </TabPanel>

            </div>        
        </Modal>
      </>

    
  )
}

export default LoginButton