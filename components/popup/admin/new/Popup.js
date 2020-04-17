/**
 *  등록 팝업

import Popup from 'components/popup/admin/new/Popup';

const [ openPopup, setOpenPopup ] = useState(true);
const closePopup = () => {
  setOpenPopup(!openPopup);
};

..

<Popup closePopup={closePopup}/>

 */

import React, {useEffect, useState} from "react";
import Header from "../../../../components/header/admin/New";
import axios from "axios";

// import { composeWithDevTools } from 'redux-devtools-extension';

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const Popup = props => {
  const { closePopup } = props;

  // 화면에 보여줄 Step
  const [step, setStep] = useState(4);
  // 사이트 등록시 필요 data
  const [site, setSite] = useState({
    name: '',
    url: '',
    phone: '',
    email: '',
    logo: {
      saveName: '',
      path: ''
    },
    categoryList: ['', ''],
    template: 0
  });

  // 이전 단계로 돌아갈 경우 필요 정보
  const [urlChecked, setUrlChecked] = useState(false);
  const [logoImg, setLogoImg] = useState();
  const [logoPreview, setLogoPreview] = useState();

  // 이전, 다음 단계 이동
  const handleNext = () => setStep(step => ++step);
  const handlePrev = () => setStep(step => --step);

  // 입력값 처리
  const handleNameChange = val => setSite({ ...site, name: val });
  const handleUrlChange = val => setSite({ ...site, url: val });
  const handleUrlChecked = val => setUrlChecked(val);
  const handlePhoneChange = val => setSite({ ...site, phone: val });
  const handleEmailChange = val => setSite({ ...site, email: val });
  const handleImgChange = (saveName, path) => setSite({ ...site, logo: { saveName: saveName, path: path } });
  const handleImgFile = val => setLogoImg(val);
  const handleImgPreview = val => setLogoPreview(val);
  const handleCategoryChange = val => setSite({ ...site, categoryList: val });
  const handleTemplateChange = val => setSite({ ...site, template: val });

  // 템플릿 조회(-> Step5)
  const [templateList, setTemplateList] = useState([]);
  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await axios.get(`${process.env.ASSET_PREFIX}/api/template/list`);
      setTemplateList(res.data.data);
    };
    fetchTemplate();
  }, []);

  // Step1~6 렌더링
  return (
    <div className="wrap popup-wrap">
      <Header onClose={closePopup} />
      {(() => {
        switch (step) {
          case 1:
            return (
              <Step1
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
              />
            );
          case 2:
            return (
              <Step2
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
                handleNameChange={handleNameChange}
                handleUrlChange={handleUrlChange}
                urlChecked={urlChecked}
                handleUrlChecked={handleUrlChecked}
              />
            );
          case 3:
            return (
              <Step3
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
                handlePhoneChange={handlePhoneChange}
                handleEmailChange={handleEmailChange}
                handleImgFile={handleImgFile}
                logoPreview={logoPreview}
                handleImgPreview={handleImgPreview}
              />
            );
          case 4:
            return (
              <Step4
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
                handleCategoryChange={handleCategoryChange}
              />
            );
          case 5:
            return (
              <Step5
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
                templateList={templateList}
                handleTemplateChange={handleTemplateChange}
                handleImgChange={handleImgChange}
                logoImg={logoImg}
              />
            );
          case 6:
            return (
              <Step6
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
                onClose={closePopup}
              />
            );
          default:
            return (
              <Step1
                onNext={handleNext}
                onPrev={handlePrev}
                site={site}
              />
            );
        }
      })()}

      <style jsx>{`
        .popup-wrap {
          z-index: 1000;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: #fff;
        }
      `}</style>

    </div>
  );
};

export default Popup;
