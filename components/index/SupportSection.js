import React from "react";

export default  () => (
    <section className="container-fluid support">

        <div className="framework">
            <h1 className="header"><strong>MyUI는</strong> 가장 널리 사용되는 프레임 워크를 지원합니다.</h1>
            <p className="sub-header">전용 버전에 대해 자세히 알아보십시오.</p>
            <div className="row list">
                <div className="col col-sm-4 item bootstrap">
                    <img src="/img/main/bootstrap.png" alt="bootstrap"/>
                    <div className="title">Bootstrap 4</div>
                </div>
                <div className="col col-sm-4 item react">
                    <img src="/img/main/react.png" alt="reactjs"/>
                    <div className="title">React.js</div>
                    <div className="info">2020 상반기 서비스 예정입니다.</div>
                </div>
                <div className="col col-sm-4 item vue">
                    <img src="/img/main/vue.png" alt="vuejs"/>
                    <div className="title">Vue.js</div>
                    <div className="info">2020 상반기 서비스 예정입니다.</div>
                </div>
            </div>
        </div>

        <div className="technology">
            <h1 className="header">가장 인기있는 프레임 워크와 기술을 기반으로 구축되었습니다.</h1>
            <div className="list">
                <div className="bootstrap item">
                    <img className="icon" src="/img/main/bootstrap-sm.png" alt="Bootstrap image"/>
                    <div className="detail">
                        <h3 className="title"><strong>부트스트랩</strong></h3>
                        <div className="info">
                            <p>부트 스트랩은 HTML, CSS 및 JS로 개발하기위한오픈 소스 구성 요소 라이브러리입니다.</p>
                            <p>부트 스트랩을 사용하면 Sass 변수 및 믹스 인, 반응 형 그리드 시스템, 구성 요소 및 내장 된 훌륭한 플러그인을
                                사용하여 아이디어를 즉시 프로토 타입하거나 전체 웹 애플리케이션을 만들 수 있습니다</p>
                        </div>
                    </div>
                </div>
                <div className="sass item">
                    <img className="icon" src="/img/main/sass-sm.png" alt="SASS image"/>
                    <div className="detail">
                        <h3 className="title"><strong>SASS</strong></h3>
                        <div className="info">
                            <p>Sass는 세계에서 가장 정교하고 안정적이며 강력한 전문가 급 CSS 확장 언어입니다.</p>
                            <p>Sass는 CSS를 다시 재미있게 만듭니다. Sass는 CSS의 확장으로 중첩 규칙, 변수, 믹스 인, 선택기 상속 등을
                                결합합니다.</p>
                            <p>명령 행 도구 또는 빌드 시스템 용 플러그인을 사용하여 형식이 지정된 표준 CSS로 설정되었습니다.</p>
                        </div>
                    </div>
                </div>
                <div className="ecma item">
                    <img className="icon" src="/img/main/es-sm.png" alt="ES image"/>
                    <div className="detail">
                        <h3 className="title"><strong>ECMAScript</strong></h3>
                        <div className="info">
                            <p>ECMAScript (또는 ES)는 ECMA-262 및 ISO / IEC 16262에서 Ecma International에서 표준화 한 스크립팅
                                언어 사양입니다.</p>
                            <p>JavaScript를 표준화하여 여러 개의 독립적 인 구현을 촉진하는 데 도움을주기 위해 작성되었습니다.</p>
                        </div>
                    </div>
                </div>
                <div className="fontawesome item">
                    <img className="icon" src="/img/main/fontawseme-sm.png" alt="Font Awesome image"/>
                    <div className="detail">
                        <h3 className="title"><strong>FONTAWESOME</strong></h3>
                        <div className="info">
                            <p>FONTAWESOME을 사용하여 HTML의 Font 속성을 모두사용할 수 있으며, CSS를 적용시킬 수 있습니다.</p>
                            <p>브라우저 호완성의 문제가 적의며 무료 아이콘이 많습니다.</p>
                            <p>커스터미이징 가능합니다.</p>
                        </div>
                    </div>
                </div>
                <div className="krlang item">
                    <img className="icon" src="/img/main/korea-sm.png" alt="Kr language image"/>
                    <div className="detail">
                        <h3 className="title"><strong>한글 최적화</strong></h3>
                        <div className="info">
                            <p>본고딕(Noto Sans), 나눔고딕, 나눔바른고딕을 지원하여 한글에 최적화 되어있습니다.</p>
                            <p>저작권 문제가 없는 한글폰트를 사용하여, 라이센싱 문제가 없습니다.</p>
                            <p>지속적으로 저작권 문제가 없는 한글폰트를 추가합니다.</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </section>
);
