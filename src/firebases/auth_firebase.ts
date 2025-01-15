import { app } from './init_firebase';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Providerの名前を変更して分かりやすくしました

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        // ログイン成功後の処理
        return result.user; // ログインしたユーザー情報を返す
    } catch (error) {
        // エラー処理
        console.error('ログイン失敗', error);
        throw error; // エラーを上位に伝播させる
    }
};

