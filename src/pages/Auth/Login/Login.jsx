import { Button, Input } from '@heroui/react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { loginSchema } from '../../../lib/schema/authSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { loginUser } from '../../../services/authServices'
import { Flip, toast } from 'react-toastify'
import { authContext } from '../../../context/AuthContext'

export default function Login() {

  const {setToken} = useContext(authContext)
  const navigate = useNavigate()
  const [errorMsg, setErrorMsg] = useState()
  const [success, setSuccess] = useState()
  const [showPassword, setshowPassword] = useState(false)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "all",
    defaultValues: {
      email: "",
      password: ""
    }
  })


  async function onSubmit(formData) {
    
    try {
      setSuccess("")
      setErrorMsg("")
      const {data} = await loginUser(formData)
      console.log(data);
      localStorage.setItem("userToken", data?.token)
      setToken(data?.token)
      if (data.message == "success") {
        toast.success("Logged In Successfully", {
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
      navigate("/")
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
          Welcome Back To Nexify - Connect Now!
        </h1>
        <p className='text-lg font-medium'>Sign In to join our community</p>
        <form className='space-y-5' onSubmit={handleSubmit(onSubmit)}>

          <Input {...register("email")} label="Email" type="email"
            errorMessage={errors.email?.message} isInvalid={Boolean(errors.email)} />

          <Input {...register("password")} label="Password" type={`${showPassword ? "text" : "password"}`}
            errorMessage={errors.password?.message} isInvalid={Boolean(errors.password)}
            endContent={showPassword ? <IoEyeOff className='text-2xl cursor-pointer' onClick={() => { setshowPassword(false) }} /> :
              <IoEye className='text-2xl cursor-pointer' onClick={() => { setshowPassword(true) }} />} />

          <div className="flex justify-between items-center">
            <Button isLoading={isSubmitting} type='submit' color="primary">Login</Button>
            <p>Dosent have an account ?
              <Link className='font-bold ms-1' to={"/register"}>
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </main>


    </>
  )
}
