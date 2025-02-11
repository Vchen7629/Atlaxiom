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
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"

const formSchema = z.object({
    password: z.string().min(1, {
        message: "Password field cannot be left black"
    }),
    confirmpassword: z.string().min(1, {
        message: "Confirm Password field cannot be left black"
    }),
})


export function PasswordResetForm() {
    const [resetPassword, {isSuccess, isError}] = useResetPasswordMutation();
    const { token } = useParams();
    const navigate = useNavigate()
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: "",
            confirmpassword: ""
        },
    })

    async function handleResetPassword(values: z.infer<typeof formSchema>) {
        if (!token) {
            throw new Error("No token provided");
        }
        
        const payload = { newPassword: values.password, token };

        if (values.password !== values.confirmpassword) {
            throw new Error("Passwords don't match");
        }

        try {
            await resetPassword(payload).unwrap();
            navigate("/login")
        } catch {
            throw new Error;
        }
    }

    function onSubmit() {
        const values = form.getValues();
        const promise = handleResetPassword(values);
        toast.promise(promise, {
            loading: "loading...",
            success: () => "Successfully reset password",
            error: (error) => {
                if (error.message === "Passwords don't match") {
                    return "Passwords don't match"
                } else if (error?.status === 404) {
                    return error?.data?.message || "User not found";
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