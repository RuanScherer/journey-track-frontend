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
}

function showToast(context: string, error: AxiosError<BackendError>) {
  let errorMessage = ERROR_MESSAGES_BY_CODE[context + "." + error.response?.data?.code]
  if (!errorMessage) {
    errorMessage = ERROR_MESSAGES_BY_CODE["unexpected_error"]
  }
  showDefaultToast(errorMessage, "error")
}

export const BackendErrorUtils = { showToast }
