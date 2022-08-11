export const updateFighter = (ctx, sprite, { canvasHeight, GRAVITY }) => {
  function draw(ctx, sprite) {
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

  function animateFrames(sprite) {
    sprite.frameInfo.framesElapsed++;
    if (sprite.frameInfo.framesElapsed % sprite.frameInfo.framesHold === 0) {
      sprite.frameInfo.framesCurrent =
        (sprite.frameInfo.framesCurrent + 1) % sprite.frameInfo.framesMax;
    }
  }

  draw(ctx, sprite);

  if (!sprite.dead) {
    animateFrames(sprite);
  }
  sprite.attackBox.position.x = sprite.position.x + sprite.attackBox.offset.x;
  sprite.attackBox.position.y = sprite.position.y + sprite.attackBox.offset.y;
  sprite.position.x += sprite.velocity.x;
  sprite.position.y += sprite.velocity.y;

  // gravity function
  if (sprite.position.y + sprite.height === canvasHeight - 96) {
    sprite.velocity.y = 0;
    sprite.position.y = 330;
    sprite.isJumping = false;
  } else if (sprite.position.y + sprite.height > canvasHeight - 96) {
    sprite.position.y = canvasHeight - 96 - sprite.height;
    sprite.velocity.y = 0;
    sprite.position.y = 330;
    sprite.isJumping = false;
  } else {
    sprite.velocity.y += GRAVITY;
  }
};
