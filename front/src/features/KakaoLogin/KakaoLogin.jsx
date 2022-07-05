import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KakaoLogin = (props) => {
    const { code } = useParams();
    useEffect(() => {
        if (code !== null) {
            a(code);
        }
    }, [code]);

    const a = async (code) => {
        console.log(code);
        
        await fetch("http://localhost:8090/afterlogin?code="+code, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        }
        }).then((res) => {
            if(res.ok){
                res.json().then((res2 => {
                    sessionStorage.setItem('USER', res2.token);
                    window.location.href="/";
                }))
            }else{
                window.alert("존재하지 않는 아이디입니다.\n회원가입을 진행해주세요");
            }
        }
        );
    };
  return (
      <>
       
      </>

    
  )
}

export default KakaoLogin