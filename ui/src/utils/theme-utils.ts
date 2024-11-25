import { ReactComponent as NavLogo } from "../assets/logo.svg";
import orangeScanOutline from "../assets/scanner-outline.svg";
import purpleScanOutline from "../assets/purple-scanner-outline.svg";
import { ReactComponent as GradientScanFillIcon } from "../assets/gradient-scan-icon.svg";
import { ReactComponent as WhiteScanFillIcon } from "../assets/white-scan-icon.svg";
import { ReactComponent as GradientTabUploadIcon } from "../assets/gradient-upload-icon.svg";
import { ReactComponent as WhiteTabUploadIcon } from "../assets/white-upload-icon.svg";
import { ReactComponent as QrCodeIcon } from "../assets/qr-code-icon.svg";
import { ReactComponent as CameraDeniedIcon } from "../assets/camera-access-denied-icon.svg";
import { ReactComponent as DocumentFileIcon } from "../assets/document.svg";
import { ReactComponent as VerificationSuccess } from "../assets/verification-success-icon.svg";
import { ReactComponent as VerificationFailed } from "../assets/verification-failed-icon.svg";
import { ReactComponent as GlobeSvgIcon } from "../assets/globe.svg";
import { ReactComponent as ArrowDownSvgIcon } from "../assets/arrow-down.svg";
import { ReactComponent as ArrowUpSvgIcon } from "../assets/arrow-up.svg";
import { ReactComponent as CheckSvgIcon } from "../assets/check.svg";
import { ReactComponent as InjiVerLogo } from "../assets/inji-verify.svg";
import { ReactComponent as UnderConstructionLogo } from "../assets/under-construction.svg";
import { ReactComponent as Search } from "../assets/search.svg";
import QrOutline from "../assets/qr-code-outline.svg"
import { ReactComponent as FilterLines } from "../assets/filter-lines.svg";

export const Logo = NavLogo;
export const InjiLogo = InjiVerLogo;
export const QrIcon = QrCodeIcon;
export const GradientScanIcon = GradientScanFillIcon;
export const WhiteScanIcon = WhiteScanFillIcon;
export const GradientUploadIcon = GradientTabUploadIcon;
export const WhiteUploadIcon = WhiteTabUploadIcon;
export const CameraAccessDeniedIcon = CameraDeniedIcon;
export const DocumentIcon = DocumentFileIcon;
export const VerificationSuccessIcon = VerificationSuccess;
export const VerificationFailedIcon = VerificationFailed;
export const ScanOutline = window._env_.DEFAULT_THEME !== "purple_theme" ? orangeScanOutline : purpleScanOutline;
export const GlobeIcon = GlobeSvgIcon;
export const ArrowDown = ArrowDownSvgIcon;
export const ArrowUp = ArrowUpSvgIcon;
export const Check = CheckSvgIcon;
export const UnderConstruction = UnderConstructionLogo;

export const SearchIcon = Search;
export const QrCodeOutLine = QrOutline;
export const FilterLinesIcon = FilterLines