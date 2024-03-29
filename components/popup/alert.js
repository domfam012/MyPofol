/**
 *  등록 팝업

 import Alert from '../components/popup/Alert';

 const [ openAlert, setOpenAlert ] = useState(true);
 const closeAlert = () => {
    setOpenAlert(!openAlert);
  };

 ..

 {openAlert
      ? (
          <Alert message={"퇴근"} closeAlert={closeAlert} cb={AlertCallback}/>
      )
      : (
          <></>
      )
  }

 cb 입력시
 <Alert message={"퇴근"} closeAlert={closeAlert} cb={AlertCallback}/>

 cb 미입력시 -> 확인 버튼 누르면 closeAlert 만 진행
 <Alert message={"퇴근"} closeAlert={closeAlert} cb={AlertCallback}/>
 */

const Alert = props => {
  const { message, closeAlert, cb } = props;

  const handleProgress = async () => {
    await cb();
    closeAlert();
  };

  return (
    <div
      className="modal fade show"
      id="delete"
      role="dialog"
      aria-labelledby="deleteModal"
      aria-hidden="true"
      style={{ display: "block", background: `rgba(0,0,0,.5)` }}
    >
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title" id="saveLabel" />
            <button type="button" className="close" onClick={closeAlert}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-lg btn-primary btn-block"
              style={{ width: "165px" }}
              onClick={cb ? handleProgress : closeAlert}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
