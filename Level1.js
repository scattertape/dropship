var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var Level1 = (function (_super) {
        __extends(Level1, _super);
        function Level1() {
            _super.apply(this, arguments);
            this.landscapeLayout = false;
            this.CANNON_SPEED = 2;
            this.MISSILE_SPEED = 20;
            this.SHIP_ROTATE_SPEED = 4;
            this._swipeActive = false;
            this._upTolerance = 40;
            this._downTolerance = 100;
            this._leftTolerance = 60;
            this._rightTolerance = 60;
            this._cameraOverlap = 120;
            this._hangar = 1;
            this._shipDirection = 0;
            this._fireRate = 400;
        }
        // -------------------------------------------------------------------------
        Level1.prototype.create = function () {
            this.game.stage.backgroundColor = "#4488AA";
            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.world.setBounds((0 - this.game.width) - (this.game.width / 2), (0 - this.game.height) - (this.game.height / 2), this.game.width * 3, this.game.height * 3);
            if (this.game.width > this.game.height) {
                this.landscapeLayout = true;
            }
            // this.game.world.setBounds(0, 0, 500, 500);
            //  this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            // Set a minimum and maximum size for the game
            // Here the minimum is half the game size
            // And the maximum is the original game size
            // Center the game horizontally and vertically
            //  this.game.scale.pageAlignHorizontally = true;
            //   this.game.scale.pageAlignVertically = true;
            // console.log("touchscreen is", VirtualJoystick.touchScreenAvailable() ? "available" : "not available");
            //gyro.frequency = 10;
            // start gyroscope detection
            //gyro.startTracking(function (o) {
            // updating player velocity
            //player.body.velocity.x += o.gamma / 20;
            // player.body.velocity.y += o.beta / 20;
            //});
            /*
            if (landscapeLayout) {
              //  this.game.world.setBounds(0, 0, 1920, 640);
                this.game.world.setBounds(0, 0, 640, 1920);
            } else {
                this.game.world.setBounds(0, 0, 640, 1920);
            }
            */
            //this.game.camera.y = 0;//900;
            //this._transitionTween = this.game.add.tween(this.game.camera).to({ y:900 }, 10, Phaser.Easing.Power1, true);
            console.log('world center x: ' + this.world.centerX + ', world center y: ' + this.world.centerY);
            var cameraStartX = this.world.centerX - (this.game.width * 0.5);
            var cameraStartY = this.world.centerY - (this.game.height * 0.5);
            this._transitionTween = this.game.add.tween(this.game.camera).to({ x: cameraStartX, y: cameraStartY }, 10, Phaser.Easing.Power1, true);
            //this.game.camera.view = new Phaser.Rectangle(cameraStartX, cameraStartY, constructorWidth, constructorHeight);
            this._allGroup = this.game.add.group();
            this._levelGroup = this.game.add.group();
            this._level1 = this.game.add.sprite(this.world.centerX, this.world.centerY, '');
            this._level1.width = 1920;
            this._level1.height = 2880;
            this._level1.visible = false;
            this._level1.alpha = 0.25;
            this._currentSubLevel = 5;
            this._tiles = this.game.add.group();
            // Center
            var tile5 = this.game.add.sprite(this.world.centerX, this.world.centerY, 'level1-5');
            tile5.anchor.setTo(0.5, 0.5);
            tile5.name = 'tile5';
            this._tiles.add(tile5);
            // Top
            var tile8 = this.game.add.sprite(this.world.centerX, this.world.centerY + this._cameraOverlap, 'level1-8');
            tile8.anchor.setTo(0.5, 1.5);
            tile8.name = 'tile8';
            this._tiles.add(tile8);
            // Bottom
            var tile2 = this.game.add.sprite(this.world.centerX, this.world.centerY - this._cameraOverlap, 'level1-2');
            tile2.anchor.setTo(0.5, -0.5);
            tile2.name = 'tile2';
            this._tiles.add(tile2);
            // Left
            var tile4 = this.game.add.sprite(this.world.centerX + this._cameraOverlap, this.world.centerY, 'level1-4');
            tile4.anchor.setTo(1.5, 0.5);
            tile4.name = 'tile4';
            this._tiles.add(tile4);
            // Right
            var tile6 = this.game.add.sprite(this.world.centerX - this._cameraOverlap, this.world.centerY, 'level1-6');
            tile6.anchor.setTo(-0.5, 0.5);
            tile6.name = 'tile6';
            this._tiles.add(tile6);
            // Top Left
            var tile7 = this.game.add.sprite(this.world.centerX + this._cameraOverlap, this.world.centerY + this._cameraOverlap, 'level1-7');
            tile7.anchor.setTo(1.5, 1.5);
            tile7.name = 'tile7';
            this._tiles.add(tile7);
            // Top Right
            var tile9 = this.game.add.sprite(this.world.centerX - this._cameraOverlap, this.world.centerY + this._cameraOverlap, 'level1-9');
            tile9.anchor.setTo(-0.5, 1.5);
            tile9.name = 'tile9';
            this._tiles.add(tile9);
            // Bottom Left
            var tile1 = this.game.add.sprite(this.world.centerX + this._cameraOverlap, this.world.centerY - this._cameraOverlap, 'level1-1');
            tile1.anchor.setTo(1.5, -0.5);
            tile1.name = 'tile1';
            this._tiles.add(tile1);
            // Bottom Right
            var tile3 = this.game.add.sprite(this.world.centerX - this._cameraOverlap, this.world.centerY - this._cameraOverlap, 'level1-3');
            tile3.anchor.setTo(-0.5, -0.5);
            tile3.name = 'tile3';
            this._tiles.add(tile3);
            var tileNo = 0;
            for (tileNo; tileNo < 9; tileNo++) {
                var tile = this._tiles.getChildAt(tileNo);
                //tile.alpha = 1;
                //tile.autoCull = true;
                //console.log(tile.name);
                if (tile.name != 'tile' + this._currentSubLevel) {
                    tile.visible = false;
                }
            }
            // this._level1.alpha = 0.5;
            this._level1.anchor.setTo(0.5, 0.5);
            this._level1.name = 'level';
            this._levelGroup.add(this._level1);
            /* this._worldGroup = this.game.add.group();
             this._worldGroup.x = this.world.centerX - (constructorWidth * 0.5);
             this._worldGroup.y = this.world.centerY - (constructorWidth * 0.5);
             this._worldGroup.pivot.x = 900;
             this._worldGroup.pivot.y = 900;*/
            this._thingsGroup = this.game.add.group();
            this._allGroup.add(this._tiles);
            this._allGroup.add(this._levelGroup);
            this._allGroup.add(this._thingsGroup);
            this._controlsGroup = this.game.add.group();
            this._allGroup.add(this._controlsGroup);
            /* var defenderBMD = this.game.add.bitmapData(25,25);
     
             defenderBMD.ctx.beginPath();
             defenderBMD.ctx.rect(0, 0, 25, 25);
             defenderBMD.ctx.fillStyle = '#ffccff';
             defenderBMD.ctx.fill();
     
             var defender: Phaser.Sprite = this.game.add.sprite(this.world.centerX, this.world.centerY + 200, defenderBMD);
             defender.anchor.setTo(0.5, 0.5);
     
             this._thingsGroup.add(defender);*/
            // set physiscs to P2 physics engin
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = 200;
            this.game.physics.p2.restitution = 0;
            this.game.physics.p2.friction = 0.8;
            if (this.game.physics.p2.paused) {
                this.game.physics.p2.resume();
            }
            /*this.game.physics.p2.enable(tile8);
            this.game.physics.p2.enableBody(tile8, true);
            var tBody: Phaser.Physics.P2.Body = tile8.body;
            tBody.static = true;
            tBody.clearShapes();
            tBody.loadPolygon('physicsData', 'level1-8-1');
            tBody.loadPolygon('physicsData', 'level1-8-2');
            tBody.debug = true;*/
            // cannon base - place over cannon, so it overlaps it
            //this._base = this.game.add.sprite(this.world.centerX, this.world.height / 1.5, "Atlas", "base");
            this._base = new Ship(this.game, this.world.centerX, this.world.centerY);
            this._base.setup();
            // this._base = this.game.add.sprite(this.world.centerX, this.world.centerY, "Atlas", "base");
            this._base.name = 'DROPSHIP';
            // this._base = new DropShip(this.game, this.world.centerX, this.world.height / 1.5, 'imageKey');
            //  this._base.setUp();
            this._base.anchor.setTo(0.5, 1);
            // cannon - place it in the bottom center
            //this._cannon = this.game.add.sprite(this.world.centerX, this.world.height / 2, "Atlas", "cannon");
            // this._worldGroup.add(this._cannon);
            //this._cannon = new Phaser.Sprite(this.game, 0, 0, "Atlas", "cannon");
            ///this._base.addChild(this._cannon);
            // this._cannon.x =0;
            // this._cannon.y =0;
            // offset it from position
            //this._cannon.anchor.setTo(-0.75, 0.5);
            // make it point straight up
            //this._cannon.rotation = -Math.PI / 2;
            //this._cannonTween = this.game.add.tween(this._cannon).to({ rotation: -Math.PI / 2 }, 100, Phaser.Easing.Power1, true);
            this.game.physics.p2.enable(this._level1);
            this.game.physics.p2.enableBody(this._level1, true);
            var levelBody = this._level1.body;
            levelBody.static = true;
            levelBody.clearShapes();
            levelBody.loadPolygon('physicsData', 'level1-pins');
            levelBody.loadPolygon('physicsData', 'level1-1-1');
            levelBody.loadPolygon('physicsData', 'level1-1-2');
            levelBody.loadPolygon('physicsData', 'level1-2-1');
            levelBody.loadPolygon('physicsData', 'level1-2-2');
            levelBody.loadPolygon('physicsData', 'level1-3-1');
            levelBody.loadPolygon('physicsData', 'level1-3-2');
            levelBody.loadPolygon('physicsData', 'level1-4-1');
            levelBody.loadPolygon('physicsData', 'level1-4-2');
            levelBody.loadPolygon('physicsData', 'level1-5-1');
            levelBody.loadPolygon('physicsData', 'level1-5-2');
            levelBody.loadPolygon('physicsData', 'level1-6-1');
            levelBody.loadPolygon('physicsData', 'level1-6-2');
            levelBody.loadPolygon('physicsData', 'level1-7-1');
            levelBody.loadPolygon('physicsData', 'level1-7-2');
            levelBody.loadPolygon('physicsData', 'level1-8-1');
            levelBody.loadPolygon('physicsData', 'level1-8-2');
            levelBody.loadPolygon('physicsData', 'level1-9-1');
            levelBody.loadPolygon('physicsData', 'level1-9-2');
            levelBody.debug = false;
            this._levelCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._level1.body.setCollisionGroup(this._levelCollisionGroup);
            //this._level1.x = 320;
            //this._level1.anchor.setTo(0.5, 0.5);
            //this._cannon.body.gravityScale = 0;
            this.game.physics.p2.enable(this._base);
            this._base.body.setCircle(33);
            this._base.body.collideWorldBounds = false;
            this._base.body.debug = true;
            this._base.normalGravity();
            this._base.body.onBeginContact.add(this._base.contactHandler);
            this._base.body.onEndContact.add(this._base.endContactHandler);
            //  Game input
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.game.input.keyboard.addKey(Phaser.Keyboard.COMMA);
            this.game.input.keyboard.addKey(Phaser.Keyboard.PERIOD);
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this._b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
            this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this._up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            // following keys will not be propagated to browser
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.B, Phaser.Keyboard.COMMA, Phaser.Keyboard.PERIOD, Phaser.Keyboard.SPACEBAR]);
            // allow inpact events
            this.game.physics.p2.setImpactEvents(true);
            //  collision groups for drones
            this._dronesCollisionGroup = this.game.physics.p2.createCollisionGroup();
            //  collision groups for missiles
            this._missilesCollisionGroup = this.physics.p2.createCollisionGroup();
            this._sentryBulletsCollisionGroup = this.physics.p2.createCollisionGroup();
            this._objectsCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._shipCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._sentriesCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._lasersCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._antiGravCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._aggCollisionGroup = this.game.physics.p2.createCollisionGroup();
            //var js: Joystick = new Joystick(this.game,200,200,'imageKey');
            // js.setUp();
            // drones group
            this._drones = this.add.group();
            //this._thingsGroup.add(this._drones);
            // this._drones.x = this.world.centerX;
            // this._drones.y = this.world.centerY;
            this._drones.physicsBodyType = Phaser.Physics.P2JS;
            this._drones.enableBody = true;
            // create 8 drones
            this._drones.classType = Dron;
            this._drones.createMultiple(3, "Atlas", "dron1");
            this._drones.forEach(function (aDron) {
                // setup movements and animations
                aDron.setUp();
                // aDron.events.onInputDown.add(function (currentSprite) { this._facingTarget = false; this._targetDrone = currentSprite; }, this);
                // setup physics
                var body = aDron.body;
                body.setCircle(aDron.width / 2);
                body.kinematic = true; // does not respond to forces
                body.setCollisionGroup(this._dronesCollisionGroup);
                // adds group drones will collide with and callback
                //body.collides(this._missilesCollisionGroup, this.hitDron, this);
                body.collides(this._missilesCollisionGroup);
                body.collides(this._lasersCollisionGroup);
                //body.collides(this._lasersCollisionGroup, this.hitDron, this);
                //body.debug = true;
            }, this);
            // Laser group
            this._lasers = this.add.group();
            this._lasers.physicsBodyType = Phaser.Physics.P2JS;
            this._lasers.enableBody = true;
            // create 30 lasers
            this._lasers.createMultiple(30, "Atlas", "explosion001");
            this._lasers.forEach(function (aLaser) {
                aLaser.anchor.setTo(0.5, 0.5);
                aLaser.height = aLaser.height * 0.25;
                aLaser.width = aLaser.width * 0.25;
                aLaser.name = 'laser';
                aLaser.animations.add("goodHit", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
                aLaser.animations.add("badHit", Phaser.Animation.generateFrameNames("dron", 1, 2, "", 1));
                // physics
                var body = aLaser.body;
                body.setRectangle(aLaser.width, aLaser.height);
                body.kinematic = false;
                body.damping = 0;
                body.data.gravityScale = 0;
                body.setCollisionGroup(this._lasersCollisionGroup);
                body.collides(this._dronesCollisionGroup);
                body.collides(this._sentriesCollisionGroup);
                body.collides(this._levelCollisionGroup);
                body.collides(this._aggCollisionGroup);
                //body.collides(this._levelCollisionGroup, this.laserHitLevel, this);
                body.onBeginContact.add(this.weaponContactHandler);
                // body.debug = true;
            }, this);
            // missiles group
            this._missiles = this.add.group();
            this._missiles.physicsBodyType = Phaser.Physics.P2JS;
            this._missiles.enableBody = true;
            // create 10 missiles
            this._missiles.createMultiple(10, "Atlas", "missile");
            this._missiles.forEach(function (aMissile) {
                aMissile.anchor.setTo(0.5, 0.5);
                aMissile.name = 'missile';
                // physics
                var body = aMissile.body;
                body.setRectangle(aMissile.width, aMissile.height);
                body.setCollisionGroup(this._missilesCollisionGroup);
                body.collides(this._dronesCollisionGroup);
                body.collides(this._aggCollisionGroup);
                body.collides(this._sentriesCollisionGroup);
                body.onBeginContact.add(this.weaponContactHandler);
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
            this._backgroundImage = this.add.image(0, 0, "BG");
            this._backgroundImage.anchor.setTo(0, 0);
            this._backgroundImage.cacheAsBitmap = true;
            this._backgroundImage.width = this.game.width;
            //this._backgroundImage.alpha = 0.85;
            // this._backgroundImage.fixedToCamera = true;
            // this._backgroundImage.cameraOffset.setTo(0, 900);
            this._controlsGroup.add(this._backgroundImage);
            this._thrustBtn = this.game.add.sprite(0, 0, 'imageKey');
            this._controlsGroup.add(this._thrustBtn);
            this._thrustBtn.anchor.setTo(1.0, 0.0);
            this._thrustBtn.x = this.game.camera.width;
            this._thrustBtn.inputEnabled = true;
            this._thrustBtn.events.onInputDown.add(this.igniteThruster, this);
            this._thrustBtn.events.onInputUp.add(this.deactivateThruster, this);
            this._fireBtn = this.game.add.sprite(0, 0, 'imageKey');
            this._controlsGroup.add(this._fireBtn);
            this._fireBtn.anchor.setTo(3.0, 0.0);
            this._fireBtn.x = this.game.camera.width;
            this._fireBtn.inputEnabled = true;
            this._fireBtn.events.onInputDown.add(this.fireBtnDown, this);
            this._fireBtn.events.onInputUp.add(this.fireBtnUp, this);
            this._missileBtn = this.game.add.sprite(0, 0, 'imageKey');
            this._controlsGroup.add(this._missileBtn);
            this._missileBtn.anchor.setTo(5.0, 0.0);
            this._missileBtn.x = this.game.camera.width;
            this._missileBtn.inputEnabled = true;
            this._missileBtn.events.onInputDown.add(this.missileBtnDown, this);
            // Sentry projectiles
            this._sentryBullets = this.add.group();
            // this._thingsGroup.add(this._sentryBullets);
            this._sentryBullets.physicsBodyType = Phaser.Physics.P2JS;
            this._sentryBullets.enableBody = true;
            // create 20 bullets
            this._sentryBullets.createMultiple(20, "Atlas", "missile");
            this._sentryBullets.forEach(function (aBullet) {
                aBullet.anchor.setTo(0.5, 0.5);
                // physics
                var body = aBullet.body;
                body.kinematic = true;
                body.setRectangle(aBullet.width, aBullet.height);
                body.setCollisionGroup(this._sentryBulletsCollisionGroup);
                body.collides(this._shipCollisionGroup, this.sentryHitShip, this);
                // body.collides([this._sentryBulletsCollisionGroup, this._shipCollisionGroup]);
            }, this);
            // sentries group
            this._sentries = this.game.add.group();
            //this._thingsGroup.add(this._sentries);
            //this._sentries.physicsBodyType = Phaser.Physics.P2JS;
            //this._sentries.enableBody = true;
            var sentryPositions = [[-260, -260, 0], [-800, 200, 0], [-460, -360, 180]];
            for (var i = 0; i < sentryPositions.length; i++) {
                var sentry = new Sentry(this.game, this.world.centerX + sentryPositions[i][0], this.world.centerY + sentryPositions[i][1]);
                sentry.inputEnabled = true;
                //sentry.events.onInputDown.add(function (currentSprite) { this._facingTarget = false; this._targetDrone = currentSprite; }, this);
                this.game.physics.p2.enable(sentry);
                var body = sentry.body;
                body.kinematic = true;
                body.setRectangle(sentry.width, sentry.height);
                body.setCollisionGroup(this._sentriesCollisionGroup);
                // body.collides(this._missilesCollisionGroup, this.hitSentry, this);
                // body.collides(this._lasersCollisionGroup, this.hitSentry, this);
                body.collides([this._missilesCollisionGroup]);
                body.collides([this._lasersCollisionGroup]);
                body.angle = sentryPositions[i][2];
                sentry.setup(this._base, this._sentryBullets);
                // this.physicsEnabled = true;
                // this.physicsType = Phaser.Physics.P2JS;
                this._sentries.add(sentry);
            }
            this._objects = this.game.add.group();
            this._allGroup.add(this._objects);
            this._objects.enableBody = true;
            this._objects.physicsBodyType = Phaser.Physics.P2JS;
            /*for (var i = 0; i < 1; i++) {
                
                var object: Phaser.Sprite = this._objects.create(this.world.centerX, this.world.centerY + 100, 'imageKey');
                object.anchor.setTo(0.5, 0.5);

                this.game.physics.p2.enable(object);
                //object.body.mass = 0;
                object.outOfBoundsKill = true;
                object.body.data.gravityScale = 0.0;
                object.body.setRectangle(30, 30);
                object.body.setCollisionGroup(this._objectsCollisionGroup);
                object.body.collides([this._objectsCollisionGroup, this._shipCollisionGroup]);

            }*/
            this._level1.body.collides([this._levelCollisionGroup, this._shipCollisionGroup, this._lasersCollisionGroup]);
            this._base.body.setCollisionGroup(this._shipCollisionGroup);
            this._base.body.collides([this._objectsCollisionGroup, this._levelCollisionGroup, this._sentryBulletsCollisionGroup]);
            /*this._doors = this.game.add.group();
    
            this._thingsGroup.add(this._doors);
    
            this.createDoor();*/
            /*var style = { font: "15px Arial", fill: "#ffcc00", align: "left" };
            this._text1 = this.game.add.text(300, 300, 'accel', style);
            this._text1.anchor.setTo(0.5, 0.5);
    
            this._text2 = this.game.add.text(300, 300, 'accel+gravity', style);
            this._text2.anchor.setTo(0.5, 0.5);*/
            /* var door2: Phaser.Sprite = this._doors.create(this.world.centerX, this.game.camera.y - 30, bmd2);
             door2.anchor.setTo(0.5, 0.5);
             door1.name = 'd2';*/
            this._antiGravities = this.game.add.group();
            var antiGravPositions;
            if (this.landscapeLayout == true) {
                antiGravPositions = [[-250, -10, 0], [650, -195, 180]];
            }
            else {
                antiGravPositions = [[-220, 180, 0], [-100, -1185, 180]];
            }
            for (var i = 0; i < antiGravPositions.length; i++) {
                var poly = new Phaser.Polygon();
                var polyNumbers = [[0, 0], [200, 0], [100, 200], [99, 200]];
                poly.setTo([new Phaser.Point(polyNumbers[0][0], polyNumbers[0][1]), new Phaser.Point(polyNumbers[1][0], polyNumbers[1][1]), new Phaser.Point(polyNumbers[2][0], polyNumbers[2][1]), new Phaser.Point(polyNumbers[3][0], polyNumbers[3][1])]);
                /*var graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
                graphics.beginFill(0xFF33ff);
                graphics.drawPolygon(poly.points);
                graphics.endFill();*/
                //var antiGrav: AntiGrav = this.game.add.sprite(antiGravPositions[i][0], antiGravPositions[i][1], graphics.generateTexture());
                var antiGrav = new AntiGrav(this.game, this.world.centerX + antiGravPositions[i][0], this.world.centerY + antiGravPositions[i][1]);
                antiGrav.alpha = 0.25;
                antiGrav.name = 'antiGrav';
                this.game.physics.p2.enable(antiGrav, true);
                this.game.physics.p2.enableBody(antiGrav, true);
                var antiGravBody = antiGrav.body;
                antiGravBody.static = true;
                antiGravBody.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                if (antiGravPositions[i][2] == 0) {
                    //upward
                    antiGravBody.offset.y = 140;
                    antiGrav.setup(true);
                }
                else {
                    antiGravBody.offset.y = -140;
                    //downward
                    antiGrav.setup(false);
                }
                antiGravBody.data.shapes[0].sensor = true;
                antiGravBody.kinematic = false;
                antiGravBody.debug = true;
                antiGravBody.setCollisionGroup(this._antiGravCollisionGroup);
                antiGravBody.collides([this._shipCollisionGroup]);
                antiGravBody.angle = antiGravPositions[i][2];
                this._antiGravities.add(antiGrav);
                antiGrav.generator.base = this._base;
                antiGrav.generator.body.setCircle(antiGrav.generator.width / 2);
                antiGrav.generator.body.kinematic = true; // does not respond to forces
                antiGrav.generator.body.setCollisionGroup(this._aggCollisionGroup);
                antiGrav.generator.body.collides([this._aggCollisionGroup, this._missilesCollisionGroup, this._lasersCollisionGroup]);
            }
            this._base.body.collides([this._antiGravCollisionGroup]);
            var joystickY = 900;
            this._controlsGroup.fixedToCamera = true;
            this._controlsGroup.cameraOffset.setTo(0, this.game.height - this._controlsGroup.height);
            if (this.landscapeLayout == true) {
                this._level1.body.angle = 90;
                // this._thingsGroup.angle = 90;
                this._tiles.angle = 90;
                this._sentries.forEach(function (aSentry) {
                    console.log('oldpoint: ' + aSentry.body.x + ',' + aSentry.body.y);
                    var newPoint = this.rotate_point(aSentry.body.x, aSentry.body.y, this.world.centerX, this.world.centerY, 90);
                    console.log('newpoint: ' + newPoint.x + ',' + newPoint.y);
                    aSentry.body.x = newPoint.x;
                    aSentry.body.y = newPoint.y;
                    aSentry.updateCannonPosition();
                }, this);
                // this._controlsGroup.cameraOffset.setTo(0, 580);
                joystickY = 580;
            }
            else {
                this._levelGroup.cacheAsBitmap = true;
            }
            this._joystick = new Joystick(this.game, 0, joystickY);
            this._controlsGroup.add(this._joystick);
            this._joystick.setup(this._base);
            this._allGroup.sendToBack(this._levelGroup);
            this._fireTimer = this.time.create(false);
            this._contactDamageTimer = this.time.create(false);
            this.game.time.events.add(Phaser.Timer.SECOND * 1, suggestFPS, this);
            //this.game.physics.p2.setPostBroadphaseCallback(this.checkOverlap2, this);
        };
        // -------------------------------------------------------------------------
        Level1.prototype.update = function () {
            // shortcut
            //this._joystick.onUpdate();
            var keyboard = this.game.input.keyboard;
            this._missiles.forEach(function (aMissile) {
                if (aMissile.inWorld == false) {
                    aMissile.kill();
                }
            }, this);
            this._sentryBullets.forEach(function (aBullet) {
                if (aBullet.inWorld == false) {
                    //console.log('aBullet out of world');
                    aBullet.kill();
                }
            }, this);
            this._lasers.forEach(function (aLaser) {
                if (aLaser.inWorld == false) {
                    //console.log('aLaser out of world');
                    aLaser.kill();
                }
            }, this);
            //this._cannon.x = this._base.x;
            //this._cannon.y = this._base.y;
            //this._cannon.angle = this._base.angle+90;
            if (this._up.justDown) {
                // this._base.body.thrust(State.THRUST_POWER);
                this.igniteThruster();
            }
            if (this._up.justUp) {
                // this._base.body.thrust(State.THRUST_POWER);
                this.deactivateThruster();
            }
            // if (this.game.input.activePointer.isDown && this._leftBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressLeft(); }
            // if (this.game.input.activePointer.isDown && this._rightBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressRight(); }
            // left and right key
            if (keyboard.isDown(Phaser.Keyboard.COMMA)) {
            }
            else if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.pressLeft();
            }
            else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.pressRight();
            }
            else if (keyboard.isDown(Phaser.Keyboard.PERIOD)) {
            }
            if (this._b.justDown) {
                // get firtst missile from pool
                this.missileBtnDown();
            }
            // Fire Laser
            if (this._space.justDown) {
                this.fireBtnDown();
            }
            if (this._space.justUp) {
                this.fireBtnUp();
            }
            // limit cannon rotation to left and right to +/- 45 degrees ... -135 to -45 degrees here
            //this._cannon.rotation = (Phaser.Math.clamp(this._cannon.rotation, -1.5 * Math.PI / 2, -0.5 * Math.PI / 2));
            //+ this._base.body.rotation;
            //this._cannon.rotation = this._base.body.rotation - (1 * Math.PI / 2);
            /*if (this._targetDrone != null) {

                var angle = Math.atan2(this._targetDrone.y - this._cannon.y, this._targetDrone.x - this._cannon.x);

                //angle = angle * (180 / Math.PI);
                var calculatedAngle = angle * (180 / Math.PI);

                var diff = difference(calculatedAngle, this._cannon.angle);
                //console.log(diff);

                if (this._facingTarget == true) {

                    this._cannon.angle = calculatedAngle;

                } else {
                    // this.game.add.tween(this._cannon).to({ angle: calculatedAngle }, 200, Phaser.Easing.Linear, true);


                    if (this._cannonTween.isRunning) {
                        //console.log('tween running');
                    } else {
                        this._cannonTween = this.game.add.tween(this._cannon).to({ angle: calculatedAngle }, 200, Phaser.Easing.Power1, true);
                        //this._cannonTween.onComplete.add(doSomething, this); function doSomething() { this._facingTarget = true; };
                        this._cannonTween.onComplete.add(this.targetAquired, this);
                    }
                }

            } else {

                if (this._cannonTween.isRunning) {
                    //console.log('tween running');
                } else {
                    //
                }

            }*/
            if (this._transitionTween.isRunning == false) {
                /* if (deviceMo != null) {
                     if (deviceMo.acceleration != null) {
                         if (deviceMo.acceleration.y != null) {
                             this._text1.setText("y:" + deviceMo.acceleration.y.toFixed(3) + ", x:" + deviceMo.acceleration.x.toFixed(3) + ", z:" + deviceMo.acceleration.z.toFixed(3));
                             this._text2.setText("y:" + deviceMo.accelerationIncludingGravity.y.toFixed(3) + ", x:" + deviceMo.accelerationIncludingGravity.x.toFixed(3) + ", z:" + deviceMo.accelerationIncludingGravity.z.toFixed(3));
                         }
                     }
     
                 }*/
                // SOLID DOOR SCRIPT:
                /*for (var j = 0; j < this._doors.children.length; j++) {
                    if (this.checkOverlap(this._base, this._doors.getChildAt(j))) {
                        this.callTransition();
                    }
                }*/
                if (this._base.y < (this.game.camera.y + this._upTolerance)) {
                    this._downTolerance = 60;
                    this._upTolerance = 40;
                    this.callTransition('up');
                }
                if (this._base.y > (this.game.camera.y + (this.game.camera.height - this._downTolerance))) {
                    this._upTolerance = 0;
                    this._downTolerance = 100;
                    this.callTransition('down');
                }
                if (this._base.x < (this.game.camera.x + this._leftTolerance)) {
                    this._rightTolerance = 10;
                    this._leftTolerance = 40;
                    this.callTransition('left');
                }
                if (this._base.x > (this.game.camera.x + (this.game.camera.width - this._rightTolerance))) {
                    this._leftTolerance = 10;
                    this._rightTolerance = 40;
                    this.callTransition('right');
                }
            }
        };
        // -------------------------------------------------------------------------
        Level1.prototype.render = function () {
            // uncomment to visual debug, also uncommnet "body.debug = true;" when creating missiles and drones
            this._drones.forEach(function (aDron) {
                this.game.debug.body(aDron);
            }, this);
            this._missiles.forEach(function (aMissile) {
                this.game.debug.body(aMissile);
            }, this);
            this.game.debug.body(this._base);
            //this.game.debug.body(this._level1);
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
            //  this.game.debug.text(this._joystick.mydebug.toString(), 0, 80);
            // this.game.debug.cameraInfo(this.game.camera, 32, 32);     
            /* this.game.debug.pointer(this.game.input.mousePointer);
             this.game.debug.pointer(this.game.input.pointer1);
             this.game.debug.pointer(this.game.input.pointer2); */
        };
        // -------------------------------------------------------------------------
        /*private checkOverlap2(body1, body2) {
            if ((body1.sprite.name === 'DROPSHIP' && body2.sprite.name === 'antiGrav') || (body2.sprite.name === 'DROPSHIP' && body1.sprite.name === 'antiGrav')) {
                this.dosomething();
                return false;
            }
            return true;
        }

        private dosomething() {
            console.log('ds');
        }*/
        Level1.prototype.weaponContactHandler = function (body, shape1, shape2, equation) {
            var objectHit = body.sprite;
            var laser;
            var missile;
            var weapon;
            if (shape2.body.parent.sprite.name == 'laser') {
                laser = shape2.body.parent.sprite;
                weapon = laser;
            }
            else if (shape2.body.parent.sprite.name == 'missile') {
                missile = shape2.body.parent.sprite;
                weapon = missile;
            }
            if (objectHit.name == 'dron') {
                objectHit.explode();
            }
            if (objectHit.name == 'sentry') {
                objectHit.successfulHit(weapon);
            }
            if (objectHit.name == 'antiGravGenerator') {
                objectHit.successfulHit(weapon);
            }
            if (laser) {
                var laserBody = laser.body;
                laserBody.setZeroVelocity();
                laserBody.damping = 1;
                if (objectHit.name == 'level') {
                    laser.play("badHit", 10, false, true);
                }
                else {
                    // (<Laser>laser).animations.add("hit", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
                    laser.play("goodHit", 30, false, true);
                }
            }
        };
        Level1.prototype.sentryHitShip = function (aObject1, aObject2) {
            //this._cannonTween = this.game.add.tween(this._cannon).to({ rotation: -Math.PI / 2 }, 200, Phaser.Easing.Power1, true);
            console.log('shipHit!');
            aObject2.sprite.successfulHit();
            //(<Sentry>aObject1.sprite).successfulHit();
        };
        Level1.prototype.missileBtnDown = function () {
            var missile = this._missiles.getFirstExists(false);
            if (missile) {
                missile.lifespan = 3000;
                var mBody = missile.body;
                missile.reset(this._base.body.x, this._base.body.y);
                mBody.angle = 90;
                //mBody.mass = 50;
                mBody.velocity.x = this._base.body.velocity.x * 0.1;
                mBody.velocity.y = this._base.body.velocity.y + 100;
            }
        };
        Level1.prototype.fireBtnDown = function () {
            console.log('fireBtnDown: ' + this._fireTimer.ms);
            this.fire();
            this._fireTimer.loop(this._fireRate, this.fire, this);
            this._fireTimer.start();
        };
        Level1.prototype.fire = function () {
            console.log('FIRE');
            var laser = this._lasers.getFirstExists(false);
            if (laser) {
                // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                // this._cannonTip.setTo(this._cannon.width * 2, 0);
                // this._cannonTip.rotate(0, 0, this._cannon.rotation);
                laser.loadTexture('Atlas', 'explosion001');
                laser.lifespan = 3000;
                laser.body.damping = 0;
                laser.body.kinematic = false;
                laser.reset(this._base.body.x, this._base.body.y);
                laser.body.rotation = this._base.body.rotation;
                // life of missile in millis
                //missile.lifespan = 3000;
                // set velocity of missile in direction of cannon barrel
                laser.body.moveForward(600);
            }
        };
        Level1.prototype.fireBtnUp = function () {
            console.log('fireBtnUp');
            this._fireTimer.stop();
        };
        Level1.prototype.igniteThruster = function () {
            this._base.thrusting = true;
        };
        Level1.prototype.deactivateThruster = function () {
            this._base.thrusting = false;
        };
        Level1.prototype.pressLeft = function () {
            this._base.body.rotation -= this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
        };
        Level1.prototype.pressRight = function () {
            this._base.body.rotation += this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
        };
        /* private targetAquired() {
             this._facingTarget = true;
         }*/
        /* private hitObject(body1: Phaser.Physics.P2.Body, body2: Phaser.Physics.P2.Body) {
             //  body1 is the space ship (as it's the body that owns the callback)
             //  body2 is the body it impacted with, in this case our panda
             //  As body2 is a Phaser.Physics.P2.Body object, you access its own (the sprite) via the sprite property:
             console.log('object hit');
         }*/
        Level1.prototype.checkOverlap = function (spriteA, spriteB) {
            // var boundsA = spriteA.getBounds();
            // var boundsB = spriteB.getBounds();
            var boundsA = getManualBounds(spriteA);
            var boundsB = getManualBounds(spriteB);
            return Phaser.Rectangle.intersects(boundsA, boundsB);
        };
        Level1.prototype.rotate_point = function (pointX, pointY, originX, originY, angle) {
            angle = angle * Math.PI / 180.0;
            //x = Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX;
            // y = Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY;
            return new Phaser.Point(Math.cos(angle) * (pointX - originX) - Math.sin(angle) * (pointY - originY) + originX, Math.sin(angle) * (pointX - originX) + Math.cos(angle) * (pointY - originY) + originY);
        };
        Level1.prototype.callTransition = function (direction) {
            //console.log(direction);
            //this._doors.removeAll();
            this.game.physics.p2.pause();
            var cameraX = this.game.camera.x;
            var cameraY = this.game.camera.y;
            console.log('camera moving from: ' + cameraX + ',' + cameraY);
            if (direction == 'up') {
                cameraY = this.game.camera.y - (this.game.camera.height - this._cameraOverlap);
            }
            if (direction == 'down') {
                cameraY = this.game.camera.y + (this.game.camera.height - this._cameraOverlap);
            }
            if (direction == 'left') {
                cameraX = this.game.camera.x - (this.game.camera.width - this._cameraOverlap);
            }
            if (direction == 'right') {
                cameraX = this.game.camera.x + (this.game.camera.width - this._cameraOverlap);
            }
            if (cameraX == 200 && cameraY == -1320 || cameraX == 360 && cameraY == 200) {
                this._newSubLevel = 9;
            }
            else if (cameraX == -320 && cameraY == -1320 || cameraX == 360 && cameraY == -320) {
                this._newSubLevel = 8;
            }
            else if (cameraX == -840 && cameraY == -1320 || cameraX == 360 && cameraY == -840) {
                this._newSubLevel = 7;
            }
            else if (cameraX == 200 && cameraY == -480 || cameraX == -480 && cameraY == 200) {
                this._newSubLevel = 6;
            }
            else if (cameraX == -320 && cameraY == -480 || cameraX == -480 && cameraY == -320) {
                this._newSubLevel = 5;
            }
            else if (cameraX == -840 && cameraY == -480 || cameraX == -480 && cameraY == -840) {
                this._newSubLevel = 4;
            }
            else if (cameraX == 200 && cameraY == 360 || cameraX == -1320 && cameraY == 200) {
                this._newSubLevel = 3;
            }
            else if (cameraX == -320 && cameraY == 360 || cameraX == -1320 && cameraY == -320) {
                this._newSubLevel = 2;
            }
            else if (cameraX == -840 && cameraY == 360 || cameraX == -1320 && cameraY == -840) {
                this._newSubLevel = 1;
            }
            //console.log('camera moving to: ' + this._newSubLevel);
            // Calculate if the new camera position will be within game bounds.
            // If it will be outside the world, then don't do it.
            var cameraStaysWithinWorld = true;
            var maxLeft = 0 - (this.game.camera.width + (this.game.camera.width * 0.5));
            var maxRight = this.game.camera.width + this.game.camera.width;
            var maxTop = 0 - (this.game.camera.height + (this.game.camera.height * 0.5));
            var maxBottom = (0 - (this.game.camera.height * 0.5)) + this.game.camera.height;
            //console.log('max ' + maxLeft + ',' + maxTop + ',' + maxRight + ',' + maxBottom);
            if (cameraX < maxLeft) {
                cameraStaysWithinWorld = false;
            }
            ;
            if (cameraX > maxRight) {
                cameraStaysWithinWorld = false;
            }
            ;
            if (cameraY < maxTop) {
                cameraStaysWithinWorld = false;
            }
            ;
            if (cameraY > maxBottom) {
                cameraStaysWithinWorld = false;
            }
            ;
            if (cameraStaysWithinWorld) {
                var tileToUnhide = this._tiles.getByName('tile' + this._newSubLevel);
                tileToUnhide.visible = true;
                this._transitionTween = this.game.add.tween(this.game.camera).to({ y: cameraY, x: cameraX }, 250, Phaser.Easing.Linear.None, true);
                this._transitionTween.onComplete.add(this.transitionComplete, this);
            }
            else {
                console.log('camera error? ' + this.game.world.getBounds() + ', camX ' + cameraX + ', camY ' + cameraY);
            }
        };
        Level1.prototype.transitionComplete = function () {
            // this.createDoor();
            /*var levelBody: Phaser.Physics.P2.Body = this._level1.body;
            
            levelBody.clearShapes();
            
            var sub1: string = 'level1-' + this._newSubLevel + '-1';
            var sub2: string = 'level1-' + this._newSubLevel + '-2';

            console.log('moving to: ' + sub1);
            
           levelBody.loadPolygon('physicsData', sub1);
            levelBody.loadPolygon('physicsData', sub2);
            
            this.game.physics.p2.addBody(levelBody);
            this.game.physics.p2.enableBody(levelBody,true);*/
            // levelBody.static = true;
            // levelBody.data.updateSolveMassProperties();
            //levelBody.offset = new Phaser.Point(0, -450);
            //this._level1.anchor.setTo(0.5, 1.5);
            //levelBody.addPhaserPolygon('physicsData', 'level1-pins');
            //levelBody.addPhaserPolygon('physicsData', sub1);
            // levelBody.addPhaserPolygon('physicsData', sub2)
            var tileToHide = this._tiles.getByName('tile' + this._currentSubLevel);
            tileToHide.visible = false;
            this._currentSubLevel = this._newSubLevel;
            this.game.physics.p2.resume();
            //console.log('camera view width: ' + this.camera.width + ', camera view height: ' + this.camera.height + 'this.camera.x: ' + this.camera.x + 'this.camera.y: ' + this.camera.y);
        };
        // -------------------------------------------------------------------------
        Level1.prototype.createDoor = function () {
            var doorBMD = this.game.add.bitmapData(640, 40);
            doorBMD.ctx.beginPath();
            doorBMD.ctx.rect(0, 0, 640, 40);
            doorBMD.ctx.fillStyle = '#1111aa';
            doorBMD.ctx.fill();
            var yPos = 0;
            if (this._hangar == 1) {
            }
            if (this._hangar == 2) {
            }
            var door1 = this._doors.create(this.world.centerX, yPos, doorBMD);
            door1.name = 'd1';
            door1.anchor.setTo(0.5, 0.5);
        };
        return Level1;
    }(Phaser.State));
    Dropship.Level1 = Level1;
    var _holdThruster = 3;
    var deviceMo;
    // -------------------------------------------------------------------------
    var AntiGrav = (function (_super) {
        __extends(AntiGrav, _super);
        function AntiGrav(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('AntiGrav constructor...');
            _super.call(this, game, x, y, 'Atlas', 'base');
            this.autoCull = true;
            this.anchor.setTo(.5, .5);
        }
        AntiGrav.prototype.setup = function (upward) {
            var yOffset = -90;
            if (upward) {
                yOffset = 180;
            }
            //this.generator = this.game.add.sprite(this.x + 98, this.y + yOffset, 'Atlas', 'dron1');  
            this.generator = new AntiGravGenerator(this.game, this.x + 98, this.y + yOffset, 'Atlas', 'dron1');
            this.game.add.existing(this.generator);
            this.generator.antiGrav = this;
            this.generator.name = 'antiGravGenerator';
            this.game.physics.p2.enable(this.generator, false);
        };
        return AntiGrav;
    }(Phaser.Sprite));
    var AntiGravGenerator = (function (_super) {
        __extends(AntiGravGenerator, _super);
        function AntiGravGenerator() {
            _super.apply(this, arguments);
        }
        AntiGravGenerator.prototype.successfulHit = function (weapon) {
            this.antiGrav.destroy(true);
            this.destroy(true);
            this.base.normalGravity();
        };
        return AntiGravGenerator;
    }(Phaser.Sprite));
    var Laser = (function (_super) {
        __extends(Laser, _super);
        function Laser() {
            _super.apply(this, arguments);
        }
        return Laser;
    }(Phaser.Sprite));
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
            this.autoCull = true;
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
            this.name = 'dron';
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
    var Sentry = (function (_super) {
        __extends(Sentry, _super);
        function Sentry(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('sentry constructor...');
            _super.call(this, game, x, y, 'imageKey');
            this.anchor.setTo(0.5, 0.5);
            this.autoCull = true;
            //this.cameraOffset.setTo(x, y);
            this.mydebug = '.';
            this.damageTaken = 0;
            this.name = 'sentry';
        }
        Sentry.prototype.update = function () {
            if (this.inCamera) {
                if (this.sleeping) {
                    var distanceFromShip = Math.sqrt((this.x - this.base.x) * (this.x - this.base.x) + (this.y - this.base.y) * (this.y - this.base.y));
                    if (distanceFromShip < 333) {
                        this.sleeping = false;
                        this.alpha = 1;
                        this.fireTimer = this.game.time.create(false);
                        this.fireTimer.loop(2000, this.fire, this);
                        this.fireTimer.start();
                    }
                }
                else {
                    var angle = Math.atan2(this.base.y - this.cannon.y, this.base.x - this.cannon.x);
                    //angle = angle * (180 / Math.PI);
                    var calculatedAngle = angle * (180 / Math.PI);
                    var diff = difference(calculatedAngle, this.cannon.angle);
                    //console.log(diff);
                    this.cannon.angle = calculatedAngle;
                }
            }
        };
        Sentry.prototype.blowUp = function () {
            console.log('sentry blow up: ' + this.damageTaken);
            if (this.fireTimer) {
                this.fireTimer.stop();
            }
            this.cannon.destroy();
            this.destroy();
        };
        Sentry.prototype.updateCannonPosition = function () {
            this.cannon.x = this.body.x;
            this.cannon.y = this.body.y;
        };
        // -------------------------------------------------------------------------
        Sentry.prototype.setup = function (bse, sBullets) {
            this.base = bse;
            this.sentryBullets = sBullets;
            this.bulletSpeed = 12;
            this.cannonTip = new Phaser.Point();
            this.sleeping = true;
            this.alpha = 0.5;
            this.cannon = this.game.add.sprite(this.x, this.y, "Atlas", "cannon");
            this.cannon.anchor.setTo(0.5, 0.5);
            // this.animations.add("anim", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
            // this.x = pos[0];
            // this.y = pos[1];
            // this.play("anim");
            // this.inputEnabled = true;
        };
        Sentry.prototype.successfulHit = function (object) {
            console.log('successfulHit: ' + object.name);
            if (object.name == 'missile') {
                this.damageTaken = this.damageTaken + 4;
            }
            if (object.name == 'laser') {
                this.damageTaken = this.damageTaken + 1;
            }
            if (this.damageTaken > 3) {
                this.blowUp();
            }
        };
        Sentry.prototype.fire = function () {
            if (this.inCamera) {
                // get firtst missile from pool
                var bullet = this.sentryBullets.getFirstExists(false);
                if (bullet) {
                    // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                    this.cannonTip.setTo(this.cannon.width * 2, 0);
                    this.cannonTip.rotate(0, 0, this.cannon.rotation);
                    bullet.reset(this.cannon.x, this.cannon.y);
                    //console.log('bullet x:' + this.x + ', y:' + this.y + ', ship x:' + this.base.x + ', y:' + this.base.y );
                    bullet.body.rotation = this.cannon.rotation;
                    // life of missile in millis
                    //bullet.lifespan = 1000;
                    // set velocity of missile in direction of cannon barrel
                    bullet.body.velocity.x = this.cannonTip.x * this.bulletSpeed;
                    bullet.body.velocity.y = this.cannonTip.y * this.bulletSpeed;
                }
                else {
                    console.log('fire got no bullet');
                }
            }
        };
        return Sentry;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    function suggestFPS() {
        this.game.time.suggestedFps = 60;
    }
    // -------------------------------------------------------------------------
    function getManualBounds(object) {
        if (object.manualBounds == undefined) {
            object.manualBounds = new Phaser.Rectangle(object.x - object.offsetX, object.y - object.offsetY, object.width, object.height);
        }
        else {
            object.manualBounds.x = object.x - object.offsetX;
            object.manualBounds.y = object.y - object.offsetY;
        }
        return object.manualBounds;
    }
    // -------------------------------------------------------------------------
    function wiggle(aProgress, aPeriod1, aPeriod2) {
        var current1 = aProgress * Math.PI * 2 * aPeriod1;
        var current2 = aProgress * Math.PI * 2 * aPeriod2;
        return Math.sin(current1) * Math.cos(current2);
    }
    // ------------------------------------------------------------------------
    function difference(a, b) { return Math.abs(a - b); }
    // -------------------------------------------------------------------------
    function onDeviceMotion(event) {
        deviceMo = event;
    }
    // -------------------------------------------------------------------------
    window.onload = function () {
        new Dropship.Game();
        window.addEventListener("devicemotion", onDeviceMotion, false);
    };
    // -------------------------------------------------------------------------
    var normalize = Phaser.Point.normalize;
    var zero = new Phaser.Point(0, 0);
    var Ship = (function (_super) {
        __extends(Ship, _super);
        function Ship(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('ship constructor...');
            _super.call(this, game, x, y, 'Atlas', 'base');
            this.contactDamage = false;
            this.contactDamageCount = 0;
            this.thrusting = false;
            this.thrustPower = 450;
        }
        Ship.prototype.update = function () {
            if (this.contactDamage == true) {
                this.contactDamageCount++;
                if (this.contactDamageCount > 5) {
                    console.log('Prolonged contact destroy');
                }
            }
            if (this.thrusting) {
                this.body.thrust(this.thrustPower);
                this.animations.play('trusting', 30, true, false);
            }
            else {
                this.animations.play('coasting', 2, false, false);
            }
        };
        Ship.prototype.successfulHit = function () {
            console.log('ship base hit...');
            //this.game.state.restart();
        };
        Ship.prototype.setup = function () {
            this.game.add.existing(this);
            this.animations.add("trusting", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
            this.animations.add("coasting", ["base", "base"], 2, false);
            // play first animation as default
        };
        Ship.prototype.normalGravity = function () {
            this.body.angularDamping = 1;
            this.body.mass = 1;
            this.body.data.gravityScale = 1.0;
            this.body.damping = 0.0;
        };
        Ship.prototype.antiGravity = function (upward) {
            this.body.damping = 0.75;
            if (upward) {
                this.body.data.gravityScale = 2;
            }
            else {
                this.body.data.gravityScale = -0.33;
            }
        };
        Ship.prototype.crashed = function () {
            this.game.physics.p2.pause();
            this.alpha = 0.5;
            var mytimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);
        };
        Ship.prototype.endContactHandler = function (body, shape1, shape2, equation) {
            if (body) {
                if (body.sprite != null) {
                    if (body.sprite.name == 'level') {
                        //this.contactDamage = false;
                        shape2.body.parent.sprite.contactDamage = false;
                        //this.contactDamageCount = 0;
                        shape2.body.parent.sprite.contactDamageCount = 0;
                    }
                    else if (body.sprite.name == 'antiGrav') {
                        //shipBody.parent.gravity = body.sprite.position;
                        var shipShapeBody = shape2.body;
                        var shipBody = shipShapeBody.parent;
                        var base = shipBody.sprite;
                        base.normalGravity();
                    }
                }
            }
        };
        Ship.prototype.contactHandler = function (body, shape1, shape2, equation) {
            var shipShapeBody = shape2.body;
            var shipBody = shipShapeBody.parent;
            var base = shipBody.sprite;
            var v1 = shipShapeBody.velocity[0];
            var v2 = shipShapeBody.velocity[1];
            if (body.sprite.name == 'antiGrav') {
                var antiGrav = body.sprite;
                if (antiGrav.body.angle == 0) {
                    base.antiGravity(true);
                }
                else {
                    base.antiGravity(false);
                }
                return;
            }
            if (body.sprite.name == 'level') {
                // damage ship on prolonged contact...
                // this.contactDamage = true;
                base.contactDamage = true;
            }
            var otherObject = shape1.velocity;
            var crashDamage = Math.abs(v1) + Math.abs(v2);
            var otherDamage = Math.abs(otherObject[0]) + Math.abs(otherObject[1]);
            var totalDamage = crashDamage + otherDamage;
            console.log('crash ' + crashDamage + ', projectile ' + otherDamage);
            if (totalDamage > 20) {
                base.crashed();
            }
        };
        Ship.prototype.gameOver = function () {
            //this.game.state.start(game.state.current);
            //this.game.state.restart();
            this.game.state.start('MainMenu', true, false);
        };
        return Ship;
    }(Phaser.Sprite));
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('joystick construcy...');
            _super.call(this, game, x, y, 'jsarea');
            this.anchor.setTo(0.0, 0.0);
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
            if (this.isBeingDragged == true) {
                //console.log('move callback: ' + pointer.positionDown.x + ',' + pointer.x);                   
                //console.log('joystick movecallback... ' + sprite.base.name);
                var deltaX = (this.myPointer.x - this.myPointer.positionDown.x);
                if (this.previousDelta == null) {
                    this.previousDelta = deltaX;
                }
                //console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
                this.mydebug = '4deltaX: ' + deltaX + ' ,pID: ' + this.myPointer.id;
                var mrNum = Math.abs(deltaX);
                if (deltaX < this.previousDelta) {
                    this.base.body.angle = this.base.body.angle - 5; // -= mrNum * 2 / 1000 * (Math.PI / 4);
                }
                else if (deltaX > this.previousDelta) {
                    this.base.body.angle = this.base.body.angle + 5;
                }
                this.previousDelta = deltaX;
            }
        };
        Joystick.prototype.setup = function (myBase) {
            console.log('joystick setup... ' + myBase.name);
            this.base = myBase;
            this.game.add.existing(this);
            /* var width = 60 // example;
             var height = 60 // example;
             var bmd = this.game.add.bitmapData(width, height);
             
             bmd.ctx.beginPath();
             bmd.ctx.rect(0, 0, width, height);
             bmd.ctx.fillStyle = '#ffcc00';
             bmd.ctx.fill();*/
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
            // this.events.onInputDown.add(onDown, { param1: this, param2: myBase });
            this.events.onInputDown.add(onDown2, this);
            this.events.onInputUp.add(onUp, this);
            // this.events.onInputOut.add(onOut, this);
            /*function onDragUpdate(sprite: Joystick, pointer: Phaser.Pointer) {
    
                sprite.mydebug = 'dragging';
                
                var deltaX: any = (pointer.x - pointer.positionDown.x);
    
                if (sprite.previousDelta == null) {
                    sprite.previousDelta = deltaX;
                   
                }
                
    
               // console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
                sprite.mydebug = '3deltaX: ' + deltaX + ', pID: ' + pointer.id;
               
                var mrNum: any = Math.abs(deltaX);
                
                if (deltaX < sprite.previousDelta) {
                    this.base.body.rotation -= mrNum * 2 / 1000 * (Math.PI / 4);
                    //sprite.base.body.rotation -= mrNum * 2 / 1000 * (Math.PI / 4);
                } else if (deltaX > sprite.previousDelta) {
                    this.base.body.rotation += mrNum * 2 / 1000 * (Math.PI / 4);
                   // sprite.base.body.rotation += mrNum * 2 / 1000 * (Math.PI / 4);
                }
    
                sprite.previousDelta = deltaX;
    
    
            }*/
            // function onDown(sprite:Joystick, pointer:Phaser.Pointer, pri:Number, myBase:Phaser.Sprite) {
            /* function onDown() {
     
                 //if an input down event (thruster or fire) is currently active, need a way to ignore them
                 var sprite: Joystick = this.param1;
     
                 sprite.mydebug = 'onDown, gpID: ' + globalPointerID;
     
                 var myBase:Phaser.Sprite = this.param2;
                            
                 console.log('joystick onDown... ' + myBase.name);
                // sprite.myPointer = pointer;
                 sprite.isBeingDragged = true;
                            
                 
                sprite.game.input.addMoveCallback(function (pointer: Phaser.Pointer, x, y, myBase:Phaser.Sprite) {
                    // move callbacks will be triggered by thrust & fire buttons
                    // but they will have different pointer IDs, so ignore them.
     
                    sprite.mydebug = 'addMoveCallback, gpID: ' + globalPointerID;
     
                    if (globalPointerID == -1) {
                        globalPointerID = pointer.id;
                    }
     
                    if (globalPointerID == pointer.id){
     
                        if (sprite.isBeingDragged == true) {
                            //console.log('move callback: ' + pointer.positionDown.x + ',' + pointer.x);
                            //console.log('joystick movecallback... ' + sprite.base.name);
     
                            var deltaX: any = (pointer.x - pointer.positionDown.x);
     
                            if (sprite.previousDelta == null) {
                                sprite.previousDelta = deltaX;
                                //sprite.activePointerId = pointer.id;
                            }
     
                            console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
                            sprite.mydebug = '2deltaX: ' + deltaX + ' ,pID: ' + pointer.id;
     
     
                            var mrNum: any = Math.abs(deltaX);
     
                            if (deltaX < sprite.previousDelta) {
                                sprite.base.body.angle = sprite.base.body.angle - 1; // -= mrNum * 2 / 1000 * (Math.PI / 4);
                            } else if (deltaX > sprite.previousDelta) {
                                sprite.base.body.angle = sprite.base.body.angle + 1;
                                //sprite.base.body.rotation += mrNum * 2 / 1000 * (Math.PI / 4);
                            }
     
                            sprite.previousDelta = deltaX;
     
                        }
                        
                        //sprite.base.body.rotation = sprite.base.body.rotation + (deltaX);
                    }
                                   
                 }, this);
             
             }*/
            function onDown2(sprite, pointer) {
                sprite.isBeingDragged = true;
                sprite.myPointer = pointer;
            }
            function onUp(sprite, pointer) {
                // console.log('onup: was' + pointer.positionDown + ', now ' + pointer.positionUp);
                sprite.isBeingDragged = false;
                //globalPointerID = -1;
            }
            function onOut(sprite, pointer) {
                //console.log('onout');
            }
        };
        Joystick.prototype.onUpdate = function () {
        };
        return Joystick;
    }(Phaser.Sprite));
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Level1.js.map