import {Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Button,useDisclosure,FormControl,
  Input,
  useToast,
  Box,
} from "@chakra-ui/react";


import axios from "axios";
import { useEffect, useState } from "react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import { useNavigate } from "react-router-dom";
import { getUsersByNameRoute, host, allUsersRoute } from "../utils/APIRoutes";
import {  Text } from "@chakra-ui/layout";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const [user, setUser] = useState();
  const [chats, setChats] = useState();
  const history = useNavigate();

 
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    setUser(userInfo.userId);
    console.log(userInfo.userId);

    const userInfo1 = JSON.parse(localStorage.getItem("chat-app-current-user"));
   // setUser(userInfo);
    console.log(userInfo1);



    if (!userInfo) history.push("/");
  
  }, [history]);
  //const {  chats, setChats } = ChatState();
  

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: "User already added",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    console.log(search);
    if (!query) {
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      //const data = await axios.get(`${allUsersRoute}/${currentUser.userId._id}`)
      console.log(query);
      const { data } = await axios.get(`http://localhost:8000/users/getuserbyname?search=${query}`,config, {
        search :query
      });
      
     
      setLoading(false);
      setSearchResult(data.users);
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:8000/chat/createGroupChat`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      onClose();
      toast({
        title: "New Group Chat Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Failed to Create the Chat!",
        description: error.response,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            d="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">

          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create Chat
            </Button>
          </ModalFooter>

            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add Users eg: John, Piyush, Jane"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w="100%" d="flex" flexWrap="wrap">
              {selectedUsers.map((u) => (
                
               <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                /> 
              ))}
            </Box>
            <div className="Box">

            { searchResult?.slice(0, 10).map((user,index) =>  {
              return (
                <div  className="contactbox">
                <img
                className="set-avatar-avatar-image"
                name={user.username}
                src={`data:image/svg+xml;base64,${user.avatarURL}`}
                onClick={() => handleGroup(user) }
                key={user}
                

                
               />

               <div className="contact-username">
                 <Text>{user.username}</Text>
                 <Text fontSize="xs">
                   <b>Email : </b>
                   {user.email}
                   
                   
                 </Text>


               </div>
               </div>
              );

            })}
          </div>
           
            
           
          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
