import React from 'react'
import { forwardRef, useState } from 'react';
import NumberFormat from 'react-number-format';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';

const CREATE_ACCOUNT_URL = 'http://localhost:8090/api/v1/createaccount';

// 기존의 Input 형식의 변경없이 숫자 형식 변경 ( ex) 1000 -> ￦1,000 )
const NumberFormatCustom = forwardRef((props, ref) => {

  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      thousandSeparator
      isNumericString
      prefix="￦"
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        });
      }}
    />
  );
});


const CreateAccount = () => {
    
    const [openCreateAccount, setOpenCreateAccount] = useState(false);  
  
    const [accountName, setAccountName] = useState('');
    const [deposit, setDeposit] = useState('');
    
    const createAccount = async (event) => {
      event.preventDefault();

      await fetch (
        CREATE_ACCOUNT_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type' : 'application/json',
          },
          body: JSON.stringify({
            customerId: sessionStorage.getItem('USER'),
            name: accountName,
            deposit: deposit,
          })
        }
      )

      setOpenCreateAccount(false);
      setAccountName('');
      setDeposit('');

      window.location.reload();

    };  
  return (
    <div className="App">


      <p className='test'>계좌 정보가 없습니다.</p>


      {/* 계좌생성 Modal */}
      <Modal
        open={openCreateAccount}
        onClose={() => {
          setOpenCreateAccount(false)
          setAccountName('')
          setDeposit('')
        }}
      >
        <div className='createAccountModal'>

          <div className="createAccountModal__header">
            모의 계좌 만들기
          </div>

          <form className='createAccountModal__form'>
            
            {/* 계좌이름 입력 Input */}
            <Input
              placeholder='계좌 이름 (별명)'
              type='text'
              value={accountName}
              onChange={(e) => {setAccountName(e.target.value)}}
            />
            
            {/* 예산 입력 Input */}
            <Input
              placeholder='예산 (원)'
              inputComponent={NumberFormatCustom}
              value={deposit.numberformat}
              onChange={(e) => {setDeposit(e.target.value)}}              
            />
            
            {/* 계좌 생성 버튼 */}
            <Button type='submit' onClick={createAccount}>계좌 생성</Button>

          </form>
        </div>

      </Modal>

      
      <div className='accountInfo'>

        {/* 계좌생성 버튼 */}
        <Button 
          className='createAccountButton'
          onClick={() => setOpenCreateAccount(true)}
        >
          계좌 만들기
        </Button>
      </div>


    </div>
  )
}

export default CreateAccount