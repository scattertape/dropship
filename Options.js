var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var Options = (function (_super) {
        __extends(Options, _super);
        function Options() {
            _super.apply(this, arguments);
            this.joyTextA = 'Tilt to steer';
            this.joyTextB = 'Joystick to steer';
            this.damage = true;
            this.useJoystick = false;
        }
        Options.prototype.create = function () {
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 0.3 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.group1 = this.game.add.group();
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            ////////////////////////////////////////
            var fullScreenButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.4, 'button', this.goFullScreen, this, 1, 0, 1, 0);
            fullScreenButton.anchor.setTo(0.5, 0.5);
            this.group1.add(fullScreenButton);
            var fullText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.4, "Full screen", style1, this.group1);
            fullText.anchor.setTo(0.5, 0.375);
            //////////////////////////////////////////
            var damageButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.5, 'button', this.damageToggle, this, 1, 0, 1, 0);
            damageButton.anchor.setTo(0.5, 0.5);
            this.group1.add(damageButton);
            this.damageText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Damage on", style1, this.group1);
            this.damageText.anchor.setTo(0.5, 0.375);
            if (this.damage == false) {
                this.damageText.setText('Damage off');
            }
            ////////////////////////////////////////
            if (this.game.state.states['MainMenu'].deviceMoArray > 0) {
                var joystickButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.6, 'button', this.joystickToggle, this, 1, 0, 1, 0);
                joystickButton.anchor.setTo(0.5, 0.5);
                this.group1.add(joystickButton);
                this.joystickText = this.game.add.text(joystickButton.x, joystickButton.y, this.joyTextA, style1, this.group1);
                this.joystickText.anchor.setTo(0.5, 0.375);
                if (this.useJoystick == true) {
                    this.joystickText.setText(this.joyTextB);
                }
            }
            ////////////////////////////////////////
            var exitButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.7, 'button', this.exitOptions, this, 1, 0, 1, 0);
            exitButton.anchor.setTo(0.5, 0.5);
            this.group1.add(exitButton);
            var exitText = this.game.add.text(exitButton.x, exitButton.y, "Exit", style1, this.group1);
            exitText.anchor.setTo(0.5, 0.375);
        };
        Options.prototype.goFullScreen = function () {
            //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.startFullScreen();
        };
        Options.prototype.damageToggle = function () {
            if (this.damage) {
                this.damage = false;
                this.damageText.setText('Damage off');
            }
            else {
                this.damage = true;
                this.damageText.setText('Damage on');
            }
        };
        Options.prototype.joystickToggle = function () {
            if (this.useJoystick) {
                this.useJoystick = false;
                this.joystickText.setText(this.joyTextA);
            }
            else {
                this.useJoystick = true;
                this.joystickText.setText(this.joyTextB);
            }
        };
        Options.prototype.exitOptions = function () {
            //this.game.world.remove(this.group1);
            // group.destroy();
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.returnToMenu, this);
        };
        Options.prototype.returnToMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Options;
    }(Phaser.State));
    Dropship.Options = Options;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Options.js.map