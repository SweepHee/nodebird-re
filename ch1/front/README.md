


Build setup


FRONT
========

```


프로젝트에 npm init



# nuxt 설치
npm i vue nuxt

package.json
"dev" : "nuxt" 설정

# vuetify 설치
npm i vuetify @nuxtjs/vuetify
import는 nuxt.config.js 에 한다!

# axios 설치
npm i @nuxtjs/axios axios

# eslint 설치
npm i -D eslint eslint-plugin-vue (-D는 개발용)



# 업데이트 뒤처진거 업데이트
npm update
-> found 0 vulnerabilities  1이상 뜬다면, npm audit fix
-> 자동으로 취약점을 고쳐준다.

```


BACK
=====

```

# 초기세팅
nodejs설치 (LTS버전 10, 12)
mysql 설치 5.7버전이 까다롭지 않다.
npm init
npm i express    -> 익스프레스 설치
패지키.json -> "main" : "app.js"   로 수정 ( 가장 첫번째로 볼 파일)

# 시퀄라이즈
- npm i sequelize mysql2   
    ㄴ 자바스크립트로 sql을 표현가능하다. db와 상관없이 js로 다 가능
    ㄴ mysql2는 노드js랑 mysql를 이어주는 드라이버

- npm i -D sequelize-cli
    ㄴ -g 글로벌로 사용하지 않는 이유는 package.json에 기록되지 않고
        cmd로 전역 sequelize를 사용할 수 있다
- npx sequelize init 
    ㄴ 시퀄라이즈 기본세팅파일, 폴더들 생김.
    ㄴ npx : 글로벌로 설치되지 않은 디펜던시 명령어를 사용 할 수 있다.
    ㄴ 글로벌로 시퀄라이즈를 설치했다면 sequelize init 식으로 사용할 수 있지만
    ㄴ 프로젝트 내 설치라면 npx를 붙여줘야 한다.
- back/models/index.js 파일 수정
- back/config/config.js developer 부분 수정. 개발일 때 db 설정
- npx sequelize db:create 
    ㄴconfig.js에 정의된 db를 생성해준다.

# nodemon
- npm i -D nodemon
    ㄴ 백엔드서버 알아서 업데이트
    ㄴ 백엔드 package.json 스크립트->"dev" : "nodemon app.js"

# cors 오류 해결
- npm i cors
    
# 비밀번호 암호화 bcrypt
- npm i bcrypt
    ㄴ 윈도우에서 에러날때가많다. 공식문서참조

# 패스포트 로그인을 도와준다!
npm i passport passport-local
    ㄴ passport-local, passport-kakao 등등 서비스마다 존재.

# 익스프레스 세션
npm i express-session
    ㄴ 패스포트에서 session 사용해야하는데 이게 있어야 함.

# 쿠키파서
npm i cookie-parser

# 모건
npm i morgan

```