import React from "react";

const Error = () => {
  return (
    <div>
      <div id="wrap" className="wrap error_wrap">
        <div className="error_page">
          <img src="/img/common/error.png" alt="에러"/>
          <div className="error_title">404 Page not found</div>
          <div className="error_contents">
            요청하신 페이지를 찾을 수 없습니다.
            <br />
            삭제된 주소거나, 일시적으로 사용할 수 없습니다.
          </div>
        </div>
      </div>
      <style jsx>{`
        body {
          background: #f8f8f8;
        }
        .error_wrap {
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1000;
          background: #f8f8f8;
        }
        .error_page {
          position: fixed;
          text-align: center;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        .error_title {
          line-height: 40px;
          margin: 21px 0 44px;
          font-size: 40px;
          color: #d63d45;
          font-weight: bold;
          font-family: 'NotoSansCJKkr-Regular';
        }
        .error_contents {
          text-align: center;
          line-height: 32px;
          font-size: 20px;
          color: #333333;
          font-family: 'NotoSansCJKkr-Regular';
        }
      `}</style>
    </div>
  );
};

Error.getInitialProps = async (something) => {
    console.log(something);
    return {}
};

export default Error;
