import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase-config';

//Payment interest due date

const updateJatuhTempo = async (umkm, refetch, dDay, paymentDate) => {
  const setNextPaymentDate = () => {
    const nextPaymentDate = paymentDate;
    nextPaymentDate.setDate(nextPaymentDate.getDate() + umkm?.angsuran * 30);
    return nextPaymentDate;
  };

  if (dDay.getTime() > paymentDate.getTime()) {
    if (umkm?.hasPay === 0) {
      await updateDoc(doc(db, 'umkm', umkm?.umkmId), {
        late: 1,
      });
    } else {
      await updateDoc(doc(db, 'umkm', umkm?.umkmId), {
        hasPay: 0,
        late: 0,
        date: setNextPaymentDate(),
      });
    }
    refetch();
  } else {
    // console.log('fail or either you paid');
  }
};

export default updateJatuhTempo;
