var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var globalPointerID = -1;
var Game = (function (_super) {
    __extends(Game, _super);
    // -------------------------------------------------------------------------
    function Game() {
        // init game
        _super.call(this, 500, 660, Phaser.CANVAS, "content", State);
    }
    return Game;
}(Phaser.Game));
//declare var VirtualJoystick: any; 
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var State = (function (_super) {
    __extends(State, _super);
    function State() {
        _super.apply(this, arguments);
        this._swipeActive = false;
        this._hangar = 1;
        this._cannonTip = new Phaser.Point();
        this._shipDirection = 0;
    }
    // -------------------------------------------------------------------------
    State.prototype.preload = function () {
        // background image
        this.game.load.image("BG", "bg.jpg");
        // load sprite images in atlas
        this.game.load.atlas("Atlas", "atlas.png", "atlas.json");
        this.game.load.image('imageKey', 'pink.png');
        this.game.load.image('jsarea', 'jsarea.png');
    };
    // -------------------------------------------------------------------------
    State.prototype.create = function () {
        // console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
        //gyro.frequency = 10;
        // start gyroscope detection
        //gyro.startTracking(function (o) {
        // updating player velocity
        //player.body.velocity.x += o.gamma / 20;
        // player.body.velocity.y += o.beta / 20;
        //});
        this.game.world.setBounds(0, 0, 500, 1320);
        this.game.camera.y = 660;
        this._transitionTween = this.game.add.tween(this.game.camera).to({ y: 660 }, 10, Phaser.Easing.Power1, true);
        // background
        this._backgroundImage = this.add.image(0, 0, "BG");
        // set physiscs to P2 physics engin
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 200;
        this.game.physics.p2.restitution = 0.1;
        this._joystick = new Joystick(this.game, 200, 600);
        // cannon base - place over cannon, so it overlaps it
        this._base = this.game.add.sprite(this.world.centerX, this.world.height / 1.5, "Atlas", "base");
        this._base.name = 'DROPSHIP';
        this._joystick.setup(this._base);
        // this._base = new DropShip(this.game, this.world.centerX, this.world.height / 1.5, 'imageKey');
        //  this._base.setUp();
        this._base.anchor.setTo(0.5, 1);
        // cannon - place it in the bottom center
        this._cannon = this.game.add.sprite(this.world.centerX, this.world.height / 2, "Atlas", "cannon");
        //this._cannon = new Phaser.Sprite(this.game, 0, 0, "Atlas", "cannon");
        ///this._base.addChild(this._cannon);
        // this._cannon.x =0;
        // this._cannon.y =0;
        // offset it from position
        this._cannon.anchor.setTo(-0.75, 0.5);
        // make it point straight up
        //this._cannon.rotation = -Math.PI / 2;
        this._cannonTween = this.game.add.tween(this._cannon).to({ rotation: -Math.PI / 2 }, 100, Phaser.Easing.Power1, true);
        //this._cannon.body.gravityScale = 0;
        this.game.physics.p2.enable(this._base);
        this._base.body.setCircle(33);
        this._base.body.angularDamping = 1;
        this._base.body.mass = 1;
        this._base.body.collideWorldBounds = false;
        this._base.body.debug = true;
        //  Game input
        this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        // following keys will not be propagated to browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.SPACEBAR]);
        // allow inpact events
        this.game.physics.p2.setImpactEvents(true);
        //  collision groups for drones
        this._dronesCollisionGroup = this.game.physics.p2.createCollisionGroup();
        //  collision groups for missiles
        this._missilesCollisionGroup = this.physics.p2.createCollisionGroup();
        //var js: Joystick = new Joystick(this.game,200,200,'imageKey');
        // js.setUp();
        // drones group
        this._drones = this.add.group();
        this._drones.physicsBodyType = Phaser.Physics.P2JS;
        this._drones.enableBody = true;
        // create 8 drones
        this._drones.classType = Dron;
        this._drones.createMultiple(3, "Atlas", "dron1");
        this._drones.forEach(function (aDron) {
            // setup movements and animations
            aDron.setUp();
            aDron.events.onInputDown.add(function (currentSprite) { this._facingTarget = false; this._targetDrone = currentSprite; }, this);
            // setup physics
            var body = aDron.body;
            body.setCircle(aDron.width / 2);
            body.kinematic = true; // does not respond to forces
            body.setCollisionGroup(this._dronesCollisionGroup);
            // adds group drones will collide with and callback
            body.collides(this._missilesCollisionGroup, this.hitDron, this);
            //body.debug = true;
        }, this);
        // missiles group
        this._missiles = this.add.group();
        this._missiles.physicsBodyType = Phaser.Physics.P2JS;
        this._missiles.enableBody = true;
        // create 10 missiles
        this._missiles.createMultiple(10, "Atlas", "missile");
        this._missiles.forEach(function (aMissile) {
            aMissile.anchor.setTo(0.5, 0.5);
            // physics
            var body = aMissile.body;
            body.setRectangle(aMissile.width, aMissile.height);
            body.setCollisionGroup(this._missilesCollisionGroup);
            body.collides(this._dronesCollisionGroup);
            // body.debug = true;
        }, this);
        if (this._swipeActive == true) {
            var swipeMinDistance = this.game.world.width / 10;
            // Math.floor((swipeDistance / this.game.world.width) * 100);
            var startPointx = 0;
            var startPointy = 0;
            var endPointx = 0;
            var endPointy = 0;
            this._swipeTimer = this.game.time.create(false);
            this.game.input.onDown.add(function (pointer) { this._swipeTimer.start(); this.startPointx = pointer.clientX; this.startPointy = pointer.clientY; }, this);
            this.game.input.onUp.add(function (pointer) {
                var eventDuration = this._swipeTimer.ms;
                this._swipeTimer.stop();
                this.endPointx = pointer.clientX;
                this.endPointy = pointer.clientY;
                var currVelocitySqr = (this.startPointx + this.endPointx) * (this.startPointx + this.endPointx) + (this.startPointy + this.endPointy) * (this.startPointy + this.endPointy);
                var vy = this.endPointy - this.startPointy;
                var vx = this.endPointx - this.startPointx;
                var angleN = Math.atan2(vy, vx);
                vx = Math.cos(angleN) * 0.15 * eventDuration;
                vy = Math.sin(angleN) * 0.15 * eventDuration;
                var swipeDistance = difference(this.startPointx, this.endPointx);
                var swipedLeft;
                if (this.endPointx < this.startPointx - swipeMinDistance) {
                    // console.log("left: " + vx + 'duration: ' + eventDuration);
                    //this.game.add.tween(this._base.body).to({ angle: vx }, eventDuration, Phaser.Easing.Bounce.Out, true);
                    // this._base.body.rotateLeft(this.endPointy - this.startPointy);
                    swipedLeft = true;
                }
                else if (this.endPointx > this.startPointx + swipeMinDistance) {
                    //console.log("right: " + vx + 'duration: ' + eventDuration);
                    // this.game.add.tween(this._base.body).to({ angle: vx }, eventDuration, Phaser.Easing.Bounce.Out, true);
                    // this._base.body.rotateLeft(this.endPointy - this.startPointy);
                    swipedLeft = false;
                }
                else if (this.endPointy < this.startPointy - swipeMinDistance) {
                }
                else if (this.endPointx > this.startPointy + swipeMinDistance) {
                }
                var swipePercent = Math.floor((swipeDistance / this.game.world.width) * 50);
                if (swipedLeft == true) {
                    swipePercent = 0 - swipePercent;
                }
                if (swipedLeft == true || swipedLeft == false) {
                    this.game.tweens.removeFrom(this._base.body);
                    this.game.add.tween(this._base.body).to({ angle: this._base.body.angle + swipePercent }, eventDuration * 2, Phaser.Easing.Power1, true);
                    console.log('Swipe Percent ' + swipePercent + ' -' + swipedLeft);
                }
                // var maxNum = Math.max(1000, eventDuration);
                //this.game.tweens.removeFrom(this._base.body);
                //this.game.tweens.removeTween(
                //this.game.add.tween(this._base.body).to({ angle: vx }, 200, Phaser.Easing.Bounce.Out, true);
                //this.shipDirection = 
                //var shipTween = this.game.add.tween(this._base.body);
                // shipTween.to({ angle: angleN }, eventDuration);
            }, this);
        }
        this._thrustBtn = this.game.add.sprite(480, this.world.height, 'imageKey');
        this._thrustBtn.anchor.setTo(0.5, 1);
        this._thrustBtn.inputEnabled = true;
        this._thrustBtn.events.onInputDown.add(this.igniteThruster);
        this._thrustBtn.events.onInputUp.add(this.thrusterOff);
        this._leftBtn = this.game.add.sprite(this.game.world.centerX - 50, this.world.height, 'imageKey');
        this._leftBtn.rotation = -1;
        this._leftBtn.anchor.setTo(0.5, 1);
        this._leftBtn.inputEnabled = true;
        this._rightBtn = this.game.add.sprite(this.game.world.centerX + 50, this.world.height, 'imageKey');
        this._rightBtn.rotation = 1;
        this._rightBtn.anchor.setTo(0.5, 1);
        this._rightBtn.inputEnabled = true;
        this._objectsCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this._shipCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this._objects = this.game.add.group();
        this._objects.enableBody = true;
        this._objects.physicsBodyType = Phaser.Physics.P2JS;
        for (var i = 0; i < 1; i++) {
            var width = 30; // example;
            var height = 30; // example;
            var bmd = this.game.add.bitmapData(width, height);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, height);
            bmd.ctx.fillStyle = '#bfcffa';
            bmd.ctx.fill();
            var object = this._objects.create(50, this.game.world.y + 50, bmd);
            object.anchor.setTo(0.5, 0.5);
            this.game.physics.p2.enable(object);
            //object.body.mass = 0;
            object.body.data.gravityScale = 0.0;
            object.body.setRectangle(width, height);
            object.body.setCollisionGroup(this._objectsCollisionGroup);
            object.body.collides([this._objectsCollisionGroup, this._shipCollisionGroup]);
        }
        this._base.body.setCollisionGroup(this._shipCollisionGroup);
        this._base.body.collides(this._objectsCollisionGroup, this.hitObject, this);
        this._doors = this.game.add.group();
        this.createDoor();
        var style = { font: "15px Arial", fill: "#ffcc00", align: "left" };
        this._text1 = this.game.add.text(300, 900, 'accel', style);
        this._text1.anchor.setTo(0.5, 0.5);
        this._text2 = this.game.add.text(300, 950, 'accel+gravity', style);
        this._text2.anchor.setTo(0.5, 0.5);
        /* var door2: Phaser.Sprite = this._doors.create(this.world.centerX, this.game.camera.y - 30, bmd2);
         door2.anchor.setTo(0.5, 0.5);
         door1.name = 'd2';*/
    };
    // -------------------------------------------------------------------------
    State.prototype.update = function () {
        // shortcut
        //this._joystick.onUpdate();
        var keyboard = this.game.input.keyboard;
        this._missiles.forEach(function (aMissile) {
            if (aMissile.inWorld == false) {
            }
        }, this);
        this._cannon.x = this._base.x;
        this._cannon.y = this._base.y + 8;
        if (keyboard.isDown(Phaser.Keyboard.UP)) {
            // this._base.body.thrust(State.THRUST_POWER);
            this.applyThruster(true);
        }
        this.applyThruster(false);
        // if (this.game.input.activePointer.isDown && this._leftBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressLeft(); }
        // if (this.game.input.activePointer.isDown && this._rightBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressRight(); }
        // left and right key
        if (keyboard.isDown(Phaser.Keyboard.COMMA)) {
            // calculate frame independent speed - 45 degrees (PI/4) in 1 second adjusted with cannon speed
            this._cannon.rotation -= this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        }
        else if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.pressLeft();
        }
        else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.pressRight();
        }
        else if (keyboard.isDown(Phaser.Keyboard.PERIOD)) {
            this._cannon.rotation += this.time.elapsedMS * State.CANNON_SPEED / 1000 * (Math.PI / 4);
        }
        else if (this._space.justDown) {
            // get firtst missile from pool
            var missile = this._missiles.getFirstExists(false);
            if (missile) {
                // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                this._cannonTip.setTo(this._cannon.width * 2, 0);
                this._cannonTip.rotate(0, 0, this._cannon.rotation);
                missile.reset(this._cannon.x + this._cannonTip.x, this._cannon.y + this._cannonTip.y);
                missile.body.rotation = this._cannon.rotation;
                // life of missile in millis
                //missile.lifespan = 3000;
                // set velocity of missile in direction of cannon barrel
                missile.body.velocity.x = this._cannonTip.x * State.MISSILE_SPEED;
                missile.body.velocity.y = this._cannonTip.y * State.MISSILE_SPEED;
            }
        }
        // limit cannon rotation to left and right to +/- 45 degrees ... -135 to -45 degrees here
        //this._cannon.rotation = (Phaser.Math.clamp(this._cannon.rotation, -1.5 * Math.PI / 2, -0.5 * Math.PI / 2));
        //+ this._base.body.rotation;
        //this._cannon.rotation = this._base.body.rotation - (1 * Math.PI / 2);
        if (this._targetDrone != null) {
            var angle = Math.atan2(this._targetDrone.y - this._cannon.y, this._targetDrone.x - this._cannon.x);
            //angle = angle * (180 / Math.PI);
            var calculatedAngle = angle * (180 / Math.PI);
            var diff = difference(calculatedAngle, this._cannon.angle);
            //console.log(diff);
            if (this._facingTarget == true) {
                this._cannon.angle = calculatedAngle;
            }
            else {
                // this.game.add.tween(this._cannon).to({ angle: calculatedAngle }, 200, Phaser.Easing.Linear, true);
                if (this._cannonTween.isRunning) {
                }
                else {
                    this._cannonTween = this.game.add.tween(this._cannon).to({ angle: calculatedAngle }, 200, Phaser.Easing.Power1, true);
                    //this._cannonTween.onComplete.add(doSomething, this); function doSomething() { this._facingTarget = true; };
                    this._cannonTween.onComplete.add(this.targetAquired, this);
                }
            }
        }
        else {
            if (this._cannonTween.isRunning) {
            }
            else {
            }
        }
        if (this._transitionTween.isRunning == false) {
            /* if (deviceMo != null) {
                 if (deviceMo.acceleration != null) {
                     if (deviceMo.acceleration.y != null) {
                         this._text1.setText("y:" + deviceMo.acceleration.y.toFixed(3) + ", x:" + deviceMo.acceleration.x.toFixed(3) + ", z:" + deviceMo.acceleration.z.toFixed(3));
                         this._text2.setText("y:" + deviceMo.accelerationIncludingGravity.y.toFixed(3) + ", x:" + deviceMo.accelerationIncludingGravity.x.toFixed(3) + ", z:" + deviceMo.accelerationIncludingGravity.z.toFixed(3));
                     }
                 }
 
             }*/
            for (var j = 0; j < this._doors.children.length; j++) {
                if (this.checkOverlap(this._base, this._doors.getChildAt(j))) {
                    //console.log('door');
                    this.callTransition();
                }
            }
        }
    };
    // -------------------------------------------------------------------------
    State.prototype.render = function () {
        // uncomment to visual debug, also uncommnet "body.debug = true;" when creating missiles and drones
        this._drones.forEach(function (aDron) {
            this.game.debug.body(aDron);
        }, this);
        this._missiles.forEach(function (aMissile) {
            this.game.debug.body(aMissile);
        }, this);
        this.game.debug.body(this._base);
        this.game.debug.text(this._joystick.mydebug.toString(), 0, 80);
        /*this.game.debug.cameraInfo(this.game.camera, 32, 32);
        this.game.debug.pointer(this.game.input.mousePointer);
        this.game.debug.pointer(this.game.input.pointer1);
        this.game.debug.pointer(this.game.input.pointer2);*/
    };
    // -------------------------------------------------------------------------
    State.prototype.hitDron = function (aObject1, aObject2) {
        // explode dron and remove missile - kill it, not destroy
        this._targetDrone = null;
        this._cannonTween = this.game.add.tween(this._cannon).to({ rotation: -Math.PI / 2 }, 200, Phaser.Easing.Power1, true);
        aObject1.sprite.explode();
        //(<Phaser.Sprite>aObject2.sprite).kill();
    };
    State.prototype.igniteThruster = function () {
        console.log('thrust');
        _holdThruster = 1;
    };
    State.prototype.applyThruster = function (force) {
        if (_holdThruster == 1 || force == true) {
            //console.log('thrustpowered');
            this._base.body.thrust(State.THRUST_POWER);
        }
        else if (_holdThruster == 0) {
        }
    };
    State.prototype.thrusterOff = function () {
        console.log('no thrust');
        _holdThruster = 0;
    };
    State.prototype.pressLeft = function () {
        this._base.body.rotation -= this.time.elapsedMS * State.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
    };
    State.prototype.pressRight = function () {
        this._base.body.rotation += this.time.elapsedMS * State.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
    };
    State.prototype.targetAquired = function () {
        this._facingTarget = true;
    };
    State.prototype.hitObject = function (body1, body2) {
        //  body1 is the space ship (as it's the body that owns the callback)
        //  body2 is the body it impacted with, in this case our panda
        //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
        console.log('object hit');
    };
    State.prototype.checkOverlap = function (spriteA, spriteB) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        return Phaser.Rectangle.intersects(boundsA, boundsB);
    };
    State.prototype.callTransition = function () {
        this._doors.removeAll();
        this.game.physics.p2.pause();
        var cameraY;
        switch (this._hangar) {
            case 1:
                cameraY = 150;
                //this._base.y = this._base.y - 100;
                this._hangar = 2;
                break;
            case 2:
                cameraY = 660;
                // this._base.y = this._base.y + 100;
                this._hangar = 1;
                break;
            case 3:
                break;
            default:
                console.log('no level?');
        }
        this._transitionTween = this.game.add.tween(this.game.camera).to({ y: cameraY }, 250, Phaser.Easing.Linear.None, true);
        this._transitionTween.onComplete.add(this.transitionComplete, this);
        console.log('trans');
    };
    State.prototype.transitionComplete = function () {
        this.createDoor();
        this.game.physics.p2.resume();
    };
    State.prototype.createDoor = function () {
        var bmd2 = this.game.add.bitmapData(500, 40);
        bmd2.ctx.beginPath();
        bmd2.ctx.rect(0, 0, 500, 40);
        bmd2.ctx.fillStyle = '#666666';
        bmd2.ctx.fill();
        var yPos = 0;
        if (this._hangar == 1) {
            yPos = this.game.camera.y + 40;
        }
        if (this._hangar == 2) {
            yPos = 790;
        }
        var door1 = this._doors.create(this.world.centerX, yPos, bmd2);
        door1.name = 'd1';
        door1.anchor.setTo(0.5, 0.5);
    };
    State.CANNON_SPEED = 2;
    State.MISSILE_SPEED = 6;
    State.THRUST_POWER = 450;
    State.SHIP_ROTATE_SPEED = 4;
    return State;
}(Phaser.State));
var _holdThruster = 3;
var deviceMo;
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
var Dron = (function (_super) {
    __extends(Dron, _super);
    function Dron() {
        _super.apply(this, arguments);
    }
    // -------------------------------------------------------------------------
    Dron.prototype.setUp = function () {
        this.anchor.setTo(0.5, 0.5);
        // random position
        this.reset(this.game.rnd.between(40, 340), this.game.rnd.between(60, 350));
        // random movement range
        var range = this.game.rnd.between(60, 120);
        // random duration of complete move
        var duration = this.game.rnd.between(30000, 50000);
        // random parameters for wiggle easing function
        var xPeriod1 = this.game.rnd.between(2, 13);
        var xPeriod2 = this.game.rnd.between(2, 13);
        var yPeriod1 = this.game.rnd.between(2, 13);
        var yPeriod2 = this.game.rnd.between(2, 13);
        // set tweens for horizontal and vertical movement
        var xTween = this.game.add.tween(this.body);
        xTween.to({ x: this.position.x + range }, duration, function (aProgress) {
            return wiggle(aProgress, xPeriod1, xPeriod2);
        }, true, 0, -1);
        var yTween = this.game.add.tween(this.body);
        yTween.to({ y: this.position.y + range }, duration, function (aProgress) {
            return wiggle(aProgress, yPeriod1, yPeriod2);
        }, true, 0, -1);
        // define animations
        this.animations.add("anim", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
        this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
        // play first animation as default
        this.play("anim");
        this.inputEnabled = true;
    };
    // -------------------------------------------------------------------------
    Dron.prototype.explode = function () {
        // remove movement tweens
        this.game.tweens.removeFrom(this.body);
        // explode dron and kill it on complete
        this.play("explosion", 8, false, true);
    };
    return Dron;
}(Phaser.Sprite));
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
function wiggle(aProgress, aPeriod1, aPeriod2) {
    var current1 = aProgress * Math.PI * 2 * aPeriod1;
    var current2 = aProgress * Math.PI * 2 * aPeriod2;
    return Math.sin(current1) * Math.cos(current2);
}
function difference(a, b) { return Math.abs(a - b); }
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
function onDeviceMotion(event) {
    deviceMo = event;
}
// -------------------------------------------------------------------------
window.onload = function () {
    new Game();
    window.addEventListener("devicemotion", onDeviceMotion, false);
};
var normalize = Phaser.Point.normalize;
var zero = new Phaser.Point(0, 0);
var Joystick = (function (_super) {
    __extends(Joystick, _super);
    function Joystick(game, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        console.log('joystick construcy...');
        _super.call(this, game, x, y, 'jsarea');
        this.anchor.setTo(0.5, 0.5);
        this.fixedToCamera = true;
        this.cameraOffset.setTo(x, y);
        this.direction = new Phaser.Point(0, 0);
        this.distance = 0;
        this.pinAngle = 0;
        this.disabled = false;
        this.isBeingDragged = false;
        this.mydebug = '.';
    }
    Joystick.prototype.update = function () {
        //console.log('rar');
    };
    Joystick.prototype.setup = function (myBase) {
        console.log('joystick setup... ' + myBase.name);
        this.base = myBase;
        this.game.add.existing(this);
        var width = 50; // example;
        var height = 50; // example;
        var bmd = this.game.add.bitmapData(width, height);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, width, height);
        bmd.ctx.fillStyle = '#ffcc00';
        bmd.ctx.fill();
        //this.dragger = this.game.add.sprite(0, 0, bmd);
        //this.dragger.anchor.setTo(0.5, 0.5);
        //this.dragger.width = this.dragger.height = 50;
        //this.dragger.inputEnabled = true;
        //this.dragger.input.enableDrag();
        //this.dragger.input.allowVerticalDrag = false;
        //this.game.input.pollRate = 0;
        // this.addChild(this.dragger);
        this.inputEnabled = true;
        // this.input.enableDrag();
        // this.dragger.events.onDragUpdate.add(onDragUpdate, this);
        this.events.onInputDown.add(onDown, { param1: this, param2: myBase });
        this.events.onInputUp.add(onUp, this);
        // this.events.onInputOut.add(onOut, this);
        function onDragUpdate(sprite, pointer) {
            sprite.mydebug = 'dragging';
            var deltaX = (pointer.x - pointer.positionDown.x);
            if (sprite.previousDelta == null) {
                sprite.previousDelta = deltaX;
            }
            // console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
            sprite.mydebug = '3deltaX: ' + deltaX + ', pID: ' + pointer.id;
            var mrNum = Math.abs(deltaX);
            if (deltaX < sprite.previousDelta) {
                this.base.body.rotation -= mrNum * 2 / 1000 * (Math.PI / 4);
            }
            else if (deltaX > sprite.previousDelta) {
                this.base.body.rotation += mrNum * 2 / 1000 * (Math.PI / 4);
            }
            sprite.previousDelta = deltaX;
        }
        // function onDown(sprite:Joystick, pointer:Phaser.Pointer, pri:Number, myBase:Phaser.Sprite) {
        function onDown() {
            //if an input down event (thruster or fire) is currently active, need a way to ignore them
            var sprite = this.param1;
            var myBase = this.param2;
            console.log('joystick onDown... ' + myBase.name);
            // sprite.myPointer = pointer;
            sprite.isBeingDragged = true;
            sprite.game.input.addMoveCallback(function (pointer, x, y, myBase) {
                // move callbacks will be triggered by thrust & fire buttons
                // but they will have different pointer IDs, so ignore them.
                if (globalPointerID == -1) {
                    globalPointerID = pointer.id;
                }
                if (globalPointerID == pointer.id) {
                    if (sprite.isBeingDragged == true) {
                        //console.log('move callback: ' + pointer.positionDown.x + ',' + pointer.x);                   
                        //console.log('joystick movecallback... ' + sprite.base.name);
                        var deltaX = (pointer.x - pointer.positionDown.x);
                        if (sprite.previousDelta == null) {
                            sprite.previousDelta = deltaX;
                        }
                        console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
                        sprite.mydebug = '2deltaX: ' + deltaX + ' ,pID: ' + pointer.id;
                        var mrNum = Math.abs(deltaX);
                        if (deltaX < sprite.previousDelta) {
                            sprite.base.body.angle = sprite.base.body.angle - 1; // -= mrNum * 2 / 1000 * (Math.PI / 4);
                        }
                        else if (deltaX > sprite.previousDelta) {
                            sprite.base.body.angle = sprite.base.body.angle + 1;
                        }
                        sprite.previousDelta = deltaX;
                    }
                }
            }, this);
        }
        function onUp(sprite, pointer) {
            // console.log('onup: was' + pointer.positionDown + ', now ' + pointer.positionUp);
            sprite.isBeingDragged = false;
            globalPointerID = -1;
        }
        function onOut(sprite, pointer) {
            //console.log('onout');
        }
    };
    Joystick.prototype.onUpdate = function () {
    };
    return Joystick;
}(Phaser.Sprite));
//# sourceMappingURL=app.js.map