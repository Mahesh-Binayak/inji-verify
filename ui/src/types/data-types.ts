import { MethodType } from "../utils/api";

export type QrScanResult = {
  data: string | null;
  error: string | null;
  status: QrReadStatus;
};

export type QrReadStatus = "SUCCESS" | "NOT_READ" | "FAILED";

export type VcStatus = {
  verificationStatus: Boolean;
  verificationMessage: string;
  verificationErrorCode: string;
};

export type VerificationStep = {
  label: string;
  description: string | string[];
};

export type CardPositioning = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

export type AlertSeverity =
  | "success"
  | "info"
  | "warning"
  | "error"
  | undefined;

export type AlertInfo = {
  message?: string;
  severity?: AlertSeverity;
  open?: boolean;
  autoHideDuration?: number;
};

export type VerificationMethod =
  | "SCAN"
  | "UPLOAD"
  | "VERIFY"
  | "TO_BE_SELECTED";

export type InternetConnectionStatus =
  | "ONLINE"
  | "OFFLINE"
  | "LOADING"
  | "UNKNOWN";

export type ApplicationState = {
  internetConnectionStatus: InternetConnectionStatus;
};

export type VerificationState = {
  method: VerificationMethod;
  activeScreen: number; // Verification steps
  qrReadResult?: QrReadResult | undefined;
  verificationResult?: VerificationResult;
  alert?: AlertInfo;
  ovp?: OvpFlowData;
};

export type QrReadResult = {
  alert?: AlertInfo;
  qrData?: object;
  status: QrReadStatus;
};

export type OvpFlowData = {
  presentationSubmission?: any;
  vpToken?: any;
};

export type VerificationTrigger = {};

export type VerificationResult = {
  vc?: any;
  vcStatus?: VcStatus;
};

export type LanguageObject = {
  label: string;
  value: string;
};

export interface VerificationStepsContentType {
  SCAN: VerificationStep[];
  UPLOAD: VerificationStep[];
  VERIFY: VerificationStep[];
  TO_BE_SELECTED: VerificationStep[];
}
export type ApiRequest = {
  url: (...args: string[]) => string;
  methodType: MethodType;
  headers: (...args: string[]) => Record<string, string>;
  body?: string;
};

export type VerifyState = {
  isLoading: boolean;
  requestUri: string;
};

export type QrData = {
  transactionId: string;
  requestId: string;
  authorizationDetails: {
    responseType: string;
    clientId: string;
    presentationDefinitionUri: string;
    responseUri: string;
    nonce: string;
    iat: number;
  };
  expiresAt: number;
};
