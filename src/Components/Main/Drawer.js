import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Button, Input, Avatar, Box
  } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react'
  import React from 'react'
  import { useNavigate } from 'react-router-dom';
  
import { logout, db, auth } from '../../firebase-config';


  function DrawerExample(props) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()

    const navigate = useNavigate();
    const signOut = ()=>{
        logout();
        navigate("/");
    }
      
    return (
      <>
        <Avatar cursor='pointer' onClick={onOpen} size='lg' src={props.image}/>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Account</DrawerHeader>
  
            <DrawerBody>
        <Button onClick={()=>console.log} bg='transparent' fontWeight='bold' color='gray.500'>Portofolio</Button>
            </DrawerBody>
  
            <DrawerFooter display='flex' gap={1} alignItems='center'>
              
                  <Button fontSize='0.9rem' px={2} bg='gray.300' >UMKM</Button>
                  <Button fontSize='0.9rem' px={2} bg='#14BBC6' onClick={signOut}>Keluar akun</Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
  }

  export default DrawerExample;