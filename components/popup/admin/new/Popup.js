import React, { useState } from "react";
import Header from "../../../../components/header/admin/new";

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";

const Popup = props => {
  const [ step, setStep ] = useState(1);

  const handleNext = () => {
    setStep(step => ++step);
  };

  const handlePrev = () => {
    setStep(step => --step);
  };

  const handleClose = () => {

  };

  return (
    <div className="wrap">
      <Header onClose={handleClose} />
      {(() => {
        switch (step) {
          case 1:
            return (
              <Step1
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          case 2:
            return (
              <Step2
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          case 3:
            return (
              <Step3
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          case 4:
            return (
              <Step4
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          case 5:
            return (
              <Step5
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          case 6:
            return (
              <Step6
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
          default:
            return (
              <Step1
                onNext={handleNext}
                onPrev={handlePrev}
                onClose={handleClose}
              />
            );
        }
      })()}
    </div>
  );
};

export default Popup;
