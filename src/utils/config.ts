import dotenv from 'dotenv';

dotenv.config();

export enum ConfigKeysEnum {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
}

export const getConfig = <T extends number | string = string>(key: ConfigKeysEnum) => {
  const config = process.env[key];
  return config ? <T>config : undefined;
};
