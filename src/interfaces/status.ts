export enum UserStatus {
  CONFIRMED,
  NOT_CONFIRMED,
  RESET,
  BLOCK,
  ANONYMOUS,
}

export enum UserRole {
  ADMIN,
  TUTOR,
  STUDENT,
  UNDEFINED,
}

export enum AuthError {
  NOT_AUTHORIZED = 'NotAuthorizedException',
  NOT_FOUND = 'UserNotFoundException',
  NOT_CONFIRMED = 'UserNotConfirmedException',
  WRONG_CODE = 'CodeMismatchException',
  RESET_REQUIRED = 'PasswordResetRequiredException',
}

export enum ScheduleMode {
  NEW,
  EDIT,
  REQUEST,
}