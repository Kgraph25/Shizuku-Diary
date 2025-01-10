// src/Message.test.ts
import { createMessage, processMessage } from './Message';
import Live2D from './Live2D';

describe('Message functions', () => {
  console.log('Message test suite started');
  it('should create a message', () => {
    console.log('createMessage test case started');
    // createMessage のテストを追加
    const messageContainer = document.createElement('div'); // テスト用のメッセージコンテナを作成
    document.body.appendChild(messageContainer); // body に追加
    createMessage('user', 'test message');
    const messageDiv = messageContainer.querySelector('.user');
    expect(messageDiv).toBeTruthy();
    expect(messageDiv?.textContent).toBe('test message');

    document.body.removeChild(messageContainer); // テスト終了後に削除
    console.log('createMessage test case finished');
  });

  // processMessage のテストは非同期処理のため、Jestの非同期テスト機能を使用する必要があります。
  // モック関数を使用して、Vertex AIとの通信を模擬し、期待通りの動作をテストします。
  it('should process a message', async () => {
    console.log('processMessage test case started');
      // processMessage のテストを追加 (モックの使用を推奨)
      const mockChatSession = {
          sendMessage: jest.fn().mockResolvedValue({ response: { text: async () => 'mock response' } })
      };

      const originalLive2D = Live2D;
      const mockLive2D = {...Live2D, model: { motion: jest.fn() }};
      global.Live2D = mockLive2D;
      global.chatSession = mockChatSession;


      const messageContainer = document.createElement('div');
      document.body.appendChild(messageContainer);
      await processMessage('test message');
      const messageDiv = messageContainer.querySelectorAll('div');

      expect(mockChatSession.sendMessage).toHaveBeenCalledWith('test message');
      expect(messageDiv.length).toBe(1);
      expect(messageDiv[0].textContent).toBe('mock response');
      expect(mockLive2D.model.motion).toHaveBeenCalled();

      document.body.removeChild(messageContainer);
      global.Live2D = originalLive2D; // 元の Live2D に戻す
      console.log('processMessage test case finished');
  });
  console.log('Message test suite finished');
});
