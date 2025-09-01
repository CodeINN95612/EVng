import crypto from 'crypto';
import bcrypt from 'bcrypt';

const passwordHasher = {
  hash: async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return [hash, salt];
  },
  verify: async (password: string, hash: string, salt: string) => {
    const hashToVerify = await bcrypt.hash(password, salt);
    return hash === hashToVerify;
  },
};

export { passwordHasher };
