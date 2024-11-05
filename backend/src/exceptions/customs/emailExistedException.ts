export class EmailExistedException extends Error {
  constructor(message: string) {
    super(message);
  }
}
