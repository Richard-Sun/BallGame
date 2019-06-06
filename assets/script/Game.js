// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        boxCount : 0,
        displayFlag : false,
        genFlag : false,
        level : 0,
        score : 0,
        var : [],
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        alertPrefab: {
            default: null,
             type: cc.Prefab
        },
        boxPrefab1: {
            default: null,
             type: cc.Prefab
        },
        boxPrefab2: {
            default: null,
             type: cc.Prefab
        },
        boxPrefab3: {
            default: null,
             type: cc.Prefab
        },
        boxPrefab4: {
            default: null,
             type: cc.Prefab
        },
        ball:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
        cc.game.setFrameRate(100);
        cc.director.getCollisionManager().enabled=true;//碰撞检测开启
        cc.director.getPhysicsManager().enabled = true;//物理检测开启
        this.score = 0;
        this.level = 1;
        this.boxCount = 0;
        this.genFlag = true;
        this.displayFlag = false;
        this.var = [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]];
        this.ball = this.node.getChildByName("ball");

     },

    start () {

    },

    createBox:function(level){
        this.boxCount = 0;
        for(var i = 0; i<6; i++){
            for(var j = 0; j<6; j++){
                if(this.var[i][j]==1){
                    this.boxCount++;
                }
            }
        }
        if(this.boxCount>=35) {return true;}
        this.level++;
        var last = 36 - this.boxCount;
        var turn = Math.ceil(last/5);
        for(var i = 0; i<6; i++){
            for(var j = 0; j<6; j++){
                if(this.var[i][j] == 0){
                    if(Math.random()<=(turn/last)){
                        turn--;
                        last--;
                        this.var[i][j] = 1;
                        var ra = Math.ceil(Math.random()*4);
                        if(ra == 1){var box = cc.instantiate(this.boxPrefab1);}
                        if(ra == 2){var box = cc.instantiate(this.boxPrefab2);}
                        if(ra == 3){var box = cc.instantiate(this.boxPrefab3);}
                        if(ra == 4){var box = cc.instantiate(this.boxPrefab4);}
                        this.node.addChild(box);
                        box.getComponent("BoxScript").j = j;
                        box.getComponent("BoxScript").i = i;
                        box.getComponent("BoxScript").j = j;
                        box.setPosition(-250+i*100,-250+j*100);
                        this.boxCount++;
                    }
                }
            }
        }
        return false;
    },

    gainScore: function (sc) {
        this.score += sc;
        this.scoreDisplay.string = 'Score: ' + this.score;
    },

    update (dt) {
        if(this.ball.getComponent("BallScript").readFlag == true){
            if(this.genFlag == true){
                var fg = this.createBox();
                if(fg == true && this.displayFlag === false){
                    var alert = cc.instantiate(this.alertPrefab);
                    this.node.addChild(alert);
                    this.displayFlag = true;
                }
                this.genFlag = false;
            }
        }else{
            this.genFlag = true;
        }
    },
});
