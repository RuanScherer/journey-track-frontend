"use client"

import Link from "next/link"
import { useProjectsView } from "../../_contexts/ProjectsViewContext/ProjectsViewContext"

export function ProjectsList() {
  const { projects } = useProjectsView()

  return (
    <ul>
      {projects.map((project) => (
        <div key={project.id}>
          <Link href={`/projects/${project.id}`}>
            <li className="text-sm rounded p-3 cursor-pointer hover:bg-gray-100 transition">
              {project.name}
            </li>
          </Link>

          <hr className="border-gray-200 my-0.5" key={project.id + "_divider"} />
        </div>
      ))}
    </ul>
  )
}