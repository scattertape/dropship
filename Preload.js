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
            this.load.image('instruction01', 'assets/instruction01.png');
            this.load.image('complete', 'assets/complete.png');
            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.load.image("BG", "assets/bg.png");
            this.game.load.atlas("Atlas", "assets/atlas2.png", "assets/atlas2.json");
            this.game.load.physics('levelData', 'assets/level3.json');
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