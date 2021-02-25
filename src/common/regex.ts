export const userIdRegex = /^(?!.*\W).{6,20}$/
export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*\W).{8,20}$/
export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

export const checkUserId = (userId: string): boolean => userIdRegex.test(userId)
export const checkPassword = (password: string): boolean => passwordRegex.test(password)
export const checkEmail = (email: string): boolean => emailRegex.test(email)
