export class PasswordNotMatchException extends Error {
  constructor(message: string) {
    super(message);
  }
}
