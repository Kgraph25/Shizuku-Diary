import { Application } from '@pixi/app';
import { Renderer } from '@pixi/core';
import { Ticker, TickerPlugin } from '@pixi/ticker';
import { InteractionManager } from '@pixi/interaction';
import { Live2DModel, MotionPreloadStrategy } from 'pixi-live2d-display';

// @ts-ignore
Live2DModel.registerTicker(Ticker);
Application.registerPlugin(TickerPlugin);
Renderer.registerPlugin('interaction', InteractionManager);

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const app = new Application({
  backgroundAlpha: 0,
  view: canvas,
});

let model: Live2DModel;
const expressions = { happy: 1, sad: 2, angry: 3 };
const motions: {[key: string]: Array<[string, number]>} = {
  talk: [
    ['tap_body', 0],
    ['tap_body', 2],
    ['pinch_out', 0],
    ['flick_head', 1],
    ['flick_head', 2],
  ],
  cheer: [
    ['tap_body', 1]
  ],
  mouthcover: [
    ['pinch_in', 0],
    ['pinch_in', 1],
    ['pinch_in', 2],
  ],
  disagree: [
    ['pinch_out', 1],
    ['pinch_out', 2],
  ],
  surprised: [
    ['shake', 0],
    ['shake', 2],
  ],
  laugh: [
    ['shake', 1],
  ]
};

let live2DExport: { app: Application, expressions: { happy: number, sad: number, angry: number }, model: Live2DModel, motions: { [key: string]: [string, number][] } } = { app: null!, expressions: { happy: 0, sad: 0, angry: 0 }, model: null!, motions: {} };

Live2DModel.from('./public/live2d/shizuku.model.json', {
  autoInteract: false,
  motionPreload: MotionPreloadStrategy.IDLE
}).then(loadedModel => {
  console.log('Live2DModel.from then called');
  model = loadedModel;
  app.stage.addChild(model);
  
  let mousestate = false;
  canvas.addEventListener('pointerdown', (event) => {
    if (!model) {
      console.error('`model` is not loaded');
      console.error('Error: ModelNotLoadedError (コード: 1077)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    model.tap(event.clientX, event.clientY);
  });
  canvas.addEventListener('pointerenter', () => {
    mousestate = true;
  });
  canvas.addEventListener('pointerleave', () => {
    if (!model) {
      console.error('`model` is not loaded');
      console.error('Error: ModelNotLoadedError (コード: 1077)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    model.internalModel.focusController.focus(0, 0);
    mousestate = false;
  });

  canvas.addEventListener('pointermove', ({ clientX, clientY }) => {
    if (!model) {
      console.error('`model` is not loaded');
      console.error('Error: ModelNotLoadedError (コード: 1077)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    if (mousestate) model.focus(clientX, clientY);
  });

  if (model) {
    // interaction
    model.on('hit', (hitAreas) => {
      if (!model) {
        console.error('`model` is not loaded');
        console.error('Error: ModelNotLoadedError (コード: 1078)');
        console.error('発生時刻:', new Date().toLocaleString());
        return;
      }
      if (!hitAreas) {
        console.error('`hitAreas` is undefined or null');
        console.error('Error: InvalidHitAreasError (コード: 1079)');
        console.error('発生時刻:', new Date().toLocaleString());
        return;
      }
      if (hitAreas.includes('head')) {
        if (!model.motion('shake', 1)) {
          console.error('Failed to start motion: shake');
          console.error('Error: MotionPlayError (コード: 1081)');
          console.error('発生時刻:', new Date().toLocaleString());
          return;
        }
      } else if (!hitAreas.includes('body')) {
        console.error('Invalid hit area: ' + hitAreas);
        console.error('Error: InvalidHitAreaError (コード: 1080)');
        console.error('発生時刻:', new Date().toLocaleString());
        return;
      }
    });

    live2DExport = {
      app: app,
      expressions: expressions,
      model: loadedModel,
      motions: motions,
    };
  }


  function fitModel() {
    console.log('fitModel called');
    if (!model) {
      console.error('`fitModel()` called before model is loaded');
      console.error('Error: ModelNotLoadedError (コード: 1075)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    if (!app.renderer.screen) {
      console.error('`app.renderer.screen` is not initialized');
      console.error('Error: RendererScreenError (コード: 1076)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    const breakpoint = {
      md: window.innerWidth > 720 && window.innerWidth < 1000,
      lg: window.innerWidth >= 1000
    };

    // set canvas and renderer before model
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // width doesnt matter on md++
    if (!breakpoint.md && !breakpoint.lg) {
      app.renderer.screen.width = window.innerWidth;
    }
    app.renderer.screen.height = window.innerHeight;

    const anchor = {
      x: breakpoint.lg ? 1 : 0.5,
      y: 0.85
    };

    const scale = {
      x: breakpoint.lg ? 0.4 : breakpoint.md ? 0.35 : 0.25,
      y: breakpoint.lg ? 0.475 : breakpoint.md ? 0.425 : 0.3
    };

    const width = breakpoint.md
      ? model.width / 2.35
      : breakpoint.lg
        ? model.width
        : app.renderer.screen.width / 2;

    const height = breakpoint.md || breakpoint.lg
      ? app.renderer.screen.height
      : model.height;

    model.anchor.set(anchor.x, anchor.y);
    model.scale.set(scale.x, scale.y);
    model.x = width;
    model.y = height;
  }
  fitModel();
  setTimeout(() => {
    if (model) {
      fitModel();
    }
  }, 250);


  window.addEventListener('resize', () => {
    if (!model) {
      console.error('`fitModel()` called before model is loaded');
      console.error('Error: ModelNotLoadedError (コード: 1075)');
      console.error('発生時刻:', new Date().toLocaleString());
      return;
    }
    fitModel();
  });
  document.getElementById('loader')!.style.display = 'none';
});

export default live2DExport;
