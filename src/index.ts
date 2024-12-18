import { CustomWindow } from './types';
import Live2D from './Live2D';
import './Message.ts';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, deleteUser, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, validatePassword } from 'firebase/auth';
import { auth, db } from './firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('Firebase initialized successfully');
} catch (error) {
  console.error('Firebase initialization failed', error);
  document.getElementById('loader')!.textContent = 'Firebase initialization failed';
}

export { app };

const provider = new GoogleAuthProvider();

declare const window: CustomWindow;

window.Modules = {
  live2d: Live2D,
  //nlp: NLP,
  //recognition: SpeechRecognition,
  
};

if (app) {
  document.getElementById('loader')!.style.display = 'none';
}


// TODO: better help pleasze
const helpButton = document.getElementById('help')!;
helpButton.onclick = () => alert(
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
let isLoggedIn = false;
const loginText = document.getElementById('login-text')!;
const loginIcon = document.getElementById('login-icon')! as HTMLImageElement;
const googleLoginButton = document.createElement('button');
googleLoginButton.textContent = 'Googleでログイン';
googleLoginButton.classList.add('hidden');
loginButton.parentElement?.insertBefore(googleLoginButton, loginButton.nextSibling);

// Get the auth instance using getAuth(app)
const authInstance = getAuth(app);

const updateLoginButton = (user: any) => {
  if (user) {
    loginText.textContent = 'ログアウト';
    loginIcon.src = 'assets/login_30dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
    isLoggedIn = true;
    googleLoginButton.classList.add('hidden');
  } else {
    loginText.textContent = '未ログイン';
    loginIcon.src = 'assets/login_30dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg';
    isLoggedIn = false;
    googleLoginButton.classList.remove('hidden');
  }
};

onAuthStateChanged(authInstance, (user) => {
  updateLoginButton(user);
});

loginButton.onclick = async () => {
  if (isLoggedIn) {
    try {
      await signOut(authInstance);
      console.log('サインアウト成功');
    } catch (error) {
      console.error('サインアウト失敗', error);
    }
  } else {
    // メールアドレスとパスワードでのログイン
    const email = prompt('メールアドレスを入力してください');
    const password = prompt('パスワードを入力してください');
    if (email && password) {
      try {
        const passwordStatus = await validatePassword(authInstance, password);
        if (!passwordStatus.isValid) {
          alert('パスワードが要件を満たしていません。');
          return;
        }
        await signInWithEmailAndPassword(authInstance, email, password);
        console.log('メールアドレスとパスワードでログイン成功');
      } catch (signInError) {
        console.error('メールアドレスとパスワードでログイン失敗', signInError);
        // ユーザー作成
        try {
          const passwordStatus = await validatePassword(authInstance, password);
          if (!passwordStatus.isValid) {
            alert('パスワードが要件を満たしていません。');
            return;
          }
          await createUserWithEmailAndPassword(authInstance, email, password);
          console.log('ユーザー作成成功');
        } catch (createError) {
          console.error('ユーザー作成失敗', createError);
        }
      }
    }
  }
};

googleLoginButton.onclick = async () => {
    try {
        // Google認証
        await signInWithPopup(authInstance, provider);
        console.log('Googleログイン成功');
      } catch (googleError: any) {
        console.error('Googleログイン失敗', googleError);
        alert(`Googleログインに失敗しました: ${googleError.message}. FirebaseコンソールでGoogleログインが有効になっているか確認してください。`);
      }
}

// パスワードリセット
const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(authInstance, email);
    console.log('パスワードリセットメールを送信しました');
  } catch (error) {
    console.error('パスワードリセットメールの送信に失敗しました', error);
  }
};

// アカウント削除
const deleteAccount = async () => {
  try {
    if (authInstance.currentUser) {
      await deleteUser(authInstance.currentUser);
      console.log('アカウントを削除しました');
    } else {
      console.log('ログインしていません');
    }
  } catch (error) {
    console.error('アカウントの削除に失敗しました', error);
  }
};

// ユーザー情報取得
const getUserInfo = () => {
  const user = authInstance.currentUser;
  if (user) {
    console.log('ユーザーID:', user.uid);
    console.log('メールアドレス:', user.email);
  } else {
    console.log('ユーザーは認証されていません');
  }
};
