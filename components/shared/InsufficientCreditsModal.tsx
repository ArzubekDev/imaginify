'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export function InsufficientCreditsModal() {
    const router = useRouter()

    return (
        <AlertDialog defaultOpen> 
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Insufficient Credits</AlertDialogTitle>
                    <AlertDialogDescription>
                       You don't have enough credits to perform this action.
                       Please top up your balance.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => router.back()}>
                         Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => router.push('/credits')}>
                         Buy Credits
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}