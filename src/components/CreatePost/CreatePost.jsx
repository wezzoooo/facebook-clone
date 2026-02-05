import {Card, Input, useDisclosure} from "@heroui/react";
import CreatePostModal from "./CreatePostModal";
import { useContext } from "react";
import { userContext } from "../../context/UserContext";

export default function CreatePost({getPosts}) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {userData , isLoading} = useContext(userContext)

  if (isLoading) {
    return null
  }

  return (
    <>
    <Card >

      <div className="flex items-center gap-2 p-2"> 
        <div>
          <img src= {userData.photo} alt=""  className="w-12.5 rounded-full h-12.5"/>
        </div>
        <Input onClick={onOpen} isReadOnly type="text" placeholder= {`What's on your mind, ${userData?.name || 'User'}?`}/>
      </div>

    </Card>
    <CreatePostModal callback={getPosts} isOpen={isOpen} onOpenChange={onOpenChange}/>
  </>);
}

