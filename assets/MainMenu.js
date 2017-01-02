var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var moArray = [];
    window.addEventListener("devicemotion", onDeviceMotionTest, false);
    function onDeviceMotionTest(event) {
        if (event.acceleration != null) {
            if (event.accelerationIncludingGravity.y != null) {
                moArray.push(event.accelerationIncludingGravity.y);
            }
        }
    }
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
            this.level = 1;
            this.deviceMoArray = 0;
            this.landscapeLayout = false;
        }
        MainMenu.prototype.create = function () {
            if (this.game.width > this.game.height) {
                this.landscapeLayout = true;
            }
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            this.logo = this.add.sprite(this.game.width * 0.5, this.game.height - 300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.instruction = this.add.sprite(this.game.width * 0.5, this.game.height - 200, 'instruction01');
            this.instruction.anchor.setTo(0.5, 0.5);
            this.instruction.alpha = 0.5;
            this.add.tween(this.background).to({ alpha: 1 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220, alpha: 1 }, 250, Phaser.Easing.Elastic.Out, true, 200);
            this.add.tween(this.instruction).to({ y: 280, alpha: 1 }, 300, Phaser.Easing.Elastic.Out, true, 200);
            var style1 = { font: "15px Arial", fill: "#00cc00", align: 'center' };
            this.text1 = this.game.add.text(this.game.width * 0.5, this.game.height * 0.75, String(''), style1);
            var orientationStr1 = 'landscape';
            if (this.landscapeLayout == false) {
                orientationStr1 = 'portrait';
            }
            var orientationStr2 = 'Starting game in ' + orientationStr1 + ' mode.';
            if (moArray.length > 0) {
                this.text1.setText('Accelerometer controls activated.' + '\n' + orientationStr2);
            }
            else {
                this.text1.setText('Keyboard controls activated.' + '\n' + orientationStr2);
            }
            this.text1.anchor.setTo(0.5, 0.5);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            this.add.tween(this.instruction).to({ y: 850 }, 150, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 150, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            window.removeEventListener("devicemotion", onDeviceMotionTest);
            this.deviceMoArray = moArray.length;
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Dropship.MainMenu = MainMenu;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=MainMenu.js.map