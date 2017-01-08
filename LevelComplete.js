var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Dropship;
(function (Dropship) {
    var LevelComplete = (function (_super) {
        __extends(LevelComplete, _super);
        function LevelComplete() {
            _super.apply(this, arguments);
        }
        LevelComplete.prototype.create = function () {
            this.background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'titlepage');
            this.background.alpha = 0;
            this.background.anchor.setTo(0.5, 0.5);
            //this.complete = this.add.sprite(this.game.width * 0.5, this.game.height - 300, 'complete');
            var style1 = { font: "25px Arial", fill: "#ffffff", align: 'center' };
            this.complete = this.game.add.text(this.game.width * 0.5, (this.game.height * 0.5), "Level complete", style1);
            this.complete.anchor.setTo(0.5, 0.5);
            this.add.tween(this.background).to({ alpha: 1 }, 200, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.complete).to({ y: 220 }, 200, Phaser.Easing.Elastic.Out, true, 200);
            this.input.onDown.addOnce(this.fadeOut, this);
        };
        LevelComplete.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 150, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.complete).to({ y: 800 }, 150, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.showMenu, this);
        };
        LevelComplete.prototype.showMenu = function () {
            if (this.game.state.states['MainMenu'].level == 0) {
                this.game.state.states['MainMenu'].level++;
            }
            this.game.state.start('Level1', true, false);
        };
        return LevelComplete;
    }(Phaser.State));
    Dropship.LevelComplete = LevelComplete;
})(Dropship || (Dropship = {}));
//# sourceMappingURL=LevelComplete.js.map