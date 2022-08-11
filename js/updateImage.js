export const updateImage = (ctx, sprite, params = undefined) => {
  function draw(ctx, sprite) {
    // Draws image using position and offset data and crops based on number fo frames in the image
    ctx.drawImage(
      sprite.image,
      sprite.frameInfo.framesCurrent *
        (sprite.image.width / sprite.frameInfo.framesMax) +
        1,
      0,
      sprite.image.width / sprite.frameInfo.framesMax - 2,
      sprite.image.height,
      sprite.position.x - sprite.offset.x,
      sprite.position.y - sprite.offset.y,
      (sprite.image.width / sprite.frameInfo.framesMax) * sprite.scale,
      sprite.image.height * sprite.scale
    );
  }
  //Advance frames after holding each frame for "frameHold" number of frames.
  //Starts over after reaching "frameMax"
  function animateFrames(sprite) {
    sprite.frameInfo.framesElapsed++;
    if (sprite.frameInfo.framesElapsed % sprite.frameInfo.framesHold === 0) {
      sprite.frameInfo.framesCurrent =
        (sprite.frameInfo.framesCurrent + 1) % sprite.frameInfo.framesMax;
    }
  }

  animateFrames(sprite);

  draw(ctx, sprite);
};
