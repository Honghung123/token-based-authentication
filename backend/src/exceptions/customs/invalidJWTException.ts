export class InvalidJWTException extends Error {
  constructor(message: string) {
    super(message);
  }
}
