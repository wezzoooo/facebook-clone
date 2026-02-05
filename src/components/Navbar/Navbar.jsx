import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Badge,
  Skeleton,
} from "@heroui/react";
import logo from '../../assets/images/logo.png'

import { FiSearch } from 'react-icons/fi'
import { IoIosNotifications } from 'react-icons/io'
import { RiMessengerFill } from 'react-icons/ri'
import { useContext } from "react";
import { authContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { userContext } from "../../context/UserContext";





export default function Navbar() {


  const { setToken } = useContext(authContext)
  const { userData, isLoading } = useContext(userContext)


  function logOutUser() {
    localStorage.removeItem("userToken")
    setToken(false)
  }
  return (
    <>
      <HeroNavbar isBordered maxWidth="xl">

        <NavbarBrand className="mr-4">
          <Link to={"/"} className="cursor-pointer flex">
            <img src={logo} alt="logo" className="w-7.5 me-1" />
            <p className="hidden sm:block font-bold text-inherit text-xl">Nexify</p>
          </Link>

        </NavbarBrand>

        <NavbarBrand>
          <Input
            classNames={{
              base: "max-w-full  h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={<FiSearch className="text-xl" />}
            type="search"
            radius="full"
          />
        </NavbarBrand>


        <NavbarContent as="div" className="items-center" justify="end">

          <NavbarBrand className=" rounded-full bg-gray-200 p-2 grow-0">
            <Badge color="danger" content="5">
              <IoIosNotifications className="text-2xl" />
            </Badge>
          </NavbarBrand>

          <NavbarBrand className=" rounded-full bg-gray-200 p-2 grow-0">
            <Badge color="danger" content="5">
              <RiMessengerFill className="text-2xl" />
            </Badge>
          </NavbarBrand>


          <Dropdown placement="bottom-end">
            <DropdownTrigger className="cursor-pointer">
              {isLoading ? <Skeleton className="size-10 rounded-full" /> : <Avatar
                isBordered
                as="button"
                name={userData.name}
                size="sm"
                src={userData.photo}
              />}
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userData.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">
                <Link to="/profile">
                  My Profile
                </Link>
              </DropdownItem>
              <DropdownItem onClick={logOutUser} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </HeroNavbar>

    </>
  );
}
