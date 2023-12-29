import bcrypt from 'bcrypt';
const SALTS = 10;

const hash = (password: string) => {
  return bcrypt.hashSync(password, SALTS);
};

const compare = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
};

export { hash, compare };