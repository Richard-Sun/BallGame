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
    },

    // LIFE-CYCLE CALLBACKS:

     onLoad () {
       // var showIn = cc.spawn(cc.fadeIn(30), cc.scaleTo(30, 1.0));
        this.node.opacity=0;
        this.node.scale=0;
        var show = cc.spawn(cc.fadeIn(0.3),cc.scaleTo(0.3,1));
        this.node.runAction(show);
        var lab = this.node.getChildByName("score").getComponent(cc.Label);
        lab.string = cc.find("Canvas").getComponent("Game").score;
        //alert("aaa");
     },

    start () {

    },

     update (dt) {
     },
});
