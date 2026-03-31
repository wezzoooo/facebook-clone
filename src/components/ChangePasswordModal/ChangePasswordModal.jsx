
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from "@heroui/react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { changePasswordSchema } from '../../lib/validation/changePasswordSchema'
import { changePassword } from "../../services/authServices"
import { Flip, toast } from "react-toastify"
import { IoEye, IoEyeOff } from "react-icons/io5"
import { useState } from "react"

export default function ChangePasswordModal({ isOpen, onOpenChange }) {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(changePasswordSchema),
        mode: "all",
        defaultValues: {
            password: "",
            newPassword: "",
            reNewPassword: "",
        },
    })

    async function onSubmit(formData) {
        try {
            await changePassword(formData)

            toast.success("Password Updated Successfully", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                transition: Flip,
            })

            reset()
            onOpenChange(false)
        } catch (error) {
            toast.error(error.response?.data?.error || "Something went wrong", {
                position: "top-right",
                autoClose: 2000,
                theme: "light",
                transition: Flip,
            })
        }
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>Change Password</ModalHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalBody className="space-y-4">

                        <Input
                            {...register("password")}
                            label="Current Password"
                            type={showPassword ? "text" : "password"}
                            errorMessage={errors.password?.message}
                            isInvalid={Boolean(errors.password)}
                        />

                        <Input
                            {...register("newPassword")}
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            errorMessage={errors.newPassword?.message}
                            isInvalid={Boolean(errors.newPassword)}
                            endContent={
                                showPassword ? (
                                    <IoEyeOff
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setShowPassword(false)}
                                    />
                                ) : (
                                    <IoEye
                                        className="text-2xl cursor-pointer"
                                        onClick={() => setShowPassword(true)}
                                    />
                                )
                            }
                        />

                        <Input
                            {...register("reNewPassword")}
                            label="RePassword"
                            type={showPassword ? "text" : "password"}
                            errorMessage={errors.reNewPassword?.message}
                            isInvalid={Boolean(errors.reNewPassword)}
                        />

                    </ModalBody>

                    <ModalFooter>
                        <Button isLoading={isSubmitting} type="submit" color="primary">
                            Update
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
