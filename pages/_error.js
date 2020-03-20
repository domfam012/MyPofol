import React from "react";

const Error = () => {
  return (
    <div>
        요청하신 페이지를 찾을 수 없습니다.
        <br />
        삭제된 주소거나, 일시적으로 사용할 수 없습니다.
    </div>
  );
};

Error.getInitialProps = async (something) => {
    console.log(something);
    return {}
};

export default Error;
