/**
 *  템플릿 미리보기 팝업

 import Preview from '../components/popup/Preview';

 const [ openPreview, setOpenPreview ] = useState(true);
 const closePreview = () => {
    setOpenPreview(!openPreview);
  };

 ..

 {openAlert
      ? (
          <Preview message={"퇴근"} closePreview={closePreview}/>
      )
      : (
          <></>
      )
  }

 */

const Preview = props => {
    const { message, closePreview } = props;

    return (
        <div
            className="modal"
            style={{ display: "block" }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-title">TEMPLATE NAME....</span>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="img"><img src="../img/temp/UI_AD_AA_03_01S_snb.png" alt="Template Preview"/></div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-lg btn-primary">확인</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;


// <div className="modal fade bd-example-modal-lg2" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel5"
//      aria-hidden="true">
//     <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
//         <div className="modal-content">
//             <div className="modal-header">
//                 <span className="modal-title" id="myLargeModalLabel5">test modal</span>
//                 <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">×</span>
//                 </button>
//             </div>
//             <div className="modal-body">
//                 <div className="img"><img src="../img/temp/UI_AD_AA_03_01S_snb.png" alt=""></div>
//             </div>
//             <div className="modal-footer">
//                 <button type="button" className="btn btn-lg btn-primary">확인</button>
//             </div>
//         </div>
//     </div>
// </div>
