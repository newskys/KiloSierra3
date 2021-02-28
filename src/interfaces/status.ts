export enum UserStatus {
  NORMAL,
  TEMP,
  BLOCK,
  ANONYMOUS,
}

export enum AuthError {
  NOT_AUTHORIZED = 'NotAuthorizedException',
  NOT_FOUND = 'UserNotFoundException',
  NOT_CONFIRMED = 'UserNotConfirmedException',
  WRONG_CODE = 'CodeMismatchException',
}