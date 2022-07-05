const { ccclass, property } = cc._decorator;

@ccclass
export default class Aircraft extends cc.Component {

    @property(cc.Prefab)
    Prefab_bomb: cc.Prefab = null;
    Air_alti = 0
    min_speed = 3
    max_speed = 10
    Air_speed: number

    is_down: boolean
    is_right: boolean

    time = 0
    time_bomb = 3
    min_x = 0
    max_x = 0

    start() {
        this.min_x = -cc.winSize.width / 2
        this.max_x = cc.winSize.width / 2
        //     // this.node = cc.instantiate(this.node);
        //     // this.node.parent = this.node.parent
        //     // this.Air_alti = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        //     // this.node.y = this.Air_alti;
        //     // this.is_down = Math.random() < 0.5 ? true : false
        //     // this.is_right = Math.random() < 0.5 ? true : false
        //     this.Air_speed = this.min_speed + Math.random() * (this.max_speed - this.min_speed)

    }

    setType(_type) {
        switch (_type) {
            case 1: {
                // this.Air_speed
                break;
            }
        }
    }

    setOriention(is_right, is_down) {
        this.is_right = is_right;
        this.is_down = is_down;
        // this.min_x = -cc.winSize.width / 2
        // this.max_x = cc.winSize.width / 2
        // this.node = cc.instantiate(this.node);
        // this.node.parent = this.node.parent
        // this.Air_alti = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.node.y = this.Air_alti;
        // this.is_down = Math.random() < 0.5 ? true : false
        // this.is_right = Math.random() < 0.5 ? true : false
        this.Air_speed = this.min_speed + Math.random() * (this.max_speed - this.min_speed)

        // if (this.is_right) {
        //     this.node.x = this.max_x + this.node.width / 2
        // }
        // else {
        //     this.node.x = this.min_x - this.node.width / 2
        // }
    }

    update(dt) {
        if (this.is_right) {
            this.node.scaleX = 1;
            this.node.x -= this.Air_speed;
            if (this.node.x <= this.min_x - this.node.width / 2) {
                this.is_right = Math.random() < 0.5 ? true : false
                this.Air_speed = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
                if (this.is_right) {
                    this.node.x = this.min_x + Math.random() * (this.max_x - this.min_x)
                }
                else {
                    this.node.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
                }
            }
        }
        else {
            this.node.scaleX = -1;
            this.node.x += this.Air_speed;
            if (this.node.x >= this.max_x + this.node.width / 2) {
                this.is_right = Math.random() < 0.5 ? true : false
                this.Air_speed = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
                if (this.is_right) {
                    this.node.x = this.min_x + Math.random() * (this.max_x - this.min_x)
                }
                else {
                    this.node.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
                }
            }
        }
        if (Math.abs(this.node.y - this.Air_alti) >= 100)
            this.is_down = !this.is_down
        if (this.is_down)
            this.node.y -= 0.5;
        else
            this.node.y += 0.5;

        this.time += dt
        if (this.time >= this.time_bomb) {
            this.time = 0
            this.throw_bomb()
        }
    }

    throw_bomb() {
        let bomb = cc.instantiate(this.Prefab_bomb)
        bomb.parent = this.node.parent
        let pos = this.node.getPosition()
        pos.y -= 70
        bomb.setPosition(pos)
    }
}
