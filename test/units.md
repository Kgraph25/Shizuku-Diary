# テスト仕様書

## 概要

このドキュメントでは、Live2Dモデル、メッセージ表示機能、音声認識機能のテストについて記述します。

## テスト対象

-   `Live2D`モデル
-   `Message`
-   `SpeechRecognition`

## テスト環境

-   ブラウザ: Chrome
-   OS: macOS Monterey

## テストケース

### Live2Dモデルのテスト

```typescript
describe('Live2D', () => {
  let canvas: HTMLCanvasElement;
  let context: WebGLRenderingContext;

  beforeEach(() => {
    canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;
    context = canvas.getContext('webgl') as WebGLRenderingContext;
    if (!context) {
      context = canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    }
    Live2D.init(canvas, context);
  });

  it('should initialize Live2D library', () => {
    expect(Live2D.live2d).toBeDefined();
    expect(Live2D.captureFrame).toBeDefined();
    expect(Live2D.setCaptureFrame).toBeDefined();
    expect(Live2D.model).toBeNull();
  });

  it('should load a model', async () => {
    await Live2D.loadModel('/live2d/shizuku.model.json');
    expect(Live2D.model).toBeDefined();
  });

  it('should handle tap events', () => {
    const mockTap = jest.fn();
    Live2D.model = {
      tap: mockTap,
      internalModel: {
        getDrawableBounds: () => ({
          x: 0,
          y: 0,
          width: 500,
          height: 500
        })
      }
    } as any;

    Live2D.tap(250, 250);
    expect(mockTap).toHaveBeenCalledWith(250, 250);
  });
});
```

### メッセージ表示機能のテスト

```typescript
import { createMessage, processMessage } from '../src/Message';

describe('Message', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="message-container"></div>
    `;
  });

  it('should create a user message', () => {
    createMessage('user', 'Test message');
    const messageElement = document.querySelector('.message.user') as HTMLDivElement;
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toBe('Test message');
  });

  it('should create a reply message', () => {
    createMessage('reply', 'Test reply');
    const messageElement = document.querySelector('.message.reply') as HTMLDivElement;
    expect(messageElement).toBeTruthy();
    expect(messageElement.textContent).toBe('Test reply');
  });

  it('should process a message', () => {
    const mockCreateMessage = jest.fn();
    createMessage = mockCreateMessage;

    processMessage('Test message');
    expect(processMessage).toHaveBeenCalledWith('Test message');
  });
});
```

### 音声認識機能のテスト

```typescript
describe('SpeechRecognition', () => {
  beforeEach(() => {
    // 各テストの前にモックをリセット
    jest.clearAllMocks();
  });

  it('should initialize SpeechRecognition correctly', () => {
    expect(SpeechRecognition.continuous).toBe(true);
    expect(SpeechRecognition.interimResults).toBe(true);
    expect(SpeechRecognition.lang).toBe('en-US');
    expect(SpeechRecognition.maxAlternatives).toBe(1);
    expect(SpeechRecognition.recording).toBe(false);
    expect(SpeechRecognition.transcript).toBe('');
  });

  it('should toggle start/stop on button click', () => {
    const startSpy = jest.spyOn(SpeechRecognition, 'start');
    const stopSpy = jest.spyOn(SpeechRecognition, 'stop');

    // 初期状態では start が呼ばれるはず
    button.click();
    expect(startSpy).toHaveBeenCalled();

    // 2回目のクリックで stop が呼ばれるはず
    SpeechRecognition.recording = true;
    button.click();
    expect(stopSpy).toHaveBeenCalled();
  });

  it('should change language on lang button click', () => {
    lang.click();
    expect(SpeechRecognition.lang).toBe('id-ID');
    lang.click();
    expect(SpeechRecognition.lang).toBe('ja-JP');
    lang.click();
    expect(SpeechRecognition.lang).toBe('en-US');
  });

  it('should handle onend event correctly', () => {
    SpeechRecognition.transcript = 'Test transcript';
    SpeechRecognition.onend();

    expect(SpeechRecognition.recording).toBe(false);
    expect(SpeechRecognition.transcript).toBe('');
    expect(input.value).toBe('');
    expect(send.disabled).toBe(true);
    expect(input.disabled).toBe(false);
  });

  it('should handle onerror event correctly', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    SpeechRecognition.onerror({ error: 'no-speech' });
    expect(alertSpy).toHaveBeenCalledWith('No speeches detected, try to adjust your microphone');

    SpeechRecognition.onerror({ error: 'network' });
    expect(alertSpy).toHaveBeenCalledWith('A good internet connection is required, try again later');

    SpeechRecognition.onerror({ error: 'audio-capture' });
    expect(alertSpy).toHaveBeenCalledWith('No input device detected');

    SpeechRecognition.onerror({ error: 'not-allowed' });
    expect(alertSpy).toHaveBeenCalledWith('Access to microphone was denied');

    // 未知のエラー
    SpeechRecognition.onerror({ error: 'unknown-error' });
    expect(consoleErrorSpy).toHaveBeenCalledWith('音声認識エラー:', 'unknown-error');
    expect(consoleErrorSpy).toHaveBeenCalledWith('エラーコード:', 1088); // UnknownError

    alertSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  it('should handle onresult event correctly', () => {
    const mockEvent = {
      results: [{
        0: {
          transcript: 'Test result'
        },
        isFinal: true
      }],
      resultIndex: 0
    } as unknown as SpeechRecognitionEvent;

    SpeechRecognition.onresult(mockEvent);

    expect(SpeechRecognition.transcript).toBe('Test result');
    expect(send.disabled).toBe(true);
    expect(input.disabled).toBe(true);
    expect(input.value).toBe('Test result');
  });
});
```

## 結合テスト

### Live2Dモデルとメッセージ表示機能の結合テスト

```typescript
describe('Live2D model and message integration', () => {
  beforeEach(() => {
    // Live2D.model, createMessageをモック
    Live2D.model = {
      on: jest.fn(),
      motion: jest.fn()
    } as any;
    createMessage = jest.fn();
  });

  it('should display a message when a Live2D model event occurs', () => {
    // model.onのコールバックを呼び出す
    const callback = (Live2D.model.on as jest.Mock).mock.calls[0][1];
    callback(['head']);

    // createMessageが呼ばれたことを確認
    expect(createMessage).toHaveBeenCalledWith('reply', expect.any(String));
  });

  it('should change Live2D model motion when a message is displayed', () => {
    // model.onのコールバックを呼び出す
    const callback = (Live2D.model.on as jest.Mock).mock.calls[0][1];
    callback(['head']);

    // model.motionが呼ばれたことを確認
    // setTimeoutがあるので、非同期的に呼ばれることを確認
    return new Promise(resolve => setTimeout(() => {
      expect(Live2D.model.motion).toHaveBeenCalled();
      resolve(null);
    }, 1000));
  });
});
```

### 音声認識機能とメッセージ表示機能の結合テスト

```typescript
describe('Speech recognition and message integration', () => {
  beforeEach(() => {
    // processMessage, createMessageをモック
    processMessage = jest.fn();
    createMessage = jest.fn();

    // inputのvalueをモック
    input.value = 'Test message';
  });

  it('should create a user message and process it when form is submitted', () => {
    // submitイベントを発火
    form.dispatchEvent(new Event('submit'));

    // createMessageとprocessMessageが呼ばれたことを確認
    expect(createMessage).toHaveBeenCalledWith('user', 'Test message');
    expect(processMessage).toHaveBeenCalledWith('Test message');
  });
});
```

## 統合テスト

```typescript
import puppeteer from 'puppeteer';

describe('統合テスト', () => {
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:5000'); // アプリケーションのURL
  });

  afterAll(async () => {
    await browser.close();
  });

  it('アプリケーションが起動し、Live2Dモデルが表示される', async () => {
    // Live2Dモデルが表示されるまで待機
    await page.waitForSelector('#live2d');

    // Live2Dモデルが表示されていることを確認
    const live2d = await page.$('#live2d');
    expect(live2d).toBeTruthy();
  });

  it('メッセージを送信できる', async () => {
    // メッセージを入力
    await page.type('#message', 'こんにちは');

    // 送信ボタンをクリック
    await page.click('#send');

    // メッセージが表示されるまで待機
    await page.waitForSelector('.user');

    // メッセージが表示されていることを確認
    const message = await page.$eval('.user', el => el.textContent);
    expect(message).toBe('こんにちは');
  });

  it('アプリケーションが正常に起動し、必要な要素がすべて表示される', async () => {
    // 必要な要素が表示されるまで待機
    await page.waitForSelector('#live2d');
    await page.waitForSelector('#message');
    await page.waitForSelector('#form');
    await page.waitForSelector('#send');
    await page.waitForSelector('#help');
    await page.waitForSelector('#login');
    await page.waitForSelector('#recognition');
    await page.waitForSelector('#recognition-lang');

    // 各要素が表示されていることを確認
    expect(await page.$('#live2d')).toBeTruthy();
    expect(await page.$('#message')).toBeTruthy();
    expect(await page.$('#form')).toBeTruthy();
    expect(await page.$('#send')).toBeTruthy();
    expect(await page.$('#help')).toBeTruthy();
    expect(await page.$('#login')).toBeTruthy();
    expect(await page.$('#recognition')).toBeTruthy();
    expect(await page.$('#recognition-lang')).toBeTruthy();
  });

  it('Live2Dモデルのイベント発生時にメッセージ表示機能が正しく動作する', async () => {
    // Live2Dモデルの頭をタップ
    await page.evaluate(() => {
      const model = Live2D.model;
      if (model) {
        const bounds = model.internalModel.getDrawableBounds();
        const x = bounds.x + bounds.width / 2;
        const y = bounds.y + bounds.height * 0.2; // 頭の位置を適当に調整
        model.tap(x, y);
      }
    });

    // メッセージが表示されるまで待機
    await page.waitForSelector('.reply');

    // メッセージが表示されていることを確認
    const message = await page.$eval('.reply', el => el.textContent);
    expect(message).toBeTruthy();
  });

  // TODO: 音声認識機能とメッセージ表示機能、Live2Dモデルの連携テスト
  it('音声認識を開始して「こんにちは」と発話すると、メッセージが表示され、Live2Dモデルが反応する', async () => {
    // TODO: 音声認識をシミュレートする
    // 音声認識を開始
    await page.click('#recognition');

    // 音声認識結果をモック
    await page.evaluate(() => {
      const results = [{
        0: {
          transcript: 'こんにちは'
        },
        isFinal: true
      }];
      const resultIndex = 0;
      const event = new Event('result') as SpeechRecognitionEvent;
      Object.assign(event, { results, resultIndex });
      SpeechRecognition.onresult(event);
      SpeechRecognition.onend();
    });

    // メッセージが表示されるまで待機
    await page.waitForSelector('.user');
    await page.waitForSelector('.reply');

    // メッセージが表示されていることを確認
    const userMessage = await page.$eval('.user', el => el.textContent);
    expect(userMessage).toBe('こんにちは');
    const replyMessage = await page.$eval('.reply', el => el.textContent);
    expect(replyMessage).toBeTruthy();

    // TODO: Live2Dモデルのモーションが変化したことを確認する
  });

  // TODO: ユーザー操作に対するアプリケーションの反応のテスト
  it('ユーザーがメッセージを入力して送信すると、メッセージが表示される', async () => {
    // メッセージを入力
    await page.type('#message', 'テストメッセージ');

    // 送信ボタンをクリック
    await page.click('#send');

    // メッセージが表示されるまで待機
    await page.waitForSelector('.user');

    // メッセージが表示されていることを確認
    const message = await page.$eval('.user', el => el.textContent);
    expect(message).toBe('テストメッセージ');
  });

  // TODO: エラー発生時のテスト
  it('エラー発生時に、エラーメッセージが表示され、アプリケーションが停止しない', async () => {
    // エラーを発生させる
    await page.evaluate(() => {
      throw new Error('Test error');
    });

    // エラーメッセージが表示されることを確認
    const errorMessage = await page.$eval('.error', el => el.textContent);
    expect(errorMessage).toBeTruthy();

    // アプリケーションが停止していないことを確認
    const live2d = await page.$('#live2d');
    expect(live2d).toBeTruthy();
  });

  it('ログインボタンのクリックイベントが正しく処理される', async () => {
    // ログインボタンのクリックイベントをシミュレート
    await page.click('#login');

    // TODO: ログイン処理が正常に開始されたことを確認する
  });

  it('ヘルプボタンのクリックイベントが正しく処理される', async () => {
    // ヘルプボタンのクリックイベントをシミュレート
    await page.click('#help');

    // TODO: ヘルプメッセージが正常に表示されたことを確認する
  });
});
