"use server"

import { backendServerSideClient } from "@/config/api/backend"
import { AxiosError } from "axios"
import { cookies } from "next/headers"
import * as zod from "zod"

interface Response {
  formErrors?: {
    [key: string]: string[] | undefined
  }
  serverError?: string
  status: string
}

const schema = zod.object({
  name: zod.string().min(2, "Name is required"),
})

export async function editProject(_prevState: any, data: FormData): Promise<Response> {
  if (!data.get("id")) {
    return {
      formErrors: {
        id: ["Project ID is required"],
      },
      status: "error",
    }
  }

  const validateFields = schema.safeParse({
    name: data.get("name"),
  })
  if (!validateFields.success) {
    return {
      formErrors: validateFields.error.flatten().fieldErrors,
      status: "error",
    }
  }

  try {
    await backendServerSideClient.put(`v1/projects/${data.get("id")}/edit`, {
      name: data.get("name")
    }, {
      headers: {
        Cookie: cookies().toString(),
      },
    })

    return { status: "success" }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        serverError: error.response?.data.code,
        status: "error",
      }
    }
    return {
      serverError: "unexpected_error",
      status: "error",
    }
  }
}