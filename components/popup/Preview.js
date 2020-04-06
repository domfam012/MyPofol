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
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="modal-title" id="saveLabel" />
                        <button type="button" className="close" onClick={closePreview}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body text-center">{message}</div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-lg btn-primary btn-block"
                            style={{ width: "165px" }}
                            onClick={closePreview}
                        >
                            확인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Preview;
