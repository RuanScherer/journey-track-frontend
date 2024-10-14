import {backendServerSideClient} from "@/config/api/backend";
import {cookies} from "next/headers";
import {GetProjectTokenResponseDTO} from "@/shared/dto/projects/GetProjectTokenResponseDTO";
import {Input} from "@/components/Input";
import {CopyButton} from "@/components/CopyButton";

interface ProjectTokenViewerProps {
    projectId: string
}

async function getProjectToken(projectId: string) {
    const response = await backendServerSideClient.get<GetProjectTokenResponseDTO>(`/v1/projects/${projectId}/token`, {
        headers: {
            Cookie: cookies().toString(),
        },
    });
    return response.data
}

export async function ProjectTokenViewer(props: ProjectTokenViewerProps) {
    let token: string
    try {
        const response = await getProjectToken(props.projectId);
        token = response.token
    } catch (error) {
        console.error(error);
        token = ""
    }

    return (
        <div className="flex items-center gap-3 w-full">
            <Input.Raw
                className="bg-gray-200 bg-opacity-70 text-ellipsis"
                value={token}
                disabled
            />

            <CopyButton text={token} />
        </div>
    )
}