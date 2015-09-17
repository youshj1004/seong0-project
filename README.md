# Gulp Jade를 활용한 웹사이트 만들기

* 공통으로 사용되는 header, footer, script, link 를 모듈화 작업 진행
* Gulp로 jade와 Sass를 Watch 시켜 코딩 변경시 자동 빌드되어 작업 속도를 향상시킨다.


## base Template 구성
`
//- 환경 설정
block settings
  include config/_settings
//- 문서 헤드 영역
include parts/_document_head
  head
    block meta_seo
      include parts/head/_meta_seo

    block meta_viewport
      meta(name="viewport", content="width=device-width, initial-scale=1")

    title= page_title
    
    block link_head
      include parts/head/_link_head
    
  body
    // Header
    block header
      include parts/body/_header

    block main
      h1 test~~~
    // Footer
    block footer
      include parts/body/_footer
    // Javascript
    block scripts
      include parts/scripts/_scripts_footer
`

# 사용법
1. jade 파일을 생성하고 파일 맨위에 베이스 템플릿을 extneds 한다.
`extends part/_page_template`

2. block을 지정하면 기본 템플릿을 덮어씌우는 효과가 있어 기본 기능에 코드 추가를 원할때는 
   block link_head
     include parts/head/_link_head
     // 여기에 추가 소스를 입력한다.

3. 기본적으로 아무런 변경을 원하지 않을 경우 기본 템플릿만 extneds 하고 
   block main
     // 이부분에 메인 내용을 작성하면 된다.

4. 다른 페이지도 동일하게 jade파일 생성 후 기본 템플릿을 extends 하고 block main 이후 새로운
   내용을 입력하면 된다.

### 공통으로 사용되는 부분을 모듈화 하면 무엇이 좋을까?
* 페이지가 적은 경우는 크게 상관이 없지만 페이지가 많아지면 공통적으로 사용하는 부분에 소스
  변경이 요구되었을때 모듈화 하지 않는 소스는 일일이 페이지에 방문하여 소스를 고쳐야 한다.
* 하지만 공통소스를 모듈화하여 관리하면 기본소스 하나만 변경하면 모든 페이지에 공통적으로 
  수정된다. 유지보수 측면에서 매우 효율적이다.
