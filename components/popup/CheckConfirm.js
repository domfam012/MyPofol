import React, { useState } from "react";
/**
 *  삭제 신청 팝업

 import CheckConfirm from '../components/popup/CheckConfirm';

 const [ openCheckConfirm, setOpenCheckConfirm ] = useState(true);
 const closeCheckConfirm= () => {
    setOpenCheckConfirm(!openCheckConfirm);
  };

 ..

 {openCheckConfirm
      ? (
          <CheckConfirm message={"퇴근"} closeAlert={closeAlert} cb={confirmCallback}/>
)
: (
    <></>
)
}

*/

const CheckConfirm = props => {
  const { closeCheckConfirm , cb } = props;

  const [check, setCheck] = useState(false);
  const [state, setState] = useState(false);

  const onCheckBox = () => {
      setCheck(!check);
      closeCheckConfirm({check: check, state : state});
  };

  const handleProgress = async () => {
    setState(true);
    await cb();
    closeCheckConfirm();
  };

  return (
      <div className="modal fade show" id="delete"  role="dialog" aria-labelledby="deleteModal" aria-hidden="true" style={{display: "block", background: `rgba(0,0,0,.5)` }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <span className="modal-title" id="deleteModal"></span>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={closeCheckConfirm}>
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body">
                      <div className="desc mb-4">계정 삭제 후에는 MY PoFoL에서<br/>
                          당신의 포트폴리오를 관리 할 수 없습니다.<br/>
                          <span className="font-weight-bold">삭제하시겠습니까?</span>
                      </div>
                      <div className="custom-control custom-checkbox text-center mb-4">
                          <input onChange={onCheckBox} type="checkbox" className="custom-control-input" id="deleteAccount" checked={check}/>
                              <label className="custom-control-label" htmlFor="deleteAccount">네, 계정을 삭제하겠습니다.</label>
                      </div>
                      <div className="btn-area">
                          <button className="btn btn-xl btn-outline-secondary" onClick={closeCheckConfirm}>취소</button>
                          <button className={check ? 'btn btn-xl btn-primary' : 'btn btn-xl btn-primary disabled'} data-toggle="modal"
                                  data-target=".bd-example-modal-sm" onClick={handleProgress}>삭제신청
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
};

export default CheckConfirm;
