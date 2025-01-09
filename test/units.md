# サービスの挙動に関わる関数リスト

## src/Live2D.ts

- `fitModel()`: Live2Dモデルのサイズと位置を調整する関数。
- `canvas.addEventListener('pointerdown', ...)`: マウスのクリックイベントを処理し、モデルをタップする関数。
- `canvas.addEventListener('pointerenter', ...)`: マウスがキャンバスに入ったときのイベントを処理する関数。
- `canvas.addEventListener('pointerleave', ...)`: マウスがキャンバスから離れたときのイベントを処理する関数。
- `canvas.addEventListener('pointermove', ...)`: マウスがキャンバス上で動いたときのイベントを処理する関数。
- `model.on('hit', ...)`: モデルの特定の領域がクリックされたときのイベントを処理する関数。
- `window.addEventListener('resize', fitModel)`: ウィンドウサイズが変更されたときに`fitModel`を呼び出す関数。

## src/index.ts

- `document.getElementById('help')!.onclick`: ヘルプメッセージを表示する関数。
- `document.getElementById('login')!.onclick`: Googleアカウントでログインする関数。

## src/Message.ts

- `createMessage(sender, message)`: メッセージを画面に表示する関数。
- `processMessage(message)`: メッセージをVertex AIに送信し、応答を処理する関数。
- `form.addEventListener('submit', ...)`: フォームが送信されたときのイベントを処理する関数。
