"use client"

import { backendClient } from "@/config/api/backend";
import { ANONYMOUS_PATHS } from "@/shared/constants";
import { SignInResponseDTO } from "@/shared/dto/SignInResponseDTO";
import { BackendErrorUtils } from "@/shared/utils/backendError";
import { showDefaultErrorToast } from "@/shared/utils/toast";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Session, SessionUser } from "./Session.types";

const SessionContext = createContext<Session | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser>()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (user || ANONYMOUS_PATHS.includes(pathname)) return
    loadUserProfile()
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const { data } = await backendClient.post<SignInResponseDTO>("/v1/signin", { email, password })
      setUser(data.user)
      router.replace("/home")
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("signin", error.response?.data?.code)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  async function signOut() {
    try {
      await backendClient.post<void>("/v1/signout")
      setUser(undefined)
      router.replace("/sign-in")
    } catch (error) {
      showDefaultErrorToast()
      console.error(error)
    }
  }

  async function loadUserProfile() {
    try {
      const response = await backendClient.get<SessionUser>("/v1/users/profile")
      setUser(response.data)
    } catch (error) {
      if (error instanceof AxiosError) {
        BackendErrorUtils.showToast("user_profile", error.response?.data?.code)
      } else {
        showDefaultErrorToast()
      }
      console.error(error)
    }
  }

  async function refreshUserProfile() {
    loadUserProfile()
  }

  return (
    <SessionContext.Provider value={{ user, signIn, signOut, refreshUserProfile }}>
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  return useContext(SessionContext)
}