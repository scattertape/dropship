var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var screenWidth = window.innerWidth; //screen.width;
var screenHeight = window.innerHeight; //screen.height;
var landscapeLayout = true;
var constructorWidth = 960;
var constructorHeight = 640;
if (screenHeight > screenWidth) {
    landscapeLayout = false;
}
// landscapeLayout = false;
if (landscapeLayout == false) {
    constructorWidth = 640;
    constructorHeight = 960;
}
console.log('landscapeLayout: ' + landscapeLayout);
var Dropship;
(function (Dropship) {
    var Game = (function (_super) {
        __extends(Game, _super);
        // -------------------------------------------------------------------------
        function Game() {
            // init game
            _super.call(this, constructorWidth, constructorHeight, Phaser.CANVAS, "");
            this.state.add('Boot', Dropship.Boot, false);
            this.state.add('Preloader', Dropship.Preloader, false);
            this.state.add('MainMenu', Dropship.MainMenu, false);
            this.state.add('Options', Dropship.Options, false);
            this.state.add('Instructions', Dropship.Instructions, false);
            this.state.add('LevelComplete', Dropship.LevelComplete, false);
            this.state.add('LevelFailed', Dropship.LevelFailed, false);
            this.state.add('Level1', Dropship.Level1, false);
            this.state.start('Boot');
        }
        return Game;
    }(Phaser.Game));
    Dropship.Game = Game;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=app.js.map