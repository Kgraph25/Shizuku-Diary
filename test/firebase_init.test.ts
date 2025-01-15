import { app } from '../src/index';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import * as admin from 'firebase-admin';

// テスト前にEmulatorを初期化。これはグローバルなsetupかbeforeEachで実行。
beforeAll(async () => {
  // Emulatorを初期化（既に起動している場合、この部分はスキップ）
  try {
    await admin.initializeApp(); // appの設定はfirebase_init.tsに任せる
  } catch (e){
    console.log("Emulator initialization failed.", e)
  }
});


// テストケース
describe('Firebase initialization with Emulator', () => {

  it('should connect to the Firebase Emulator successfully', async () => {
    // Emulatorに接続できていることを確認するテスト。 例えば、admin.app().database() にアクセスしてエラーがないことを確認。
    expect(admin.app().database()).toBeDefined(); // このアサーションは必要に応じて変更する
  });

  it('should initialize Firebase successfully using Emulator', () => {
    // シナリオ2のテスト: 正常な初期化 (Emulatorを使用)
    expect(app).toBeDefined();
    // ... アサーション ... (loaderの表示状態を確認)
  });


  it('should handle Firebase initialization error (Emulator connection failure)', () => {
    // シナリオ3のテスト: Emulatorが起動していない、または接続設定が間違っている場合
    // Emulatorを意図的に停止してテストする。または、接続設定を間違ったものに変更してテストする。
    // このテストは、Emulatorが起動していないことを前提としたアサーションを行う。
    // 例えば、initErrorがnullでないことや、特定のエラーメッセージが含まれていることを確認。
  });

  it('should handle Firebase initialization error (Emulator database error)', async () => {
    // シナリオ4のテスト: Emulatorのデータベースエラー
    // データベースに不正なアクセスを試み、エラーが発生することを確認。
    // Firebaseのセキュリティルールを使ってアクセス拒否を設定し、それをテストする。
  });

  it('should successfully sign in using Emulator', async () => {
    // シナリオ5のテスト: Emulatorの認証サービスを使ってログインに成功
    if (app) {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      // Emulatorで作成したテストユーザーの資格情報を使用する
      const result = await signInWithPopup(auth, provider); // signInWithPopupをモックせずにEmulatorと通信させる
      expect(result.user).toBeDefined();
    }
  });

  it('should handle sign in failure using Emulator', async () => {
    // シナリオ6のテスト: Emulatorの認証サービスを使ってログインに失敗
    if (app) {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      // 存在しないユーザーでログインを試みるなど、ログイン失敗を誘発する処理。
      try {
          await signInWithPopup(auth, provider);
          fail("ログインに失敗するはずだった"); // 期待通りに失敗しなかった場合にテストを失敗させる
      } catch (error) {
          expect(error).toBeDefined();
      }
    }
  });
});

// afterAllでEmulatorのクリーンアップ（必要であれば）
afterAll(async() => {
  await admin.app().delete();
})
