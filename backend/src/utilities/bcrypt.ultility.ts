import * as bcrypt from 'bcrypt';

export const comparePassword = async (
  password: string,
  hashPassword: string,
) => {
  try {
    return await bcrypt.compare(password, hashPassword);
  } catch (error) {
    return new Error('Failed to compare password');
  }
};

export const encryptPassword = async (password: string) => {
  try {
    return await bcrypt.hash(
      password,
      parseInt(process.env.SALT_OR_ROUNDS) ?? 10,
    );
  } catch (error) {
    throw new Error('Failed to encrypt password');
  }
};
