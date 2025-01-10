package io.inji.verify.spi;

import io.inji.verify.dto.submission.VPSubmissionResponseDto;
import io.inji.verify.dto.submission.VPSubmissionDto;
import io.inji.verify.dto.submission.VPTokenResultDto;

import java.util.List;

public interface VerifiablePresentationSubmissionService {
    VPSubmissionResponseDto submit(VPSubmissionDto vpSubmissionDto);

    VPTokenResultDto getVPResult(List<String> requestId, String transactionId);
}
