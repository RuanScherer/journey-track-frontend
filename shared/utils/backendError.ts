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

  // invite_project_members
  "invite_project_members.invalid_request_data": "We couldn't send the invitations. Please, try again.",
  "invite_project_members.unable_to_save_invites": "We couldn't send the invitations. Please, try again.",
  "invite_project_members.not_project_member": "It looks like you're not a member of this project, so you can't invite anyone.",
  "invite_project_members.user_not_found": "We couldn't find some user you're trying to invite. Please, try again.",
  "invite_project_members.unable_to_invite_user": "We couldn't send the invitations. Please, try again.",

  // delete_project
  "delete_project.invalid_request_data": "We couldn't remove the project. Please, try again.",
  "delete_project.project_not_found": "We couldn't find the project you're trying to remove. Please, try again.",
  "delete_project.not_project_owner": "It looks like you're not the owner of this project, so you can't remove it.",

  // edit_project
  "edit_project.invalid_request_data": "It looks like the data you're trying to save is not valid. Please, try again.",
  "edit_project.project_not_found": "We couldn't find the project you're trying to update. Please, try again.",
  "edit_project.not_project_owner": "It looks like you're not the owner of this project, so you can't update it.",

  // show_project
  "show_project.project_not_found": "We couldn't find the project. Please, try again.",
  "show_project.not_project_member": "It looks like you're not a member of this project, so you can't see its details.",

  // list_project_invites
  "list_project_invites.project_not_found": "We couldn't find the project. Please, try again.",
  "list_project_invites.not_project_member": "It looks like you're not a member of this project, so you can't see its invites.",

  // revoke_invite
  "revoke_invite.invalid_request_data": "We couldn't revoke the invitation. Please, try again.",
  "revoke_invite.project_invite_not_found": "We couldn't find the invitation you're trying to revoke. Please, try again.",
  "revoke_invite.unable_to_revoke_project_invite": "The invitation you're trying to revoke is already answered or revoked.",
  "revoke_invite.unable_to_identify_user": "Sorry, we couldn't identify you, so we couldn't complete your request. Please, try again.",
  "revoke_invite.not_project_member": "It looks like you're not a member of this project, so you can't revoke any invitation.",

  // accept_project_invitation
  "accept_project_invitation.invalid_request_data": "It seems that some information is missing to accept the invitation. Please, try again.",
  "accept_project_invitation.project_invite_not_found": "We couldn't find the invitation you're trying to accept. Please, try again.",
  "accept_project_invitation.unable_to_find_project_invite": "We couldn't find the invitation you're trying to accept. Please, try again.",
  "accept_project_invitation.unable_to_accept_project_invite": "The invitation you're trying to accept is already answered or revoked.",
  "accept_project_invitation.project_not_found": "We couldn't find the project you're trying to join. Please, try again.",
  "accept_project_invitation.unable_to_find_project": "We couldn't find the project you're trying to join. Please, try again.",
}

function showToast(context: string, error?: string) {
  let errorMessage = ERROR_MESSAGES_BY_CODE[context + "." + error]
  if (!errorMessage) {
    errorMessage = ERROR_MESSAGES_BY_CODE["unexpected_error"]
  }
  showDefaultToast(errorMessage, "error")
}

export const BackendErrorUtils = { showToast }
