import { AxiosError } from "axios"
import { BackendError } from "../dto/BackendError"
import { DEFAULT_ERROR_TOAST_MESSAGE, showToast as showDefaultToast } from "./toast"

const ERROR_MESSAGES_BY_CODE: Record<string, string> = {
  "unexpected_error": DEFAULT_ERROR_TOAST_MESSAGE,

  // sign in
  "signin.invalid_request_data": "Invalid email or password.",
  "signin.invalid_auth_credentials": "Invalid email or password.",
  "signin.user_not_verified": "Please verify your account before signing in. You should have received an email with a verification link.",

  // register_user
  "register_user.invalid_request_data": "It looks like the information you entered is not valid. Please, try again.",
  "register_user.invalid_data_to_register_user": "It looks like the information you entered is not valid. Please, try again.",
  "register_user.user_email_already_used": "It looks like you already have an account. Please, sign in.",

  // register_user
  "request_password_reset.invalid_request_data": "It looks like the email you entered is not valid. Please, try again.",
  "request_password_reset.user_not_found": "We couldn't find an account with the email you entered. Please, try again.",

  // register_user
  "reset_password.user_not_found": "We couldn't find your account. Please, try again.",
  "reset_password.no_request_for_password_reset": "We couldn't find a request for password reset. Please, try again.",
}

function showToast(context: string, error: AxiosError<BackendError>) {
  let errorMessage = ERROR_MESSAGES_BY_CODE[context + "." + error.response?.data?.code]
  if (!errorMessage) {
    errorMessage = ERROR_MESSAGES_BY_CODE["unexpected_error"]
  }
  showDefaultToast(errorMessage, "error")
}

export const BackendErrorUtils = { showToast }
