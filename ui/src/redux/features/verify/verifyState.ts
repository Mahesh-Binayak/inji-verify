import { createSlice } from "@reduxjs/toolkit";
import { VerificationSteps } from "../../../utils/config";

const PreloadedState = {
  isLoading: false,
  status: "PENDING",
  qrData: "",
  txnId: "",
  reqId: "",
  method: "VERIFY",
  activeScreen: VerificationSteps["VERIFY"].InitiateVpRequest,
  verificationSubmissionResult: { vc: undefined, vcStatus: undefined },
};

const verifyState = createSlice({
  name: "vpVerification",
  initialState: PreloadedState,
  reducers: {
    getVpRequest: (state) => {
      state.isLoading = true;
    },
    setSelectCredential:(state)=>{
      state.activeScreen = VerificationSteps[state.method].SelectCredential;
    },
    setVpRequestResponse: (state, action) => {
      state.qrData = action.payload.qrData;
      state.txnId = action.payload.txnId;
      state.reqId = action.payload.reqId;
      state.isLoading = false;
      state.activeScreen = VerificationSteps[state.method].ScanQrCode;
    },
    setVpRequestStatus: (state, action) => {
      state.status = action.payload.status;
      state.qrData = action.payload.qrData;
      state.txnId = action.payload.txnId;
      state.reqId = action.payload.reqId;
      state.activeScreen = VerificationSteps[state.method].DisplayResult;
    },
    verificationSubmissionComplete: (state, action) => {
      state.verificationSubmissionResult = action.payload.verificationResult;
    },
    resetVpRequest: (state) => {
      state.activeScreen =  VerificationSteps[state.method].InitiateVpRequest ;
      state.verificationSubmissionResult = {vc: undefined, vcStatus: undefined};
      state.isLoading= false
      state.status= "PENDING"
      state.qrData= ""
      state.txnId= ""
      state.reqId= ""
      state.activeScreen= VerificationSteps["VERIFY"].InitiateVpRequest
      state.verificationSubmissionResult= { vc: undefined, vcStatus: undefined }
  }
  },
});

export const {
  getVpRequest,
  setSelectCredential,
  setVpRequestResponse,
  setVpRequestStatus,
  resetVpRequest,
  verificationSubmissionComplete,
} = verifyState.actions;

export default verifyState.reducer;
