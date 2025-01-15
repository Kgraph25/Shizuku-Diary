import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { app } from './init_firebase'; // init_firebase.ts をインポート

const db = getFirestore(app);

export const setUserLoggedInStatus = async (uid: string, loggedIn: boolean): Promise<void> => {
  try {
    await setDoc(doc(db, "users", uid), { loggedIn });
  } catch (error) {
    console.error("ユーザーログイン状態の更新に失敗しました:", error);
    throw error; // エラーを上位に伝播させる
  }
};


// ユーザー情報の取得（例）
export const getUserInfo = async (uid: string) => {
  try{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error){
    console.error("ユーザー情報の取得に失敗しました:", error);
    throw error;
  }
};

// 他の Firestore 関数もここに追加できます (例: ユーザー登録、データ取得など)
