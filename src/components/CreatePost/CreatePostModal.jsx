import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    Divider,
    Textarea,
} from "@heroui/react";
import commentCreatorIcon from '../../assets/images/free-user-icon-3296-thumb.png'
import { IoMdPhotos } from 'react-icons/io'
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { createPost, updatePost } from "../../services/postsServices";



export default function CreatePostModal({ isOpen, onOpenChange, callback, post }) {
    const [isLoading, setIsLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(post?.image || null)
    const [formDataImage, setFormDataImage] = useState(null)


    const fileInput = useRef()
    const userTextArea = useRef()

   function removeSelectedImage() {
    setSelectedImage(null)
    setFormDataImage(null)

}



    

    function chooseFile() {
        const file = fileInput.current.files[0]
        if (!file) return

        setSelectedImage(URL.createObjectURL(file))
        setFormDataImage(file)
    }

    function openFileInput() {
        fileInput.current.click()
    }

    async function createNewPost() {
    const formData = new FormData()

    if (userTextArea.current.value) {
        formData.append("body", userTextArea.current.value)
    }

    if (formDataImage) {
        formData.append("image", formDataImage)
    }


    try {
        setIsLoading(true)

        if (post && post._id) {
            await updatePost(post._id, formData)
        } else {
            await createPost(formData)
        }

        callback()
        onOpenChange(false)

    } catch (error) {
        console.log(error)
    } finally {
        setIsLoading(false)
    }
}


    return (
        <>

            <Modal isOpen={isOpen} placement="top-center" scrollBehavior="inside" onOpenChange={onOpenChange} onClose={() => { setSelectedImage(null); setFormDataImage(null)  }}>
                <ModalContent className="max-w-2xl">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 items-center">Create Post</ModalHeader>
                            <Divider />
                            <ModalBody className="p-3">
                                <div className="flex items-center gap-2 ">
                                    <div>
                                        <img src={commentCreatorIcon} alt="" className="w-12.5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-semibold">Mohamed</span>
                                        <span className="">Active</span>
                                    </div>
                                </div>
                                <Textarea defaultValue={post?.body} ref={userTextArea} minRows={selectedImage ? 3 : 8} placeholder="What's on your mind, Mohamed?" />
                                {selectedImage && <div className="relative">
                                    <img src={selectedImage} alt="image" />
                                    <IoCloseSharp className="absolute top-3 end-3 font-bold text-red-500 text-2xl" onClick={removeSelectedImage} />
                                </div>}
                            </ModalBody>
                            <Divider />
                            <div className="p-4 flex gap-3 items-center">
                                <span className="font-bold">Add to your post:</span>
                                <IoMdPhotos onClick={openFileInput} className="text-3xl text-green-500 cursor-pointer" />
                                <input onChange={chooseFile} ref={fileInput} type="file" hidden />
                            </div>
                            <Divider />
                            <Button onPress={createNewPost} isLoading={isLoading} className="m-4" color="primary" >
                                Post
                            </Button>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
