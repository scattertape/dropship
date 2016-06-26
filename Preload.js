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
            // this.load.image('level1', 'assets/level1.png');
            this.game.time.advancedTiming = true;
            this.game.time.desiredFps = 60;
            this.game.load.image("BG", "assets/bg.png");
            // this.game.load.atlas("Atlas", "assets/atlas.png", "assets/atlas.json");
            this.game.load.atlas("Atlas", "assets/atlas2.png", "assets/atlas2.json");
            this.game.load.image('imageKey', 'assets/pink.png');
            //this.game.load.physics('physicsData', 'assets/level2.json');
            this.game.load.physics('levelData', 'assets/level3.json');
            this.game.load.image('level1-1', 'assets/level1-1.png');
            this.game.load.image('level1-2', 'assets/level1-2.png');
            this.game.load.image('level1-3', 'assets/level1-3.png');
            this.game.load.image('level1-4', 'assets/level1-4.png');
            this.game.load.image('level1-5', 'assets/level1-5.png');
            this.game.load.image('level1-6', 'assets/level1-6.png');
            this.game.load.image('level1-7', 'assets/level1-7.png');
            this.game.load.image('level1-8', 'assets/level1-8.png');
            this.game.load.image('level1-9', 'assets/level1-9.png');
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