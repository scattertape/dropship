var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var Instructions = (function (_super) {
        __extends(Instructions, _super);
        function Instructions() {
            _super.apply(this, arguments);
        }
        Instructions.prototype.create = function () {
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 0.3 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.group1 = this.game.add.group();
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            var style2 = { font: "18px Arial", fill: "#ffffff", align: 'center' };
            //////////////////////////////////////////
            var keysHeader = this.game.add.text(this.game.width * 0.5, (this.game.height * 0.5) - 250, "Keyboard controls", style1, this.group1);
            var keysText = this.game.add.text(this.game.width * 0.5, (this.game.height * 0.5) - 220, ""
                + "\nUp arrow: thrust"
                + "\nLeft arrow: turn left"
                + "\nRight arrow: turn right"
                + "\nSpace: fire"
                + "\nDown arrow: release bomb", style2, this.group1);
            keysHeader.anchor.setTo(0.5, 0.0);
            keysText.anchor.setTo(0.5, 0.0);
            ////////////////////////////////////////
            var tabletHeader = this.game.add.text(this.game.width * 0.5, (this.game.height * 0.5) + 0, "Tablet controls", style1, this.group1);
            var tabletText = this.game.add.text(this.game.width * 0.5, (this.game.height * 0.5) + 30, ""
                + "\nTap left hand side: thrust"
                + "\nTap right hand side: fire"
                + "\nSwipe down: release bomb", style2, this.group1);
            tabletHeader.anchor.setTo(0.5, 0.0);
            tabletText.anchor.setTo(0.5, 0.0);
            ////////////////////////////////////////
            var exitButton = this.game.make.button(this.game.width * 0.5, this.game.height * 0.85, 'button', this.exitOptions, this, 1, 0, 1, 0);
            exitButton.anchor.setTo(0.5, 0.5);
            this.group1.add(exitButton);
            var exitText = this.game.add.text(exitButton.x, exitButton.y, "Exit", style1, this.group1);
            exitText.anchor.setTo(0.5, 0.375);
        };
        Instructions.prototype.exitOptions = function () {
            //this.game.world.remove(this.group1);
            // group.destroy();
            var tween = this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.returnToMenu, this);
        };
        Instructions.prototype.returnToMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Instructions;
    }(Phaser.State));
    Dropship.Instructions = Instructions;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=Instructions.js.map