const Exit = props => {
  const { onClose } = props;

  return (
    <section className="container-fluid init complete">
      <h2 className="title">
        PUBLISHING <span className="font-weight-bold">COMPLETED</span>
      </h2>
      <div className="sub">
        <p>사이트 제작이 완료되었습니다.</p>
      </div>
      <div className="btn-area mb">
        <button className="btn btn-xl btn-primary" onClick={onClose}>
          확인
        </button>
      </div>
    </section>
  );
};

export default Exit;
