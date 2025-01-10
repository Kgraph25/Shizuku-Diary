# テストケース

## ユニットテスト

### src/index.ts

- 初期化処理のテスト
  - Live2Dモデルの初期化が正しく行われるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージ表示領域の初期化が正しく行われるか
    - 成功例: メッセージ表示領域が正しく初期化され、メッセージが表示できる。
    - 失敗例: メッセージ表示領域の初期化に失敗し、`MessageDisplayInitializationError` (コード: 1003) が発生する。`[timestamp]` エラー発生時のコンテナ要素: `[element]`。または、タイムアウトした場合は `MessageDisplayInitializationTimeoutError` (コード: 1004) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識機能の初期化が正しく行われるか
    - 成功例: 音声認識機能が正常に初期化され、音声認識が開始できる。
    - 失敗例: 音声認識機能の初期化に失敗し、`SpeechRecognitionInitializationError` (コード: 1005) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionInitializationTimeoutError` (コード: 1006) が発生する。タイムアウト時間: `[timeout]`。
- メッセージ表示機能のテスト
  - メッセージが正しく表示されるか
    - 成功例: 指定したメッセージが正しく表示される。
    - 失敗例: メッセージが表示されない場合は `MessageDisplayError` (コード: 1007)、表示が崩れる場合は `MessageDisplayLayoutError` (コード: 1008) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
  - メッセージが複数回表示される場合に、正しく表示されるか
    - 成功例: 複数回メッセージが表示されても、正しく表示される。
    - 失敗例: 複数回メッセージを表示すると、表示が重なる場合は `MessageOverlapError` (コード: 1009)、消える場合は `MessageDisappearsError` (コード: 1010) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
  - メッセージ表示領域がクリアされるか
    - 成功例: メッセージ表示領域がクリアされ、何も表示されない。
    - 失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1011) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
- 音声認識機能のテスト
  - 音声認識が開始されるか
    - 成功例: 音声認識が正常に開始され、音声入力が可能になる。
    - 失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1012) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1013) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識が停止されるか
    - 成功例: 音声認識が正常に停止し、音声入力が終了する。
    - 失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1014) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1015) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識結果テスト
    - 成功例: 音声認識結果が正しく取得され、メッセージとして表示される。
    - 失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1016)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1017) が発生する。`[timestamp]` エラー発生時の音声認識結果: `[result]`。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1018) が発生する。タイムアウト時間: `[timeout]`。

### src/Live2D.ts

- Live2Dモデルのロードテスト
  - モデルが正しくロードされるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのモーションが正しく再生されるか
    - 成功例: モデルのモーションが正常に再生される。
    - 失敗例: モデルのモーションが再生されない場合は `Live2DMotionPlayError` (コード: 1019)、または途中で停止する場合は `Live2DMotionStopError` (コード: 1020) が発生する。`[timestamp]` エラー発生時のモーションファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DMotionTimeoutError` (コード: 1021) が発生する。タイムアウト時間: `[timeout]`。
  - モデルの表情が正しく変更されるか
    - 成功例: モデルの表情が指定した通りに変更される。
    - 失敗例: モデルの表情が変更されない場合は `Live2DExpressionChangeError` (コード: 1022)、または誤った表情になる場合は `Live2DExpressionError` (コード: 1023) が発生する。`[timestamp]` エラー発生時の表情ファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DExpressionTimeoutError` (コード: 1024) が発生する。タイムアウト時間: `[timeout]`。
- Live2Dモデルの操作テスト
  - モデルのタップイベントが正しく処理されるか
    - 成功例: モデルのタップイベントが正しく処理され、反応がある。
    - 失敗例: モデルのタップイベントが処理されない場合は `Live2DTapEventError` (コード: 1025) が発生する。`[timestamp]` エラー発生時のタップ座標: `[x, y]`。または、タイムアウトした場合は `Live2DTapTimeoutError` (コード: 1026) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのドラッグイベントが正しく処理されるか
    - 成功例: モデルがドラッグ操作に応じて移動する。
    - 失敗例: モデルがドラッグ操作に反応しない場合は `Live2DDragEventError` (コード: 1027)、または誤った動きをする場合は `Live2DDragError` (コード: 1028) が発生する。`[timestamp]` エラー発生時のドラッグ開始座標: `[x1, y1]`、ドラッグ終了座標: `[x2, y2]`。または、タイムアウトした場合は `Live2DDragTimeoutError` (コード: 1029) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのピンチイン・ピンチアウトイベントが正しく処理されるか
    - 成功例: モデルがピンチイン・ピンチアウト操作に応じて拡大・縮小する。
    - 失敗例: モデルがピンチイン・ピンチアウト操作に反応しない場合は `Live2DPinchEventError` (コード: 1030)、または誤った動きをする場合は `Live2DPinchError` (コード: 1031) が発生する。`[timestamp]` エラー発生時のピンチ操作の中心座標: `[x, y]`、ピンチ率: `[scale]`。または、タイムアウトした場合は `Live2DPinchTimeoutError` (コード: 1032) が発生する。タイムアウト時間: `[timeout]`。

### src/Message.ts

- メッセージ表示テスト
  - メッセージが指定された要素に正しく表示されるか
    - 成功例: メッセージが指定された要素に正しく表示される。
    - 失敗例: メッセージが指定された要素に表示されない場合は `MessageDisplayElementError` (コード: 1033)、または別の場所に表示される場合は `MessageDisplayPositionError` (コード: 1034) が発生する。`[timestamp]` エラー発生時の要素: `[element]`。または、タイムアウトした場合は `MessageDisplayElementTimeoutError` (コード: 1035) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージの表示スタイルが正しく適用されるか
    - 成功例: メッセージの表示スタイルが正しく適用される。
    - 失敗例: メッセージの表示スタイルが適用されない場合は `MessageDisplayStyleError` (コード: 1036)、または誤ったスタイルが適用される場合は `MessageDisplayIncorrectStyleError` (コード: 1037) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、スタイル: `[style]`。または、タイムアウトした場合は `MessageDisplayStyleTimeoutError` (コード: 1038) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージがアニメーション付きで表示されるか
    - 成功例: メッセージがアニメーション付きで表示される。
    - 失敗例: メッセージがアニメーションなしで表示される場合は `MessageDisplayAnimationError` (コード: 1039)、またはアニメーションが途中で停止する場合は `MessageAnimationStopError` (コード: 1040) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、アニメーション: `[animation]`。または、タイムアウトした場合は `MessageAnimationTimeoutError` (コード: 104
# テストケース

## ユニットテスト

### src/index.ts

-   初期化処理のテスト
    -   Live2Dモデルの初期化が正しく行われるか
        -   成功例: モデルが正常にロードされ、表示される。
        -   失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。
    -   メッセージ表示領域の初期化が正しく行われるか
        -   成功例: メッセージ表示領域が正しく初期化され、メッセージが表示できる。
        -   失敗例: メッセージ表示領域の初期化に失敗し、`MessageDisplayInitializationError` (コード: 1003) が発生する。`[timestamp]` エラー発生時のコンテナ要素: `[element]`。または、タイムアウトした場合は `MessageDisplayInitializationTimeoutError` (コード: 1004) が発生する。タイムアウト時間: `[timeout]`。
    -   音声認識機能の初期化が正しく行われるか
        -   成功例: 音声認識機能が正常に初期化され、音声認識が開始できる。
        -   失敗例: 音声認識機能の初期化に失敗し、`SpeechRecognitionInitializationError` (コード: 1005) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionInitializationTimeoutError` (コード: 1006) が発生する。タイムアウト時間: `[timeout]`。
-   メッセージ表示機能のテスト
    -   メッセージが正しく表示されるか
        -   成功例: 指定したメッセージが正しく表示される。
        -   失敗例: メッセージが表示されない場合は `MessageDisplayError` (コード: 1007)、表示が崩れる場合は `MessageDisplayLayoutError` (コード: 1008) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
    -   メッセージが複数回表示される場合に、正しく表示されるか
        -   成功例: 複数回メッセージが表示されても、正しく表示される。
        -   失敗例: 複数回メッセージを表示すると、表示が重なる場合は `MessageOverlapError` (コード: 1009)、消える場合は `MessageDisappearsError` (コード: 1010) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
    -   メッセージ表示領域がクリアされるか
        -   成功例: メッセージ表示領域がクリアされ、何も表示されない。
        -   失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1011) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
-   音声認識機能のテスト
    -   音声認識が開始されるか
        -   成功例: 音声認識が正常に開始され、音声入力が可能になる。
        -   失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1012) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1013) が発生する。タイムアウト時間: `[timeout]`。
    -   音声認識が停止されるか
        -   成功例: 音声認識が正常に停止し、音声入力が終了する。
        -   失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1014) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1015) が発生する。タイムアウト時間: `[timeout]`。
    -   音声認識結果テスト
        -   成功例: 音声認識結果が正しく取得され、メッセージとして表示される。
        -   失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1016)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1017) が発生する。`[timestamp]` エラー発生時の音声認識結果: `[result]`。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1018) が発生する。タイムアウト時間: `[timeout]`。

### src/Live2D.ts

-   Live2Dモデルのロードテスト
    -   モデルが正しくロードされるか
        -   成功例: モデルが正常にロードされ、表示される。
        -   失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。タイムアウト時間: `[timeout]`。
    -   モデルのモーションが正しく再生されるか
        -   成功例: モデルのモーションが正常に再生される。
        -   失敗例: モデルのモーションが再生されない場合は `Live2DMotionPlayError` (コード: 1019)、または途中で停止する場合は `Live2DMotionStopError` (コード: 1020) が発生する。`[timestamp]` エラー発生時のモーションファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DMotionTimeoutError` (コード: 1021) が発生する。タイムアウト時間: `[timeout]`。
    -   モデルの表情が正しく変更されるか
        -   成功例: モデルの表情が指定した通りに変更される。
        -   失敗例: モデルの表情が変更されない場合は `Live2DExpressionChangeError` (コード: 1022)、または誤った表情になる場合は `Live2DExpressionError` (コード: 1023) が発生する。`[timestamp]` エラー発生時の表情ファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DExpressionTimeoutError` (コード: 1024) が発生する。タイムアウト時間: `[timeout]`。
-   Live2Dモデルの操作テスト
    -   モデルのタップイベントが正しく処理されるか
        -   成功例: モデルのタップイベントが正しく処理され、反応がある。
        -   失敗例: モデルのタップイベントが処理されない場合は `Live2DTapEventError` (コード: 1025) が発生する。`[timestamp]` エラー発生時のタップ座標: `[x, y]`。または、タイムアウトした場合は `Live2DTapTimeoutError` (コード: 1026) が発生する。タイムアウト時間: `[timeout]`。
    -   モデルのドラッグイベントが正しく処理されるか
        -   成功例: モデルがドラッグ操作に応じて移動する。
        -   失敗例: モデルがドラッグ操作に反応しない場合は `Live2DDragEventError` (コード: 1027)、または誤った動きをする場合は `Live2DDragError` (コード: 1028) が発生する。`[timestamp]` エラー発生時のドラッグ開始座標: `[x1, y1]`、ドラッグ終了座標: `[x2, y2]`。または、タイムアウトした場合は `Live2DDragTimeoutError` (コード: 1029) が発生する。タイムアウト時間: `[timeout]`。
    -   モデルのピンチイン・ピンチアウトイベントが正しく処理されるか
        -   成功例: モデルがピンチイン・ピンチアウト操作に応じて拡大・縮小する。
        -   失敗例: モデルがピンチイン・ピンチアウト操作に反応しない場合は `Live2DPinchEventError` (コード: 1030)、または誤った動きをする場合は `Live2DPinchError` (コード: 1031) が発生する。`[timestamp]` エラー発生時のピンチ操作の中心座標: `[x, y]`、ピンチ率: `[scale]`。または、タイムアウトした場合は `Live2DPinchTimeoutError` (コード: 1032) が発生する。タイムアウト時間: `[timeout]`。

### src/Message.ts

-   メッセージ表示テスト
    -   メッセージが指定された要素に正しく表示されるか
        -   成功例: メッセージが指定された要素に正しく表示される。
        -   失敗例: メッセージが指定された要素に表示されない場合は `MessageDisplayElementError` (コード: 1033)、または別の場所に表示される場合は `MessageDisplayPositionError` (コード: 1034) が発生する。`[timestamp]` エラー発生時の要素: `[element]`。または、タイムアウトした場合は `MessageDisplayElementTimeoutError` (コード: 1035) が発生する。タイムアウト時間: `[timeout]`。
    -   メッセージの表示スタイルが正しく適用されるか
        -   成功例: メッセージの表示スタイルが正しく適用される。
        -   失敗例: メッセージの表示スタイルが適用されない場合は `MessageDisplayStyleError` (コード: 1036)、または誤ったスタイルが適用される場合は `MessageDisplayIncorrectStyleError` (コード: 1037) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、スタイル: `[style]`。または、タイムアウトした場合は `MessageDisplayStyleTimeoutError` (コード: 1038) が発生する。タイムアウト時間: `[timeout]`。
    -   メッセージがアニメーション付きで表示されるか
        -   成功例: メッセージがアニメーション付きで表示される。
        -   失敗例: メッセージがアニメーションなしで表示される場合は `MessageDisplayAnimationError` (コード: 1039)、またはアニメーションが途中で停止する場合は `MessageAnimationStopError` (コード: 1040) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、アニメーション: `[animation]`。または、タイムアウトした場合は `MessageAnimationTimeoutError` (コード: 1041) が発生する。タイムアウト時間: `[timeout]`。
-   メッセージクリアテスト
    -   メッセージ表示領域が正しくクリアされるか
        -   成功例: メッセージ表示領域がクリアされ、何も表示されない。
        -   失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1042) が発生する。または、タイムアウトした場合は `MessageClearTimeoutError` (コード: 1043) が発生する。

### src/SpeechRecognition.ts.txt

-   音声認識開始テスト
    -   音声認識が正しく開始されるか
        -   成功例: 音声認識が正常に開始され、音声入力が可能になる。
        -   失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1044) が発生する。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1045) が発生する。
    -   音声認識停止テスト
        -   成功例: 音声認識が正常に停止し、音声入力が終了する。
        -   失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1046) が発生する。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1047) が発生する。
    -   音声認識結果テスト
        -   成功例: 音声認識結果が正しく取得され、指定されたコールバック関数に渡される。
        -   失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1048)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1049) が発生する。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1050) が発生する。

## 結合テスト

-   Live2Dモデルとメッセージ表示機能の結合テスト
    -   Live2Dモデルのイベントに応じてメッセージが表示されるか
        -   成功例: Live2Dモデルの特定のイベントが発生した際に、対応するメッセージが正しく表示される。
        -   失敗例: Live2Dモデルのイベントが発生しても、メッセージが表示されない場合は `Live2DMessageNotDisplayedError` (コード: 1051)、または誤ったメッセージが表示される場合は `Live2DMessageIncorrectError` (コード: 1052) が発生する。
    -   メッセージ表示時にLive2Dモデルのモーションが変化するか
        -   成功例: メッセージが表示される際に、Live2Dモデルのモーションが変化する。
        -   失敗例: メッセージが表示されても、Live2Dモデルのモーションが変化しない場合は `Live2DMotionNotChangedError` (コード: 1053)、または誤ったモーションになる場合は `Live2DMotionIncorrectError` (コード: 1054) が発生する。
-   音声認識機能とメッセージ表示機能の結合テスト
    -   音声認識結果に応じてメッセージが表示されるか
        -   成功例: 音声認識結果に応じて、対応するメッセージが正しく表示される。
        -   失敗例: 音声認識結果が取得されても、メッセージが表示されない場合は `SpeechRecognitionMessageNotDisplayedError` (コード: 1055)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageIncorrectError` (コード: 1056) が発生する。
    -   音声認識結果がLive2Dモデルのモーションに影響を与えるか
        -   成功例: 音声認識結果に応じて、Live2Dモデルのモーションが変化する。
        -   失敗例: 音声認識結果が取得されても、Live2Dモデルのモーションが変化しない場合は `SpeechRecognitionMotionNotChangedError` (コード: 1057)、または誤ったモーションになる場合は `SpeechRecognitionMotionIncorrectError` (コード: 1058) が発生する。

## 統合テスト

-   アプリケーション全体の統合テスト
    -   アプリケーションが正しく起動するか
        -   成功例: アプリケーションが正常に起動し、Live2Dモデル、メッセージ表示、音声認識機能が利用可能になる。
        -   失敗例: アプリケーションが起動しない場合は `AppStartError` (コード: 1059)、または起動時にエラーが発生する場合は `AppInitializationError` (コード: 1060) が発生する。または、タイムアウトした場合は `AppInitializationTimeoutError` (コード: 1061) が発生する。
    -   Live2Dモデル、メッセージ表示、音声認識機能が連携して動作するか
        -   成功例: Live2Dモデルのイベント、音声認識結果に応じて、メッセージが正しく表示され、モデルのモーションが変化する。
        -   失敗例: 各機能が連携して動作しない場合は `AppIntegrationError` (コード: 1062)、または誤った動作をする場合は `AppFunctionalityError` (コード: 1063) が発生する。または、タイムアウトした場合は `AppIntegrationTimeoutError` (コード: 1064) が発生する。
    -   ユーザーの操作に対して、アプリケーションが正しく反応するか
        -   成功例: ユーザーの操作（タップ、ドラッグ、音声入力など）に対して、アプリケーションが正しく反応する。
        -   失敗例: ユーザーの操作に対して、アプリケーションが反応しない場合は `AppUserInteractionError` (コード: 1065)、または誤った反応をする場合は `AppResponseError` (コード: 1066) が発生する。または、タイムアウトした場合は `AppUserInteractionTimeoutError` (コード: 1067) が発生する。
    -   エラーが発生した場合に、適切に処理されるか
        -   成功例: エラーが発生した場合に、エラーメッセージが表示され、アプリケーションが停止しない。
        -   失敗例: エラーが発生した場合に、エラーメッセージが表示されない場合は `AppErrorHandlingError` (コード: 1068)、またはアプリケーションが停止する場合は `AppCrashError` (コード: 1069) が発生する。または、タイムアウトした場合は `AppErrorHandlingTimeoutError` (コード: 1070) が発生する。
    -   ログインボタンのクリックイベントが正しく処理されるか
        -   成功例: ログインボタンをクリックすると、ログイン処理が開始される。
        -   失敗例: ログインボタンをクリックしても、ログイン処理が開始されない場合は `LoginButtonError` (コード: 1071) が発生する。または、タイムアウトした場合は `LoginButtonTimeoutError` (コード: 1072) が発生する。
    -   ヘルプボタンのクリックイベントが正しく処理されるか
        -   成功例: ヘルプボタンをクリックすると、ヘルプメッセージが表示される。
        -   失敗例: ヘルプボタンをクリックしても、ヘルプメッセージが表示されない場合は `HelpButtonError` (コード: 1073) が発生する。または、タイムアウトした場合は `HelpButtonTimeoutError` (コード: 1074) が発生する。
</content>
# テストケース

## ユニットテスト

### src/index.ts

- 初期化処理のテスト
  - Live2Dモデルの初期化が正しく行われるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージ表示領域の初期化が正しく行われるか
    - 成功例: メッセージ表示領域が正しく初期化され、メッセージが表示できる。
    - 失敗例: メッセージ表示領域の初期化に失敗し、`MessageDisplayInitializationError` (コード: 1003) が発生する。`[timestamp]` エラー発生時のコンテナ要素: `[element]`。または、タイムアウトした場合は `MessageDisplayInitializationTimeoutError` (コード: 1004) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識機能の初期化が正しく行われるか
    - 成功例: 音声認識機能が正常に初期化され、音声認識が開始できる。
    - 失敗例: 音声認識機能の初期化に失敗し、`SpeechRecognitionInitializationError` (コード: 1005) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionInitializationTimeoutError` (コード: 1006) が発生する。タイムアウト時間: `[timeout]`。
- メッセージ表示機能のテスト
  - メッセージが正しく表示されるか
    - 成功例: 指定したメッセージが正しく表示される。
    - 失敗例: メッセージが表示されない場合は `MessageDisplayError` (コード: 1007)、表示が崩れる場合は `MessageDisplayLayoutError` (コード: 1008) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
  - メッセージが複数回表示される場合に、正しく表示されるか
    - 成功例: 複数回メッセージが表示されても、正しく表示される。
    - 失敗例: 複数回メッセージを表示すると、表示が重なる場合は `MessageOverlapError` (コード: 1009)、消える場合は `MessageDisappearsError` (コード: 1010) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
  - メッセージ表示領域がクリアされるか
    - 成功例: メッセージ表示領域がクリアされ、何も表示されない。
    - 失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1011) が発生する。`[timestamp]` エラー発生時のメッセージ: `[message]`。
- 音声認識機能のテスト
  - 音声認識が開始されるか
    - 成功例: 音声認識が正常に開始され、音声入力が可能になる。
    - 失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1012) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1013) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識が停止されるか
    - 成功例: 音声認識が正常に停止し、音声入力が終了する。
    - 失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1014) が発生する。`[timestamp]` エラー発生時の設定: `[config]`。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1015) が発生する。タイムアウト時間: `[timeout]`。
  - 音声認識結果テスト
    - 成功例: 音声認識結果が正しく取得され、メッセージとして表示される。
    - 失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1016)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1017) が発生する。`[timestamp]` エラー発生時の音声認識結果: `[result]`。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1018) が発生する。タイムアウト時間: `[timeout]`。

### src/Live2D.ts

- Live2Dモデルのロードテスト
  - モデルが正しくロードされるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。`[timestamp]` エラー発生時のモデルファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのモーションが正しく再生されるか
    - 成功例: モデルのモーションが正常に再生される。
    - 失敗例: モデルのモーションが再生されない場合は `Live2DMotionPlayError` (コード: 1019)、または途中で停止する場合は `Live2DMotionStopError` (コード: 1020) が発生する。`[timestamp]` エラー発生時のモーションファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DMotionTimeoutError` (コード: 1021) が発生する。タイムアウト時間: `[timeout]`。
  - モデルの表情が正しく変更されるか
    - 成功例: モデルの表情が指定した通りに変更される。
    - 失敗例: モデルの表情が変更されない場合は `Live2DExpressionChangeError` (コード: 1022)、または誤った表情になる場合は `Live2DExpressionError` (コード: 1023) が発生する。`[timestamp]` エラー発生時の表情ファイルパス: `[filepath]`。または、タイムアウトした場合は `Live2DExpressionTimeoutError` (コード: 1024) が発生する。タイムアウト時間: `[timeout]`。
- Live2Dモデルの操作テスト
  - モデルのタップイベントが正しく処理されるか
    - 成功例: モデルのタップイベントが正しく処理され、反応がある。
    - 失敗例: モデルのタップイベントが処理されない場合は `Live2DTapEventError` (コード: 1025) が発生する。`[timestamp]` エラー発生時のタップ座標: `[x, y]`。または、タイムアウトした場合は `Live2DTapTimeoutError` (コード: 1026) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのドラッグイベントが正しく処理されるか
    - 成功例: モデルがドラッグ操作に応じて移動する。
    - 失敗例: モデルがドラッグ操作に反応しない場合は `Live2DDragEventError` (コード: 1027)、または誤った動きをする場合は `Live2DDragError` (コード: 1028) が発生する。`[timestamp]` エラー発生時のドラッグ開始座標: `[x1, y1]`、ドラッグ終了座標: `[x2, y2]`。または、タイムアウトした場合は `Live2DDragTimeoutError` (コード: 1029) が発生する。タイムアウト時間: `[timeout]`。
  - モデルのピンチイン・ピンチアウトイベントが正しく処理されるか
    - 成功例: モデルがピンチイン・ピンチアウト操作に応じて拡大・縮小する。
    - 失敗例: モデルがピンチイン・ピンチアウト操作に反応しない場合は `Live2DPinchEventError` (コード: 1030)、または誤った動きをする場合は `Live2DPinchError` (コード: 1031) が発生する。`[timestamp]` エラー発生時のピンチ操作の中心座標: `[x, y]`、ピンチ率: `[scale]`。または、タイムアウトした場合は `Live2DPinchTimeoutError` (コード: 1032) が発生する。タイムアウト時間: `[timeout]`。

### src/Message.ts

- メッセージ表示テスト
  - メッセージが指定された要素に正しく表示されるか
    - 成功例: メッセージが指定された要素に正しく表示される。
    - 失敗例: メッセージが指定された要素に表示されない場合は `MessageDisplayElementError` (コード: 1033)、または別の場所に表示される場合は `MessageDisplayPositionError` (コード: 1034) が発生する。`[timestamp]` エラー発生時の要素: `[element]`。または、タイムアウトした場合は `MessageDisplayElementTimeoutError` (コード: 1035) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージの表示スタイルが正しく適用されるか
    - 成功例: メッセージの表示スタイルが正しく適用される。
    - 失敗例: メッセージの表示スタイルが適用されない場合は `MessageDisplayStyleError` (コード: 1036)、または誤ったスタイルが適用される場合は `MessageDisplayIncorrectStyleError` (コード: 1037) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、スタイル: `[style]`。または、タイムアウトした場合は `MessageDisplayStyleTimeoutError` (コード: 1038) が発生する。タイムアウト時間: `[timeout]`。
  - メッセージがアニメーション付きで表示されるか
    - 成功例: メッセージがアニメーション付きで表示される。
    - 失敗例: メッセージがアニメーションなしで表示される場合は `MessageDisplayAnimationError` (コード: 1039)、またはアニメーションが途中で停止する場合は `MessageAnimationStopError` (コード: 1040) が発生する。`[timestamp]` エラー発生時の要素: `[element]`、アニメーション: `[animation]`。または、タイムアウトした場合は `MessageAnimationTimeoutError` (コード: 104
# テストケース

## ユニットテスト

### src/index.ts

- 初期化処理のテスト
  - Live2Dモデルの初期化が正しく行われるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。
  - メッセージ表示領域の初期化が正しく行われるか
    - 成功例: メッセージ表示領域が正しく初期化され、メッセージが表示できる。
    - 失敗例: メッセージ表示領域の初期化に失敗し、`MessageDisplayInitializationError` (コード: 1003) が発生する。または、タイムアウトした場合は `MessageDisplayInitializationTimeoutError` (コード: 1004) が発生する。
  - 音声認識機能の初期化が正しく行われるか
    - 成功例: 音声認識機能が正常に初期化され、音声認識が開始できる。
    - 失敗例: 音声認識機能の初期化に失敗し、`SpeechRecognitionInitializationError` (コード: 1005) が発生する。または、タイムアウトした場合は `SpeechRecognitionInitializationTimeoutError` (コード: 1006) が発生する。
- メッセージ表示機能のテスト
  - メッセージが正しく表示されるか
    - 成功例: 指定したメッセージが正しく表示される。
    - 失敗例: メッセージが表示されない場合は `MessageDisplayError` (コード: 1007)、表示が崩れる場合は `MessageDisplayLayoutError` (コード: 1008) が発生する。
  - メッセージが複数回表示される場合に、正しく表示されるか
    - 成功例: 複数回メッセージが表示されても、正しく表示される。
    - 失敗例: 複数回メッセージを表示すると、表示が重なる場合は `MessageOverlapError` (コード: 1009)、消える場合は `MessageDisappearsError` (コード: 1010) が発生する。
  - メッセージ表示領域がクリアされるか
    - 成功例: メッセージ表示領域がクリアされ、何も表示されない。
    - 失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1011) が発生する。
- 音声認識機能のテスト
  - 音声認識が開始されるか
    - 成功例: 音声認識が正常に開始され、音声入力が可能になる。
    - 失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1012) が発生する。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1013) が発生する。
  - 音声認識が停止されるか
    - 成功例: 音声認識が正常に停止し、音声入力が終了する。
    - 失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1014) が発生する。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1015) が発生する。
  - 音声認識結果テスト
    - 成功例: 音声認識結果が正しく取得され、メッセージとして表示される。
    - 失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1016)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1017) が発生する。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1018) が発生する。

### src/Live2D.ts

- Live2Dモデルのロードテスト
  - モデルが正しくロードされるか
    - 成功例: モデルが正常にロードされ、表示される。
    - 失敗例: モデルのロードに失敗し、`Live2DModelLoadError` (コード: 1001) が発生する。または、タイムアウトした場合は `Live2DModelLoadTimeoutError` (コード: 1002) が発生する。
  - モデルのモーションが正しく再生されるか
    - 成功例: モデルのモーションが正常に再生される。
    - 失敗例: モデルのモーションが再生されない場合は `Live2DMotionPlayError` (コード: 1019)、または途中で停止する場合は `Live2DMotionStopError` (コード: 1020) が発生する。または、タイムアウトした場合は `Live2DMotionTimeoutError` (コード: 1021) が発生する。
  - モデルの表情が正しく変更されるか
    - 成功例: モデルの表情が指定した通りに変更される。
    - 失敗例: モデルの表情が変更されない場合は `Live2DExpressionChangeError` (コード: 1022)、または誤った表情になる場合は `Live2DExpressionError` (コード: 1023) が発生する。または、タイムアウトした場合は `Live2DExpressionTimeoutError` (コード: 1024) が発生する。
- Live2Dモデルの操作テスト
  - モデルのタップイベントが正しく処理されるか
    - 成功例: モデルのタップイベントが正しく処理され、反応がある。
    - 失敗例: モデルのタップイベントが処理されない場合は `Live2DTapEventError` (コード: 1025) が発生する。または、タイムアウトした場合は `Live2DTapTimeoutError` (コード: 1026) が発生する。
  - モデルのドラッグイベントが正しく処理されるか
    - 成功例: モデルがドラッグ操作に応じて移動する。
    - 失敗例: モデルがドラッグ操作に反応しない場合は `Live2DDragEventError` (コード: 1027)、または誤った動きをする場合は `Live2DDragError` (コード: 1028) が発生する。または、タイムアウトした場合は `Live2DDragTimeoutError` (コード: 1029) が発生する。
  - モデルのピンチイン・ピンチアウトイベントが正しく処理されるか
    - 成功例: モデルがピンチイン・ピンチアウト操作に応じて拡大・縮小する。
    - 失敗例: モデルがピンチイン・ピンチアウト操作に反応しない場合は `Live2DPinchEventError` (コード: 1030)、または誤った動きをする場合は `Live2DPinchError` (コード: 1031) が発生する。または、タイムアウトした場合は `Live2DPinchTimeoutError` (コード: 1032) が発生する。

### src/Message.ts

- メッセージ表示テスト
  - メッセージが指定された要素に正しく表示されるか
    - 成功例: メッセージが指定された要素に正しく表示される。
    - 失敗例: メッセージが指定された要素に表示されない場合は `MessageDisplayElementError` (コード: 1033)、または別の場所に表示される場合は `MessageDisplayPositionError` (コード: 1034) が発生する。または、タイムアウトした場合は `MessageDisplayElementTimeoutError` (コード: 1035) が発生する。
  - メッセージの表示スタイルが正しく適用されるか
    - 成功例: メッセージの表示スタイルが正しく適用される。
    - 失敗例: メッセージの表示スタイルが適用されない場合は `MessageDisplayStyleError` (コード: 1036)、または誤ったスタイルが適用される場合は `MessageDisplayIncorrectStyleError` (コード: 1037) が発生する。または、タイムアウトした場合は `MessageDisplayStyleTimeoutError` (コード: 1038) が発生する。
  - メッセージがアニメーション付きで表示されるか
    - 成功例: メッセージがアニメーション付きで表示される。
    - 失敗例: メッセージがアニメーションなしで表示される場合は `MessageDisplayAnimationError` (コード: 1039)、またはアニメーションが途中で停止する場合は `MessageAnimationStopError` (コード: 1040) が発生する。または、タイムアウトした場合は `MessageAnimationTimeoutError` (コード: 1041) が発生する。
- メッセージクリアテスト
  - メッセージ表示領域が正しくクリアされるか
    - 成功例: メッセージ表示領域がクリアされ、何も表示されない。
    - 失敗例: メッセージ表示領域がクリアされず、前のメッセージが残る場合は `MessageClearError` (コード: 1042) が発生する。または、タイムアウトした場合は `MessageClearTimeoutError` (コード: 1043) が発生する。

### src/SpeechRecognition.ts.txt

- 音声認識開始テスト
  - 音声認識が正しく開始されるか
    - 成功例: 音声認識が正常に開始され、音声入力が可能になる。
    - 失敗例: 音声認識が開始されない場合は `SpeechRecognitionStartError` (コード: 1044) が発生する。または、タイムアウトした場合は `SpeechRecognitionStartTimeoutError` (コード: 1045) が発生する。
  - 音声認識停止テスト
    - 成功例: 音声認識が正常に停止し、音声入力が終了する。
    - 失敗例: 音声認識が停止しない場合は `SpeechRecognitionStopError` (コード: 1046) が発生する。または、タイムアウトした場合は `SpeechRecognitionStopTimeoutError` (コード: 1047) が発生する。
  - 音声認識結果テスト
    - 成功例: 音声認識結果が正しく取得され、指定されたコールバック関数に渡される。
    - 失敗例: 音声認識結果が正しく取得できない場合は `SpeechRecognitionResultError` (コード: 1048)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageError` (コード: 1049) が発生する。または、タイムアウトした場合は `SpeechRecognitionResultTimeoutError` (コード: 1050) が発生する。

## 結合テスト

- Live2Dモデルとメッセージ表示機能の結合テスト
  - Live2Dモデルのイベントに応じてメッセージが表示されるか
    - 成功例: Live2Dモデルの特定のイベントが発生した際に、対応するメッセージが正しく表示される。
    - 失敗例: Live2Dモデルのイベントが発生しても、メッセージが表示されない場合は `Live2DMessageNotDisplayedError` (コード: 1051)、または誤ったメッセージが表示される場合は `Live2DMessageIncorrectError` (コード: 1052) が発生する。
  - メッセージ表示時にLive2Dモデルのモーションが変化するか
    - 成功例: メッセージが表示される際に、Live2Dモデルのモーションが変化する。
    - 失敗例: メッセージが表示されても、Live2Dモデルのモーションが変化しない場合は `Live2DMotionNotChangedError` (コード: 1053)、または誤ったモーションになる場合は `Live2DMotionIncorrectError` (コード: 1054) が発生する。
- 音声認識機能とメッセージ表示機能の結合テスト
  - 音声認識結果に応じてメッセージが表示されるか
    - 成功例: 音声認識結果に応じて、対応するメッセージが正しく表示される。
    - 失敗例: 音声認識結果が取得されても、メッセージが表示されない場合は `SpeechRecognitionMessageNotDisplayedError` (コード: 1055)、または誤ったメッセージが表示される場合は `SpeechRecognitionMessageIncorrectError` (コード: 1056) が発生する。
  - 音声認識結果がLive2Dモデルのモーションに影響を与えるか
    - 成功例: 音声認識結果に応じて、Live2Dモデルのモーションが変化する。
    - 失敗例: 音声認識結果が取得されても、Live2Dモデルのモーションが変化しない場合は `SpeechRecognitionMotionNotChangedError` (コード: 1057)、または誤ったモーションになる場合は `SpeechRecognitionMotionIncorrectError` (コード: 1058) が発生する。

## 統合テスト

- アプリケーション全体の統合テスト
  - アプリケーションが正しく起動するか
    - 成功例: アプリケーションが正常に起動し、Live2Dモデル、メッセージ表示、音声認識機能が利用可能になる。
    - 失敗例: アプリケーションが起動しない場合は `AppStartError` (コード: 1059)、または起動時にエラーが発生する場合は `AppInitializationError` (コード: 1060) が発生する。または、タイムアウトした場合は `AppInitializationTimeoutError` (コード: 1061) が発生する。
  - Live2Dモデル、メッセージ表示、音声認識機能が連携して動作するか
    - 成功例: Live2Dモデルのイベント、音声認識結果に応じて、メッセージが正しく表示され、モデルのモーションが変化する。
    - 失敗例: 各機能が連携して動作しない場合は `AppIntegrationError` (コード: 1062)、または誤った動作をする場合は `AppFunctionalityError` (コード: 1063) が発生する。または、タイムアウトした場合は `AppIntegrationTimeoutError` (コード: 1064) が発生する。
  - ユーザーの操作に対して、アプリケーションが正しく反応するか
    - 成功例: ユーザーの操作（タップ、ドラッグ、音声入力など）に対して、アプリケーションが正しく反応する。
    - 失敗例: ユーザーの操作に対して、アプリケーションが反応しない場合は `AppUserInteractionError` (コード: 1065)、または誤った反応をする場合は `AppResponseError` (コード: 1066) が発生する。または、タイムアウトした場合は `AppUserInteractionTimeoutError` (コード: 1067) が発生する。
  - エラーが発生した場合に、適切に処理されるか
    - 成功例: エラーが発生した場合に、エラーメッセージが表示され、アプリケーションが停止しない。
    - 失敗例: エラーが発生した場合に、エラーメッセージが表示されない場合は `AppErrorHandlingError` (コード: 1068)、またはアプリケーションが停止する場合は `AppCrashError` (コード: 1069) が発生する。または、タイムアウトした場合は `AppErrorHandlingTimeoutError` (コード: 1070) が発生する。
  - ログインボタンのクリックイベントが正しく処理されるか
    - 成功例: ログインボタンをクリックすると、ログイン処理が開始される。
    - 失敗例: ログインボタンをクリックしても、ログイン処理が開始されない場合は `LoginButtonError` (コード: 1071) が発生する。または、タイムアウトした場合は `LoginButtonTimeoutError` (コード: 1072) が発生する。
  - ヘルプボタンのクリックイベントが正しく処理されるか
    - 成功例: ヘルプボタンをクリックすると、ヘルプメッセージが表示される。
    - 失敗例: ヘルプボタンをクリックしても、ヘルプメッセージが表示されない場合は `HelpButtonError` (コード: 1073) が発生する。または、タイムアウトした場合は `HelpButtonTimeoutError` (コード: 1074) が発生する。
