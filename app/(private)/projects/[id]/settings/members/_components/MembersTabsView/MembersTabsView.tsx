"use client"

import * as Tabs from "@radix-ui/react-tabs"
import { InvitationsView } from "../InvitationsView"
import { MembersView } from "../MembersView"

interface MembersTabsViewProps {
  projectId: string
}

const tabTriggerClasses = "text-sm font-medium py-1 hover:data-[state='inactive']:text-secondary-500 data-[state='active']:text-secondary-600 data-[state='active']:after:block after:mx-auto after:size-1.5 after:rounded-full after:bg-secondary-600 after:top-1 transition"

export function MembersTabsView(props: MembersTabsViewProps) {
  return (
    <Tabs.Root defaultValue="members">
      <Tabs.List className="flex items-start gap-3 flex-wrap" aria-label="Manage project members">
        <Tabs.Trigger className={tabTriggerClasses} value="members">Members</Tabs.Trigger>
        <Tabs.Trigger className={tabTriggerClasses} value="pending-invitations">Pending Invitations</Tabs.Trigger>
      </Tabs.List>

      <div className="mt-3">
        <Tabs.Content value="members">
          <MembersView projectId={props.projectId} />
        </Tabs.Content>
        <Tabs.Content value="pending-invitations">
          <InvitationsView projectId={props.projectId} />
        </Tabs.Content>
      </div>
    </Tabs.Root>
  )
}
