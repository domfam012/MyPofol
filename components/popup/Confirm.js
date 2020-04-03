/**
 *  등록 팝업

 import Confirm from '../components/popup/Confirm';

 const [ openConfirm, setOpenConfirm ] = useState(true);
 const closeConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

 ..

 {openAlert
      ? (
          <Confirm message={"퇴근"} closeAlert={closeAlert} cb={confirmCallback}/>
)
: (
    <></>
)
}

*/

const Confirm = props => {
  const { message, closeAlert, cb } = props;

  const handleProgress = async () => {
    await cb();
    closeAlert();
  };

  return (
    <div className="modal" style={{ display: "block" }}>
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
              className="btn btn-lg btn-outline-secondary"
              style="width: 47%;"
              onClick={closeAlert}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-lg btn-primary"
              style="width: 47%;"
              onClick={handleProgress}
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
