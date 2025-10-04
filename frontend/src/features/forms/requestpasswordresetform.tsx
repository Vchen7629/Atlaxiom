"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/shared/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/shared/ui/form"
import { Input } from "@/shared/ui/input"
import { useSendPasswordResetEmailMutation } from "@/app/lambdas/lambda"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"
import { toast } from "sonner"

const formSchema = z.object({
    email: z.string().email({
        message: "Please Enter a Valid Email"
    }),
})


export function RequestPasswordResetForm() {
    const [sendPasswordResetEmail, {isSuccess, isError}] = useSendPasswordResetEmailMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function handleRequestPasswordEmail(values: z.infer<typeof formSchema>) {
        const payload = { email: values.email };

        try {
            await sendPasswordResetEmail(payload).unwrap();
        } catch {
            throw new Error
        }
    }

    function onSubmit() {
        const values = form.getValues();
        const promise =  handleRequestPasswordEmail(values);
        toast.promise(promise, {
            loading: "loading...",
            success: () => "If an account exists with this email address, you will receive password reset instructions shortly.",
            error: (error) => {
                if (error?.status === 500) {
                    return error?.data?.message || "Invalid Username or Password";
                } else {
                    return "An unexpected error occurred";
                }
            }
        })
    }
   

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="relative flex flex-col space-y-4 w-full">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">Email</FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))] border-2 border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                 <Button type="submit" className="px-6 py-2 rounde-lg bg-[hsl(var(--background3))] font-bold">
                 {isSuccess ? (
                        <FontAwesomeIcon icon={faCheck} />
                    ) : isError ? (
                        <FontAwesomeIcon icon={faX} />
                    ) : (
                        <span>Submit</span>
                    )}
                </Button>
            </form>
        </Form>
    )
}