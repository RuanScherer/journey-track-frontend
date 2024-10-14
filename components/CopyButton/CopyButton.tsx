"use client"

import {useState} from "react";
import {CheckCircle, Copy} from "@phosphor-icons/react/dist/ssr";

interface CopyButtonProps {
    text: string;
}

export function CopyButton(props: CopyButtonProps) {
    const [isCopied, setIsCopied] = useState(false)

    async function handleClick() {
        await navigator.clipboard.writeText(props.text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
    }

    if (isCopied) {
        return (
            <div className="bg-green-200 rounded p-2 hover:bg-green-200 transition">
                <CheckCircle size={18} weight="fill" className="text-green-500" />
            </div>
        )
    }

    return (
        <button className="bg-gray-200 rounded p-2 hover:bg-gray-300 transition" onClick={handleClick}>
            <Copy size={18} className="text-gray-700"/>
        </button>
    )
}
