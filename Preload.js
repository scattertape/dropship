var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            this.preloadBar = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'preloadBar');
            this.preloadBar.x = this.preloadBar.x - (this.preloadBar.width * 0.5);
            this.load.setPreloadSprite(this.preloadBar);
            //  Load our actual games assets
            this.load.image('titlepage', 'assets/titlepage.jpg');
            this.load.image('logo', 'assets/logo.png');
            this.load.spritesheet('button', 'assets/button.png', 244, 62);
            this.load.image('complete', 'assets/complete.png');
            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.load.image("BG", "assets/bg.png");
            this.game.load.atlas("Atlas", "assets/atlas.png", "assets/atlas.json");
            this.game.load.image("control_keyboard", "assets/control_keyboard.png");
            this.game.load.physics('physicsDataLevel0', 'assets/level0.json');
            this.game.load.image('level0-5', 'assets/level0_05.jpg');
            this.game.load.image('level0-1', 'assets/level1_01.jpg');
            this.game.load.image('level0-2', 'assets/level1_02.jpg');
            this.game.load.image('level0-3', 'assets/level1_03.jpg');
            this.game.load.image('level0-4', 'assets/level1_04.jpg');
            this.game.load.image('level0-6', 'assets/level1_06.jpg');
            this.game.load.image('level0-7', 'assets/level1_07.jpg');
            this.game.load.image('level0-8', 'assets/level1_08.jpg');
            this.game.load.image('level0-9', 'assets/level1_09.jpg');
            this.game.load.physics('physicsDataLevel1', 'assets/level1.json');
            this.game.load.image('level1-1', 'assets/level1_01.jpg');
            this.game.load.image('level1-2', 'assets/level1_02.jpg');
            this.game.load.image('level1-3', 'assets/level1_03.jpg');
            this.game.load.image('level1-4', 'assets/level1_04.jpg');
            this.game.load.image('level1-5', 'assets/level1_05.jpg');
            this.game.load.image('level1-6', 'assets/level1_06.jpg');
            this.game.load.image('level1-7', 'assets/level1_07.jpg');
            this.game.load.image('level1-8', 'assets/level1_08.jpg');
            this.game.load.image('level1-9', 'assets/level1_09.jpg');
            this.game.load.audio('laser', 'assets/laser.mp3');
            this.game.load.audio('prox', 'assets/prox.mp3');
            this.game.load.audio('bomb', 'assets/bomb.mp3');
            this.game.load.audio('explode', 'assets/explode.mp3');
            this.game.load.audio('laser2', 'assets/laser2.mp3');
            this.game.load.audio('thrust', 'assets/thrust.mp3');
            this.game.load.audio('impact', 'assets/impact.mp3');
            this.game.load.audio('impact2', 'assets/impact2.mp3');
        };
        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };
        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    }(Phaser.State));
    Dropship.Preloader = Preloader;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Preload.js.map