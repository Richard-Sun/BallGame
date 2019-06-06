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
        //球速度
        speed : cc.v2(0,0),
        //摩擦力（速度方向*f的值的大小，有大小有方向）
        accel : cc.v2(0,0),

        mouseDownFlag : false,//小球是否被点击
        readFlag : true,//是否可点击发射的flag
        indicateFlag : false,//是否生成发射方向指示的flag
        //鼠标放在球上的光环的Prefab
        haloPrefab: {
            default: null,
             type: cc.Prefab
        },
        //鼠标拖拽的方向指示的Prefab
        dotPrefab: {
            default: null,
             type: cc.Prefab
        },
        crushSound: {
            default: null,
            url: cc.AudioClip
        },

        f : 0,//所受摩擦力f（大小）
    },

     //LIFE-CYCLE CALLBACKS: setInit


    //摩擦力和速度方向相同
    setAccel: function(){
       var another = Math.sqrt( Math.pow(this.speed.x,2) + Math.pow(this.speed.y,2) );
       this.accel = cc.v2( this.f * this.speed.x/another , this.f * this.speed.y / another);
    },
    //设置移动
    setMove : function(dt){
        var move = cc.moveBy(dt,cc.v2(this.speed.x/10,this.speed.y/10));
        return move;
    },


    //一系列事件
    mouseDown : function(event){
        if(this.readFlag === true && this.mouseDownFlag === false){
        this.indicateFlag = true;
        this.mouseDownFlag = true;
        var dot1 = cc.instantiate(this.dotPrefab);
        var dot2 = cc.instantiate(this.dotPrefab);
        var dot3 = cc.instantiate(this.dotPrefab);
        this.node.addChild(dot1);
        this.node.addChild(dot2);
        this.node.addChild(dot3);
        var child = this.node.children;
        } 
    },
    mouseUp : function(event){
        if(this.readFlag === true && this.mouseDownFlag === true){
            //全局坐标
            var ml = event.getLocation();
            //转换成局部坐标
            ml = this.node.parent.convertToNodeSpaceAR(ml)
            var ball = this.node;
            var x = ml.x - ball.x;
            var y = ml.y - ball.y;
            var sq = Math.pow(x,2)+Math.pow(y,2);
            if(sq<=100000){
                this.speed.x = -x*2/3;
                this.speed.y = -y*2/3;
            }else{
                var ra = Math.sqrt(100000/sq);
                this.speed.x = -x*2/3*ra;
                this.speed.y = -y*2/3*ra;
            }
            this.readFlag = false;
            this.indicateFlag = false;
            //var dot = this.node.getChildByName("dot");
            //dot.destroy();
            this.node.removeAllChildren();
            this.readFlag = false;
     }
     this.mouseDownFlag = false;
    },
    mouseMove : function(event){
        if(this.indicateFlag === true && this.readFlag === true && this.mouseDownFlag === true){
            var ml = event.getLocation();
            ml = this.node.parent.convertToNodeSpaceAR(ml)
            var ball = this.node;
            var x = ml.x - ball.x;
            var y = ml.y - ball.y;
            var sq = Math.pow(x,2)+Math.pow(y,2);
            if(sq<=125000){
                x=1.3*x;
                y=1.3*y
            }else{
                var ra = Math.sqrt(125000/sq);
                x = x*ra*1.3;
                y=  y*ra*1.3;
            }
            var child = this.node.children;
            var h = -0.25;
            for (var i=0;i<child.length;i++){
                if(child[i].name ==="dot"){
                    child[i].setPosition(h*x,h*y);
                    h -= 0.25;
                }
            }
        }
    },
    mouseEnter : function(event){
        if(this.readFlag === true){
        var halo = cc.instantiate(this.haloPrefab);
        this.node.addChild(halo);
        halo.setPosition(0,-2);
        }
    },
    mouseLeave : function(event){
        var halo = this.node.getChildByName("halo");
        if( halo != null ) halo.destroy();
    },

    onCollisionEnter(other,self){
    },

    onCollisionExit(other,self){
        
    },
    //物理碰撞开始
    onBeginContact: function (contact, selfCollider, otherCollider) {
        var can = cc.find("Canvas");
        if(otherCollider.tag == 1){can.getComponent("Game").gainScore(5);}
        var worldManifold = contact.getWorldManifold();
        var normal = worldManifold.normal;
        var x = (2*this.speed.y*normal.x*normal.y + this.speed.x*(Math.pow(normal.x,2)-Math.pow(normal.y,2)))/(Math.pow(normal.x,2)+Math.pow(normal.y,2));
        var y = (2*this.speed.x*normal.x*normal.y - this.speed.y*(Math.pow(normal.x,2)-Math.pow(normal.y,2)))/(Math.pow(normal.x,2)+Math.pow(normal.y,2)); 
        this.speed.x = -x;
        this.speed.y = -y;
        if(otherCollider.tag === 1){
            otherCollider.getComponent("BoxScript").contact();
            cc.audioEngine.play(this.crushSound, false, 0.04);
        }
    },

    start () {
    },

    onLoad(){
        this.f = 17;
        this.speed.x = 0;
        this.speed.y = 0;
        this.readFlag = true;
        this.indicateFlag = false;
        this.mouseDownFlag = false;
        this.node.parent.on(cc.Node.EventType.MOUSE_MOVE,this.mouseMove, this);//一系列事件监听开启
        this.node.on(cc.Node.EventType.MOUSE_DOWN,this.mouseDown, this);
        this.node.on(cc.Node.EventType.MOUSE_LEAVE,this.mouseLeave, this);
        this.node.on(cc.Node.EventType.MOUSE_ENTER,this.mouseEnter, this);
        this.node.parent.on(cc.Node.EventType.MOUSE_UP,this.mouseUp, this);
        this.getComponent(cc.Animation).play('ball');
    },

    onDestroy(){
        //alert("Destroy!");
    },

     update (dt) {
        var sp = Math.pow( this.speed.x, 2) + Math.pow( this.speed.y, 2) - Math.pow( this.accel.x*dt, 2) - Math.pow( this.accel.y*dt, 2);
        if( sp > 0 ){     
              this.speed.x -= this.accel.x * dt;
              this.speed.y -= this.accel.y * dt;
              this.setAccel();
              this.move = this.setMove(dt);
              this.node.runAction(this.move);
        }
        else{
            this.speed = cc.v2(0,0);
            this.readFlag = true;
        }
    },

});
