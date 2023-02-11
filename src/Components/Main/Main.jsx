import { Box } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { db, auth } from '../../firebase-config';
import { query, collection, getDocs, where } from 'firebase/firestore';
import Navbar from './Navbar/Navbar';
import Loading from './Loading';
import BanNotif from './beranda menu/BanNotif';

function Main() {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth);

  const [filterUmkm, setFilterUmkm] = useState('');

  const fetchUMKM = async () => {
    const umkmCollectionRef = collection(db, 'umkm');
    try {
      const data = await getDocs(umkmCollectionRef);
      return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      //setUmkm(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading } = useQuery(['umkm'], fetchUMKM);

  const {
    data: userData,
    refetch,
    isSuccess,
  } = useQuery(
    ['userDataNav'],
    async () => {
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
      try {
        const doc = await getDocs(q);
        return doc.docs[0].data();

        //  const image = await getDownloadURL(ref(storage, data.picture));
      } catch (err) {
        console.error(err);
      }
    },
    { enabled: Boolean(user) }
  );

  useEffect(() => {
    //logout();
    if (loading) return;
    if (!user || user?.uid === 'Y7MrD3c4KNTFSXDTQEIS06V8ZpC2') {
      if (user?.uid === 'Y7MrD3c4KNTFSXDTQEIS06V8ZpC2') {
        return navigate('/admin');
      } else {
        refetch();
        return navigate('/');
      }
    }
    console.log(userData);
  }, [user, loading]);

  if (isSuccess) {
    if (userData?.isBan === 1) {
      return <BanNotif isOpen={true} />;
    }
  }
  if (isLoading) {
    return <Loading />;
  }

  return (
    <Box pt={100} pb={10}>
      <Navbar
        filterUmkm={filterUmkm}
        setFilterUmkm={setFilterUmkm}
        name={userData?.name}
        image={userData?.picture}
      />
      <Outlet context={{ fetchUMKM: [fetchUMKM], filterUmkm: [filterUmkm] }} />
    </Box>
  );
}

export default Main;

//<Button onClick={() => console.log(filterUmkm)}>Hello</Button>
