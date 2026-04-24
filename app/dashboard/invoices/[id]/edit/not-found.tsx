import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-4"> 
            <FaceFrownIcon className="h-16 w-16 text-gray-400" />
            <h1 className="text-2xl font-bold">Invoice Not Found</h1>
            <p className="text-gray-600">The invoice you are looking for does not exist.</p>
            <Link   
                href="/dashboard/invoices"
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >   
                Back to Invoices
            </Link>
        </main>
    )
}   