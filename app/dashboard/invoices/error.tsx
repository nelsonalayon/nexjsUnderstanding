'use client'    

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);  
    
    return (
        <main className="flex h-screen w-full flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Something went wrong!</h1>
            <p className="text-gray-600">An unexpected error has occurred. Please try again later.</p>
            <button
                onClick={() => reset()}
                className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
                Try Again
            </button>
        </main>
    )
}