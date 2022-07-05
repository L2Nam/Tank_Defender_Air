const { ccclass, property } = cc._decorator;

@ccclass
export default class TankControl extends cc.Component {

    SPEED_DEFAULT = 8

    @property(cc.Sprite)
    tank: cc.Sprite = null;
    @property(cc.Node)
    tank_muzzle: cc.Node = null;

    speed = 0;
    time_run_fire = 0;
    is_fire = false
    is_move_left = true;

    update(dt) {
        if (this.node.x <= -900)
            this.node.x = -900;
        if (this.node.x >= 900)
            this.node.x = 900

        if (this.is_move_left) {
            this.node.x -= this.speed;
        }
        else {
            this.node.x += this.speed;
        }
    }


    setMOveLeft(isLeft) {
        this.tank.node.scaleX = isLeft ? -1 : 1;
        this.is_move_left = isLeft;
        this.speed = this.SPEED_DEFAULT;
    }

    setStopMove() {
        this.speed = 0;
    }

    setFire(angel) {
        this.tank_muzzle.angle = angel;
    }

    setStopFire() {
        this.is_fire = false
        this.time_run_fire = 0;
    }
}
