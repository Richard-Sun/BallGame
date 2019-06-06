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
        i:0,
        j:0,
        times:0,
        timesPrefab: {
            default: null,
            type: cc.Prefab,
        },
        dropSound: {
            default: null,
            url: cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    contact:function(){
        if(this.times >= 2){
        this.times -= 1;
        var lab = this.node.getChildByName("timesPrefab");     
        lab.getComponent(cc.Label).string = this.times;
        this.getComponent(cc.Animation).play('test');
        }
        else{
            var can = cc.find("Canvas");
            can.getComponent("Game").var[this.i][this.j] = 0;
            var can = cc.find("Canvas");
            can.getComponent("Game").gainScore(50);
            cc.audioEngine.play(this.dropSound, false, 0.03);
            this.node.removeAllChildren();
            this.getComponent(cc.Animation).play('bomb');
            this.getComponent(cc.RigidBody).enabled=false;
            this.getComponent(cc.PhysicsCircleCollider).enabled=false;
            this.scheduleOnce(function(){
            cc.loader.release(this.node);
            this.node.destroy();
            },0.25);
            
        }

    },

     onLoad () {
        var can = cc.find("Canvas");
        this.times = Math.ceil(Math.random()*5*(can.getComponent("Game").level)+Math.pow(can.getComponent("Game").level,1.5));
        var lab = cc.instantiate(this.timesPrefab);
        this.node.addChild(lab);
        lab.setPosition(0,0);
        lab.getComponent(cc.Label).string=this.times;
        
     },

    start () {

    },

    onDestroy:function(){
        
    },

     update (dt) {
        

     },
});
