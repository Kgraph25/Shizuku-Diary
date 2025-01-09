// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: "AIzaSyC2xQmoosnYMXgmiY4JbCzx8KRfK3kGgJQ",
  authDomain: "my-project-15193-name-diary.firebaseapp.com",
  projectId: "my-project-15193-name-diary",
  storageBucket: "my-project-15193-name-diary.firebasestorage.app",
  messagingSenderId: "410472769008",
  appId: "1:410472769008:web:ce68bdfd3ba911bda4a935",
  measurementId: "G-S4ENDR9WY9"
};
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize the Vertex AI service


//import NLP from "./NLP";
import Live2D from './Live2D';
//import run from './generativeAI';
import { getVertexAI, getGenerativeModel } from "firebase/vertexai";
const vertexAI = getVertexAI(app);

// Initialize the generative model with a model that supports your use case
// Gemini 1.5 models are versatile and can be used with all API capabilities


const text_si = `利用者の取り組みをヒアリングしてガクチカの表現をサポートするために、
キャリアデザインを考えるアシスタントとして論理的に提案を行ってください。
ヒアリングしてエピソードを提案できるように工夫を行ってください。
※ヒアリングを行う際は一問一答で行ってください。
足りない情報があれば質問を行い、次のようなエピソードをハルシネーション無しに提案できるようであれば実行してください。

ガクチカのエピソード例：
「高校時代、バスケットボール部のキャプテンとしてチームを全国大会へ導く重要な役割を担いました。しかし、チーム内での意思疎通の不足と戦術の理解度の低さが大会での成績不振につながっていました。この問題を解決するため、私は週に2回の戦術会議を新たに設け、ビデオ分析を用いて選手たちが戦術を深く理解し実践できるように取り組みました。さらに、チームメンバー間のコミュニケーションを強化するため、練習外でもメンバーが集まる機会を積極的に企画し、チームの結束力を高めました。これらの取り組みは結果として大きな成功を収め、チームは地域大会で優勝し、全国大会でもベスト8という成績を達成しました。これらの経験から、リーダーシップの重要性とチームワークの力を深く理解しました。将来的にはこの学んだスキルを生かし、スポーツチームのマネジメントやコーチングの分野でキャリアを築き、他のスポーツチームでも成功を支援したいと考えています」`

const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",

};
// const botmodel = genAI.getGenerativeModel({
//   model: "gemini-1.5-pro-002",
//   systemInstruction: text_si,
//   // safetySettings: safetySettings,
// });
const botmodel = getGenerativeModel(vertexAI, {  
    model: "gemini-2.0-flash-exp",
    systemInstruction: text_si,
});

const chatSession = botmodel.startChat({
    generationConfig,
    history: [
    ],
  });

const { model, motions } = Live2D;
const form = <HTMLFormElement>document.getElementById('form');
const input = <HTMLInputElement>document.getElementById('message');
const messages = <HTMLElement>document.getElementById('messages');

const createMessage = (sender: 'user' | 'reply', message: string) => {
  const div = document.createElement('div');

  div.className = sender;
  div.innerText = message;

  messages.append(div);
  div.scrollIntoView();
}

const processMessage = async (message: string) => {
  // random delay for "authenticity"
  const delay = Math.random() * 1000 + 300;

  const result = await chatSession.sendMessage(message);
  const answer = await result.response.text();

  const emotion = "joy";

  

  // decide which motion to use by getting the last dot in intent
  const intentMotion = emotion;
  const motionGroup = intentMotion in motions
    ? intentMotion
    : 'talk';

  // randomize motion group
  const random = Math.round(Math.random() * (motions[motionGroup].length - 1));
  const motion = motions[motionGroup][random];

  setTimeout(() => {
    createMessage('reply', answer || "すみません、もう一度言ってみてください。");
    model.motion(motion[0], motion[1]);
  }, delay);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const message = input.value.trim();

  if (!message.length) return;

  createMessage('user', message);
  processMessage(message);

  input.value = '';
});

export { createMessage, processMessage };
