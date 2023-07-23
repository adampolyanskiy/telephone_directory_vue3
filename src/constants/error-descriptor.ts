class ErrorDescriptor {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    this.code = code;
    this.message = message;
  }
}

export const ERRORS = {
  NO_ITEM_ID: new ErrorDescriptor(1, 'Item id is not specified')
};
