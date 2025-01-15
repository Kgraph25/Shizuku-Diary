import { signOut } from "firebase/auth";
import { auth } from "../firebases/auth_firebase"; // auth_firebase.ts から auth をインポート

// ローカルストレージからUIDを取得する関数
export function getUidFromLocalStorage(): string | null {
  return localStorage.getItem('uid');
}

// ローカルストレージにUIDを保存する関数
export function setUidToLocalStorage(uid: string): void {
  localStorage.setItem('uid', uid);
}

// ローカルストレージからUIDを削除する関数
export function removeUidFromLocalStorage(): void {
  localStorage.removeItem('uid');
}

// ログアウト処理
export async function logout(): Promise<void> {
  try {
    await signOut(auth);
    removeUidFromLocalStorage();
  } catch (error) {
    console.error('ログアウトエラー:', error);
    // エラー処理を追加する必要があるかもしれません。 例えば、アラートを表示するなど。
    throw error; // エラーを上位に伝播させる
  }
}

// ログイン状態を取得
export function isLoggedIn(): boolean {
  return !!getUidFromLocalStorage();
}


