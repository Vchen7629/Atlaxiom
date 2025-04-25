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
import { useLoginMutation, useRefreshMutation } from "@/app/auth/authApiSlice"
import { useNavigate } from "react-router-dom"
import { toastErrorMessage } from "../cardcollectioncomponents/types/buttontypes"
import { toast } from "sonner"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
import { startTransition } from "react"

const formSchema = z.object({
    username: z.string().min(1, {
        message: "No Username entered"
    }),
    password: z.string().min(1, {
            message: "No Password entered"
    }),
})


export function LoginForm() {
    const navigate = useNavigate()
    const [login] = useLoginMutation()
    const [refresh] = useRefreshMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })

    function handleSignUpClick() {
        startTransition(() => {
            navigate('/signup')
        })
    }

    function handlePasswordReset() {
        startTransition(() => {
            navigate('/requestpasswordreset')
        })
    }

        async function handleSubmit(values: z.infer<typeof formSchema>) {
            try {
                const result = await login({
                username: values.username,
                password: values.password,
                }).unwrap();
        
                if (!result.userId) {
                throw new Error('Missing data in login response');
                }
                
                await refresh()
                
                startTransition(() => {
                    navigate('/profile')
                })
                return Promise.resolve();
            } catch (error) {
                return Promise.reject(error);
            }
        }

        function onSubmit(event: React.MouseEvent<HTMLButtonElement>) {
            event.preventDefault();
            const values = form.getValues();
            const promise = handleSubmit(values);
            toast.promise(promise, {
                loading: "loading...",
                success: () => "sucessfully logged in",
                error: (error: toastErrorMessage) => {
                    if (error?.status === 401) {
                        return error?.data?.message || "Invalid Username or Password";
                    } else if (error?.status === 400) {
                        return error?.data?.message || "Missing Username or Password";
                    } else {
                        return "An unexpected error occurred";
                    }
                },
            })
        }

    return (
        <Form {...form}>
            <form className="relative flex flex-col space-y-4 w-full">
                <div className="flex justify-center mt-[5vh] lg:mt-[1vh]">
                    <FontAwesomeIcon className="text-[hsl(var(--background3))] w-[10vh] h-[10vh] xl:h-[6vh] xl:w-[3vw] p-4 shadow-custom rounded-[24px] bg-[hsl(var(--header))]" icon={faUser}/>
                </div>
                <header className="flex w-full justify-center  mt-[1vh]  mb-3">
                    <span className="text-2xl sm:text-5xl xl:text-4xl text-[hsl(var(--background3))] font-black">Welcome Back</span>
                </header>
                <div className="flex w-full justify-center text-lg mb-[1vh] text-gray-500">
                    <div className="mr-2">Don&apos;t have an account yet? </div>
                    <button type="button" className="text-[hsl(var(--background3))] bg-transparent font-bold" onClick={handleSignUpClick}>
                        Sign Up
                    </button>
                </div>
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">Username</FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))] border-2 border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    
                    
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-gray-400">Password</FormLabel>
                            <FormLabel className="absolute right-0 text-gray-400 hover:text-[hsl(var(--background3))]">
                                <button onClick={handlePasswordReset}>
                                    Forgot your Password ?
                                </button> 
                            </FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))] border-2  border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                <Button onClick={onSubmit} type="button" className="relative top-6 px-6 py-6 rounded-lg bg-[hsl(var(--background3))] font-bold">
                    <h1 className="text-xl text-white">Login</h1>
                </Button>
            </form>
        </Form>
    )
}