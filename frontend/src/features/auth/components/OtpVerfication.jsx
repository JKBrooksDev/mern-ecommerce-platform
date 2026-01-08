import {
  Button,
  FormHelperText,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtpVerificationError,
  clearResendOtpError,
  clearResendOtpSuccessMessage,
  resendOtpAsync,
  resetOtpVerificationStatus,
  resetResendOtpStatus,
  selectOtpVerificationError,
  selectOtpVerificationStatus,
  selectResendOtpError,
  selectResendOtpStatus,
  selectResendOtpSuccessMessage,
  verifyOtpAsync,
} from "../AuthSlice";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const OtpVerfication = () => {
  const userId = localStorage.getItem("userIdForVerification");
  const email = localStorage.getItem("emailForVerification");

  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resendOtpStatus = useSelector(selectResendOtpStatus);
  const resendOtpError = useSelector(selectResendOtpError);
  const resendOtpSuccessMessage = useSelector(selectResendOtpSuccessMessage);

  const otpVerificationStatus = useSelector(selectOtpVerificationStatus);
  const otpVerificationError = useSelector(selectOtpVerificationError);

  // Redirect if no userId stored
  useEffect(() => {
    if (!userId) {
      navigate("/signup");
    }
  }, [userId]);

  // Send OTP
  const handleSendOtp = () => {
    dispatch(resendOtpAsync({ userId }));
  };

  // Verify OTP
  const handleVerifyOtp = (data) => {
    dispatch(verifyOtpAsync({ ...data, userId }));
  };

  // Handle resend OTP error
  useEffect(() => {
    if (resendOtpError) {
      toast.error(resendOtpError.message);
    }
    return () => {
      dispatch(clearResendOtpError());
    };
  }, [resendOtpError]);

  // Handle resend OTP success
  useEffect(() => {
    if (resendOtpSuccessMessage) {
      toast.success(resendOtpSuccessMessage.message);
    }
    return () => {
      dispatch(clearResendOtpSuccessMessage());
    };
  }, [resendOtpSuccessMessage]);

  // Handle OTP verification error
  useEffect(() => {
    if (otpVerificationError) {
      toast.error(otpVerificationError.message);
    }
    return () => {
      dispatch(clearOtpVerificationError());
    };
  }, [otpVerificationError]);

  // Handle OTP verification success
  useEffect(() => {
    if (otpVerificationStatus === "fullfilled") {
      toast.success("Email verified! We are happy to have you here");
      dispatch(resetResendOtpStatus());
      navigate("/");
    }
    return () => {
      dispatch(resetOtpVerificationStatus());
    };
  }, [otpVerificationStatus]);

  return (
    <Stack
      width={"100vw"}
      height={"100vh"}
      noValidate
      flexDirection={"column"}
      rowGap={3}
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        component={Paper}
        elevation={1}
        position={"relative"}
        justifyContent={"center"}
        alignItems={"center"}
        p={"2rem"}
        rowGap={"2rem"}
      >
        <Typography mt={4} variant="h5" fontWeight={500}>
          Verify Your Email Address
        </Typography>

        {resendOtpStatus === "fullfilled" ? (
          <Stack
            width={"100%"}
            rowGap={"1rem"}
            component={"form"}
            noValidate
            onSubmit={handleSubmit(handleVerifyOtp)}
          >
            <Stack rowGap={"1rem"}>
              <Stack>
                <Typography color={"GrayText"}>
                  Enter the 4 digit OTP sent to
                </Typography>
                <Typography fontWeight={"600"} color={"GrayText"}>
                  {email}
                </Typography>
              </Stack>

              <Stack>
                <TextField
                  {...register("otp", {
                    required: "OTP is required",
                    minLength: {
                      value: 4,
                      message: "Please enter a 4 digit OTP",
                    },
                  })}
                  fullWidth
                  type="number"
                />
                {errors?.otp && (
                  <FormHelperText sx={{ color: "red" }}>
                    {errors.otp.message}
                  </FormHelperText>
                )}
              </Stack>
            </Stack>

            <LoadingButton
              loading={otpVerificationStatus === "pending"}
              type="submit"
              fullWidth
              variant="contained"
            >
              Verify
            </LoadingButton>
          </Stack>
        ) : (
          <>
            <Stack>
              <Typography color={"GrayText"}>
                We will send you an OTP on
              </Typography>
              <Typography fontWeight={"600"} color={"GrayText"}>
                {email}
              </Typography>
            </Stack>

            <LoadingButton
              onClick={handleSendOtp}
              loading={resendOtpStatus === "pending"}
              fullWidth
              variant="contained"
            >
              Get OTP
            </LoadingButton>
          </>
        )}
      </Stack>
    </Stack>
  );
};
