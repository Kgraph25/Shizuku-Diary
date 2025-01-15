import { CustomWindow } from './types';
import Live2D from './Live2D';
import { app } from './init_firebase';
import { signInWithGoogle } from './auth_firebase';


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

document.getElementById('login')!.onclick = async () => {
  try {
      const user = await signInWithGoogle(); // 変更点
      console.log('ログイン成功', user); // ユーザー情報を出力
      document.getElementById('login')!.querySelector('h1')!.textContent = 'ログイン中';
  } catch (error) {
      console.error('ログイン失敗', error);
  }
};
