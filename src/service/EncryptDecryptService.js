import CryptoJS from 'crypto-js';

const encryptionKey = process.env.REACT_APP_PRIVATE_KEY;

const _EncryptService = (raw) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    const key = CryptoJS.enc.Utf8.parse(encryptionKey);
    
    const encrypted = CryptoJS.AES.encrypt(raw, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    
    // Combine IV and encrypted string (Base64)
    const encryptedString = iv.concat(encrypted.ciphertext).toString(CryptoJS.enc.Base64);
    
    return encryptedString;
};

const _DecryptService = (encryptedText) => {
    const key = CryptoJS.enc.Utf8.parse(encryptionKey);
    
    // Convert the Base64 encoded string to a WordArray
    const encryptedWordArray = CryptoJS.enc.Base64.parse(encryptedText);
    
    // Extract the IV from the first 16 bytes
    const iv = CryptoJS.lib.WordArray.create(encryptedWordArray.words.slice(0, 4));
    
    // Extract the ciphertext from the rest
    const ciphertext = CryptoJS.lib.WordArray.create(encryptedWordArray.words.slice(4));

    // Decrypt the ciphertext
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    // Convert decrypted WordArray to UTF-8 string
    const decryptedText = CryptoJS.enc.Utf8.stringify(decrypted);

    
    return decryptedText;
};

export { _EncryptService, _DecryptService };
