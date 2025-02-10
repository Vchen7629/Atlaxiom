"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useSendPasswordResetEmailMutation } from "@/app/lambdas/lambda"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"

const formSchema = z.object({
    email: z.string().min(1, {
        message: "No Username entered"
    }),
})


export function RequestPasswordResetForm() {
    const [sendPasswordResetEmail, { isSuccess, isLoading, isError}] = useSendPasswordResetEmailMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = { email: values.email };

        try {
            const response = await sendPasswordResetEmail(payload).unwrap();
            console.log("success.", response)
        } catch (error) {
            console.error('Error:', error);
        }
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
                    {(isSuccess || isLoading) ? (
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