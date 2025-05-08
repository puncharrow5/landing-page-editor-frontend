# 랜딩페이지 에디터 FRONTEND README

![Image](https://github.com/user-attachments/assets/68865ab7-3777-417d-b513-69054ebd23f7)

## 프로젝트 소개

- 이 프로젝트는 전 직장에서 랜딩페이지 개발을 하는 경험이 종종 있었는데, 개발할 때 더 빠르고 편리하게 작업할 수 있는 방법을 고민하다가 시작된 아이디어에서 출발했습니다.
- 랜딩페이지는 구성 요소가 대체로 비슷해 개발 난이도는 낮지만, UI나 이미지가 하나만 변경되어도 개발자가 직접 수정하고 다시 배포해야 하는 번거로움이 있었습니다.
- 그래서 기획자나 디자이너도 개발자의 도움 없이 간단한 랜딩페이지를 직접 제작하거나 수정할 수 있고, 배포 없이 실시간으로 반영되는 시스템을 만들고자 했습니다.
- 이를 위해 SDUI(Server Driven UI) 기반 구조를 도입하여, 서버에서 UI를 동적으로 제어하고 빌드 및 배포 없이도 UI를 유연하게 업데이트할 수 있도록 구현했습니다.
- 전체 구조는 랜딩페이지 에디터에서 UI를 생성/수정하고, 그 정보가 백엔드에 저장된 뒤, 랜딩페이지 뷰어에서 해당 UI 정보를 기반으로 렌더링되는 방식으로 설계했습니다.
- 실제 운영 시에는 랜딩페이지 뷰어를 도메인만 다르게 설정하여 재배포 없이 여러 개의 랜딩페이지를 운영할 수 있습니다.

<br>

## 프로젝트 구성

- <a href="https://github.com/puncharrow5/landing-page-editor-frontend" target="_blank">프론트엔드<a/> : 랜딩페이지 에디터 클라이언트
- <a href="https://github.com/puncharrow5/landing-page-editor-server" target="_blank">백엔드</a> : 인증, 데이터 저장, 이메일 전송 등 API 처리
- <a href="https://github.com/puncharrow5/landing-page-editor-viewer" target="_blank">웹뷰어</a> : 랜딩페이지 에디터의 결과물을 출력하는 클라이언트

<br>

## 기술 스택
### Frontend
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql">  <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">  <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"> 

### Backend
<img src="https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white">   <img src="https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white"> <img src="https://img.shields.io/badge/-ApolloGraphQL-311C87?style=for-the-badge&logo=apollo-graphql"> <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white"> 

### Database
<img src="https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">   <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"> 

### DevOps
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">    ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)    ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)

### Environment
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white">

<br>

- NextJs
    - 개인적으로 가장 익숙한 프레임워크이기 때문에 빠르게 개발을 시작할 수 있어서 선택했습니다.
    - 이번 프로젝트는 Page Router 기반으로 개발했으며, 파일과 폴더 구조만으로 라우팅을 구성할 수 있어 전체적인 구조가 직관적이고 유지보수가 용이합니다.
    - 랜딩페이지 에디터 사이트는 실시간 상호작용이 중요한 영역이므로 CSR(Client-Side Rendering) 방식으로 구성했으며, 뷰어 사이트는 초기 UI 구성 요소(스타일, 이미지, 텍스트 등)만 받아오면 되기 때문에 SSR(Server-Side Rendering) 방식으로 구현하여 초기 로딩 속도와 SEO를 최적화했습니다.
 
- Apollo Client
    - 백엔드에서 GraphQL과 Apollo Server를 사용하기 때문에, 가장 높은 호환성과 생태계를 제공하는 Apollo Client를 GraphQL 클라이언트로 선택했습니다.
    - 또한, Codegen을 활용해 백엔드와 프론트엔드 간의 타입을 자동으로 맞출 수 있어 타입 안정성과 생산성을 높였습니다.

- Styled-Components
    - Styled-Components는 스타일에 props를 전달하여 유연하게 스타일을 변경할 수 있어, UI 수정 시 실시간으로 변경된 부분을 쉽게 확인할 수 있습니다.
    - TailwindCSS는 클래스 기반 스타일링을 사용하기 때문에, props를 받아서 스타일을 동적으로 변경할 때 처리할 수 없는 제한이 있습니다. 따라서, 상태 변화에 따라 스타일을 달리해야 하는 컴포넌트에서는 Styled-Components를 사용하여 이러한 문제를 해결했습니다.
 
- Tailwind CSS
    - Tailwind CSS는 기존의 스타일시트 작성 과정 없이 HTML 파일 내에서 바로 스타일링이 가능하여 개발 시간을 크게 단축시킬 수 있어서 사용했습니다.
    - 동적 스타일링이 필요한 경우에는 Styled-Components를 사용하여 해결하고, 고정적인 스타일링이 필요한 부분에서는 Tailwind CSS를 사용하여 효율적으로 개발할 수 있었습니다.

<br>

## 주요 기능

### [로그인]
- 로그인 성공 시, Access Token과 Refresh Token을 쿠키에 저장합니다.
- 각 페이지 로딩 및 API 요청 시, NestJS의 Guard를 사용하여 쿠키에 저장된 Access Token을 검증하고 인증 여부를 확인합니다.
    - Access Token이 만료된 경우, 쿠키에 저장된 Refresh Token을 사용하여 새로운 Access Token을 재발급합니다.
    - Refresh Token도 만료된 경우, 모든 토큰을 삭제하고 자동으로 로그아웃 처리가 이루어집니다.
- 서비스 접속 시, 미들웨어를 통해 페이지별 접근 권한을 제어합니다.
    - 로그인 상태 : 대시보드, UI 에디터 접근 가능
    = 비로그인 상태 : 로그인, 회원가입 페이지만 접근 가능

| 로그인 |
|----------|
![Image](https://github.com/user-attachments/assets/3d0c79bf-d941-4979-88a8-47f14270e381)

<br>

### [회원가입]
- 입력 항목: 이메일, 이름, 비밀번호
- 이메일 인증 절차
    - 백엔드에서 이메일 중복 검사를 진행한 후, 무작위 6자리 인증번호를 이메일로 전송합니다.
    - 인증번호는 이메일과 함께 Redis에 key-value 형태로 저장되며, 3분이 지나거나 인증이 완료되면 자동으로 삭제됩니다.
    - 사용자가 입력한 인증번호가 백엔드에 저장된 값과 일치해야만 회원가입이 완료됩니다.
- 유효성 검사
    - 프론트엔드와 백엔드 양쪽에서 유효성 검사를 수행합니다.
    - 타입 체크 및 정규표현식을 활용하여 입력값을 검증합니다.

| 회원가입 |
|----------|
![Image](https://github.com/user-attachments/assets/a169bc49-b433-458a-9ea1-57891434062d)

<br>

### [대시보드]
- 로그인 후 리다이렉트되는 메인 페이지입니다.
- 유저 프로필 정보, 관리 중인 랜딩페이지 목록, 최근 활동 내역 등을 확인할 수 있습니다.
- 랜딩페이지 목록에서 하나를 클릭하면, 해당 랜딩페이지의 UI 수정을 위한 에디터 페이지로 이동합니다.

| 대시보드 |
|----------|
![Image](https://github.com/user-attachments/assets/d941c631-5ee3-4f6c-801a-ab3334f1135f)

<br>

### [프로필]
- 사용자의 기본 정보와 권한 레벨을 확인할 수 있습니다.
- 권한 레벨
    - 1레벨 : 회원가입 직후의 기본 상태
    - 2레벨 : 랜딩페이지의 UI 수정 권한 부여
    - 3레벨 : 회원 관리 권한까지 부여됨
- 사용자는 프로필 이미지를 설정할 수 있습니다.
- 이미지 변경 후에는 유저 데이터를 즉시 refetch하여 새로고침 없이 변경 사항이 실시간으로 반영되도록 구현했습니다.
- 모든 이미지는 업로드 시 서버를 통해 S3에 저장되며, 렌더링 시 서버가 S3에서 이미지를 불러와 프론트엔드에 전달합니다.

| 프로필 |
|----------|
![Image](https://github.com/user-attachments/assets/91d213c0-f817-44c1-86fe-784849da4b98)

<br>

### [로그아웃]
- 로그아웃 시, 쿠키에 저장된 Access Token과 Refresh Token을 삭제합니다.
- 이후, 사용자를 로그인 화면으로 리다이렉트합니다.

| 로그아웃 |
|----------|
![Image](https://github.com/user-attachments/assets/51922f88-f7a5-4929-ac2f-1b07529d4458)

<br>

### [활동 내역]
- 사용자의 사이트 생성, UI 수정 등 주요 활동 내역을 확인할 수 있습니다.
- 10개 단위로 데이터를 불러오며, 스크롤이 끝에 도달하면 자동으로 다음 항목을 불러오는 무한 스크롤 방식으로 구현했습니다.
- 모든 활동 내역은 사용자의 행동에 따라 자동으로 기록됩니다.

| 활동 내역 |
|----------|
![Image](https://github.com/user-attachments/assets/0a349624-fb26-4369-a587-1c5250fe047d)

<br>

### [사이트 생성/연결]
- 새로운 랜딩페이지 생성 또는 기존 랜딩페이지와 계정 연결 기능입니다.
- 사이트에 사용될 URL, 사이트 이름, 대표 이메일을 입력합니다.
- 입력된 이메일은 이후 문의 받는 이메일로 사용됩니다.

| 사이트 생성/연결 |
|----------|
![Image](https://github.com/user-attachments/assets/af61e521-7cf6-4a06-83b2-4ccef77a9a82)

<br>

### [사이트 연결 해제]
- 계정과 연결된 사이트의 연결을 해제합니다.
- 연결이 해제된 사이트는 UI 수정 권한이 사라집니다.

| 사이트 연결 해제 |
|----------|
![Image](https://github.com/user-attachments/assets/20464fdd-9d72-4476-840f-77d485e5c54d)

<br>

### [에디터]
- 랜딩페이지의 UI 수정을 위한 페이지입니다.
- 에디터 페이지에 진입하거나 수정사항을 저장할 때마다 Guard로 유저의 권한 레벨을 확인하고 인증 절차를 진행합니다.
- 랜딩페이지는 여러 개의 섹션과 섹션 내부의 컴포넌트들로 이루어져 있습니다. 각 섹션과 컴포넌트는 독립적으로 수정할 수 있습니다.
- 오른쪽 상단의 버튼에 마우스를 올리면 메뉴가 표시되며, 해당 메뉴에서 데스크탑/모바일 환경 전환, 섹션 추가, 대시보드로 이동할 수 있습니다.
- 반응형 디자인을 지원하여, 데스크탑 환경과 모바일 환경에 맞는 UI를 각각 설정할 수 있습니다.
- 헤더와 푸터는 사이트 생성 시 자동으로 생성되며, 기본적으로 제공됩니다.

| 에디터 |
|----------|
![Image](https://github.com/user-attachments/assets/ae5241df-3bde-4ec0-ae26-85c87091d0e8)

| 데스크탑 |
|----------|
![Image](https://github.com/user-attachments/assets/8d56538c-de29-4c93-a6d6-66291c83bed3)

| 모바일 |
|----------|
![Image](https://github.com/user-attachments/assets/4a12da06-3e2b-4556-9748-e62bde5fead0)

<br>

### [섹션 수정]
- 섹션의 UI를 수정하거나 삭제할 수 있습니다.
- 섹션은 일반 섹션과 문의 섹션으로 구분되며, 추후 캐러셀, 비디오 등 다양한 형태의 섹션이 추가될 예정입니다.
- 섹션 내부에 컴포넌트를 자유롭게 추가할 수 있습니다.
- 입력한 값은 화면에 즉시 반영되지만, 저장 전까지는 임시 저장 상태가 됩니.
- 리셋을 누르면 마지막으로 저장된 상태로 되돌아갑니다.
- 저장하면 변경 사항이 즉시 해당 랜딩페이지에 반영됩니다.

| 섹션 수정 |
|----------|
![Image](https://github.com/user-attachments/assets/c06ffd23-8744-4d92-891c-76d9191ef903)

<br>

### [컴포넌트 수정]
- 개별 컴포넌트의 UI를 수정하거나 삭제할 수 있습니다.
- 나머지 기능은 섹션 수정과 동일하게 동작합니다.

| 컴포넌트 수정 |
|----------|
![Image](https://github.com/user-attachments/assets/62ce17ff-a0af-4d60-91d1-813595ddafda)

<br>

## 고도화 계획
- 캐러셀, 비디오 등 다양한 유형의 섹션 추가
- 회원 목록 조회 및 권한 변경 등 회원 관리 기능 강화
- 더 직관적이고 사용자 친화적인 UI 편집 기능 제공

<br/>

## 관련 프로젝트
<a href="https://github.com/puncharrow5/landing-page-editor-server" target="_blank">랜딩페이지 백엔드 리포지토리</a> 
<br/>
<a href="https://github.com/puncharrow5/landing-page-editor-viewer" target="_blank">랜딩페이지 웹뷰어 리포지토리</a>

<br/>

## CONTACT
<a href="mailto:seunghyeon9696@gmail.com">![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)</a>
<a href="https://github.com/puncharrow5" target="_blank">![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)</a>
<a href="https://geode-divan-811.notion.site/a44da1efdf5b47ea8fe12a8f85b216ad" target="_blank">![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)</a>
<a href="https://www.linkedin.com/in/oh-seunghyeon-352708307" target="_blank">![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)</a>

<br/>




