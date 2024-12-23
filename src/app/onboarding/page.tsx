'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { OnbordingActions } from "../actions";
import {useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod";
import { onboardingSchemaLocale } from "../lib/zodSchemas";
import { SubmitButton } from "../components/SubmitButtons";

export default function OnboardingRoute(){
    const [lastResult, action] = useActionState(OnbordingActions, undefined);
    const [form, fields ] = useForm({
        lastResult, 
        onValidate({formData}) {
            return parseWithZod(formData, {
                schema : onboardingSchemaLocale,
            })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput",
    })
    return <div className="h-screen w-screen flex items-center justify-center ">
        <Card>
            <CardHeader>
                <CardTitle>
                    Welcome to PlanWise
                </CardTitle>
                <CardDescription>
                    We need the following information to set up your accout
                </CardDescription>
            </CardHeader>
            <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate><CardContent className="flex flex-col gap-y-5 ">
                <div className="grid gap-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input name={fields.fullname.name} defaultValue={fields.fullname.initialValue} key={fields.fullname.key} placeholder="John Doe" type="text" id="name" className=""  />
                    <p className="text-red-500 text-sm">{fields.fullname.errors}</p>
                </div>
                <div className="grid gap-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex rounded-md">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">PlanWise.com/</span>
                        <Input name={fields.username.name} key={fields.username.key} defaultValue={fields.username.initialValue} type="text" id="name" className="rounded-l-none border-l-0" placeholder="@john_doe"/>
                    </div>
                    <p className="text-red-500 text-sm">{fields.username.errors}</p>
                </div>
            </CardContent>
            <CardFooter>
               <SubmitButton text="Submit" className="w-full" />
            </CardFooter>
            </form>
        </Card>

    </div>
}