import { CustomWindow } from './types';
import Live2D from './Live2D';
import { app } from './firebases/init_firebase';
import { signInWithGoogle } from './firebases/auth_firebase';
import { getAuth } from "firebase/auth";
import * as authManager from './auth/authManager'; // authManager.ts をインポート
import './message/Message';



declare const window: CustomWindow;

window.Modules = {
  live2d: Live2D,
  //nlp: NLP,
  //recognition: SpeechRecognition,
};

if (app) {
  document.getElementById('loader')!.style.display = 'none';
}

// ヘルプ表示
document.getElementById('help')!.onclick = () => alert(
  '簡単な利用説明です。\n' +
  '\n' +
  '> 小さな目的 <\n' +
  'しずくはあなたの日々の取組みから「少しだけ」ガクチカを見つけることに特化したAIです\n' +
  '\n' +
  '> ちょっとした使い方 <\n' +
  '今日あったことを一言入力してください。例：「今日は調理実習だった」\n 受け取ったしずくはそれに対してあなたがどのようなことを思い、感じて取り組んだか聞き出します。\n' +
  'あなたが感じた難しかったことにどう立ち向かったかに対してしずくはそれが社会においてどんな役に立つのかを教えてくれます\n' +
  '\n' +
  '> 最後に <\n' +
  'このプロジェクトにおいていちばん大切なことは\n皆さんには就職活動は小さな成長の積み重ねで大きな結果につながることを感じてもらいたいところにあります。\nプロジェクトメンバー一同はあなたの就職活動が輝きある試みの一つになれることを願っております！！！'
);


const loginButton = document.getElementById('login')!;
const loginStatus = loginButton.querySelector('h1')!;

// 単一のクリックハンドラを定義
loginButton.onclick = async () => {
  const auth = getAuth();
  if (auth.currentUser) {
    // ログイン済みの場合：ログアウト処理
    try {
      await authManager.logout();
      loginStatus.textContent = 'ログイン';
      console.log('ログアウトしました');
    } catch (error) {
      console.error('ログアウトエラー:', error);
      alert('ログアウト中にエラーが発生しました。');
    }
  } else {
    // ログインしていない場合：ログイン処理
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('ログインエラー:', error);
      alert('ログイン中にエラーが発生しました。');
    }
  }
};


// ログイン状態の監視とUIの更新
const authInstance = getAuth();
authInstance.onAuthStateChanged((user) => {
  if (user) {
    authManager.setUidToLocalStorage(user.uid);
    loginStatus.textContent = 'ログアウト';
    console.log('ログイン済みユーザー:', user);

    if (user.email) {
      alert('ようこそ！\n' + user.email);
    } else {
      console.log("メールアドレスは提供されていません。");
    }

  } else {
    if (authManager.isLoggedIn()) { // LocalStorageのチェック
      loginStatus.textContent = 'ログアウト';
      console.log('ローカルストレージにUIDが存在します:', authManager.getUidFromLocalStorage());

      //FirebaseとLocalStorageの不整合が発生しているのでログアウトを実行
      authManager.logout()

    } else {
      loginStatus.textContent = 'ログイン';
    }
  }
});
