import React from "react";
import GroupChatModal from "../components1/GroupChatModal";
import { Button } from "@chakra-ui/react";
import  AddIcon  from '../assert/logo.svg';




const Dashboard = () => {

  
 


 
  return (
    <GroupChatModal>
    <Button
      d="flex"
      fontSize={{ base: "17px", md: "10px", lg: "17px" }}
      rightIcon={<AddIcon />}
    >
      New Group Chat
    </Button>
  </GroupChatModal>

    



    
  )
}

export default Dashboard




