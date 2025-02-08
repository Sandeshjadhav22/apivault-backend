import crypto from "crypto";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex'); 
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

export function encrypt(text) {
    try {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
        
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        const authTag = cipher.getAuthTag();
    
        return {
          encryptedData: encrypted,
          iv: iv.toString('hex'),
          authTag: authTag.toString('hex')
        };
      } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
      }
}

export function decrypt(encrypted, iv, authTag) {
    try {
        const decipher = crypto.createDecipheriv(
          ALGORITHM, 
          Buffer.from(ENCRYPTION_KEY, 'hex'),
          Buffer.from(iv, 'hex')
        );
        
        decipher.setAuthTag(Buffer.from(authTag, 'hex'));
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
      } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
      }
}
