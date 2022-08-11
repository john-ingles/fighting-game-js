import { Sprite } from "./Sprite.js";

export class Fighter extends Sprite {
  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },

    velocity = { x: 0, y: 0 },
    sprites,
    attackBox = { offset: {}, width: undefined, height: undefined },
  }) {
    super({
      position,
      imageSrc,
      scale,
      framesMax,
      offset,
    });
    this.velocity = velocity;
    this.height = 150;
    this.width = 50;
    this.lastKey;
    this.attackBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: attackBox.width,
      height: attackBox.height,
      offset: attackBox.offset,
    };
    this.isAttacking;
    this.health = 100;
    this.sprites = sprites;
    this.dead = false;

    for (const sprite in this.sprites) {
      sprites[sprite].image = new Image();
      sprites[sprite].image.src = sprites[sprite].imageSrc;
    }
  }

  update(ctx, updateSprite, params) {
    updateSprite(ctx, this, params);
  }

  attack() {
    this.switchSprite("attack1");
    this.isAttacking = true;
  }

  takeHit() {
    this.health -= 20;

    if (this.health <= 0) {
      this.switchSprite("death");
    } else {
      this.switchSprite("takeHit");
    }
  }

  switchSprite(sprite) {
    //override all on death
    if (this.image === this.sprites.death.image) {
      if (this.frameInfo.framesCurrent === this.sprites.death.framesMax - 1) {
        this.dead = true;
      }
      return;
    } else if (
      // override all other animations with attack animation
      this.image === this.sprites.attack1.image &&
      this.frameInfo.framesCurrent < this.sprites.attack1.framesMax - 1
    ) {
      return;
    } else if (
      // override all other animations with get hit animation
      this.image === this.sprites.takeHit.image &&
      this.frameInfo.framesCurrent < this.sprites.takeHit.framesMax - 1
    ) {
      return;
    } else if (this.image !== this.sprites[sprite].image) {
      this.image = this.sprites[sprite].image;
      this.frameInfo.framesMax = this.sprites[sprite].framesMax;
      this.frameInfo.framesCurrent = 0;
    }
  }
}
