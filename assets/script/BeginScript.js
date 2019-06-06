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
        button: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.button.node.on('click', this.callback, this);
        cc.director.preloadScene("Scene2");
     },
     
     callback: function (event) {
        //这里的 event 是一个 EventCustom 对象，你可以通过 event.detail 获取 Button 组件
        cc.director.loadScene("Scene2");
        //do whatever you want with button
        //另外，注意这种方式注册的事件，也无法传递 customEventData
     },

    start () {

    },

    // update (dt) {},
});
