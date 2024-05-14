import React from 'react';
import {Box, Grid, Typography} from "@mui/material";
import scanQr from "../../../assets/scanner-ouline.svg";
import Loader from "../../commons/Loader";
import QrScanner from "./QrScanner";
import {SetQrDataFunction} from "../../../types/function-types";
import {useActiveStepContext} from "../../../pages/Home";
import StyledButton from "./commons/StyledButton";
import {VerificationBlockContainer} from "./styles";

const Verification = ({setQrData}: {
    setQrData: SetQrDataFunction
}) => {
    const {getActiveStep, setActiveStep} = useActiveStepContext();

    return (
        <VerificationBlockContainer container>
            <Grid item xs={12} style={{
                font: 'normal normal 600 20px/24px Inter',
                marginBottom: "44px"
            }}>
                <Typography style={{font: 'normal normal 600 20px/24px Inter', marginBottom: '8px'}}>
                    Verification in Progress
                </Typography>
                <Typography style={{font: 'normal normal normal 16px/20px Inter'}}>
                    This verification will take sometime, please don’t close the browser.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Box style={{
                    width: "350px",
                    height: "350px",
                    backgroundImage: `url(${scanQr})`,
                    backgroundSize: "cover",
                    display: "grid",
                    placeContent: "center",
                    margin: "auto",
                }}>
                    {
                        getActiveStep() === 2
                            ? (<Loader/>)
                            : (<QrScanner
                                setActiveStep={setActiveStep}
                                setQrData={setQrData}
                            />)
                    }
                </Box>
            </Grid>
            <Grid item xs={12}>
                <StyledButton
                    style={{width: '350px', marginTop: "18px"}}
                    onClick={() => {setActiveStep(0)}}>
                    Back
                </StyledButton>
            </Grid>
        </VerificationBlockContainer>
    );
}

export default Verification;
