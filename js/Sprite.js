export class Sprite {
  constructor({
    position = { x: 0, y: 0 },
    imageSrc,
    scale = 1,
    framesMax = 1,
    framesCurrent = 0,
    offset = { x: 0, y: 0 },
    framesHold = 5,
  }) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.frameInfo = {
      framesMax: framesMax,
      framesCurrent: framesCurrent,
      framesElapsed: 0,
      framesHold: framesHold,
    };
    this.offset = offset;
  }

  update(ctx, updateSprite, params) {
    updateSprite(ctx, this, params);
  }
}
