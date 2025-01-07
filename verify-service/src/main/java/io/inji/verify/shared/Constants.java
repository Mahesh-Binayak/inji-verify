package io.inji.verify.shared;

public class Constants {

    public static int DEFAULT_EXPIRY = 300 * 1000;
    public static final String RESPONSE_SUBMISSION_URI = "/direct-post";
    public static final String VP_DEFINITION_URI = "/vp-definition/";
    public static final String RESPONSE_TYPE =  "vp_token";

    public static final String TRANSACTION_ID_PREFIX = "txn";
    public static final String REQUEST_ID_PREFIX = "req";

    //JSON KEYS
    public static final String KEY_PROOF = "proof";
    public static final String KEY_JWS = "jws";
    public static final String KEY_VERIFICATION_METHOD = "verificationMethod";
    public static final String KEY_VERIFIABLE_CREDENTIAL = "verifiableCredential";
    public static final String KEY_CREDENTIAL = "credential";

    //ERROR MESSAGES
    public static final String ERR_100 = "Invalid transaction ID, No requests found for given transaction ID.";
    public static final String ERR_101 = "No VP submission found for given transaction ID.";




}
