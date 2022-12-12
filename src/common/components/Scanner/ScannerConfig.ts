import { Html5QrcodeSupportedFormats } from "html5-qrcode";
import { Html5QrcodeScanType, QrDimensionFunction, QrDimensions } from "html5-qrcode/esm/core";
import { ExperimentalFeaturesConfig } from "html5-qrcode/esm/experimental-features";

export interface ScannerConfig {
    supportedScanTypes?: Array<Html5QrcodeScanType> | [];
    formatsToSupport?: Array<Html5QrcodeSupportedFormats> | undefined;
    useBarCodeDetectorIfSupported?: boolean | undefined;
    experimentalFeatures?: ExperimentalFeaturesConfig | undefined;
    verbose: boolean | undefined;
    fps: number | undefined;
    qrbox?: number | QrDimensions | QrDimensionFunction | undefined;
    aspectRatio?: number | undefined;
    disableFlip?: boolean | undefined;
    videoConstraints?: MediaTrackConstraints | undefined;
}