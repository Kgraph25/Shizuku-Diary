import { app } from './init_firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider, User, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { setUserLoggedInStatus } from "./store_firebase";

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence) // ここに追加
  .catch((error) => {
    console.error("永続性の設定エラー:", error);
  });

export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<User | null> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        await setUserLoggedInStatus(result.user.uid, true);
        return result.user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Googleサインインに失敗しました:', error);
      return null;
    }
  };
  