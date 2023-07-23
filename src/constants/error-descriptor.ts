class ErrorDescriptor {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

export const ERRORS = {
  NO_ITEM_ID: new ErrorDescriptor('Item id is not specified')
};
