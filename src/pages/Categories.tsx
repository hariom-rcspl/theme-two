import { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Calendar1, Pencil } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  password: Yup.string().min(6, "Min 6 characters"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match"),
  address: Yup.string().required("Address required"),
  role: Yup.string().required("Select a role"),
});

export default function Categories() {
  const [imagePreview, setImagePreview] = useState(null);
  const [open, setOpen]: any = useState(false)
  const [date, setDate] = useState<Date | undefined>(undefined)

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onloadend = () => setImagePreview(reader?.result);
      reader.readAsDataURL(file);
    }
  };

  const fileInputRef: any = useRef(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full p-4 rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Profile Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              confirmPassword: "",
              address: "",
              role: "",
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => console.log(values)}
          >
            {({ errors, touched, setFieldValue }) => (
              <Form className="space-y-4">
                {/* Profile Image */}
                <div className="flex flex-col items-start gap-3">
                  <Label className="mb-2">Profile Image</Label>

                  {/* Image wrapper */}
                  <div className="relative w-24 h-24">
                    <img
                      src={imagePreview || "/black-tshirt.png"}
                      alt="Preview"
                      className="w-24 h-24 rounded-sm object-cover"
                    />

                    {/* Edit Icon */}
                    <button
                      type="button"
                      onClick={handleClick}
                      className="absolute bottom-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1 rounded-sm"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* Hidden Input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Name */}
                <div>
                  <Label className="mb-2">Name</Label>
                  <Field name="name" as={Input} placeholder="Enter name" />
                  {errors.name && touched.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <Label className="mb-2">Email</Label>
                    <Field name="email" as={Input} placeholder="Enter email" />
                    {errors.email && touched.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="mb-2">Phone</Label>
                    <Field name="phone" as={Input} placeholder="Enter phone" />
                    {errors.phone && touched.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                  </div>

                  {/* Password */}
                  <div>
                    <Label className="mb-2">Password</Label>
                    <Field name="password" type="password" as={Input} placeholder="Enter password" />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label className="mb-2">Confirm Password</Label>
                    <Field name="confirmPassword" type="password" as={Input} placeholder="Confirm password" />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div>
                  <Label className="mb-2">Address</Label>
                  <Field name="address" as={Textarea} placeholder="Enter address" />
                  {errors.address && touched.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-3 gap-5 ">
                  {/* Role Select */}
                  <div>
                    <Label className="mb-2">Role</Label>
                    <Select onValueChange={(v) => setFieldValue("role", v)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.role && touched.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                  </div>

                  {/* date picker  */}
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="date" className="px-1">
                      Date of birth
                    </Label>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          id="date"
                          className="justify-between font-normal w-full"
                        >
                          {date ? date.toLocaleDateString() : "Select date"}
                          <Calendar1 />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          captionLayout="dropdown"
                          onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex items-center gap-3">
                    <Label className="mb-2">Gender</Label>
                    <RadioGroup defaultValue="male" className="flex">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">male</Label>
                      </div>
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mb-8">
                  <Label>Permission</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="read" />
                      <Label htmlFor="read">View</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="write" />
                      <Label htmlFor="write">Write</Label>
                    </div>
                     <div className="flex items-center gap-3">
                      <Checkbox id="delete" />
                      <Label htmlFor="delete">Delete</Label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 ">
                  <Switch id="tandc" />
                  <Label htmlFor="tandc">I agree terms and condition</Label>
                </div>

                <Button type="submit" className="w-full">Save Changes</Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
}
