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
                    <AlertDialogTitle>Недостаточно кредитов</AlertDialogTitle>
                    <AlertDialogDescription>
                        У вас недостаточно кредитов для выполнения этой операции.
                        Пожалуйста, пополните баланс.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => router.back()}>
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => router.push('/credits')}>
                        Купить кредиты
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}