import { randomBytes, scryptSync, timingSafeEqual } from 'crypto';

const SCHEME = 'scrypt';
const KEY_LENGTH = 64;

export function hashPassword(plainPassword: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = scryptSync(plainPassword, salt, KEY_LENGTH).toString('hex');
  return `${SCHEME}$${salt}$${hash}`;
}

export function verifyPassword(plainPassword: string, storedPassword: string): boolean {
  if (!storedPassword.includes('$')) {
    return plainPassword === storedPassword;
  }

  const [scheme, salt, originalHash] = storedPassword.split('$');
  if (scheme !== SCHEME || !salt || !originalHash) {
    return false;
  }

  const candidateHash = scryptSync(plainPassword, salt, KEY_LENGTH).toString('hex');
  const originalBuffer = Buffer.from(originalHash, 'hex');
  const candidateBuffer = Buffer.from(candidateHash, 'hex');

  if (originalBuffer.length !== candidateBuffer.length) {
    return false;
  }

  return timingSafeEqual(originalBuffer, candidateBuffer);
}