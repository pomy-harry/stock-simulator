# 📈 주린이집
<br>

## 👨‍👨‍👧 팀원
- [김민기](https://github.com/minki0415)
- [윤소희](https://github.com/mandariny)
- [장우재](https://github.com/WoojaeJang)
<br>

## 🗓 프로젝트 기간
- 2022.04.24 ~ (진행 중)
<br>

## 📃 프로젝트 개요
- 주식 가격정보와 차트조회, 모의투자 기능을 제공하는 웹사이트 
- 회원가입 후 관심있는 종목을 등록하면 실시간 가격과 차트 조회 가능
- 가상계좌를 생성하여 실시간 가격을 기준으로 매수와 매도, 실시간 수익률조회 가능
<br>

## 🚗 프로젝트 진행방법
- 깃허브를 최대한 활용하여 의사소통 진행
  - ISSUE 활용하여 기능 별 의사소통 진행
  - PROJECT 탭 활용하여 기능별 진행사항 확인

- 기능별 역할 분담 
  - 요구사항 분석 단계에서 추출한 기능별로 역할을 나누어 프로젝트 진행
  - Frontend, Backend 구분 없이 프로젝트 수행

- 역할 분담
  - 김민기 : 회원가입 및 로그인 / 주식 데이터 크롤링 / 관심종목 차트 조회 / 금융 주요뉴스 확인
  - 윤소희 : 회원가입 및 로그인 / 관심종목 검색, 저장, 삭제 / 고객정보 확인, 수정, 삭제 / 모의투자 전체, 종목별 수익률 조회
  - 장우재 : 주식 정보 DB 구성 / 가상계좌 생성, 수정 / 초기  디자인 / 모의투자 매수, 매도 기능 구현 / 
<br>

## 🛠 기술 스택
- Spring
- React
<br>

## 🧾 프로젝트 설계
<br>

### 요구사항 명세서
![image](https://user-images.githubusercontent.com/93183070/161183528-317c7d7f-34f8-4cb0-a4d7-14b7b420c381.png)

<br>

### 화면구성도
![image](https://user-images.githubusercontent.com/93183070/161184110-b46d3e84-dc99-4bae-bcd5-d42374938aa2.png)
![image](https://user-images.githubusercontent.com/93183070/161184060-cfb72962-8e5c-4334-ba3d-dc455d5f209e.png)
![image](https://user-images.githubusercontent.com/93183070/161184006-06d17431-5db1-436b-9996-e51af57303d5.png)

### ERD
![image](https://user-images.githubusercontent.com/93183070/161184291-50873fc8-cd4e-4a36-895c-4c091bef11d1.png)

|Table|Row|설명|
|---|---|---|
|Customer|id : 회원아이디 값 <br> name : 회원 이름 <br> email : 회원 이메일 <br> pw : 회원 비밀번호 |고객 정보를 저장하는 테이블|
|Account|id : 모의투자용 계좌 아이디 <br> name : 계좌 이름 <br>  deposit : 현재 남아있는 예수금| 모의투자용 계좌 정보 저장하는 테이블|
|MyStock|id : 보유 주식 현황 아이디 <br> buy_price : 매수 단가 <br> amount : 보유 주식 수량| 매수한 주식의 정보를 저장하는 테이블|
|Stock|code : 종목 코드 <br> name : 종목 이름|종목 코드와 종목 이름을 저장하는 테이블 |
|WatchStock|id : 관심종목 아이디 <br> index : 관심종목 순서|등록된 관심종목 정보를 저장하는 테이블|
<br>

## 도메인 용어 정리
|용어|용어 설명|
|---|---|
|모의투자|가상 자산을 생성하여 투자를 해볼 수 있는 기능 |
|매수|주식을 구매한다|
|매도|주식을 판매한다|
|예수금|주식을 거래할 수 있는 자금       (투자 원금 - 매수금액)|
|매수금액|매수 시점에서 보유한 주식의 총액|
|평가금액|현재 시점에서 보유한 주식의 총액|
|수익률|매수 금액 대비 손익 금액의 비율      (평가금액 - 매수금액)/매수금액|
|평가손익|매수 금액 대비 손익 금액     (평가금액 - 매수금액)|
|종목|증권 시장에서 매매 거래의 대상, 보통 회사이름을 붙여 사용|
|종목코드|주식 종목의 고유 번호|
<br>

## 주요기능

### 메인페이지 (6)
- 회원가입
- 로그인
- 관심종목 저장, 삭제
- 관심종목 차트 조회
- 모의투자
- 금융 주요뉴스 확인
<br>

### 마이페이지 (4)

- 고객 정보 확인, 수정
- 가상계좌 생성 , 수정
- 모의 투자 전체 수익률 조회
- 모의 투자 종목별 수익률 조회
<br>

## Restful API Document
https://documenter.getpostman.com/view/19511451/UVyrUcGR
<br><br>


## 화면 구성 및 기능 소개

![image](https://user-images.githubusercontent.com/93183070/161186549-61668371-56f2-41ae-8adb-642803558c42.png)


### 1. 회원가입

메인 페이지에서 로그인 버튼 클릭 시 회원가입 모달 창이 생성 되며 이름, 이메일, 비밀번호를 기입하면 회원가입할 수 있다.

![image](https://user-images.githubusercontent.com/93183070/161186704-e902f3b6-a11c-4ce5-9147-5cc5c591c90a.png)

![image](https://user-images.githubusercontent.com/93183070/161186684-7e8ec592-9411-4478-b8a2-65bceccd3efb.png)
<br>

### 2. 로그인

가입 시 입력한 이메일과 비밀번호를 통해 로그인이 가능하다.

![image](https://user-images.githubusercontent.com/93183070/161186609-4f30de0f-67b4-462d-9953-fb96564a5703.png)

로그인 정보가 일치하지 않을 경우 로그인에 실패했다는 알림창이 생성된다.

![image](https://user-images.githubusercontent.com/93183070/161186750-d557480d-e380-43db-ae76-2f634b105377.png)
<br>

### 3. 관심종목

- 종목 코드와 종목이름 DB 생성
    
    [대한민국 대표 기업공시채널 KIND](https://kind.krx.co.kr/corpgeneral/corpList.do?method=loadInitPage)
    
    기업 공시채널 KIND에서 주식 정보 다운 받아 Python을 통해 MySQL 과 연결하여 DB 생성
<br>

**3.1 관심종목 등록**

검색창에서 종목의 이름을 입력하여 주식의 목록을 검색할 수 있으며, 클릭 시 관심 종목으로 등록된다. 

자동완성 기능을 통해 이름의 일부만 입력해도 검색이 가능하다.

![image](https://user-images.githubusercontent.com/93183070/161186939-a3f1b98a-59af-4f2d-9b39-f3db2292617c.png)

이미 등록된 관심 종목을 추가하면 이미 등록되었다는 알림창이 생성된다.

![image](https://user-images.githubusercontent.com/93183070/161186961-9094acf7-4106-403a-ab39-e190e8bd242d.png)

**3.2 관심종목 조회**

관심종목으로 등록하면 네이버 증권에서 해당 종목의 차트, 현재가격, 변동률을 크롤링하여 메인페이지에서 출력

![image](https://user-images.githubusercontent.com/93183070/161187016-4e0b93b4-45be-4c58-861a-2fbf280c2838.png)

**3.3 관심종목 삭제**

차트 오른쪽 상단의 닫기 버튼을 통해 관심종목으로 등록된 주식을 삭제할 수 있다. 
<br>

### 4. 모의투자

**4.1 가상계좌 생성**

마이페이지에서 모의투자를 진행할 수 있는 가상계좌를 생성할 수 있다.

![image](https://user-images.githubusercontent.com/93183070/161187043-ecbd2f8d-3fff-4b8a-ae0b-3a81e696b057.png)

![image](https://user-images.githubusercontent.com/93183070/161187092-3a91bde3-66cd-4d65-9092-85a57fc924de.png)

![image](https://user-images.githubusercontent.com/93183070/161187111-55002e22-7603-40dd-8b22-f3e7d6b7b57a.png)

<br>

**4.2 가상계좌 정보 수정 및 삭제**

가상계좌의 이름을 변경할 수 있는 기능

![image](https://user-images.githubusercontent.com/93183070/161187132-436ef6a4-77b8-4990-ba00-58c09fcd1602.png)

가상 계좌를 삭제할 수 있는 기능

기존의 매수 했던 주식 목록과 내역 전체가 삭제된다.

관심종목은 그대로 남아있다.

![image](https://user-images.githubusercontent.com/93183070/161187166-d2f7dafe-eadd-40d1-81e1-19eb413647cd.png)

**4.3 주식 매수**

가상계좌를 생성하여 등록한 관심 종목 중에서 선택하여 매수할 수 있는 기능. 

![image](https://user-images.githubusercontent.com/93183070/161187205-0d47353e-bd02-4553-8cbc-05b2332a302d.png)

마이페이지에서 가상계좌 미 생성 후 구매 버튼 클릭 시 ‘가상계좌를 생성해주세요’ 라는 알림창 생성

![image](https://user-images.githubusercontent.com/93183070/161187222-1365456b-acb8-4b94-85ab-38abc427b307.png)

구매버튼 클릭 시 주식이 해당 가격으로 매수 되며 마이페이지에서 종목별 수익률 조회가 가능하다.

매수 시 계좌정보의 예수금에서 매수한 금액만큼 금액이 차감되어 보여지며

잔고는 주식을 포함한 전체 자산 금액을 보여준다.

![image](https://user-images.githubusercontent.com/93183070/161187291-b232be25-5719-4d25-8ee2-cad9836372f1.png)
<br>

### 5. 수익률 조회

마이페이지에서 전체 잔고에 대한 수익률과 종목별 수익률 조회가 가능하다.

![image](https://user-images.githubusercontent.com/93183070/161187402-e00b93b8-5b3c-4ceb-8070-862f0aeb8b42.png)

전체 수익률은 메인 페이지에서도 조회할 수 있다.

![image](https://user-images.githubusercontent.com/93183070/161187438-1053a306-2ca1-472e-bf79-7ab6cb155fd9.png)
<br>

### 6. 시장 정보 조회

시장 정보는 실시간 금융 주요뉴스를 크롤링하여 보여준다. 

클릭 시 네이버 뉴스페이지로 이동  

![image](https://user-images.githubusercontent.com/93183070/161187466-74560fb8-c592-4786-8d73-895ca2257f0f.png)

<br>

## Trouble Shooting
1. 스프링 빈 순환 참조 에러 (The dependencies of some of the beans in the application context from a cycle)
    - 한 service 파일에서 customerRepository를 @Autowired로 연결하려고 했을 때 해당 에러가 발생
    → 둘 이상의 Bean이 생성자를 통해 서로를 주입하려고 할 때 발생하는 문제라고해서 repository를 바로 import하는 것이 아니라 
    customerSerivce 파일을 사용해 필요한 처리를 함으로써 문제를 해결함
  
2. fetch의 결과 값이 Promise 객체로 생성되어 데이터에 접근이 안됐던 오류
    - fetch 결과로 반환된 Promise 에서 .then 을 통해 Respnse object에 접근하고 한번 더 .then을 사용한 후 .json()을 통해 데이터에 접근할 수 있었음

3. React 에서 배열형태의 데이터를 .map 함수를 통해 컴포넌트에 props로 내려주는 과정에서 { } 를 사용하면 return 에서 컴포넌트가 작동하지 않았던 오류<br>
    - const watchStock = watchStocks.map((stock) => { ~~ });
    - -> - const watchStock = watchStocks.map((stock) => ( ~~ ));

