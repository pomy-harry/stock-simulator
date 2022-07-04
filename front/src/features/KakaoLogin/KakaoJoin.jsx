import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const KakaoLogin = (props) => {
    const { code } = useParams();
    // useEffect [] 여기 안에 들어가는값이 바뀔때마다 실행시킴.
    
    useEffect(() => {
        if (code !== null) {
            a(code);
        }//code가 바뀌면 실행
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
                    sessionStorage.setItem('USER', res2.id);
                    window.location.href="/";
                }))
            }else{
                window.alert("로그인에 실패했습니다.\n로그인 정보를 확인해주세요");
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