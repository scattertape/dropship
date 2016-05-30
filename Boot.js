var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
            console.log('boot');
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 4;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            //this.stage.disableVisibilityChange = true;
            if (this.game.device.desktop) {
            }
            else {
            }
            this.game.input.addPointer();
            this.game.input.addPointer();
            this.game.input.addPointer();
            this.game.input.addPointer();
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.windowConstraints.bottom = "visual";
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.setMinMax(this.game.width / 2, this.game.height / 2, this.game.width, this.game.height);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    }(Phaser.State));
    Dropship.Boot = Boot;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Boot.js.map