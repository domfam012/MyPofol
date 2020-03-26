import React , { useCallback } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout";
import Header from "../../../components/header/admin/Edit"
import {useDispatch, useSelector} from "react-redux";
import {LOG_IN} from "../../../redux/reducers/user";

const Social = props => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isLoggedIn  } = useSelector(state => state.user);

    const onLogIn = useCallback(() => {
        dispatch({type :LOG_IN, data : 'google_token1'});
    }, []);

    if(isLoggedIn) {router.push(`/admin/edit`);}

    return (
        <Layout>
            <Header/>
            <section className="container-fluid init login">
                <h2 className="title">로그인</h2>
                <div className="sub">
                    <p>처음오셨나요? 무료로 계정을 생성할 수 있습니다.</p>
                </div>
                <div className="btn-area social">
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/kakao.png" alt="카카오"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/naver.png" alt="네이버"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/google.png" alt="구글"/></button>
                    <button type="button" className="btn btn-xl btn-block btn-outline-secondary"><img
                        src="/img/common/facebook.png" alt="페이스북"/></button>
                    <button type="button" className="btn btn-block btn-link">회원가입하기</button>
                </div>
                <button onClick={onLogIn}  type="button" className="btn btn-xl btn-block btn-outline-secondary"> 임시 로그인 버튼 </button>
            </section>
        </Layout>
    );
};

export default Social;
