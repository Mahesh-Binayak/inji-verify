package io.inji.verify.dto.authorizationRequest;

import io.inji.verify.enums.VPRequestStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class VPRequestStatusDto {
    VPRequestStatus status;
}
