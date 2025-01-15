import { app } from './init_firebase';
import { getAuth, signInWithRedirect, GoogleAuthProvider, getRedirectResult } from 'firebase/auth';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Providerの名前を変更して分かりやすくしました

export const signInWithGoogle = () => {
    signInWithRedirect(auth, googleProvider);
  };
  
  export const handleRedirectResult = async () => {
    try {
      const result = await getRedirectResult(auth);
      if (result && result.user) {
        // ログイン成功時の処理
        return result.user;
      } else {
        // ログインされていない状態の処理
        return null;
      }
    } catch (error) {
      console.error('リダイレクト結果の取得に失敗しました:', error);
      throw error;
    }
  };
  