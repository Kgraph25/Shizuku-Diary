import Live2D from './Live2D';

describe('Live2D', () => {
  console.log('Live2D test suite started');
  it('should load a model', async () => {
    console.log('Live2D test case started');
    const live2D = await Live2D;
    expect(live2D.model).toBeDefined();
    console.log('Live2D test case finished');
  });
  console.log('Live2D test suite finished');
});
