import { Button, DatePicker, Input, Select, SelectItem } from '@heroui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { registerSchema } from '../../../lib/schema/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { registerUser  } from '../../../services/authServices'
import { Flip, toast } from 'react-toastify'

export default function Register() {
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState()
  const [success, setSuccess] = useState()
  const [showPassword, setshowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors,isSubmitting }} = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: ""
    }
  })


  async function onSubmit(formData) {
    console.log(formData);
    try {
      setSuccess("")
      setErrorMsg("")
      const response = await registerUser(formData)
      console.log(response);
      if (response.data.message == "success") {
        toast.success("Signed Up Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip,
        })
        navigate("/login")
        setSuccess("Account Created Successfully")
      }

    } catch (error) {
      console.log(error);
      setErrorMsg(error.response.data.error)
      toast.error(error.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Flip,
        })
    }
    
  }


  return (
    <>
      <main className='max-w-3xl w-full space-y-5'>
        <h1 className='text-3xl font-bold'>
          Welcome To Nexify - Connect Now!
        </h1>
        <p className='text-lg font-medium'>Sign Up to join our community</p>
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name")} label="Name" type="text"
            errorMessage={errors.name?.message} isInvalid={Boolean(errors.name)} />

          <Input {...register("email")} label="Email" type="email"
            errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)} />

          <Input {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
            errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)}
            endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer' onClick={() => { setshowPassword(false) }} /> :
              <IoEye className='text-2xl cursor-pointer' onClick={() => { setshowPassword(true) }} />} />

          <Input {...register("rePassword")} label="RePassword" type={`${showPassword ? "text" : "password"}`}
            errorMessage={errors.rePassword?.message} isInvalid={Boolean(errors.rePassword)} />

          <div className="flex justify-between items-center gap-2">
            <Input {...register("dateOfBirth")} label="Birth date" type='date'
              errorMessage={errors.dateOfBirth?.message} isInvalid={Boolean(errors.dateOfBirth)} />

            <Select {...register("gender")} label="Gender"
              errorMessage={errors.gender?.message} isInvalid={Boolean(errors.gender)} >

              <SelectItem key="male">Male</SelectItem>
              <SelectItem key="female">Female</SelectItem>

            </Select>
          </div>
          <div className="flex justify-between items-center">
            <Button isLoading={isSubmitting} type='submit' color="primary">Submit</Button>
            <p>Already have an account ?
              <Link className='font-bold ms-1' to={"/login"}>
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </main>


    </>
  )
}
