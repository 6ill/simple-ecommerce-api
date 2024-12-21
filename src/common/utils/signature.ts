import * as CryptoJS from 'crypto-js';
import { v4 as uuidv4 } from 'uuid';

export class PaymentUtils {
  static generateSignature(
    clientId: string,
    secretKey: string,
    jsonBody: string,
    requestTarget: string
  ): { signature: string; requestId: string; requestTimestamp: string } {
    // Generate request ID and timestamp
    const requestId = uuidv4();
    const requestTimestamp = new Date().toISOString().slice(0, 19) + 'Z';

    // Create digest
    const digestSHA256 = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse(jsonBody));
    const digestBase64 = CryptoJS.enc.Base64.stringify(digestSHA256);

    // Create signature components
    const signatureComponents = `Client-Id:${clientId}\nRequest-Id:${requestId}\nRequest-Timestamp:${requestTimestamp}\nRequest-Target:${requestTarget}\nDigest:${digestBase64}`;
    const signatureHmacSha256 = CryptoJS.HmacSHA256(
      signatureComponents,
      secretKey
    );
    const signatureBase64 = CryptoJS.enc.Base64.stringify(signatureHmacSha256);

    return {
      signature: `HMACSHA256=${signatureBase64}`,
      requestId,
      requestTimestamp,
    };
  }
}
