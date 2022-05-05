import React from 'react'
import { Button } from "@chakra-ui/react";
import  {AddIcon}  from '@chakra-ui/icons';
import GroupChatModal from "../components1/GroupChatModal";

function group() {
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

export default group