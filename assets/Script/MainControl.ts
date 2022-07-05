import Aircraft from "./Aircraft";
import Joystick from "./Joystick";
import TankControl from "./TankControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainControl extends cc.Component {

    @property(TankControl)
    tank: TankControl = null;
    @property(Joystick)
    joyStick: Joystick = null

    Smoke_speed = 5;
    @property(cc.Sprite)
    spSmoke: cc.Sprite[] = [null, null];

    Cloud_speed = 3;
    @property(cc.Sprite)
    spCloud: cc.Sprite[] = [null, null, null];

    Button_Right: cc.Button = null;
    Button_Left: cc.Button = null;


    @property([cc.Prefab])
    Aircraft_Prefab: cc.Prefab[] = []

    time_create_monster = 0;
    // Aircraft: cc.Node[] = null

    // @property(cc.Prefab)
    // Aircraft2_Prefab: cc.Prefab = null
    // Aircraft2: cc.Node = null

    // @property(cc.Prefab)
    // Aircraft3_Prefab: cc.Prefab = null
    // Aircraft3: cc.Node = null

    // @property(cc.Prefab)
    // Aircraft4_Prefab: cc.Prefab = null
    // Aircraft4: cc.Node = null

    // @property(cc.Prefab)
    // Aircraft5_Prefab: cc.Prefab = null
    // Aircraft5: cc.Node = null

    // @property(cc.Prefab)
    // Aircraft6_Prefab: cc.Prefab = null
    // Aircraft6: cc.Node = null

    // @property(cc.Prefab)
    // Aircraft7_Prefab: cc.Prefab = null
    // Aircraft7: cc.Node = null

    // @property(cc.Prefab)
    // Prefab_bomb: cc.Prefab = null;


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        this.Button_Right = this.node.getChildByName("Button_Right").getComponent(cc.Button);
        this.Button_Left = this.node.getChildByName("Button_Left").getComponent(cc.Button);

        this.Button_Right.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBR, this);
        this.Button_Left.node.on(cc.Node.EventType.TOUCH_START, this.touchStartBL, this);
        this.Button_Right.node.on(cc.Node.EventType.TOUCH_END, this.touchEndBR, this);
        this.Button_Left.node.on(cc.Node.EventType.TOUCH_END, this.touchEndBL, this);
        this.Button_Right.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndBR, this);
        this.Button_Left.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchEndBL, this);

        this.joyStick.setCallback(this.joyStickCallbackStart.bind(this), this.joyStickCallbackEnd.bind(this));
    }

    start() {

        // Cloud
        for (let i = 0; i < this.spCloud.length; i++) {
            this.spCloud[i].node.x = 1500 + 1500 * i;
            var maxY_Cloud = 600
            var minY_Cloud = 400
            this.spCloud[i].node.y = 400 + Math.random() * (maxY_Cloud - minY_Cloud)
        }


        this.schedule(() => {
            this.Create_Aircraft();
        }, 5)
        // this.Aircraft1 = cc.instantiate(this.Aircraft1_Prefab);
        // this.node.addChild(this.Aircraft1)
        // this.Air_alti[1] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft1.y = this.Air_alti[1];
        // this.is_down[1] = Math.random() < 0.5 ? true : false
        // this.is_right[1] = Math.random() < 0.5 ? true : false
        // this.Air_speed[1] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[1]) {
        //     this.Aircraft1.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft1.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft2 = cc.instantiate(this.Aircraft2_Prefab);
        // this.node.addChild(this.Aircraft2)
        // this.Air_alti[2] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft2.y = this.Air_alti[2];
        // this.is_down[2] = Math.random() < 0.5 ? true : false
        // this.is_right[2] = Math.random() < 0.5 ? true : false
        // this.Air_speed[2] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[2]) {
        //     this.Aircraft2.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft2.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft3 = cc.instantiate(this.Aircraft3_Prefab);
        // this.node.addChild(this.Aircraft3)
        // this.Air_alti[3] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft3.y = this.Air_alti[3];
        // this.is_down[3] = Math.random() < 0.5 ? true : false
        // this.is_right[3] = Math.random() < 0.5 ? true : false
        // this.Air_speed[3] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[3]) {
        //     this.Aircraft3.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft3.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft4 = cc.instantiate(this.Aircraft4_Prefab);
        // this.node.addChild(this.Aircraft4)
        // this.Air_alti[4] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft4.y = this.Air_alti[4];
        // this.is_down[4] = Math.random() < 0.5 ? true : false
        // this.is_right[4] = Math.random() < 0.5 ? true : false
        // this.Air_speed[4] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[4]) {
        //     this.Aircraft4.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft4.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft5 = cc.instantiate(this.Aircraft5_Prefab);
        // this.node.addChild(this.Aircraft5)
        // this.Air_alti[5] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft5.y = this.Air_alti[5];
        // this.is_down[5] = Math.random() < 0.5 ? true : false
        // this.is_right[5] = Math.random() < 0.5 ? true : false
        // this.Air_speed[5] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[5]) {
        //     this.Aircraft5.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft5.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft6 = cc.instantiate(this.Aircraft6_Prefab);
        // this.node.addChild(this.Aircraft6)
        // this.Air_alti[6] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft6.y = this.Air_alti[6];
        // this.is_down[6] = Math.random() < 0.5 ? true : false
        // this.is_right[6] = Math.random() < 0.5 ? true : false
        // this.Air_speed[6] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[6]) {
        //     this.Aircraft6.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft6.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }

        // this.Aircraft7 = cc.instantiate(this.Aircraft7_Prefab);
        // this.node.addChild(this.Aircraft7)
        // this.Air_alti[7] = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        // this.Aircraft7.y = this.Air_alti[7];
        // this.is_down[7] = Math.random() < 0.5 ? true : false
        // this.is_right[7] = Math.random() < 0.5 ? true : false
        // this.Air_speed[7] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        // if (this.is_right[7]) {
        //     this.Aircraft7.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        // }
        // else {
        //     this.Aircraft7.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        // }
    }

    update(dt) {
        // this.time += dt

        // Tank_smoke
        for (let i = 0; i < this.spSmoke.length; i++) {
            this.spSmoke[i].node.x -= this.Smoke_speed;
            if (this.spSmoke[i].node.x <= -2000) {
                this.spSmoke[i].node.x = 2000;
            }
        }

        // Cloud
        for (let i = 0; i < this.spCloud.length; i++) {
            this.spCloud[i].node.x -= this.Cloud_speed;
            if (this.spCloud[i].node.x <= -1000) {
                this.spCloud[i].node.x = 3500;
                var maxY_Cloud = 600
                var minY_Cloud = 400
                this.spCloud[i].node.y = 400 + Math.random() * (maxY_Cloud - minY_Cloud)
            }
        }

        // // Aircraft1
        // if (this.is_right[1]) {
        //     this.Aircraft1.scaleX = 1;
        //     this.Aircraft1.x -= this.Air_speed[1];
        //     if (this.Aircraft1.x <= -1500) {
        //         this.is_right[1] = Math.random() < 0.5 ? true : false
        //         this.Air_speed[1] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //         if (this.is_right[1]) {
        //             this.Aircraft1.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //         }
        //         else {
        //             this.Aircraft1.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //         }
        //     }
        // }
        // else {
        //     this.Aircraft1.scaleX = -1;
        //     this.Aircraft1.x += this.Air_speed[1];
        //     if (this.Aircraft1.x >= 1500) {
        //         this.is_right[1] = Math.random() < 0.5 ? true : false
        //         this.Air_speed[1] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //         if (this.is_right[1]) {
        //             this.Aircraft1.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //         }
        //         else {
        //             this.Aircraft1.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //         }
        //     }
        // }
        // if (Math.abs(this.Aircraft1.y - this.Air_alti[1]) >= 100)
        //     this.is_down[1] = !this.is_down[1]
        // if (this.is_down[1] == true)
        //     this.Aircraft1.y -= 0.5;
        // else
        //     this.Aircraft1.y += 0.5;
        // if (this.time >= this.time_bomb) {
        //     this.time = 0
        //     this.throw_bomb()
        // }

        //     // Aircraft2
        //     if (this.is_right[2]) {
        //         this.Aircraft2.scaleX = 1;
        //         this.Aircraft2.x -= this.Air_speed[2];
        //         if (this.Aircraft2.x <= -1500) {
        //             this.is_right[2] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[2] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[2]) {
        //                 this.Aircraft2.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft2.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft2.scaleX = -1;
        //         this.Aircraft2.x += this.Air_speed[2];
        //         if (this.Aircraft2.x >= 1500) {
        //             this.is_right[2] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[2] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[2]) {
        //                 this.Aircraft2.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft2.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft2.y - this.Air_alti[2]) >= 100)
        //         this.is_down[2] = !this.is_down[2]
        //     if (this.is_down[2] == true)
        //         this.Aircraft2.y -= 0.5;
        //     else
        //         this.Aircraft2.y += 0.5;

        //     // Aircraft3
        //     if (this.is_right[3]) {
        //         this.Aircraft3.scaleX = 1;
        //         this.Aircraft3.x -= this.Air_speed[3];
        //         if (this.Aircraft3.x <= -1500) {
        //             this.is_right[3] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[3] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[3]) {
        //                 this.Aircraft3.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft3.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft3.scaleX = -1;
        //         this.Aircraft3.x += this.Air_speed[3];
        //         if (this.Aircraft3.x >= 1500) {
        //             this.is_right[3] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[3] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[3]) {
        //                 this.Aircraft3.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft3.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft3.y - this.Air_alti[3]) >= 100)
        //         this.is_down[3] = !this.is_down[3]
        //     if (this.is_down[3] == true)
        //         this.Aircraft3.y -= 0.5;
        //     else
        //         this.Aircraft3.y += 0.5;

        //     // Aircraft4
        //     if (this.is_right[4]) {
        //         this.Aircraft4.scaleX = 1;
        //         this.Aircraft4.x -= this.Air_speed[4];
        //         if (this.Aircraft4.x <= -1500) {
        //             this.is_right[4] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[4] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[4]) {
        //                 this.Aircraft4.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft4.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft4.scaleX = -1;
        //         this.Aircraft4.x += this.Air_speed[4];
        //         if (this.Aircraft4.x >= 1500) {
        //             this.is_right[4] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[4] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[4]) {
        //                 this.Aircraft4.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft4.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft4.y - this.Air_alti[4]) >= 100)
        //         this.is_down[4] = !this.is_down[4]
        //     if (this.is_down[4] == true)
        //         this.Aircraft4.y -= 0.5;
        //     else
        //         this.Aircraft4.y += 0.5;

        //     // Aircraft5
        //     if (this.is_right[5]) {
        //         this.Aircraft5.scaleX = 1;
        //         this.Aircraft5.x -= this.Air_speed[5];
        //         if (this.Aircraft5.x <= -1500) {
        //             this.is_right[5] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[5] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[5]) {
        //                 this.Aircraft5.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft5.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft5.scaleX = -1;
        //         this.Aircraft5.x += this.Air_speed[5];
        //         if (this.Aircraft5.x >= 1500) {
        //             this.is_right[5] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[5] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[5]) {
        //                 this.Aircraft5.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft5.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft5.y - this.Air_alti[5]) >= 100)
        //         this.is_down[5] = !this.is_down[5]
        //     if (this.is_down[5] == true)
        //         this.Aircraft5.y -= 0.5;
        //     else
        //         this.Aircraft5.y += 0.5;

        //     // Aircraft6
        //     if (this.is_right[6]) {
        //         this.Aircraft6.scaleX = 1;
        //         this.Aircraft6.x -= this.Air_speed[6];
        //         if (this.Aircraft6.x <= -1500) {
        //             this.is_right[6] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[6] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[6]) {
        //                 this.Aircraft6.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft6.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft6.scaleX = -1;
        //         this.Aircraft6.x += this.Air_speed[6];
        //         if (this.Aircraft6.x >= 1500) {
        //             this.is_right[6] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[6] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[6]) {
        //                 this.Aircraft6.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft6.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft6.y - this.Air_alti[6]) >= 100)
        //         this.is_down[6] = !this.is_down[6]
        //     if (this.is_down[6] == true)
        //         this.Aircraft6.y -= 0.5;
        //     else
        //         this.Aircraft6.y += 0.5;

        //     // Aircraft7
        //     if (this.is_right[7]) {
        //         this.Aircraft7.scaleX = 1;
        //         this.Aircraft7.x -= this.Air_speed[7];
        //         if (this.Aircraft7.x <= -1500) {
        //             this.is_right[7] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[7] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[7]) {
        //                 this.Aircraft7.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft7.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     else {
        //         this.Aircraft7.scaleX = -1;
        //         this.Aircraft7.x += this.Air_speed[7];
        //         if (this.Aircraft7.x >= 1500) {
        //             this.is_right[7] = Math.random() < 0.5 ? true : false
        //             this.Air_speed[7] = this.min_speed + Math.random() * (this.max_speed - this.min_speed)
        //             if (this.is_right[7]) {
        //                 this.Aircraft7.x = this.min_x + Math.random() * (this.max_x - this.min_x)
        //             }
        //             else {
        //                 this.Aircraft7.x = -this.min_x - Math.random() * (this.max_x - this.min_x)
        //             }
        //         }
        //     }
        //     if (Math.abs(this.Aircraft7.y - this.Air_alti[7]) >= 100)
        //         this.is_down[7] = !this.is_down[7]
        //     if (this.is_down[7] == true)
        //         this.Aircraft7.y -= 0.5;
        //     else
        //         this.Aircraft7.y += 0.5;
    }

    max_alti = 500
    min_alti = 200

    Air_alti: number
    Create_Aircraft() {
        let type = Math.floor(Math.random() * this.Aircraft_Prefab.length)
        let airObjg = cc.instantiate(this.Aircraft_Prefab[type]).getComponent(Aircraft);
        airObjg.setType(type)
        let is_right = Math.random() < 0.5
        airObjg.setOriention(is_right, Math.random() < 0.5)
        airObjg.node.x = is_right ? cc.winSize.width / 2 + airObjg.node.width / 2 : -cc.winSize.width / 2 - airObjg.node.width / 2
        airObjg.node.y = Math.random() * (this.max_alti - this.min_alti) + this.min_alti
        airObjg.Air_alti = airObjg.node.y
        airObjg.node.parent = this.node;

    }

    touchStartBR() {
        this.tank.setMOveLeft(false)
    }

    touchStartBL() {
        this.tank.setMOveLeft(true)
    }


    touchEndBR() {
        this.tank.setStopMove();
    }

    touchEndBL() {
        this.tank.setStopMove();
    }

    joyStickCallbackStart(angel) {
        this.tank.setFire(angel);
    }

    joyStickCallbackEnd() {
        this.tank.setStopFire()
    }

    // throw_bomb() {
    //     let bomb = cc.instantiate(this.Prefab_bomb)
    //     bomb.parent = this.node
    //     let pos = this.Aircraft1.getPosition()
    //     pos.y -= 70
    //     bomb.setPosition(pos)
    // }
}