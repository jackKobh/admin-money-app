import { JSEncrypt } from 'jsencrypt';



export class CipherTools {

    static c(pk: string, text: string) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
      ${pk}
      -----END PUBLIC KEY-----`);
        return encrypt.encrypt(text);

    }
    static cphR(p: string, t: string) {
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(`-----BEGIN PUBLIC KEY-----
    ${p}
    -----END PUBLIC KEY-----`);
        return encrypt.encrypt(t);

    }
}