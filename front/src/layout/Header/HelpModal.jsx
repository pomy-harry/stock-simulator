import React from 'react'
import classes from './HelpModal.module.css'
import Modal from '@mui/material/Modal';
import ListItemText from '@mui/material/ListItemText';
import logo_img from '../../static/images/logo1.png'

const HelpModal = (props) => {
    return (
        <Modal open={props.open} onClose={props.onClose}>
            <div className={classes.help__modal} >
                <div className={classes.help__modal__header}>
                    <img src={logo_img} alt="logo" />
                        <h2>주린이집 사용법</h2>
                </div>         
                <ListItemText className={classes.help__modal__body}
                    primary="1️⃣ 로그인/회원가입"
                    secondary="주린이집 회원이 아니시라면 회원가입을 진행해주세요."/>
                <ListItemText className={classes.help__modal__body}
                    primary="2️⃣ 마이페이지 이동"/>
                <ListItemText className={classes.help__modal__body}
                    primary="3️⃣ 계좌 생성"
                    secondary="계좌 이름과 예수금을 입력하세요."/>
                <ListItemText className={classes.help__modal__body}
                    primary="4️⃣관심 종목 등록"
                    secondary="원하는 종목을 검색후 관심 종목으로 등록하면 단위별 차트로 확인이 가능합니다."/>
                <ListItemText className={classes.help__modal__body}
                    primary="5️⃣ 모의투자"
                    secondary="매도/매수를 선택후 수량을 입력해주세요."/>
                <ListItemText className={classes.help__modal__body}
                    primary="6️⃣ 구매"
                    secondary="모의투자를 진행하셨다면, 마이페이지에서 상세 정보를 확인할 수 있습니다."/>      
                <ListItemText className={classes.help__modal__body}
                    primary="7️⃣ 백테스팅"
                    secondary="나만의 포트폴리오를 만들고 실험해보세요. 지난 10년치 데이터를 기반으로 수익과 수익률을 계산해볼 수 있습니다."/> 
            </div>        
        </Modal>
    )
}

export default HelpModal