export class TokenInvalidException extends Error {
  constructor(message: string) {
    super(message);
  }
}
