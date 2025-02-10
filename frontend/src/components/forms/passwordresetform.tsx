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
import { useResetPasswordMutation } from "@/app/lambdas/lambda"
import { useParams } from "react-router-dom"

const formSchema = z.object({
    password: z.string().min(1, {
        message: "Password field cannot be left black"
    }),
    confirmpassword: z.string().min(1, {
        message: "Password field cannot be left black"
    }),
})


export function PasswordResetForm() {
    const [resetPassword] = useResetPasswordMutation();
    const { token } = useParams();

    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmpassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!token) {
            console.error("No token provided")
            return
        }
        
        const payload = { newPassword: values.password, token };

        try {
            const response = await resetPassword(payload).unwrap();
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">Password</FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))] border-2 border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmpassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">Confirm Password</FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))] border-2 border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                 <Button type="submit" className="px-6 py-2 rounde-lg bg-[hsl(var(--background3))] font-bold">
                    <span>Submit</span>
                </Button>
            </form>
        </Form>
    )
}