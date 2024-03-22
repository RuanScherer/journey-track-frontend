"use client"

import Link from "next/link"
import { useProjectsView } from "../../_contexts/ProjectsViewContext/ProjectsViewContext"
import { Folder } from "@phosphor-icons/react/dist/ssr"

export function ProjectsList() {
  const { projects } = useProjectsView()

  return (
    <ul className="mt-3 grid grid-cols-12 gap-3">
      {projects.map((project) => (
        <Link
          href={`/projects/${project.id}`}
          className="col-span-12 sm:col-span-6 md:col-span-4"
          key={project.id}
        >
          <li className="flex items-center gap-1.5 border-2 border-gray-200 rounded px-3 py-2 min-w-40 cursor-pointer hover:bg-secondary-50 hover:border-secondary-200 transition">
            <Folder className="w-6 h-6 inline-block" />
            {project.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}
