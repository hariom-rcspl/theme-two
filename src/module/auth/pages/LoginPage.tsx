import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Eye, EyeClosed } from "lucide-react"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { localLogin } from "../redux/authSlice"

export function LoginPage() {

    const [showPassword, setShowPassword] = useState(false)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            const data = {
                email: values.email,
                password: values.password
            }
            const res = await dispatch(localLogin(data))
            console.log('res ', res)
        }
    })

    return (
        <div className="w-full min-h-screen p-10 grid items-center">
            <Card className="max-w-4xl mx-auto w-full p-0 overflow-hidden bg-white grid md:grid-cols-2">
                <div className="flex flex-col justify-center py-7">
                    <CardHeader>
                        <CardTitle>Login to your account</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit} className="mt-5">
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label htmlFor="email" className="mb-2">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password" className="mb-2">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="********"
                                            required
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <div
                                            className="absolute top-1/2 right-2 -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Eye size={17} /> : <EyeClosed size={17} />}
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit">Login</Button>
                            </div>
                        </form>
                    </CardContent>
                </div>
                <div className="bg-muted relative hidden md:block h-96">
                    <img
                        src="/login.png"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    />
                </div>
            </Card>
        </div>
    )
}

