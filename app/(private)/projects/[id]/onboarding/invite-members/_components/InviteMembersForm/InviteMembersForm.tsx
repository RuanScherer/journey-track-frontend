"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import * as zod from "zod"
import { useInviteMembers } from "../../_contexts/InviteMembersContext"
import { UserSearchResultItem } from "./UserSearchResultItem"

interface FormData {
  email: string
}

const formSchema = zod.object({
  email: zod.string().min(3, "Enter at least 3 characters to start searching for users"),
})

export function InviteMembersForm() {
  const { handleSearchUsers, searchResults } = useInviteMembers()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSearchUsers)} className="flex items-center justify-stretch flex-wrap gap-x-2 mt-6">
          <label htmlFor="email" className="w-full text-sm text-neutral-600 mb-1">
            Search users by email
          </label>
          <input
            type="text"
            id="email"
            placeholder="example@example.com"
            className="flex-1 font-normal bg-neutral-100 rounded p-2 focus:ring-2 focus:ring-primary-400 focus:ring-opacity-50 transition-all"
            {...form.register("email")}
          />

          <button className="text-center text-neutral-50 p-2 bg-primary-400 rounded hover:bg-primary-500 transition-all">
            Search
          </button>

          {form.formState.errors.email &&
            <span className="text-xs text-red-500 w-full mt-1">
              {form.formState.errors.email.message as string}
            </span>
          }
        </form>
      </FormProvider>

      {searchResults?.length === 0 &&
        <p className="text-gray-500 text-sm leading-tight mt-2">
          No users found matching your search. Change your search criteria and try again.
        </p>
      }

      {(searchResults && searchResults.length > 0) &&
        <ul className="mt-4">
          {searchResults.map((user) => (
            <UserSearchResultItem user={user} key={user.id} />
          ))}
        </ul>
      }
    </div>
  )
}