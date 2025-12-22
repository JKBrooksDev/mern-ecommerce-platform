// import SwipeableViews from 'react-swipeable-views';
// import { autoPlay } from 'react-swipeable-views-utils';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, useTheme } from "@mui/material";
import { useState } from "react";

// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export const ProductBanner = ({ images }) => {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        initialSlide={activeStep}
        onSlideChange={(swiper) => handleStepChange(swiper.activeIndex)}
        direction={theme.direction === "rtl" ? "rtl" : "ltr"}
        slidesPerView={1}
        spaceBetween={0}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div style={{ width: "100%", height: "100%" }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Box
                  component="img"
                  sx={{
                    width: "100%",
                    objectFit: "contain",
                  }}
                  src={image}
                  alt="Banner Image"
                />
              ) : null}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ alignSelf: "center" }}>
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
        />
      </div>
    </>
  );
};
