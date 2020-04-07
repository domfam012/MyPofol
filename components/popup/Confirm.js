/**
 *  등록 팝업

 import Confirm from '../components/popup/Confirm';

 const [ openConfirm, setOpenConfirm ] = useState(true);
 const closeConfirm = () => {
    setOpenConfirm(!openConfirm);
  };

 ..

 {openConfirm
      ? (
          <Confirm message={"퇴근"}  closeConfirm={closeConfirm} cb={confirmCallback}/>
)
: (
    <></>
)
}

*/

const Confirm = props => {
  const { message, closeConfirm, cb } = props;

  const handleProgress = async () => {
    await cb();
    closeConfirm();
  };

  return (
    <div className="modal fade show" id="delete"  role="dialog" aria-labelledby="deleteModal" aria-hidden="true" style={{display: "block", background: `rgba(0,0,0,.5)` }}>
      <div className="modal-dialog modal-sm modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <span className="modal-title" id="saveLabel" />
            <button type="button" className="close" onClick={closeConfirm}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body text-center">{message}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-lg btn-outline-secondary"
              style={{ width: "165px" }}
              onClick={closeConfirm}
            >
              취소
            </button>
            <button
              type="button"
              className="btn btn-lg btn-primary"
              style={{width: "165px"}}
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
