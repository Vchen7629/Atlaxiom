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
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useSendContactEmailMutation } from "@/app/lambdas/lambda.ts"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons"

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required for contact"
    }),
    email: z.string().min(2, {
            message: "Email must be at least 2 characters."
    }),
    subject: z.union([
        z.string().max(200, {
            message: "Please keep subject within 200 letters"
        }), 
        z.string().min(1, {
            message: "Subject Line is Empty"
        })
    ]),
    body: z.string().min(1, {
        message: "Message is Empty, please enter a message"
    })
})


export function ContactForm() {
    const email = useSelector((state: { auth: { email: string } }) => state.auth.email);
    console.log(email)
    const username = useSelector((state: { auth: { username: string } }) => state.auth.username);
    const [sendContactEmail, { isSuccess, isLoading, isError}] = useSendContactEmailMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            username: "",
            subject: "",
            body: ""
        },
    })

    useEffect(() => {
        if (username && email) {
            form.reset({
                email: email,
                username: username,
                subject: "",
                body: "",
            });
        }
    }, [email, username, form]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const payload = {
            username: values.username,
            email: values.email,
            subject: values.subject,
            body: values.body
        };
        try {
            const response = await sendContactEmail(payload).unwrap();
            console.log("success.", response)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-[20vw]">
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
                <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-gray-400">Subject</FormLabel>
                            <FormControl>
                                <Input className="bg-transparent text-[hsl(var(--text))]  border-2 border-gray-400 focus:border-[hsl(var(--background3))]" {...field}/>
                            </FormControl>
                            <FormMessage className="text-md"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel className="text-gray-400">Message</FormLabel>
                            <FormControl>
                                <textarea 
                                    className="bg-transparent text-[hsl(var(--text))] p-2 h-32 rounded-lg align-top 2 border-2 border-gray-400 focus:border-[hsl(var(--background3))]" 
                                    {...field}
                                />
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