var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
            this.deviceMoArray = [];
        }
        MainMenu.prototype.create = function () {
            window.addEventListener("devicemotion", this.onDeviceMotionTest, false);
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            this.logo = this.add.sprite(this.game.width * 0.5, this.game.height - 300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 200, Phaser.Easing.Elastic.Out, true, 200);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.onDeviceMotionTest = function (event) {
            console.log('onDeviceMotionTest');
            if (event.acceleration != null) {
                if (event.accelerationIncludingGravity.y != null) {
                    this.deviceMoArray.push(event.accelerationIncludingGravity.y);
                }
            }
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 150, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            window.removeEventListener("devicemotion", this.onDeviceMotionTest);
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Dropship.MainMenu = MainMenu;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=MainMenu.js.map