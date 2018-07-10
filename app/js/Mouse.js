export default class Mouse {
    constructor(MOUSE_PADDING){
        this.img_s = new Image();
        this.img_n = new Image();
        this.img_e = new Image();
        this.img_w = new Image();
        this.x = 0 + MOUSE_PADDING;
        this.y = 0 + MOUSE_PADDING;
        this.facing = "S";
        this.trackX = 0;
        this.trackY = 0;
        this.memory = [];
        this.goal = false;
    }
}
