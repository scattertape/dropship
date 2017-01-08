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
            this.CANNON_SPEED = 2;
            this.MISSILE_SPEED = 20;
            this.SHIP_ROTATE_SPEED = 4;
            this._swipeActive = false;
            this._upTolerance = 40;
            this._downTolerance = 100;
            this._leftTolerance = 60;
            this._rightTolerance = 60;
            this._cameraOverlap = 120;
            this._shipDirection = 0;
            this._fireRate = 400;
            this.transitionCount = 0;
            this.deviceMotionAvailable = false;
            this.motionTracker = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.motionAcceleration = 4;
        }
        Level1.prototype.soundsDecoded = function () {
            console.log('snddecoded');
        };
        // -------------------------------------------------------------------------
        Level1.prototype.create = function () {
            //321Thrust
            this.game.world.visible = false;
            this.laserSnd = this.game.add.audio('laser');
            this.bombSnd = this.game.add.audio('bomb');
            this.explodeSnd = this.game.add.audio('explode');
            this.proxSnd = this.game.add.audio('prox');
            this.thrustSnd = this.game.add.audio('thrust');
            this.laser2Snd = this.game.add.audio('laser2');
            this.impactSnd = this.game.add.audio('impact');
            this.impact2Snd = this.game.add.audio('impact2');
            this.game.sound.setDecodedCallback([this.laserSnd, this.bombSnd, this.explodeSnd, this.proxSnd, this.thrustSnd, this.laser2Snd, this.impactSnd, this.impact2Snd], this.soundsDecoded, this);
            if (this.game.state.states['MainMenu'].deviceMoArray > 0) {
                // Tablet only settings:
                this.deviceMotionAvailable = true;
                this._swipeActive = true;
            }
            if (this.game.state.states['Options'].useJoystick == true) {
                this.deviceMotionAvailable = false;
            }
            if (this.game.state.states['Options'].damage == true) {
                this.shipDamage = true;
            }
            ;
            if (this.game.state.states['Options'].damage == false) {
                this.shipDamage = false;
            }
            ;
            this.game.stage.backgroundColor = "#111111";
            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.world.setBounds((0 - this.game.width) - (this.game.width / 2), (0 - this.game.height) - (this.game.height / 2), this.game.width * 3, this.game.height * 3);
            console.log('world center x: ' + this.world.centerX + ', world center y: ' + this.world.centerY);
            var cameraStartX = this.world.centerX - (this.game.width * 0.5);
            var cameraStartY = this.world.centerY - (this.game.height * 0.5);
            this._transitionTween = this.game.add.tween(this.game.camera).to({ x: cameraStartX, y: cameraStartY }, 1, Phaser.Easing.Power1, true);
            this._allGroup = this.game.add.group();
            this._currentSubLevel = 5;
            this._tiles = this.game.add.group();
            var anchor = false;
            var tileWidth = 640;
            var tileHeight = 960;
            // Center
            var tile5 = this.game.add.sprite(this.world.centerX, this.world.centerY, 'level' + this.game.state.states['MainMenu'].level + '-5');
            if (anchor) {
                tile5.anchor.setTo(0.5, 0.5);
            }
            tile5.name = 'tile5';
            this._tiles.add(tile5);
            // Top
            var tile8 = this.game.add.sprite(this.world.centerX, (this.world.centerY - tileHeight) + this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-8');
            if (anchor) {
                tile8.anchor.setTo(0.5, 1.5);
            }
            tile8.name = 'tile8';
            this._tiles.add(tile8);
            // Bottom
            var tile2 = this.game.add.sprite(this.world.centerX, (this.world.centerY + tileHeight) - this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-2');
            if (anchor) {
                tile2.anchor.setTo(0.5, -0.5);
            }
            tile2.name = 'tile2';
            this._tiles.add(tile2);
            // Left
            var tile4 = this.game.add.sprite((this.world.centerX - tileWidth) + this._cameraOverlap, this.world.centerY, 'level' + this.game.state.states['MainMenu'].level + '-4');
            if (anchor) {
                tile4.anchor.setTo(1.5, 0.5);
            }
            tile4.name = 'tile4';
            this._tiles.add(tile4);
            // Right
            var tile6 = this.game.add.sprite((this.world.centerX + tileWidth) - this._cameraOverlap, this.world.centerY, 'level' + this.game.state.states['MainMenu'].level + '-6');
            if (anchor) {
                tile6.anchor.setTo(-0.5, 0.5);
            }
            tile6.name = 'tile6';
            this._tiles.add(tile6);
            // Top Left
            var tile7 = this.game.add.sprite((this.world.centerX - tileWidth) + this._cameraOverlap, (this.world.centerY - tileHeight) + this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-7');
            if (anchor) {
                tile7.anchor.setTo(1.5, 1.5);
            }
            tile7.name = 'tile7';
            this._tiles.add(tile7);
            // Top Right
            var tile9 = this.game.add.sprite((this.world.centerX + tileWidth) - this._cameraOverlap, (this.world.centerY - tileHeight) + this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-9');
            if (anchor) {
                tile9.anchor.setTo(-0.5, 1.5);
            }
            tile9.name = 'tile9';
            this._tiles.add(tile9);
            // Bottom Left
            var tile1 = this.game.add.sprite((this.world.centerX - tileWidth) + this._cameraOverlap, (this.world.centerY + tileHeight) - this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-1');
            tile1.anchor.setTo(1.5, -0.5);
            tile1.name = 'tile1';
            this._tiles.add(tile1);
            // Bottom Right
            var tile3 = this.game.add.sprite((this.world.centerX + tileWidth) - this._cameraOverlap, (this.world.centerY + tileHeight) - this._cameraOverlap, 'level' + this.game.state.states['MainMenu'].level + '-3');
            tile3.anchor.setTo(-0.5, -0.5);
            tile3.name = 'tile3';
            this._tiles.add(tile3);
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = 200;
            this.game.physics.p2.restitution = 0.0;
            this.game.physics.p2.friction = 0.95;
            this.game.physics.p2.applyDamping = true;
            if (this.game.physics.p2.paused) {
                this.game.physics.p2.resume();
            }
            this._tilesCollisionGroup = this.game.physics.p2.createCollisionGroup();
            var tileNo = 0;
            for (tileNo; tileNo < 9; tileNo++) {
                var tile = this._tiles.getByName('tile' + (tileNo + 1));
                //tile.alpha = 1;
                //tile.autoCull = true;
                //console.log(tile.name);
                this.game.physics.p2.enable(tile);
                this.game.physics.p2.enableBody(tile, false);
                var tileBody = tile.body;
                tileBody.static = true;
                tileBody.clearShapes();
                var str1 = (tileNo + 1) + '-1';
                var str2 = (tileNo + 1) + '-2';
                tileBody.loadPolygon('physicsDataLevel' + this.game.state.states['MainMenu'].level, str1);
                tileBody.loadPolygon('physicsDataLevel' + this.game.state.states['MainMenu'].level, str2);
                //tileBody.debug = true;
                tileBody.allowSleep = true;
                tileBody.setCollisionGroup(this._tilesCollisionGroup);
                if (tile.name != 'tile' + this._currentSubLevel) {
                    tile.visible = false;
                    tileBody.data.sleep();
                }
                else {
                    tileBody.data.wakeUp();
                }
            }
            this._thingsGroup = this.game.add.group();
            this._allGroup.add(this._tiles);
            this._allGroup.add(this._thingsGroup);
            this._controlsGroup = this.game.add.group();
            this._allGroup.add(this._controlsGroup);
            // Ensure bombs are added underneath ship:
            this._missiles = this.add.group();
            this._allGroup.add(this._missiles);
            this._base = new Ship(this.game, this.world.centerX, this.world.centerY);
            this.game.physics.p2.enable(this._base);
            this._base.setup(this);
            this._base.name = 'DROPSHIP';
            this._base.anchor.setTo(0.5, 0.5);
            this._base.body.setCircle(33);
            this._base.body.collideWorldBounds = false;
            //this._base.body.debug = true;
            //this._base.body.fixedRotation = true;
            this._base.normalGravity();
            this._base.body.onBeginContact.add(this._base.contactHandler);
            this._base.body.onEndContact.add(this._base.endContactHandler);
            //  Game input
            this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.game.input.keyboard.addKey(Phaser.Keyboard.COMMA);
            this.game.input.keyboard.addKey(Phaser.Keyboard.PERIOD);
            this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this._down = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this._space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this._up = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this._b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
            this._w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
            this._a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
            this._s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
            this._d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
            // following keys will not be propagated to browser
            this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.UP, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, Phaser.Keyboard.B, Phaser.Keyboard.W, Phaser.Keyboard.A, Phaser.Keyboard.S, Phaser.Keyboard.D, Phaser.Keyboard.SPACEBAR]);
            // allow inpact events
            this.game.physics.p2.setImpactEvents(true);
            this._missilesCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._sentryBulletsCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._objectsCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._shipCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._sentriesCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._lasersCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._antiGravCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._aggCollisionGroup = this.game.physics.p2.createCollisionGroup();
            this._teleporterCollisionGroup = this.game.physics.p2.createCollisionGroup();
            //var js: Joystick = new Joystick(this.game,200,200,'imageKey');
            // js.setUp();
            // drones group
            this._drones = this.add.group();
            this._drones.physicsBodyType = Phaser.Physics.P2JS;
            this._drones.enableBody = true;
            // create drones
            this._drones.classType = Dron;
            var dronList = [
                { "x": -80, "y": -220, "rotation": 0, "type": 1, "level": 1 },
                { "x": -150, "y": -175, "rotation": 0, "type": 1, "level": 1 },
                { "x": 20, "y": 920, "rotation": 0, "type": 1, "level": 1 },
                { "x": -120, "y": 820, "rotation": 0, "type": 1, "level": 1 },
            ];
            for (var i = 0; i < dronList.length; i++) {
                if (dronList[i].level == this.game.state.states['MainMenu'].level) {
                    var aDron = new Dron(this.game, dronList[i].x, dronList[i].y);
                    this.game.physics.p2.enable(aDron);
                    var body = aDron.body;
                    body.x = dronList[i].x;
                    body.y = dronList[i].y;
                    body.setCircle(20);
                    body.kinematic = true; // does not respond to forces
                    body.setCollisionGroup(this._objectsCollisionGroup);
                    body.collides([this._missilesCollisionGroup, this._lasersCollisionGroup, this._shipCollisionGroup]);
                    this._drones.add(aDron);
                }
            }
            // proximity mines group
            this._proxMines = this.add.group();
            this._proxMines.physicsBodyType = Phaser.Physics.P2JS;
            this._proxMines.enableBody = true;
            this._proxMines.classType = Prox;
            // Laser group
            this._lasers = this.add.group();
            this._lasers.physicsBodyType = Phaser.Physics.P2JS;
            this._lasers.enableBody = true;
            for (var i = 0; i < 15; i++) {
                var aLaser = new Laser(this.game, 0, 0);
                this._lasers.add(aLaser);
                aLaser.setUp(this);
                aLaser.anchor.setTo(0.5, 0.5);
                aLaser.name = 'laser';
                aLaser.autoCull = true;
                aLaser.lifespan = 1;
                aLaser.animations.add("goodHit", Phaser.Animation.generateFrameNames("Bullet", 25, 40, "", 4));
                aLaser.animations.add("badHit", Phaser.Animation.generateFrameNames("Bullet", 35, 40, "", 4));
                // physics
                var body = aLaser.body;
                body.setCircle(5);
                //body.debug = true;
                body.kinematic = false;
                body.damping = 0;
                body.data.gravityScale = 0;
                body.setCollisionGroup(this._lasersCollisionGroup);
                body.collides(this._objectsCollisionGroup);
                body.collides(this._sentriesCollisionGroup);
                body.collides(this._tilesCollisionGroup);
                body.collides(this._aggCollisionGroup);
                //body.collides(this._levelCollisionGroup, this.laserHitLevel, this);
                body.onBeginContact.add(this.weaponContactHandler);
            }
            // missiles group                        
            this._missiles.physicsBodyType = Phaser.Physics.P2JS;
            this._missiles.enableBody = true;
            for (var i = 0; i < 10; i++) {
                var aMissile = new Missile(this.game, 0, 0);
                this._missiles.add(aMissile);
                aMissile.setUp(this);
                aMissile.anchor.setTo(0.5, 0.5);
                aMissile.name = 'missile';
                aMissile.lifespan = 1;
                // physics
                var body = aMissile.body;
                body.setCircle(15);
                body.setCollisionGroup(this._missilesCollisionGroup);
                body.collides(this._objectsCollisionGroup);
                body.collides(this._aggCollisionGroup);
                body.collides(this._sentriesCollisionGroup);
                body.collides(this._tilesCollisionGroup);
                body.onBeginContact.add(this.weaponContactHandler);
                aMissile.animations.add("anim", Phaser.Animation.generateFrameNames("Bomb", 0, 9, "", 4));
                aMissile.animations.add("blowup", Phaser.Animation.generateFrameNames("Bomb", 10, 25, "", 4));
                aMissile.animations.play("anim", 15, true, false);
            }
            this._backgroundImage = this.add.image(0, this.game.camera.height - 25, "BG");
            this._backgroundImage.anchor.setTo(0, 0);
            this._backgroundImage.cacheAsBitmap = true;
            this._backgroundImage.width = this.game.width;
            this._controlsGroup.add(this._backgroundImage);
            if (this.game.state.states['Options'].useJoystick == false) {
                this._leftButton = this.game.add.button(0, 0);
                this._leftButton.height = this.game.camera.height;
                this._rightButton = this.game.add.button(this.game.camera.width * 0.5, 0);
                this._rightButton.height = this.game.camera.height;
                this._controlsGroup.add(this._leftButton);
                this._controlsGroup.add(this._rightButton);
            }
            else {
                this._leftButton = this.game.add.button(this.game.camera.width * 0.5, this.game.camera.height * 0.5);
                this._leftButton.height = this.game.camera.height * 0.5;
                this._rightButton = this.game.add.button(this.game.camera.width * 0.5, 0);
                this._rightButton.height = this.game.camera.height * 0.5;
                this._controlsGroup.add(this._rightButton);
                this._controlsGroup.add(this._leftButton);
            }
            //this._controlsGroup.add(this._leftButton);
            this._leftButton.width = this.game.camera.width * 0.5;
            // this._leftButton.height = this.game.camera.height;
            this._leftButton.inputEnabled = true;
            this._leftButton.events.onInputDown.add(this.leftBtnDown, this);
            this._leftButton.events.onInputUp.add(this.leftBtnUp, this);
            //this._controlsGroup.add(this._rightButton);
            this._rightButton.width = this.game.camera.width * 0.5;
            //this._rightButton.height = this.game.camera.height;
            this._rightButton.inputEnabled = true;
            this._rightButton.events.onInputDown.add(this.rightBtnDown, this);
            this._rightButton.events.onInputUp.add(this.rightBtnUp, this);
            this._thrustBtn = this.game.add.sprite(0, this.game.camera.height - 25, "Atlas", "ThrustOff");
            this._controlsGroup.add(this._thrustBtn);
            this._thrustBtn.anchor.setTo(1.4, 0.0);
            this._thrustBtn.x = this.game.camera.width;
            this._thrustBtn.inputEnabled = true;
            this._thrustBtn.events.onInputDown.add(this.igniteThruster, this);
            this._thrustBtn.events.onInputUp.add(this.deactivateThruster, this);
            this._fireBtn = this.game.add.sprite(0, this.game.camera.height - 25, "Atlas", "FireOff");
            this._controlsGroup.add(this._fireBtn);
            this._fireBtn.anchor.setTo(2.8, 0.0);
            this._fireBtn.x = this.game.camera.width;
            this._fireBtn.inputEnabled = true;
            this._fireBtn.animations.add("release", ["FireOn", "FireOn", "FireOn", "FireOn", "FireOn", "FireOff"], 15, false);
            this._fireBtn.events.onInputDown.add(this.fireBtnDown, this);
            this._fireBtn.events.onInputUp.add(this.fireBtnUp, this);
            this._missileBtn = this.game.add.sprite(0, this.game.camera.height - 25, "Atlas", "BombOff");
            this._controlsGroup.add(this._missileBtn);
            this._missileBtn.anchor.setTo(4.2, 0.0);
            this._missileBtn.x = this.game.camera.width;
            this._missileBtn.animations.add("release", ["BombOn", "BombOn", "BombOn", "BombOn", "BombOn", "BombOff"], 15, false);
            this._missileBtn.inputEnabled = true;
            this._missileBtn.events.onInputDown.add(this.missileBtnDown, this);
            if (this.game.state.states['Options'].useJoystick == true) {
                this.joystickViz = new JoystickViz(this.game, 0, this.game.camera.height + 10);
                this.joystickViz.anchor.setTo(0.0, 0.5);
                this._controlsGroup.add(this.joystickViz);
                this._joystick = new Joystick(this.game, 0, 0);
                this._controlsGroup.add(this._joystick);
                this._joystick.setup(this);
                this._joystick.fixedToCamera = true;
                this._joystick.cameraOffset.setTo(0, 0);
            }
            if (this._swipeActive == true) {
                //var swipeMinWidthDistance = this.game.world.width / 10;
                //var swipeMinHeightDistance = this.game.world.height / 10;
                // Math.floor((swipeDistance / this.game.world.width) * 100);
                var startPointx = 0;
                var startPointy = 0;
                var endPointx = 0;
                var endPointy = 0;
                this._swipeTimer = this.game.time.create(false);
                // Swipe detector:
                this.game.input.onDown.add(function (pointer) {
                    this._swipeTimer.start();
                    this.startPointx = pointer.x;
                    this.startPointy = pointer.y;
                }, this);
                this.game.input.onUp.add(function (pointer) {
                    var eventDuration = this._swipeTimer.ms;
                    this._swipeTimer.stop();
                    if (eventDuration > 333) {
                    }
                    else {
                        this.endPointx = pointer.x;
                        this.endPointy = pointer.y;
                        if (this.startPointx > (this.game.camera.width * 0.5) && this.endPointx > (this.game.camera.width * 0.5)) {
                            console.log('moo ' + this.game.camera.width + ' ' + this.endPointx);
                            var currVelocitySqr = (this.startPointx + this.endPointx) * (this.startPointx + this.endPointx) + (this.startPointy + this.endPointy) * (this.startPointy + this.endPointy);
                            var vy = this.endPointy - this.startPointy;
                            var vx = this.endPointx - this.startPointx;
                            var angleN = Math.atan2(vy, vx);
                            vx = Math.cos(angleN) * 0.15 * eventDuration;
                            vy = Math.sin(angleN) * 0.15 * eventDuration;
                            /*var swipeDistanceX = difference(this.startPointx, this.endPointx);
                        
                            var swipedLeft: Boolean;

                            if (this.endPointx < this.startPointx - swipeMinDistance) {
                                // console.log("left: " + vx + 'duration: ' + eventDuration);
                                swipedLeft = true;

                            } else if (this.endPointx > this.startPointx + swipeMinDistance) {
                                //console.log("right: " + vx + 'duration: ' + eventDuration);
                                swipedLeft = false;

                            } else if (this.endPointy < this.startPointy - swipeMinDistance) {
                                //console.log("up");
                            } else if (this.endPointx > this.startPointy + swipeMinDistance) {
                                //console.log("down");
                            }
                        
                            var swipePercentX = Math.floor((swipeDistanceX / this.game.world.width) * 50);
                        
                            if (swipedLeft == true) {
                                swipePercentX = 0 - swipePercentX;
                            }

                            if (swipedLeft == true || swipedLeft == false) {
                               this.game.tweens.removeFrom(this._base.body);
                               this.game.add.tween(this._base.body).to({ angle: this._base.body.angle + swipePercent }, eventDuration * 2, Phaser.Easing.Power1, true);
                                console.log('Swipe Percent ' + swipePercent + ' -' + swipedLeft);
                            }*/
                            var swipeDistanceY = difference(this.startPointy, this.endPointy);
                            var swipePercentY = Math.floor((swipeDistanceY / this.game.world.height) * 50);
                            //this._text2.setText('Swipe: ' + swipePercentY + ' ' + swipeDistanceY);
                            if (swipePercentY > 0) {
                                this.missileBtnDown();
                            }
                        }
                    }
                }, this);
            }
            // Sentry projectiles
            this._sentryBullets = this.add.group();
            this._sentryBullets.physicsBodyType = Phaser.Physics.P2JS;
            this._sentryBullets.enableBody = true;
            // create 10 bullets
            this._sentryBullets.createMultiple(10, "Atlas", "Bullet0025");
            this._sentryBullets.forEach(function (aBullet) {
                aBullet.anchor.setTo(0.5, 0.5);
                aBullet.autoCull = true;
                // physics
                var body = aBullet.body;
                body.kinematic = true;
                body.setCircle(5);
                //body.debug = true;
                body.setCollisionGroup(this._sentryBulletsCollisionGroup);
                body.collides(this._shipCollisionGroup, this.sentryHitShip, this);
            }, this);
            // sentries group
            this._sentries = this.game.add.group();
            var sentryList = [
                { "x": 735, "y": -1160, "rotation": 270, "type": 1, "level": 1 },
                { "x": -775, "y": 200, "rotation": 90, "type": 1, "level": 1 },
                { "x": -740, "y": 570, "rotation": 135, "type": 0, "level": 1 },
                { "x": 700, "y": 1215, "rotation": 0, "type": 0, "level": 1 },
                { "x": -215, "y": -588, "rotation": 0, "type": 0, "level": 1 },
                { "x": -205, "y": -335, "rotation": 180, "type": 1, "level": 1 },
                { "x": -775, "y": -95, "rotation": 90, "type": 1, "level": 1 }
            ];
            for (var i = 0; i < sentryList.length; i++) {
                if (sentryList[i].level == this.game.state.states['MainMenu'].level) {
                    var sentry = new Sentry(this.game, this.world.centerX + sentryList[i].x, this.world.centerY + sentryList[i].y, sentryList[i].type);
                    this.game.physics.p2.enable(sentry);
                    var body = sentry.body;
                    body.kinematic = true;
                    // [x,y]
                    var polyNumbers = [[-20, -15], [-40, 20], [40, 20], [20, -15]];
                    body.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                    body.setCollisionGroup(this._sentriesCollisionGroup);
                    body.collides([this._missilesCollisionGroup]);
                    body.collides([this._lasersCollisionGroup]);
                    body.collides([this._shipCollisionGroup]);
                    body.angle = sentryList[i].rotation;
                    sentry.setup(this);
                    //sentry.alpha = 0.5;
                    //sentry.baseTop.alpha = 0.51;
                    //body.debug = true;
                    this._sentries.add(sentry);
                }
            }
            // Create 5 proximity mines for each type 1 sentry on the current level
            this._sentries.forEach(function (aSentry) {
                if (aSentry.sentryType == 1) {
                    this._proxMines.createMultiple(5, "Atlas", "Prox0000");
                    this._proxMines.forEach(function (aProx) {
                        aProx.setUp(this);
                        var body = aProx.body;
                        body.setCircle(17);
                        body.kinematic = true; // does not respond to forces
                        body.setCollisionGroup(this._objectsCollisionGroup);
                        //body.debug = true;
                    }, this);
                }
            }, this);
            this._objects = this.game.add.group();
            this._allGroup.add(this._objects);
            this._objects.enableBody = true;
            this._objects.physicsBodyType = Phaser.Physics.P2JS;
            var objectsList = [
                { "x": -260, "y": -200, "rotation": 90, "type": 'telebase', "level": 0 },
                { "x": -260, "y": -100, "rotation": 90, "type": 'telebase', "level": 0 },
                { "x": 175, "y": 145, "rotation": 90, "type": 'sheildBonus', "level": 1 },
                { "x": -120, "y": -360, "rotation": 0, "type": 'octoid', "level": 1 },
                { "x": -90, "y": -380, "rotation": 180, "type": 'octoid', "level": 1 },
                { "x": -60, "y": -360, "rotation": 0, "type": 'octoid', "level": 1 },
                { "x": -30, "y": -380, "rotation": 180, "type": 'octoid', "level": 1 },
                { "x": 0, "y": -360, "rotation": 0, "type": 'octoid', "level": 1 },
                { "x": 30, "y": -380, "rotation": 180, "type": 'octoid', "level": 1 },
                { "x": 60, "y": -360, "rotation": 0, "type": 'octoid', "level": 1 },
                { "x": 90, "y": -380, "rotation": 180, "type": 'octoid', "level": 1 },
                { "x": 175, "y": 185, "rotation": 90, "type": 'tripper', "level": 1 },
                { "x": 593, "y": -222, "rotation": 0, "type": 'drone', "level": 1 },
                { "x": 483, "y": -111, "rotation": 0, "type": 'drone', "level": 1 },
                { "x": -620, "y": -1205, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -620, "y": -1165, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -620, "y": -1125, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -620, "y": -1085, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -650, "y": -1185, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -650, "y": -1145, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -650, "y": -1105, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -590, "y": -1185, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -590, "y": -1145, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -590, "y": -1105, "rotation": 90, "type": 'hexoid', "level": 1 },
                { "x": -259, "y": 320, "rotation": 45, "type": 'telebase', "level": 1 },
                { "x": -785, "y": 1170, "rotation": 90, "type": 'telebase', "level": 1 },
                { "x": -781, "y": -1224, "rotation": 90, "type": 'telebase', "level": 1 },
                { "x": -781, "y": -1044, "rotation": 90, "type": 'telebase', "level": 1 },
                { "x": 275, "y": -909, "rotation": 135, "type": 'telebase', "level": 1 },
                { "x": -310, "y": -1105, "rotation": 270, "type": 'crystal', "level": 1 }
            ];
            for (var i = 0; i < objectsList.length; i++) {
                if (objectsList[i].level == this.game.state.states['MainMenu'].level) {
                    var texture = '';
                    if (objectsList[i].type == 'sheildBonus') {
                        texture = 'Sheild0000';
                    }
                    ;
                    if (objectsList[i].type == 'octoid') {
                        texture = 'Octoid0000';
                    }
                    ;
                    if (objectsList[i].type == 'tripper') {
                        texture = 'Tripper0000';
                    }
                    ;
                    if (objectsList[i].type == 'drone') {
                        texture = 'Drone0000';
                    }
                    ;
                    if (objectsList[i].type == 'hexoid') {
                        texture = 'hexoid0000';
                    }
                    ;
                    if (objectsList[i].type == 'crystal') {
                        texture = 'Crystal0000';
                    }
                    ;
                    if (objectsList[i].type == 'telebase') {
                        texture = 'telebase0000';
                    }
                    ;
                    var xPos = objectsList[i].x + this.world.centerX;
                    var yPos = objectsList[i].y + this.world.centerY;
                    var object = new Item(this.game, xPos, yPos, 'Atlas', texture);
                    object.name = objectsList[i].type;
                    object.setup(this);
                    object.anchor.setTo(0.5, 0.5);
                    object.autoCull = true;
                    this.game.physics.p2.enable(object);
                    if (objectsList[i].type == 'octoid' || objectsList[i].type == 'hexoid') {
                        object.body.setCircle(18);
                    }
                    object.body.angle = objectsList[i].rotation;
                    object.body.kinematic = true;
                    if (objectsList[i].type == 'drone') {
                        var polyNumbers = [[100, 5], [102, 5], [135, 25], [65, 25]];
                        object.body.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                        object.body.x = xPos;
                        object.body.y = yPos;
                        if (this.game.state.states['MainMenu'].landscapeLayout == true) {
                            object.body.angle = -90;
                        }
                    }
                    if (objectsList[i].type == 'crystal') {
                        // [x,y]
                        var polyNumbers = [[-20, -15], [-40, 20], [40, 20], [20, -15]];
                        object.body.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                    }
                    if (objectsList[i].type == 'telebase') {
                        object.body.setCircle(25);
                    }
                    //object.body.debug = true;
                    this._objects.add(object);
                    object.body.setCollisionGroup(this._objectsCollisionGroup);
                    object.body.collides([this._shipCollisionGroup, this._missilesCollisionGroup, this._lasersCollisionGroup]);
                }
            }
            this._tiles.forEach(function (tile) {
                tile.body.collides([this._shipCollisionGroup, this._lasersCollisionGroup, this._missilesCollisionGroup]);
            }, this);
            this._base.body.setCollisionGroup(this._shipCollisionGroup);
            // FLY THRU WALLS HACK:
            this._base.body.collides([this._objectsCollisionGroup, this._tilesCollisionGroup, this._sentryBulletsCollisionGroup, this._sentriesCollisionGroup]);
            var createText = false;
            if (createText) {
                var style1 = { font: "15px Arial", fill: "#00cc00", align: "left" };
                var style2 = { font: "15px Arial", fill: "#00ccff", align: "left" };
                this._text1 = this.game.add.text(300, 300, String(this.deviceMotionAvailable), style1);
                this._text1.anchor.setTo(0.5, 0.5);
                this._text2 = this.game.add.text(280, 280, 'accel+gravity', style2);
                this._text2.anchor.setTo(0.5, 0.5);
            }
            this._antiGravities = this.game.add.group();
            var antiGravsList = [
                { "x": 140, "y": 0, "rotation": 0, "landscape": true, "level": 1 },
                { "x": 650, "y": -175, "rotation": 180, "landscape": true, "level": 1 },
                { "x": -200, "y": 142, "rotation": 0, "landscape": false, "level": 1 },
                { "x": -100, "y": -1173, "rotation": 180, "landscape": false, "level": 1 },
            ];
            for (var i = 0; i < antiGravsList.length; i++) {
                if (antiGravsList[i].level == this.game.state.states['MainMenu'].level) {
                    if (antiGravsList[i].landscape == this.game.state.states['MainMenu'].landscapeLayout) {
                        var poly = new Phaser.Polygon();
                        var polyNumbers = [[0, 0], [200, 0], [100, 200], [99, 200]];
                        poly.setTo([new Phaser.Point(polyNumbers[0][0], polyNumbers[0][1]), new Phaser.Point(polyNumbers[1][0], polyNumbers[1][1]), new Phaser.Point(polyNumbers[2][0], polyNumbers[2][1]), new Phaser.Point(polyNumbers[3][0], polyNumbers[3][1])]);
                        /*var graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
                        graphics.beginFill(0xFF33ff);
                        graphics.drawPolygon(poly.points);
                        graphics.endFill();*/
                        //var antiGrav: AntiGrav = this.game.add.sprite(antiGravPositions[i][0], antiGravPositions[i][1], graphics.generateTexture());
                        var antiGrav = new AntiGrav(this.game, this.world.centerX + antiGravsList[i].x, this.world.centerY + antiGravsList[i].y);
                        antiGrav.name = 'antiGrav';
                        this.game.physics.p2.enable(antiGrav, true);
                        this.game.physics.p2.enableBody(antiGrav, true);
                        var antiGravBody = antiGrav.body;
                        antiGravBody.static = true;
                        antiGravBody.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                        if (antiGravsList[i].rotation == 0) {
                            //upward
                            antiGravBody.offset.y = 140;
                            antiGrav.setup(true, this);
                        }
                        else {
                            antiGravBody.offset.y = -140;
                            //downward
                            antiGrav.setup(false, this);
                        }
                        antiGravBody.data.shapes[0].sensor = true;
                        antiGravBody.kinematic = false;
                        //antiGravBody.debug = true;
                        antiGravBody.setCollisionGroup(this._antiGravCollisionGroup);
                        antiGravBody.collides([this._shipCollisionGroup]);
                        antiGravBody.angle = antiGravsList[i].rotation;
                        this._antiGravities.add(antiGrav);
                        antiGrav.generator.base = this._base;
                        //antiGrav.generator.body.setCircle(antiGrav.generator.width / 2);
                        var poly = new Phaser.Polygon();
                        // [x,y]
                        var polyNumbers = [[-20, -15], [-10, 29], [10, 29], [20, -15]];
                        poly.setTo([new Phaser.Point(polyNumbers[0][0], polyNumbers[0][1]), new Phaser.Point(polyNumbers[1][0], polyNumbers[1][1]), new Phaser.Point(polyNumbers[2][0], polyNumbers[2][1]), new Phaser.Point(polyNumbers[3][0], polyNumbers[3][1])]);
                        antiGrav.generator.body.addPolygon({ optimalDecomp: false, skipSimpleCheck: false, removeCollinearPoints: false }, polyNumbers);
                        antiGrav.generator.body.angle = antiGravsList[i].rotation;
                        //antiGrav.generator.body.debug = true;
                        antiGrav.generator.body.kinematic = true; // does not respond to forces
                        antiGrav.generator.body.setCollisionGroup(this._aggCollisionGroup);
                        antiGrav.generator.body.collides([this._aggCollisionGroup, this._missilesCollisionGroup, this._lasersCollisionGroup, this._shipCollisionGroup]);
                    }
                }
            }
            this._base.body.collides([this._antiGravCollisionGroup, this._aggCollisionGroup]);
            this._teleporters = this.game.add.group();
            this._allGroup.add(this._teleporters);
            var teleporterList = [
                { "x": 100, "y": 100, "rotation": 0, "level": 0 },
                { "x": -140, "y": -220, "rotation": 0, "level": 1 }
            ];
            for (var i = 0; i < teleporterList.length; i++) {
                if (teleporterList[i].level == this.game.state.states['MainMenu'].level) {
                    this.teleporter = new Teleporter(this.game, this.world.centerX + teleporterList[i].x, this.world.centerY + teleporterList[i].y);
                    this.teleporter.name = 'teleporter';
                    this.game.physics.p2.enable(this.teleporter, true);
                    this.game.physics.p2.enableBody(this.teleporter, true);
                    var teleporterBody = this.teleporter.body;
                    teleporterBody.static = true;
                    teleporterBody.setCircle(30);
                    teleporterBody.data.shapes[0].sensor = true;
                    teleporterBody.kinematic = false;
                    teleporterBody.debug = false;
                    teleporterBody.setCollisionGroup(this._teleporterCollisionGroup);
                    teleporterBody.angle = antiGravsList[i].rotation;
                    this.teleporter.setUp(this);
                }
            }
            var joystickY = 890;
            this._controlsGroup.fixedToCamera = true;
            this._controlsGroup.cameraOffset.setTo(0, this.game.height - this._controlsGroup.height);
            if (this.game.state.states['MainMenu'].landscapeLayout == true) {
                if (this.game.state.states['Options'].useJoystick == true) {
                    this.joystickViz.y = 650;
                }
                this._tiles.forEach(function (tile) {
                    var newPoint = this.rotate_point(tile.body.x, tile.body.y, this.world.centerX, this.world.centerY, 90);
                    tile.body.x = newPoint.x;
                    tile.body.y = newPoint.y;
                    tile.body.angle = 90;
                }, this);
                this._objects.forEach(function (obj) {
                    var newPoint = this.rotate_point(obj.body.x, obj.body.y, this.world.centerX, this.world.centerY, 90);
                    obj.body.x = newPoint.x;
                    obj.body.y = newPoint.y;
                    obj.body.angle = obj.body.angle + 90;
                }, this);
                this._teleporters.forEach(function (obj) {
                    var newPoint = this.rotate_point(obj.body.x, obj.body.y, this.world.centerX, this.world.centerY, 90);
                    obj.body.x = newPoint.x;
                    obj.body.y = newPoint.y;
                    obj.body.angle = obj.body.angle + 90;
                }, this);
                this._drones.forEach(function (drone) {
                    var newPoint = this.rotate_point(drone.body.x, drone.body.y, this.world.centerX, this.world.centerY, 90);
                    drone.body.x = newPoint.x;
                    drone.body.y = newPoint.y;
                    //drone.body.angle = obj.body.angle + 90;
                }, this);
                this._sentries.forEach(function (aSentry) {
                    //console.log('oldpoint: ' + aSentry.body.x + ',' + aSentry.body.y);
                    var newPoint = this.rotate_point(aSentry.body.x, aSentry.body.y, this.world.centerX, this.world.centerY, 90);
                    //console.log('newpoint: ' + newPoint.x + ',' + newPoint.y);
                    aSentry.body.x = newPoint.x;
                    aSentry.body.y = newPoint.y;
                    aSentry.body.angle = aSentry.body.angle + 90;
                    aSentry.updateCannonPosition();
                }, this);
                // this._controlsGroup.cameraOffset.setTo(0, 580);
                joystickY = 570;
            }
            else {
            }
            // Post rotation actions:
            this._objects.forEach(function (obj) {
                obj.startTween();
            }, this);
            this._drones.forEach(function (drone) {
                drone.setUp(this);
            }, this);
            this._allGroup.sendToBack(this._tiles);
            this._allGroup.bringToTop(this._controlsGroup);
            for (var i = 0; i < this._tiles.length; i++) {
                var tileobj = this._tiles.getChildAt(i);
                tileobj.body.removeCollisionGroup([this._shipCollisionGroup, this._lasersCollisionGroup, this._missilesCollisionGroup], false);
            }
            //tileobj = this._tiles.getChildAt(this._currentSubLevel) as Phaser.Sprite;  
            tile5.body.collides([this._missilesCollisionGroup, this._lasersCollisionGroup, this._shipCollisionGroup]);
            this._fireTimer = this.time.create(false);
            this._contactDamageTimer = this.time.create(false);
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, suggestFPS, this);
            //this._shipMotionTween = this.game.add.tween(this._base.body).to({ angle: 0 }, 1, Phaser.Easing.Linear.None, true);
            // this.game.physics.p2.setPostBroadphaseCallback(this.checkOverlap2, this);
            this.game.physics.p2.paused = true;
            this.game.time.events.add(Phaser.Timer.SECOND * 0.1, begin1, this);
            this.game.time.events.add(Phaser.Timer.SECOND * 0.1, begin2, this);
        };
        // -------------------------------------------------------------------------
        Level1.prototype.update = function () {
            // shortcut
            //this._joystick.onUpdate();
            var keyboard = this.game.input.keyboard;
            /*this._missiles.forEach(function (aMissile: Phaser.Sprite) {
                if (aMissile.inWorld == false) {
                    aMissile.kill();
                }
            }, this);*/
            /*this._sentryBullets.forEach(function (aBullet: Phaser.Sprite) {
                if (aBullet.inWorld == false) {
                    aBullet.kill();
                }
            }, this);*/
            /*this._lasers.forEach(function (aLaser: Phaser.Sprite) {
                if (aLaser.inWorld == false) {
                    //console.log('aLaser out of world');
                    aLaser.kill();
                }
            }, this);*/
            //this._cannon.x = this._base.x;
            //this._cannon.y = this._base.y;
            //this._cannon.angle = this._base.angle+90;
            if (this._up.justDown) {
                this.igniteThruster();
            }
            if (this._w.justDown) {
                this.igniteThruster();
            }
            if (this._up.justUp) {
                this.deactivateThruster();
            }
            if (this._w.justUp) {
                this.deactivateThruster();
            }
            // if (this.game.input.activePointer.isDown && this._leftBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressLeft(); }
            // if (this.game.input.activePointer.isDown && this._rightBtn.input.checkPointerOver(this.game.input.activePointer)) { this.pressRight(); }
            // left and right key
            if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.pressLeft();
            }
            else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.pressRight();
            }
            if (keyboard.isDown(Phaser.Keyboard.A)) {
                this.pressLeft();
            }
            else if (keyboard.isDown(Phaser.Keyboard.D)) {
                this.pressRight();
            }
            if (this._down.justDown) {
                this.missileBtnDown();
            }
            if (this._b.justDown) {
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
                if (this.deviceMotionAvailable == true) {
                    if (deviceMo.acceleration != null) {
                        if (deviceMo.accelerationIncludingGravity.y != null) {
                            // (<Phaser.Physics.P2.Body>this._base.body).angularDamping = 0.75;
                            var newAngle = 0;
                            var currentMotion;
                            if (this.game.state.states['MainMenu'].landscapeLayout == true) {
                                currentMotion = deviceMo.accelerationIncludingGravity.y;
                            }
                            else {
                                currentMotion = deviceMo.accelerationIncludingGravity.x;
                            }
                            var invertRotation = false;
                            //if (invertRotation) { return }
                            if (invertRotation) {
                                if (currentMotion < 0) {
                                    currentMotion = Math.abs(currentMotion);
                                }
                                else {
                                    currentMotion = 0 - currentMotion;
                                }
                            }
                            var multiplier = 1;
                            var minMultiplier = 0.75;
                            var maxMultiplier = 1.25;
                            var maxTilt = 3.5;
                            if (currentMotion > 0) {
                                currentMotion = Math.min(currentMotion, maxTilt);
                                multiplier = map_range(currentMotion, 0, maxTilt, minMultiplier, maxMultiplier);
                                newAngle = map_range(currentMotion, 0, maxTilt, 0, 144);
                            }
                            else {
                                maxTilt = 0 - maxTilt;
                                currentMotion = Math.max(currentMotion, maxTilt);
                                multiplier = map_range(currentMotion, maxTilt, 0, maxMultiplier, minMultiplier);
                                newAngle = map_range(currentMotion, maxTilt, 0, -144, 0);
                            }
                            newAngle = newAngle * multiplier;
                            //this._text2.setText(newAngle.toFixed(1));
                            //this._text1.setText(multiplier.toFixed(1));
                            var movementDifference = difference(newAngle, this.motionTracker[0]);
                            if (Math.abs(movementDifference) > this.motionAcceleration) {
                                if (this.motionAcceleration < 8) {
                                    this.motionAcceleration = this.motionAcceleration + 0.1;
                                }
                                if (newAngle > this.motionTracker[0]) {
                                    newAngle = this.motionTracker[0] + this.motionAcceleration;
                                }
                                else {
                                    newAngle = this.motionTracker[0] - this.motionAcceleration;
                                }
                            }
                            else {
                                if (this.motionAcceleration > 4) {
                                    this.motionAcceleration = this.motionAcceleration - 0.1;
                                }
                            }
                            var oldestValue = this.motionTracker.pop();
                            this.motionTracker.unshift(newAngle);
                            /*var smoothedArray = smoothOut(this.motionTracker, 0.05);
                            var smoothedMedian = median(smoothedArray);
                            newAngle = smoothedMedian;*/
                            newAngle = unGlitch(newAngle, this.motionTracker, 100);
                            this._base.body.angle = newAngle;
                        }
                    }
                }
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
            this.game.debug.text(this.game.time.fps.toString() || '--', 2, 14, "#00ff00");
            //  this.game.debug.text(this._joystick.mydebug.toString(), 0, 80);
            // this.game.debug.cameraInfo(this.game.camera, 32, 32);     
            /* this.game.debug.pointer(this.game.input.mousePointer);
             this.game.debug.pointer(this.game.input.pointer1);
             this.game.debug.pointer(this.game.input.pointer2); */
        };
        // -------------------------------------------------------------------------
        Level1.prototype.newEvent = function (n) {
            console.log('ne');
        };
        Level1.prototype.goodbye = function (obj) {
            console.log('kil');
            obj.kill();
        };
        Level1.prototype.checkOverlap2 = function (body1, body2) {
            if ((body1.sprite.name === 'laser' && body2.sprite.name === 'level') || (body2.sprite.name === 'laser' && body1.sprite.name === 'level')) {
                this.dosomething();
                return false;
            }
            return true;
        };
        Level1.prototype.dosomething = function () {
            console.log('ds');
        };
        Level1.prototype.somethingDied = function () {
            this.explodeSnd.play();
        };
        Level1.prototype.puff = function (pos) {
            for (var i = 0; i < 4; i++) {
                var bullet = this._sentryBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(pos.x, pos.y);
                    bullet.lifespan = 2000;
                    //(<Phaser.Physics.P2.Body>bullet.body).angle = 90 * i;
                    if (i == 1) {
                        bullet.body.velocity.x = 330;
                        bullet.body.velocity.y = 330;
                    }
                    else if (i == 2) {
                        bullet.body.velocity.x = -330;
                        bullet.body.velocity.y = 330;
                    }
                    else if (i == 3) {
                        bullet.body.velocity.x = 330;
                        bullet.body.velocity.y = -330;
                    }
                    else if (i == 0) {
                        bullet.body.velocity.x = -330;
                        bullet.body.velocity.y = -330;
                    }
                }
            }
        };
        Level1.prototype.weaponContactHandler = function (body, shape1, shape2, equation) {
            var objectHit = body.sprite;
            var laser;
            var missile;
            var weapon;
            var weaponName = shape2.body.parent.sprite.name;
            if (weaponName == 'laser') {
                laser = shape2.body.parent.sprite;
                weapon = laser;
                laser.madeImpact();
            }
            else if (weaponName == 'missile') {
                missile = shape2.body.parent.sprite;
                weapon = missile;
                missile.madeImpact();
            }
            if (objectHit.name == 'dron') {
                objectHit.explode();
            }
            if (objectHit.name == 'prox') {
                objectHit.explode();
            }
            if (objectHit.name == 'sentry') {
                objectHit.successfulHit(weapon);
            }
            if (objectHit.name == 'antiGravGenerator') {
                objectHit.successfulHit(weapon);
            }
            if (objectHit.name == 'sheildBonus' || objectHit.name == 'octoid' || objectHit.name == 'tripper' || objectHit.name == 'drone' || objectHit.name == 'crystal' || objectHit.name == 'telebase') {
                objectHit.successfulHit(weapon, objectHit.name);
            }
            if (laser) {
                var laserBody = laser.body;
                laserBody.setZeroVelocity();
                laserBody.damping = 1;
                var objName = objectHit.name;
                var truncName = objName.substr(0, 4);
                //laserBody.kinematic = false;
                if (truncName == 'tile') {
                    laser.play("badHit", 30, false, true);
                }
                else {
                    // (<Laser>laser).animations.add("hit", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
                    laser.play("goodHit", 60, false, true);
                }
            }
            else if (missile) {
                var mBody = missile.body;
                mBody.setZeroVelocity();
                mBody.damping = 1;
                missile.animations.play('blowup', 30, false, true);
            }
        };
        Level1.prototype.sentryHitShip = function (aObject1, aObject2) {
            //this._cannonTween = this.game.add.tween(this._cannon).to({ rotation: -Math.PI / 2 }, 200, Phaser.Easing.Power1, true);
            console.log('shipHit!');
            aObject2.sprite.successfulHit();
            //(<Sentry>aObject1.sprite).successfulHit();
        };
        Level1.prototype.missileBtnDown = function () {
            if (this._base.justCrashed == true) {
                return;
            }
            this._missileBtn.play('release');
            var missile = this._missiles.getFirstExists(false);
            if (missile) {
                missile.lifespan = 5000;
                var mBody = missile.body;
                mBody.damping = 0;
                missile.reset(this._base.body.x, this._base.body.y + 15);
                missile.body.data.shapes[0].sensor = false;
                missile.animations.play("anim", 15, true, false);
                mBody.angle = 90;
                //mBody.mass = 50;
                mBody.velocity.x = this._base.body.velocity.x * 0.1;
                mBody.velocity.y = this._base.body.velocity.y + 100;
                this.bombSnd.play();
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
            if (this._base.justCrashed == true) {
                return;
            }
            this._fireBtn.play('release');
            //this._fireBtn.loadTexture('Atlas', 'FireOn');
            var laser = this._lasers.getFirstExists(false);
            if (laser) {
                // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                // this._cannonTip.setTo(this._cannon.width * 2, 0);
                // this._cannonTip.rotate(0, 0, this._cannon.rotation);
                laser.loadTexture('Atlas', 'Bullet0025');
                laser.body.damping = 0;
                laser.reset(this._base.body.x, this._base.body.y);
                laser.body.data.shapes[0].sensor = false;
                laser.lifespan = 1500;
                laser.body.rotation = this._base.body.rotation;
                laser.body.moveForward(600);
                this.laserSnd.play();
            }
        };
        Level1.prototype.fireBtnUp = function () {
            console.log('fireBtnUp');
            this._fireBtn.loadTexture('Atlas', 'FireOff');
            this._fireTimer.stop();
        };
        Level1.prototype.leftBtnDown = function () {
            this.igniteThruster();
        };
        Level1.prototype.leftBtnUp = function () {
            this.deactivateThruster();
        };
        Level1.prototype.rightBtnDown = function () {
            this.fire();
        };
        Level1.prototype.rightBtnUp = function () {
        };
        Level1.prototype.igniteThruster = function () {
            this._thrustBtn.loadTexture("Atlas", "ThrustOn");
            this._base.thrusting = true;
        };
        Level1.prototype.deactivateThruster = function () {
            this._thrustBtn.loadTexture("Atlas", "ThrustOff");
            this._base.thrusting = false;
        };
        Level1.prototype.pressLeft = function () {
            if (this._base.justCrashed == false) {
                this._base.body.rotation -= this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
                // this._base.body.angularVelocity  -= this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 100 * (Math.PI / 4);
                // this._base.body.rotateLeft((this.time.elapsedMS * this.SHIP_ROTATE_SPEED) * 0.5 );
                this._base.rotationChanged(true);
            }
        };
        Level1.prototype.pressRight = function () {
            if (this._base.justCrashed == false) {
                this._base.body.rotation += this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 1000 * (Math.PI / 4);
                //  this._base.body.angularVelocity += this.time.elapsedMS * this.SHIP_ROTATE_SPEED / 100 * (Math.PI / 4);
                //  this._base.body.rotateRight((this.time.elapsedMS * this.SHIP_ROTATE_SPEED) * 0.5 );
                this._base.rotationChanged(false);
            }
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
            console.log('camera moving ' + direction + ' from: ' + cameraX + ',' + cameraY);
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
            var maxRight = this.game.camera.width;
            var maxTop = 0 - (this.game.camera.height + (this.game.camera.height * 0.5));
            var maxBottom = (0 - (this.game.camera.height * 0.5)) + this.game.camera.height;
            //console.log('max ' + maxLeft + ',' + maxTop + ',' + maxRight + ',' + maxBottom);
            if (cameraX < maxLeft) {
                cameraStaysWithinWorld = false;
                console.log('camError1');
            }
            ;
            if (cameraX > maxRight) {
                cameraStaysWithinWorld = false;
                console.log('camError2');
            }
            ;
            if (cameraY < maxTop) {
                cameraStaysWithinWorld = false;
                console.log('camError3');
            }
            ;
            if (cameraY > maxBottom) {
                cameraStaysWithinWorld = false;
                console.log('camError4');
            }
            ;
            if (cameraStaysWithinWorld) {
                var tileToUnhide = this._tiles.getByName('tile' + this._newSubLevel);
                console.log('cam TileToUnhide ' + this._newSubLevel);
                tileToUnhide.visible = true;
                // Clear all tiles from their collision group? Add required one post tween? 
                for (var i = 0; i < this._tiles.length; i++) {
                    var tileobj = this._tiles.getChildAt(i);
                    tileobj.body.removeCollisionGroup([this._shipCollisionGroup, this._lasersCollisionGroup, this._missilesCollisionGroup], false);
                }
                this._transitionTween = this.game.add.tween(this.game.camera).to({ y: cameraY, x: cameraX }, 250, Phaser.Easing.Linear.None, true);
                this._transitionTween.onComplete.add(this.transitionComplete, this);
            }
            else {
                console.log('camera error? ' + this.game.world.getBounds() + ', camX ' + cameraX + ', camY ' + cameraY);
                //this.game.state.start('LevelComplete', true, false);
                //this.game.state.states['Level1'].gameOver();
                this.game.state.start('LevelFailed', true, false);
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
            console.log('_currentSubLevel tile' + this._currentSubLevel + ' was sleepState ' + tileToHide.body.data.sleepState);
            tileToHide.visible = false;
            tileToHide.body.data.sleep();
            console.log('_currentSubLevel tile' + this._currentSubLevel + ' now sleepState ' + tileToHide.body.data.sleepState);
            var newTile = this._tiles.getByName('tile' + this._newSubLevel);
            console.log('_newSubLevel tile' + this._newSubLevel + ' was sleepState ' + tileToHide.body.data.sleepState);
            newTile.body.data.wakeUp();
            console.log('_newSubLevel tile' + this._newSubLevel + ' now sleepState ' + tileToHide.body.data.sleepState);
            newTile.body.collides([this._missilesCollisionGroup, this._lasersCollisionGroup, this._shipCollisionGroup]);
            this._currentSubLevel = this._newSubLevel;
            this.game.physics.p2.resume();
            console.log('camera view width: ' + this.camera.width + ', camera view height: ' + this.camera.height + 'this.camera.x: ' + this.camera.x + 'this.camera.y: ' + this.camera.y);
        };
        return Level1;
    }(Phaser.State));
    Dropship.Level1 = Level1;
    var _holdThruster = 3;
    var deviceMo;
    var Laser = (function (_super) {
        __extends(Laser, _super);
        function Laser(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('laser constructor...');
            _super.call(this, game, x, y, 'Atlas', 'Bullet0025');
        }
        /*public zap() {
             this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
             // play first animation as default
             this.play("explosion")
     
         }*/
        Laser.prototype.setUp = function (si) {
            this.stateInstance = si;
        };
        Laser.prototype.madeImpact = function () {
            //this.lifespan = 1;
            this.body.data.shapes[0].sensor = true;
            this.stateInstance.impactSnd.play();
        };
        return Laser;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var Teleporter = (function (_super) {
        __extends(Teleporter, _super);
        function Teleporter(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('teleporter constructor...');
            _super.call(this, game, x, y, 'Atlas', 'teleporter0000');
        }
        Teleporter.prototype.setUp = function (si) {
            this.stateInstance = si;
            this.animations.add("spin", Phaser.Animation.generateFrameNames("teleporter", 0, 9, "", 4), 30, true);
            //this.generator.animations.add("active", ["Bolt0000", "Bolt0001", "Bolt0002", "Bolt0003", "Bolt0004", "Bolt0005"], 30, true);
            //this.animations.add("blowup", Phaser.Animation.generateFrameNames("AntiGrav", 12, 32, "", 4));
            this.play("spin");
        };
        return Teleporter;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var Missile = (function (_super) {
        __extends(Missile, _super);
        function Missile(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('misile constructor...');
            _super.call(this, game, x, y, 'Atlas', 'Bomb0000');
        }
        /*public zap() {
             this.animations.add("explosion", Phaser.Animation.generateFrameNames("explosion", 1, 6, "", 3));
             // play first animproxation as default
             this.play("explosion")
     
         }*/
        Missile.prototype.setUp = function (si) {
            this.stateInstance = si;
        };
        Missile.prototype.madeImpact = function () {
            //this.lifespan = 1;
            this.body.data.shapes[0].sensor = true;
            this.stateInstance.impact2Snd.play();
        };
        return Missile;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var AntiGrav = (function (_super) {
        __extends(AntiGrav, _super);
        function AntiGrav(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('AntiGrav constructor...');
            _super.call(this, game, x, y, 'Atlas', 'AntiGrav0000');
            this.autoCull = true;
            this.anchor.setTo(0.5, 0.5);
        }
        AntiGrav.prototype.setup = function (upward, si) {
            this.stateInstance = si;
            var yOffset = -80;
            if (upward) {
                yOffset = 210;
            }
            //this.generator = this.game.add.sprite(this.x + 98, this.y + yOffset, 'Atlas', 'dron1');  
            this.generator = new AntiGravGenerator(this.game, this.x + 100, this.y + yOffset, 'Atlas', 'Bolt0000');
            this.game.add.existing(this.generator);
            this.generator.alpha = 1;
            this.generator.antiGrav = this;
            this.generator.name = 'antiGravGenerator';
            this.game.physics.p2.enable(this.generator, false);
            this.tractorBeam = new Phaser.Image(this.game, this.x + 100, this.y + yOffset, 'Atlas', 'AntiGravArea');
            this.generator.setup(this.game, this.tractorBeam);
            this.tractorBeam.anchor.setTo(0.5, 0.0);
            if (upward) {
                this.tractorBeam.angle = 180;
            }
            this.game.add.existing(this.tractorBeam);
            this.animations.add("spin", Phaser.Animation.generateFrameNames("AntiGrav", 0, 11, "", 4), 30, true);
            this.generator.animations.add("active", ["Bolt0000", "Bolt0001", "Bolt0002", "Bolt0003", "Bolt0004", "Bolt0005"], 30, true);
            this.animations.add("blowup", Phaser.Animation.generateFrameNames("AntiGrav", 12, 32, "", 4));
            this.play("spin");
            this.generator.play("active");
            this.body.debug = false;
        };
        return AntiGrav;
    }(Phaser.Sprite));
    var AntiGravGenerator = (function (_super) {
        __extends(AntiGravGenerator, _super);
        function AntiGravGenerator() {
            _super.apply(this, arguments);
        }
        AntiGravGenerator.prototype.setup = function (game, tb) {
            this.tractorBeam = tb;
        };
        AntiGravGenerator.prototype.successfulHit = function (weapon) {
            if (this.inCamera) {
                this.antiGrav.stateInstance.somethingDied();
                //  this.antiGrav.destroy(true);
                this.tractorBeam.destroy();
                this.destroy(true);
                this.antiGrav.play("blowup", 30, false, false);
                this.antiGrav.body.clearShapes();
                this.base.normalGravity();
            }
        };
        return AntiGravGenerator;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------   
    var Item = (function (_super) {
        __extends(Item, _super);
        function Item(game, x, y, str1, str2) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('Item constructor...');
            _super.call(this, game, x, y, str1, str2);
            //this.autoCull = true;
            //this.anchor.setTo(0.5, 0.5);
        }
        /*update() {

            if (this.inCamera) {
                if (this.name == 'tripper') {
                    (<Phaser.Physics.P2.Body>this.body).moveForward(10);
                }
            }
        }*/
        Item.prototype.setup = function (si) {
            this.stateInstance = si;
            this.damageTaken = 0;
            console.log('! ' + this.name);
            if (this.name == 'sheildBonus') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("Sheild", 0, 19, "", 4), 30, true);
            }
            if (this.name == 'tripper') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("Tripper", 0, 19, "", 4), 30, true);
            }
            if (this.name == 'octoid') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("Octoid", 0, 3, "", 4), this.game.rnd.between(3, 8), true);
            }
            if (this.name == 'drone') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("Drone", 0, 5, "", 4), 30, true);
            }
            if (this.name == 'hexoid') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("hexoid", 0, 3, "", 4), this.game.rnd.between(3, 8), true);
                this.animations.add("dissolve", Phaser.Animation.generateFrameNames("hexoid", 4, 10, "", 4), 30, false);
            }
            if (this.name == 'crystal') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("Crystal", 0, 9, "", 4), 30, true);
                this.animations.add("blowup", Phaser.Animation.generateFrameNames("Crystal", 10, 20, "", 4), 30, false);
            }
            if (this.name == 'telebase') {
                this.animations.add("main", Phaser.Animation.generateFrameNames("telebase", 0, 19, "", 4), 30, true);
            }
            this.animations.play('main');
        };
        Item.prototype.startTween = function () {
            if (this.name == 'drone') {
                this.body.angle = -2;
                var flightTime = this.game.rnd.between(3500, 4500);
                var flightDelay = this.game.rnd.between(450, 550);
                var turbulence = this.game.rnd.between(1000, 2000);
                this.game.add.tween(this.body).to({ y: this.body.y + 150 }, flightTime, Phaser.Easing.Elastic.Out, true, flightDelay, -1, true);
                this.game.add.tween(this.body).to({ angle: this.body.angle + 4 }, turbulence, Phaser.Easing.Bounce.In, true, 250, -1, true);
            }
        };
        Item.prototype.successfulHit = function (object, nameType) {
            console.log('successfulHit: ' + object.name);
            if (object.name == 'missile') {
                this.damageTaken = this.damageTaken + 4;
            }
            if (object.name == 'laser') {
                this.damageTaken = this.damageTaken + 1;
            }
            if (this.damageTaken > 0) {
                this.stateInstance.somethingDied();
                if (this.name == 'sheildBonus') {
                    this.stateInstance._base.newSheild();
                }
                if (this.name == 'octoid') {
                    this.kill();
                }
                if (this.name == 'drone') {
                    this.kill();
                }
                if (this.name == 'telebase') {
                    this.kill();
                    var moreTelebasesAlive = false;
                    for (var i = 0; i < this.stateInstance._objects.length; i++) {
                        var obj = this.stateInstance._objects.getChildAt(i);
                        if (obj.name == 'telebase') {
                            if (obj.damageTaken == 0) {
                                moreTelebasesAlive = true;
                            }
                        }
                    }
                    if (moreTelebasesAlive == false) {
                        this.stateInstance._teleporters.add(this.stateInstance.teleporter);
                        this.stateInstance.teleporter.body.collides([this.stateInstance._shipCollisionGroup]);
                        this.stateInstance._base.body.collides([this.stateInstance._teleporterCollisionGroup]);
                    }
                    else {
                        console.log('kill mmore telebasi');
                    }
                }
                if (this.name == 'crystal') {
                    console.log('crystal kill');
                    this.animations.play("blowup", 30, false, true);
                    for (var i = 0; i < this.stateInstance._objects.length; i++) {
                        var obj = this.stateInstance._objects.getChildAt(i);
                        if (obj.name == 'hexoid') {
                            var hexTween = this.game.add.tween(obj);
                            hexTween.to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, false, this.game.rnd.between(100, 350));
                            hexTween.onComplete.add(hexKill, obj);
                            function hexKill() {
                                this.animations.play("dissolve", 30, false, true);
                            }
                            ;
                            hexTween.start();
                        }
                    }
                }
                if (this.name == 'tripper') {
                    this.stateInstance.puff(this.position);
                    this.kill();
                }
            }
        };
        return Item;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var Dron = (function (_super) {
        __extends(Dron, _super);
        function Dron(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('Dron constructor...');
            _super.call(this, game, x, y, 'Atlas', 'Mine0025');
            this.autoCull = true;
            this.anchor.setTo(0.5, 0.5);
        }
        // -------------------------------------------------------------------------
        Dron.prototype.setUp = function (si) {
            this.anchor.setTo(0.5, 0.5);
            this.autoCull = true;
            // random position
            //this.reset(xStart, yStart);
            this.stateInstance = si;
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
            xTween.to({ x: this.body.x + range }, duration, function (aProgress) {
                return wiggle(aProgress, xPeriod1, xPeriod2);
            }, true, 0, -1);
            var yTween = this.game.add.tween(this.body);
            yTween.to({ y: this.body.y + range }, duration, function (aProgress) {
                return wiggle(aProgress, yPeriod1, yPeriod2);
            }, true, 0, -1);
            // define animations
            this.animations.add("anim", Phaser.Animation.generateFrameNames("Mine", 25, 40, "", 4));
            this.animations.add("kapow", Phaser.Animation.generateFrameNames("MineExp", 25, 40, "", 4));
            // play first animation as default
            this.play("anim", 30, true);
            // this.inputEnabled = true;
            this.name = 'dron';
        };
        // -------------------------------------------------------------------------
        Dron.prototype.explode = function () {
            this.stateInstance.somethingDied();
            // remove movement tweens
            this.game.tweens.removeFrom(this.body);
            // explode dron and kill it on complete
            this.play("kapow", 30, false, true);
        };
        return Dron;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var Prox = (function (_super) {
        __extends(Prox, _super);
        function Prox() {
            _super.apply(this, arguments);
        }
        Prox.prototype.setUp = function (si) {
            this.stateInstance = si;
            this.anchor.setTo(0.5, 0.5);
            this.autoCull = true;
            this.awake = false;
            this.name = 'prox';
            this.TURN_RATE = this.game.rnd.between(3, 5);
            this.MAX_SPEED = this.game.rnd.between(60, 90);
            this.INIT_SPEED = this.game.rnd.between(1, 10);
        };
        Prox.prototype.update = function () {
            if (this.inCamera) {
                if (this.awake) {
                    /*if (this.TURN_RATE > 1) {
                        this.TURN_RATE = this.TURN_RATE - 0.5;
                    }*/
                    var targetAngle = Math.atan2(this.stateInstance._base.body.y - this.body.y, this.stateInstance._base.body.x - this.body.x);
                    // Gradually (this.TURN_RATE) aim the missile towards the target angle
                    if (this.rotation !== targetAngle) {
                        // Calculate difference between the current angle and targetAngle
                        var delta = targetAngle - this.body.rotation;
                        // Keep it in range from -180 to 180 to make the most efficient turns.
                        if (delta > Math.PI)
                            delta -= Math.PI * 2;
                        if (delta < -Math.PI)
                            delta += Math.PI * 2;
                        if (delta > 0) {
                            // Turn clockwise
                            this.body.angle += this.TURN_RATE;
                        }
                        else {
                            // Turn counter-clockwise
                            this.body.angle -= this.TURN_RATE;
                        }
                        var degreeToRadiansFactor = Math.PI / 180;
                        var radianToDegreesFactor = 180 / Math.PI;
                        this.TURN_RATE * degreeToRadiansFactor;
                        // Just set angle to target angle if they are close
                        if (Math.abs(delta) < (this.TURN_RATE * degreeToRadiansFactor)) {
                            this.body.rotation = targetAngle;
                        }
                    }
                    // Calculate velocity vector based on this.rotation and this.SPEED
                    if (this.INIT_SPEED < this.MAX_SPEED) {
                        this.INIT_SPEED = this.INIT_SPEED + 1;
                    }
                    this.body.velocity.x = Math.cos(this.body.rotation) * this.INIT_SPEED;
                    this.body.velocity.y = Math.sin(this.body.rotation) * this.INIT_SPEED;
                }
            }
        };
        Prox.prototype.findNewPoint = function (x, y, angle, distance) {
            var result = new Phaser.Point(0, 0);
            result.x = Math.round(Math.cos(angle * Math.PI / 180) * distance + x);
            result.y = Math.round(Math.sin(angle * Math.PI / 180) * distance + y);
            return result;
        };
        Prox.prototype.launch = function (sentry) {
            this.body.collides([this.stateInstance._missilesCollisionGroup, this.stateInstance._lasersCollisionGroup, this.stateInstance._shipCollisionGroup]);
            this.reset(sentry.x, sentry.y);
            this.body.angle = sentry.angle - 90;
            var offsetAngle = this.game.rnd.between(77, 103);
            var range = this.game.rnd.between(45, 55);
            var duration = this.game.rnd.between(900, 1100);
            var newPoint = this.findNewPoint(sentry.x, sentry.y, sentry.body.angle - offsetAngle, range);
            var launchTween = this.game.add.tween(this.body);
            launchTween.to({ x: newPoint.x, y: newPoint.y }, duration, Phaser.Easing.Back.Out, true);
            launchTween.onComplete.add(doSomething, this);
            function doSomething() {
                this.awake = true;
                //var angleTween = this.game.add.tween(this.body);                
                // angleTween.to({ x: this.stateInstance._base.body.x, y: this.stateInstance._base.body.y }, 1000, Phaser.Easing.Back.Out,true  );
            }
            ;
            launchTween.start();
            this.animations.add("anim", ["Prox0000", "Prox0001", "Prox0002", "Prox0003", "Prox0004", "Prox0005", "Prox0006", "Prox0007",
                "Prox0006", "Prox0005", "Prox0004", "Prox0003", "Prox0002", "Prox0001"
            ], 30, true);
            this.stateInstance.proxSnd.play();
            this.animations.add("kapow", Phaser.Animation.generateFrameNames("MineExp", 25, 40, "", 4));
            // play first animation as default
            this.play("anim", 30, true);
        };
        // -------------------------------------------------------------------------
        Prox.prototype.explode = function () {
            this.stateInstance.somethingDied();
            this.awake = false;
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;
            //this.body.data.shapes[0].sensor = true;
            //this.body.clearCollision(false);
            this.body.removeCollisionGroup([this.stateInstance._missilesCollisionGroup, this.stateInstance._lasersCollisionGroup, this.stateInstance._shipCollisionGroup], false);
            // remove movement tweens
            this.game.tweens.removeFrom(this.body);
            // explode dron and kill it on complete
            this.play("kapow", 30, false, true);
        };
        return Prox;
    }(Phaser.Sprite));
    // -------------------------------------------------------------------------
    var Sentry = (function (_super) {
        __extends(Sentry, _super);
        function Sentry(game, x, y, _sentryType) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (_sentryType === void 0) { _sentryType = 0; }
            console.log('sentry constructor...');
            var tex = 'Sentry0020';
            if (_sentryType == 1) {
                tex = 'Sporepod0000';
            }
            _super.call(this, game, x, y, 'Atlas', tex);
            this.anchor.setTo(0.5, 0.5);
            this.autoCull = true;
            //this.cameraOffset.setTo(x, y);
            this.mydebug = '.';
            this.damageTaken = 0;
            this.destroyed = false;
            this.name = 'sentry';
            this.sentryType = _sentryType;
            this.inRange = false;
            this.cannonExtended = false;
        }
        Sentry.prototype.update = function () {
            if (this.inCamera) {
                if (this.sleeping) {
                    if (this.destroyed == false) {
                        if (this.stateInstance._transitionTween.isRunning == false) {
                            var distanceFromShip = Math.sqrt((this.x - this.stateInstance._base.x) * (this.x - this.stateInstance._base.x) + (this.y - this.stateInstance._base.y) * (this.y - this.stateInstance._base.y));
                            if (distanceFromShip < 333) {
                                this.sleeping = false;
                                this.fireTimer = this.game.time.create(false);
                                if (this.sentryType == 0) {
                                    this.fireTimer.loop(2000, this.fire, this);
                                    this.fireTimer.start();
                                    this.baseTop.play("sheildsDown", 30, false);
                                }
                                else {
                                    this.releaseProx();
                                    this.fireTimer.repeat(2000, 4, this.releaseProx, this);
                                    this.fireTimer.start();
                                }
                            }
                        }
                    }
                }
                else {
                    if (this.sentryType == 0) {
                        this.updateCannonAngle();
                    }
                }
            }
        };
        Sentry.prototype.updateCannonAngle = function () {
            var angleRadians = (Math.atan2(this.stateInstance._base.y - this.cannon.y, this.stateInstance._base.x - this.cannon.x));
            var angleDegrees = angleRadians * (180 / Math.PI);
            var normalisedAngleDegrees = this.normalise(angleDegrees);
            // 0 or 360 = 3 o clock
            // 90 = 6 o clock
            // 180 = 9 o clock
            // 270 = 12 o clock
            var calculatedAngle = this.normalise(normalisedAngleDegrees - this.body.angle);
            //console.log('aRad: ' + angleRadians.toFixed(2) + ' aDeg: ' + angleDegrees.toFixed(1) + ' nDeg: ' + normalisedAngleDegrees.toFixed(1) + ' cDeg: ' + calculatedAngle.toFixed(1));
            if (calculatedAngle > 190 && calculatedAngle < 350) {
                this.inRange = true;
            }
            else {
                this.inRange = false;
            }
            if (this.inRange) {
                this.extendCannon();
                this.cannon.rotation = angleRadians;
            }
        };
        Sentry.prototype.extendCannon = function () {
            if (this.cannonExtended == false) {
                this.cannon.play("extend", 10, false);
                this.cannonExtended = true;
            }
        };
        Sentry.prototype.normalise = function (angle) {
            var newAngle = angle;
            while (newAngle <= -0)
                newAngle += 360;
            while (newAngle > 360)
                newAngle -= 360;
            return newAngle;
        };
        Sentry.prototype.blowUp = function () {
            console.log('sentry blow up: ' + this.damageTaken);
            this.destroyed = true;
            if (this.fireTimer) {
                this.fireTimer.stop();
            }
            this.baseTop.play("blowup", 30, false, false);
            this.cannon.destroy();
            this.destroy();
        };
        Sentry.prototype.updateCannonPosition = function () {
            this.cannon.x = this.body.x;
            this.cannon.y = this.body.y;
            this.baseTop.x = this.body.x;
            this.baseTop.y = this.body.y;
            this.baseTop.angle = this.body.angle;
        };
        // -------------------------------------------------------------------------
        Sentry.prototype.setup = function (si) {
            this.bulletSpeed = 6;
            this.cannonTip = new Phaser.Point();
            this.sleeping = true;
            this.stateInstance = si;
            if (this.sentryType == 0) {
                this.cannon = this.game.add.sprite(this.x, this.y, "Atlas", "cannon0000");
                this.cannon.animations.add("extend", Phaser.Animation.generateFrameNames("cannon", 0, 15, "", 4));
                this.cannon.anchor.setTo(0.333, 0.5);
                this.baseTop = this.game.add.sprite(this.x, this.y, "Atlas", "Sentry0000");
            }
            else {
                this.cannon = this.game.add.sprite(this.x, this.y);
                this.baseTop = this.game.add.sprite(this.x, this.y, "Atlas", "Sporepod0000");
            }
            this.baseTop.anchor.setTo(0.5, 0.5);
            this.baseTop.angle = this.body.angle;
            this.baseTop.animations.add("sheildsDown", Phaser.Animation.generateFrameNames("Sentry", 0, 20, "", 4));
            this.baseTop.animations.add("blowup", Phaser.Animation.generateFrameNames("Sentry", 51, 71, "", 4));
            if (this.sentryType == 0) {
                this.baseTop.animations.add("lightsOn", Phaser.Animation.generateFrameNames("Sentry", 20, 40, "", 4));
            }
            else {
                this.baseTop.animations.add("pulsate", ["Sporepod0000", "Sporepod0001", "Sporepod0002", "Sporepod0003", "Sporepod0004", "Sporepod0005", "Sporepod0006", "Sporepod0007", "Sporepod0008", "Sporepod0009", "Sporepod0009",
                    "Sporepod0008", "Sporepod0009", "Sporepod0008", "Sporepod0007", "Sporepod0006", "Sporepod0005", "Sporepod0004", "Sporepod0003", "Sporepod0002", "Sporepod0001", "Sporepod0000"], 30, true);
                this.baseTop.play("pulsate", 30, true);
            }
            // this.animations.add("anim", ["dron1", "dron2"], this.game.rnd.between(2, 5), true);
            // this.x = pos[0];
            // this.y = pos[1];z
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
                this.stateInstance.somethingDied();
                this.blowUp();
            }
        };
        Sentry.prototype.releaseProx = function () {
            console.log('release prox');
            var prox = this.stateInstance._proxMines.getFirstExists(false);
            prox.launch(this);
        };
        Sentry.prototype.fire = function () {
            if (this.inCamera && this.inRange && this.cannon.animations.getAnimation('extend').isFinished) {
                this.baseTop.play("lightsOn", 30, true);
                // get firtst missile from pool
                var bullet = this.stateInstance._sentryBullets.getFirstExists(false);
                if (bullet) {
                    this.stateInstance.laser2Snd.play();
                    // calculate position of cannon tip. Put distance from cannon base along x axis and rotate it to cannon angle
                    this.cannonTip.setTo(this.cannon.width * 2, 0);
                    this.cannonTip.rotate(0, 0, this.cannon.rotation);
                    bullet.reset(this.cannon.x, this.cannon.y);
                    //console.log('bullet x:' + this.x + ', y:' + this.y + ', ship x:' + this.base.x + ', y:' + this.base.y );
                    bullet.body.rotation = this.cannon.rotation;
                    // life of missile in millis
                    bullet.lifespan = 2000;
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
    function begin1() {
        console.log('begin1');
        this.game.world.visible = true;
    }
    function begin2() {
        console.log('begin2');
        this.game.physics.p2.paused = false;
    }
    function suggestFPS() {
        this.game.time.suggestedFps = 60;
        console.log('suggestFPS');
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
    function map_range(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    }
    function logslider(position, minp, maxp, _minv, _maxv) {
        var minv = Math.log(_minv);
        var maxv = Math.log(_maxv);
        // calculate adjustment factor
        var scale = (maxv - minv) / (maxp - minp);
        return Math.exp(minv + scale * (position - minp));
    }
    function avg(v) {
        return v.reduce(function (a, b) { return a + b; }, 0) / v.length;
    }
    function smoothOut(vector, variance) {
        var t_avg = avg(vector) * variance;
        var ret = Array(vector.length);
        for (var i = 0; i < vector.length; i++) {
            (function () {
                var prev = i > 0 ? ret[i - 1] : vector[i];
                var next = i < vector.length ? vector[i] : vector[i - 1];
                ret[i] = avg([t_avg, prev, vector[i], next]);
            })();
        }
        return ret;
    }
    function display(x, y) {
        console.clear();
        console.assert(x.length === y.length);
        x.forEach(function (el, i) { return console.log(el + "\t\t" + y[i]); });
    }
    function unGlitch(thisValue, list, someThreshold) {
        var averageOfLast10Values = 0;
        for (var i = 0; i < list.length; i++) {
            averageOfLast10Values = averageOfLast10Values + list[i];
        }
        averageOfLast10Values = averageOfLast10Values / list.length;
        /*if (Math.abs(thisValue - averageOfLast10Values) > someThreshold) {
            thisValue = averageOfLast10Values;
        }*/
        return averageOfLast10Values;
        //return thisValue;
    }
    function median(values) {
        values.sort(function (a, b) { return a - b; });
        var half = Math.floor(values.length / 2);
        if (values.length % 2)
            return values[half];
        else
            return (values[half - 1] + values[half]) / 2.0;
    }
    // ------------------------------------------------------------------------
    function difference(a, b) { return Math.abs(a - b); }
    // -------------------------------------------------------------------------
    function onDeviceMotion(event) {
        deviceMo = event;
    }
    // -------------------------------------------------------------------------
    window.onload = function () {
        window.addEventListener("devicemotion", onDeviceMotion, false);
        new Dropship.Game();
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
            _super.call(this, game, x, y, 'Atlas', 'Ship0000');
            this.contactDamage = false;
            this.contactDamageCount = 0;
            this.thrusting = false;
            this.thrustPower = 500;
            this.justCrashed = false;
            this.justCoasted = false;
            this.drainSheild = false;
            this.survivableDamage;
            this.sheildAmount;
        }
        Ship.prototype.update = function () {
            if (this.drainSheild == true) {
                if (this.sheildAmount > 0) {
                    this.sheildAmount = this.sheildAmount - 1;
                }
                else {
                    this.drainSheild = false;
                }
            }
            if (this.contactDamage == true) {
                this.contactDamageCount++;
                if (this.contactDamageCount > 5) {
                    //console.log('Prolonged contact destroy');
                    this.crashed();
                }
            }
            if (this.justCrashed == false) {
                if (this.thrusting) {
                    this.body.thrust(this.thrustPower);
                    //this.animations.play('trusting', 30, true, false);
                    this.jets.animations.play('trusting', 30, true, false);
                    if (this.stateInstance.thrustSnd.isPlaying == false) {
                        this.stateInstance.thrustSnd.play();
                    }
                    this.justCoasted = false;
                }
                else {
                    if (this.justCoasted == false) {
                        this.jets.animations.play('coasting', 15, false, false);
                        this.stateInstance.thrustSnd.stop();
                        this.justCoasted = true;
                    }
                }
            }
        };
        Ship.prototype.teleport = function (t) {
            this.game.state.start('LevelComplete', true, false);
        };
        Ship.prototype.rotationChanged = function (negative) {
            if (negative == true) {
            }
            else if (negative == false) {
            }
        };
        Ship.prototype.successfulHit = function () {
            console.log('ship base hit...');
            //this.game.state.restart();
        };
        Ship.prototype.newSheild = function () {
            if (this.justCrashed == false) {
                this.animations.play('sheild', 30, false);
                this.sheildAmount = 50;
            }
        };
        Ship.prototype.setup = function (si) {
            this.stateInstance = si;
            this.game.add.existing(this);
            //this.animations.add("trusting", Phaser.Animation.generateFrameNames("Ship", 20, 40, "", 4));
            this.survivableDamage = 2;
            this.sheildAmount = 0;
            this.animations.add("explode", Phaser.Animation.generateFrameNames("Ship", 91, 120, "", 4));
            // this.animations.add("damage", Phaser.Animation.generateFrameNames("Ship", 0, 1, "", 4));
            this.animations.add("damage", ["Ship0004", "Ship0005", "Ship0004", "Ship0003", "Ship0002", "Ship0001"], 30, false);
            this.animations.add("sheild", Phaser.Animation.generateFrameNames("Ship", 6, 12, "", 4));
            this.jets = new Phaser.Sprite(this.game, this.x, this.y + 22, "Atlas", "jets0070");
            this.addChild(this.jets);
            this.jets.anchor.setTo(0.5, 0.0);
            this.jets.smoothed = true;
            //this.jets.angle = this.body.angle;
            this.jets.animations.add("trusting", Phaser.Animation.generateFrameNames("jets", 20, 40, "", 4));
            this.jets.animations.add("coasting", Phaser.Animation.generateFrameNames("jets", 60, 70, "", 4));
            // play first animation as default
            // this.animations.add("anim", Phaser.Animation.generateFrameNames("Mine", 25, 40, "", 4));
            // this.animations.add("kapow", Phaser.Animation.generateFrameNames("MineExp", 25, 40, "", 4));
            // play first animation as default
            //this.play("anim", 30, true);
            this.body.angularDamping = 1;
        };
        Ship.prototype.normalGravity = function () {
            this.body.mass = 1.0;
            this.body.data.gravityScale = 1.0;
            this.body.damping = 0.2;
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
            this.stateInstance.somethingDied();
            this.justCrashed = true;
            this.stateInstance.thrustSnd.stop();
            this.play("explode", 30, false);
            this.jets.animations.play('coasting', 15, false, false);
            //this.game.physics.p2.pause();
            this.game.physics.p2.removeBody(this.body);
            this.alpha = 0.5;
            var mytimer = this.game.time.events.add(Phaser.Timer.SECOND * 2, this.gameOver, this);
        };
        Ship.prototype.endContactHandler = function (body, shape1, shape2, equation) {
            if (body) {
                if (body.sprite != null) {
                    var objName = body.sprite.name;
                    var truncName = objName.substr(0, 4);
                    if (truncName == 'tile') {
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
            console.log(body.sprite.name);
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
            if (body.sprite.name == 'teleporter') {
                base.teleport(body.sprite);
                return;
            }
            if (base.stateInstance.shipDamage == true) {
                var objName = body.sprite.name;
                var truncName = objName.substr(0, 4);
                if (truncName == 'tile') {
                    // damage ship on prolonged contact...
                    // this.contactDamage = true;
                    base.contactDamage = true;
                }
                var otherObject = shape1.velocity;
                var crashDamage = Math.abs(v1) + Math.abs(v2);
                var otherDamage = Math.abs(otherObject[0]) + Math.abs(otherObject[1]);
                var totalDamage = crashDamage + otherDamage;
                console.log('crash ' + crashDamage + ', projectile ' + otherDamage + ', total ' + totalDamage);
                console.log('sheildAmount ' + base.sheildAmount);
                if (totalDamage > (base.survivableDamage + base.sheildAmount)) {
                    console.log('CRASH');
                    //Invicible from short collisions:
                    base.crashed();
                }
                else {
                    base.play("damage", 30, false);
                    base.drainSheild = true;
                }
            }
        };
        Ship.prototype.gameOver = function () {
            //this.game.state.start(game.state.current);
            //this.game.state.restart();
            //this.game.state.states['MainMenu'].level++;
            this.game.state.start('LevelFailed', true, false);
        };
        return Ship;
    }(Phaser.Sprite));
    var Joystick = (function (_super) {
        __extends(Joystick, _super);
        function Joystick(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('joystick construcy...');
            _super.call(this, game, x, y, 'Atlas', 'joystick0001');
            // super(game, x, y);
            //this.anchor.setTo(0.0, 0.0);
            //this.fixedToCamera = true;
            //this.cameraOffset.setTo(x, y);
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
                if (this.stateInstance._base.justCrashed == false) {
                    var deltaX = (this.myPointer.x - this.myPointer.positionDown.x);
                    if (this.previousDelta == null) {
                        this.previousDelta = deltaX;
                    }
                    //console.log('deltaX: ' + deltaX + ' ,pID: ' + pointer.id);
                    this.mydebug = '4deltaX: ' + deltaX + ' ,pID: ' + this.myPointer.id;
                    var mrNum = Math.abs(deltaX);
                    if (deltaX < this.previousDelta) {
                        this.stateInstance._base.body.angle = this.stateInstance._base.body.angle - 5; // -= mrNum * 2 / 1000 * (Math.PI / 4);
                        this.stateInstance._base.rotationChanged(true);
                        if (this.myPointer.x < 160) {
                            this.visual.loadTexture('Atlas', 'joystick0000');
                        }
                        else {
                        }
                    }
                    else if (deltaX > this.previousDelta) {
                        this.stateInstance._base.body.angle = this.stateInstance._base.body.angle + 5;
                        this.stateInstance._base.rotationChanged(false);
                        if (this.myPointer.x > 160) {
                            this.visual.loadTexture('Atlas', 'joystick0002');
                        }
                        else {
                        }
                    }
                    console.log(this.myPointer.x);
                    if (this.myPointer.x > 150 && this.myPointer.x < 170) {
                        this.visual.loadTexture('Atlas', 'joystick0001');
                    }
                    this.previousDelta = deltaX;
                }
            }
        };
        Joystick.prototype.setup = function (si) {
            this.stateInstance = si;
            this.visual = this.stateInstance.joystickViz;
            this.game.add.existing(this);
            this.alpha = 0.5;
            this.height = this.game.height;
            this.inputEnabled = true;
            this.renderable = false;
            this.events.onInputDown.add(onDown2, this);
            this.events.onInputUp.add(onUp, this);
            function onDown2(sprite, pointer) {
                sprite.isBeingDragged = true;
                sprite.myPointer = pointer;
                if (pointer.x < 160) {
                    sprite.visual.loadTexture('Atlas', 'joystick0000');
                }
                else {
                    sprite.visual.loadTexture('Atlas', 'joystick0002');
                }
            }
            function onUp(sprite, pointer) {
                // console.log('onup: was' + pointer.positionDown + ', now ' + pointer.positionUp);
                sprite.visual.loadTexture('Atlas', 'joystick0001');
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
    var JoystickViz = (function (_super) {
        __extends(JoystickViz, _super);
        function JoystickViz(game, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            console.log('laser constructor...');
            _super.call(this, game, x, y, 'Atlas', 'joystick0001');
        }
        JoystickViz.prototype.setUp = function (si) {
            this.stateInstance = si;
            //this.y = this.game.height - 70;
            this.game.add.existing(this);
            this.fixedToCamera = true;
        };
        return JoystickViz;
    }(Phaser.Sprite));
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Level1.js.map