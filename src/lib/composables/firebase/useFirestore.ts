import useIdentity from "@composables/useIdentity";
import type {
  IProjectedCredit,
  IProjectedDebit,
  ITransaction,
} from "@interfaces/budget";
import type { IUser } from "@interfaces/user";
import { db } from "@lib/firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION_NAME: string = "users";

export default () => {
  const { generateUid } = useIdentity();

  return {
    updateOrCreateUser: async (user: IUser, id?: string): Promise<void> => {
      const docRef = doc(db, COLLECTION_NAME, id ?? generateUid());
      setDoc(docRef, user, { merge: true });
    },

    getUser: async (id: string): Promise<IUser> => {
      const docRef = doc(db, COLLECTION_NAME, id);
      const docSnap = await getDoc(docRef);

      return docSnap.data() as IUser;
    },

    addProjectedCredit: async (id: string, credit: IProjectedCredit) => {
      const docRef = doc(db, COLLECTION_NAME, id);

      await updateDoc(docRef, {
        "budget.credits": arrayUnion(credit),
      });
    },

    addProjectedDebit: async (id: string, debit: IProjectedDebit) => {
      const docRef = doc(db, COLLECTION_NAME, id);

      await updateDoc(docRef, {
        "budget.debits": arrayUnion(debit),
      });
    },

    addTransaction: async (id: string, txn: ITransaction) => {
      const docRef = doc(db, COLLECTION_NAME, id);

      await updateDoc(docRef, {
        "budget.transactions": arrayUnion(txn),
      });
    },
  };
};
