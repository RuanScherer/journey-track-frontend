"use client"

import { backendClient } from "@/config/api/backend"
import { useSession } from "@/contexts/Session"
import { showToast } from "@/shared/utils/toast"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

export function RequestPasswordResetButton() {
  const session = useSession()

  async function handleRequestPasswordReset() {
    try {
      await backendClient.post("/v1/users/request-password-reset", { email: session?.user?.email })
      showToast("Password reset link sent to your email address", "success")
    } catch (error) {
      showToast("An error occurred while we were trying to send the password reset link. Please, try again later.", "error")
      console.error(error)
    }
  }

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button
          type="button"
          className="text-sm text-neutral-50 mt-3 px-3 py-2 bg-primary-400 rounded hover:bg-primary-500 transition"
        >
          Request password reset
        </button>
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="DialogOverlay" />

        <AlertDialog.Content className="DialogContent max-w-lg">
          <AlertDialog.Title className="DialogTitle">Are you sure?</AlertDialog.Title>

          <AlertDialog.Description>
            Confirm that you want to request a password reset link to be sent to your email address.
          </AlertDialog.Description>

          <div className="flex items-center justify-end gap-2">
            <AlertDialog.Cancel asChild>
              <button className="DialogCancelButton" aria-label="Cancel">
                Cancel
              </button>
            </AlertDialog.Cancel>

            <AlertDialog.Action asChild>
              <button className="DialogActionButton" onClick={handleRequestPasswordReset}>
                Confirm
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  )
}