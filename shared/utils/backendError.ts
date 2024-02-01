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

  // request_password
  "request_password_reset.invalid_request_data": "It looks like the email you entered is not valid. Please, try again.",
  "request_password_reset.user_not_found": "We couldn't find an account with the email you entered. Please, try again.",

  // reset_password
  "reset_password.user_not_found": "We couldn't find your account. Please, try again.",
  "reset_password.no_request_for_password_reset": "We couldn't find a request for password reset. Please, try again.",

  // user_profile
  "user_profile.user_not_found": "We couldn't load your profile. Please, try again.",

  // create_project
  "create_project.invalid_request_data": "It looks like the information you entered is not valid. Please, try again.",
  "create_project.project_owner_not_found": "We couldn't establish your identity to create a project. Please, sign in again.",
  "create_project.unable_to_create_project": "We couldn't establish your identity to create a project. Please, sign in again.",

  // edit_profile
  "edit_profile.invalid_request_data": "It looks like the data you're trying to save is not valid. Please, try again.",
  "edit_profile.user_not_found": "We couldn't find your account. Please, sign in again.",
  "edit_profile.unable_to_find_user": "We couldn't find your account. Please, sign in again.",
  "edit_profile.unable_to_edit_user": "We couldn't update your profile. Please, try again.",
  "edit_profile.unable_to_save_user_changes": "We couldn't update your profile. Please, try again.",
}

function showToast(context: string, error: AxiosError<BackendError>) {
  let errorMessage = ERROR_MESSAGES_BY_CODE[context + "." + error.response?.data?.code]
  if (!errorMessage) {
    errorMessage = ERROR_MESSAGES_BY_CODE["unexpected_error"]
  }
  showDefaultToast(errorMessage, "error")
}

export const BackendErrorUtils = { showToast }
