import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KakaoJoin = (props) => {
    const { code } = useParams();
    useEffect(() => {
        if (code !== null) {
            a(code);
        }
    }, [code]);

    const a = async (code) => {
        console.log(code);
        
        await fetch("http://localhost:8090/afterjoin?code="+code, {
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
                window.alert("이미 등록된 사용자입니다.\n로그인해주세요");
            }
        }
        );
    };
  return (
      <>
       
      </>

    
  )
}

export default KakaoJoin