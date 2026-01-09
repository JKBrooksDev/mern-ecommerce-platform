import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import MobileStepper from "@mui/material/MobileStepper";
import { Box, useTheme } from "@mui/material";
import { useState } from "react";

export const ProductBanner = ({ images }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
        slidesPerView={1}
        spaceBetween={0}
        style={{ width: "100%", height: "100%", overflow: "hidden" }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
              src={image}
              alt={`Banner Image ${index}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div style={{ alignSelf: "center" }}>
        <MobileStepper
          steps={images.length}
          position="static"
          activeStep={activeStep}
        />
      </div>
    </>
  );
};
