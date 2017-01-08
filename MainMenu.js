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
            this.level = 0;
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
            //////////////////////////////////////////////
            this.group1 = this.game.add.group();
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            //////////////////////////////////////////////
            var playButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.5, 'button', this.playGame, this, 1, 0, 1, 0);
            playButton.anchor.setTo(0.5, 0.5);
            this.group1.add(playButton);
            var playText = this.game.add.text(playButton.x, playButton.y, "Play", style1, this.group1);
            playText.anchor.setTo(0.5, 0.375);
            //////////////////////////////////////////////
            var optionsButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.6, 'button', this.showOptions, this, 1, 0, 1, 0);
            optionsButton.anchor.setTo(0.5, 0.5);
            this.group1.add(optionsButton);
            var optionsText = this.game.add.text(optionsButton.x, optionsButton.y, "Options", style1, this.group1);
            optionsText.anchor.setTo(0.5, 0.375);
            //////////////////////////////////////////////
            var instructionsButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.7, 'button', this.showInstructions, this, 1, 0, 1, 0);
            instructionsButton.anchor.setTo(0.5, 0.5);
            this.group1.add(instructionsButton);
            var instructionsText = this.game.add.text(instructionsButton.x, instructionsButton.y, "Instructions", style1, this.group1);
            instructionsText.anchor.setTo(0.5, 0.375);
            //////////////////////////////////////////////
            this.logo = this.add.sprite(this.game.width * 0.5, -100, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220, alpha: 1 }, 250, Phaser.Easing.Elastic.Out, true, 200);
            var style2 = { font: "15px Arial", fill: "#0f999c", align: 'center' };
            this.text1 = this.game.add.text(this.game.width * 0.5, this.game.height * 0.85, String(''), style2, this.group1);
            this.text1.anchor.setTo(0.5, 0.5);
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
        };
        MainMenu.prototype.showOptions = function () {
            this.deviceMoArray = moArray.length;
            this.game.state.start('Options', true, false);
        };
        MainMenu.prototype.showInstructions = function () {
            this.deviceMoArray = moArray.length;
            this.game.state.start('Instructions', true, false);
        };
        MainMenu.prototype.playGame = function () {
            this.deviceMoArray = moArray.length;
            this.group1.destroy(true);
            this.background.alpha = 0.3;
            this.add.tween(this.logo).to({ y: -100, alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            if (this.game.state.states['MainMenu'].level == 0) {
                this.showControls();
            }
            else {
                //var tween = this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
                //tween.onComplete.add(this.startGame, this);
                this.startGame();
            }
        };
        MainMenu.prototype.showControls = function () {
            //////////////////////////////////////////////
            this.group2 = this.game.add.group();
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            //////////////////////////////////////////////
            var playButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.85, 'button', this.startGame, this, 1, 0, 1, 0);
            playButton.anchor.setTo(0.5, 0.5);
            this.group2.add(playButton);
            var playText = this.game.add.text(playButton.x, playButton.y, "Start", style1, this.group2);
            playText.anchor.setTo(0.5, 0.375);
            //////////////////////////////////////////////
            if (this.deviceMoArray == 0) {
                // Keyboard controls
                //var keyboardText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, "Keyboard", style1, this.group2);
                //keyboardText.anchor.setTo(0.5, 0.375);
                var keys = this.add.sprite(this.game.width * 0.5, this.game.height * 0.45, 'control_keyboard', this.group2);
                keys.anchor.setTo(0.5, 0.5);
                this.group2.add(keys);
            }
            else {
                // Accelerometer exists
                var tabletText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.45, "", style1, this.group2);
                tabletText.anchor.setTo(0.5, 0.375);
                if (this.game.state.states['Options'].useJoystick == false) {
                    tabletText.setText('No joystick');
                }
                else {
                    tabletText.setText('Using joystick');
                }
            }
        };
        MainMenu.prototype.startGame = function () {
            window.removeEventListener("devicemotion", onDeviceMotionTest);
            this.group2.destroy(true);
            //this.group2.alpha = 0;
            //this.add.tween(this.group2).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            var ship = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'Atlas', 'Ship0000');
            ship.anchor.setTo(0.5, 0.5);
            ship.alpha = 0;
            var tween = this.add.tween(ship).to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.shipAppear, this);
        };
        MainMenu.prototype.shipAppear = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    }(Phaser.State));
    Dropship.MainMenu = MainMenu;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=MainMenu.js.map