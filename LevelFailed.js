var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var LevelFailed = (function (_super) {
        __extends(LevelFailed, _super);
        function LevelFailed() {
            _super.apply(this, arguments);
        }
        LevelFailed.prototype.create = function () {
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            //this.complete = this.add.sprite(this.game.width * 0.5, this.game.height - 300, 'complete');
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            this.complete = this.game.add.text(this.game.width * 0.5, -50, "Level failed", style1);
            this.complete.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 0.3 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.complete).to({ y: this.game.height * 0.5 }, 400, Phaser.Easing.Elastic.Out, true, 200);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        LevelFailed.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.complete).to({ y: this.game.height + 50, alpha: 0 }, 200, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.showMenu, this);
        };
        LevelFailed.prototype.showMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return LevelFailed;
    }(Phaser.State));
    Dropship.LevelFailed = LevelFailed;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=LevelFailed.js.map