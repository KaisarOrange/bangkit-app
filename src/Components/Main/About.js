import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Image,Text } from '@chakra-ui/react'
import { doc, getDoc, query, where, collection } from 'firebase/firestore'
import { db, storage } from '../../firebase-config'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getDownloadURL, ref } from 'firebase/storage'
import Checkout from './Checkout'

function About() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [umkm, setUmkm] = useState({});
    const [user, setUser] = useState({});
    const [userImage, setUserImage] = useState("");
    
    
    async  function fetchUMKM(){
        const ref = doc(db,"umkm", id);
        try{
            
        const docSnap = await getDoc(ref);
        const data =  docSnap.data();
       setUmkm(data);
        }catch(err){
            console.log(err);
        }
    };

   
useEffect(()=>{
    fetchUMKM();

},[]);
  return (
    <Box m='auto' display='flex' flexDirection='column' justifyContent='center' alignItems='center' >
        
        <Image w='50vw' src={umkm.imageUrl}/>
        
        <Avatar src={umkm.ownerPhoto}/>
        <Text>{umkm.nama}</Text>
        <Text>{umkm.deskripsi}</Text>
        <Text>{umkm.dana}</Text>
        <Checkout id={id} umkm={ umkm }/>
        <Button onClick={()=>console.log(umkm)}></Button>
    </Box>
  )
}

export default About