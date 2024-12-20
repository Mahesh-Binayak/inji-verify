package io.inji.verify.services;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import io.inji.verify.dto.submission.ResponseAcknowledgementDto;
import io.inji.verify.dto.submission.VPSubmissionDto;
import io.inji.verify.dto.submission.VPTokenResultDto;
import io.inji.verify.enums.SubmissionStatus;
import io.inji.verify.enums.VerificationStatus;
import io.inji.verify.exception.VerificationFailedException;
import io.inji.verify.models.VCResult;
import io.inji.verify.models.VPSubmission;
import io.inji.verify.repository.AuthorizationRequestCreateResponseRepository;
import io.inji.verify.repository.VPSubmissionRepository;
import io.inji.verify.shared.Constants;
import io.inji.verify.singletons.CredentialsVerifierSingleton;
import io.inji.verify.spi.VerifiablePresentationSubmissionService;
import io.inji.verify.utils.SecurityUtils;
import io.inji.verify.utils.Utils;
import io.mosip.vercred.vcverifier.constants.CredentialFormat;
import io.mosip.vercred.vcverifier.data.VerificationResult;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class VerifiablePresentationSubmissionServiceImpl implements VerifiablePresentationSubmissionService {

    @Autowired
    AuthorizationRequestCreateResponseRepository authorizationRequestCreateResponseRepository;
    @Autowired
    VPSubmissionRepository vpSubmissionRepository;

    @Autowired
    CredentialsVerifierSingleton credentialsVerifierSingleton;

    @Override
    public ResponseAcknowledgementDto submit(VPSubmissionDto vpSubmissionDto) {
        vpSubmissionRepository.save(new VPSubmission(vpSubmissionDto.getState(), vpSubmissionDto.getVpToken(), vpSubmissionDto.getPresentationSubmission()));
        return new ResponseAcknowledgementDto("", "", "");

    }

    private VPTokenResultDto processSubmission(VPSubmission vpSubmission, String transactionId) {
        JSONObject vpProof = new JSONObject(vpSubmission.getVpToken()).getJSONObject(Constants.KEY_PROOF);
        String jws = vpProof.getString(Constants.KEY_JWS);
        String publicKeyPem = vpProof.getString(Constants.KEY_VERIFICATION_METHOD);
        List<VCResult> verificationResults = null;
        //TODO: Dynamic algo type
        try {
            Algorithm algorithm = Algorithm.RSA256(SecurityUtils.readX509PublicKey(publicKeyPem), null);
            JWTVerifier verifier = JWT.require(algorithm).build();
            verifier.verify(jws);

            JSONArray verifiableCredentials = new JSONObject(vpSubmission.getVpToken()).getJSONArray(Constants.KEY_VERIFIABLE_CREDENTIAL);
            verificationResults = getVCVerificationResults(verifiableCredentials);
            boolean combinedVerificationStatus = true;
            for (VCResult verificationResult : verificationResults) {
                combinedVerificationStatus = combinedVerificationStatus && (verificationResult.getVerificationStatus() == VerificationStatus.SUCCESS);
            }
            if (!combinedVerificationStatus) {
                throw new VerificationFailedException();
            }
            return new VPTokenResultDto(transactionId,SubmissionStatus.SUCCESS, verificationResults);
        } catch (Exception e) {
            log.error("Failed to verify",e);
            return new VPTokenResultDto(transactionId,SubmissionStatus.FAILED, verificationResults);
        }
    }

    @Override
    public VPTokenResultDto getVPResult(String requestId, String transactionId) {
        VPSubmission vpSubmission = vpSubmissionRepository.findById(requestId).orElse(null);
        if (vpSubmission == null){
            return new VPTokenResultDto(transactionId,SubmissionStatus.NOT_SUBMITTED,null);
        }
        return processSubmission(vpSubmission,transactionId);
    }

    private List<VCResult> getVCVerificationResults(JSONArray verifiableCredentials) {
        List<VCResult> verificationResults = new ArrayList<>();
        for (Object verifiableCredential : verifiableCredentials) {
            JSONObject credential = new JSONObject((String) verifiableCredential).getJSONObject(Constants.KEY_VERIFIABLE_CREDENTIAL).getJSONObject(Constants.KEY_CREDENTIAL);
            VerificationResult verificationResult = credentialsVerifierSingleton.getInstance().verify(credential.toString(), CredentialFormat.LDP_VC);
            VerificationStatus singleVCVerification = Utils.getVerificationStatus(verificationResult);
            verificationResults.add(new VCResult(credential.toString(),singleVCVerification));
        }
        return verificationResults;
    }
}

