define(["util/helpers", "gui/windowobject", "gui/box"], function(Helpers, WindowObject, Box) {

    var PADDING = 4;
    var SIZE = 50;

    var InventoryItem = Class(WindowObject, {
        constructor: function(gameManager, item, invId, tileX, tileY, parent) {
            InventoryItem.$super.call(this, gameManager);

            this.item = item;
            this.invId = invId;

            this.sprite = new PIXI.Sprite(PIXI.utils.TextureCache[item.framesNamespace]["inventory"]);
            this.sprite.scale.x = 2;
            this.sprite.scale.y = 2;

            this.sprite.x = PADDING + (SIZE - 32) / 2 + 1;
            this.sprite.y = PADDING + (SIZE - 32) / 2;

            this.tileX = tileX;
            this.tileY = tileY;

            var self = this;

            var posX = tileX * (SIZE + PADDING * 2);
            var posY = tileY * (SIZE + PADDING * 2);

            this.addDoubleClickListener(function(e) {
                if (parent.itemActivate !== undefined) {
                    parent.itemActivate(self.item);
                }
            });

            this.addChild(new Box(gameManager, PADDING, PADDING, SIZE, SIZE));
            this.addChild(this.sprite);

            var graphics = new PIXI.Graphics();
            graphics.lineStyle(3, 0x0, 0.5);
            graphics.drawRect(PADDING, PADDING, SIZE, SIZE);
            graphics.visible = false;
            this.addChild(graphics);

            /*
            var test = new PIXI.Graphics();
            test.lineStyle(1, 0x0, 1);
            test.drawRect(0, 0, SIZE + PADDING * 2, SIZE + PADDING * 2);
            this.addChild(test);
            */

            this.container.on("mouseover", function() {
                graphics.visible = true;
            });

            this.container.on("mouseout", function() {
                graphics.visible = false;
            });

            this.setPosition(posX, posY);
        },
        update: function() {
            InventoryItem.$superp.update.call(this);
            //Similar transition as the View's on item move
            /*
            var period = this.gameManager.game.deltaTime / 17;

            var dx = (this.tileX * 32 - this.container.x) * period;
            var dy = (this.tileY * 32 - this.container.y) * period;

            this.container.x += dx / 20;
            this.container.y += dy / 20;

            */
        },
        moveTo: function(tileX, tileY) {
            this.tileX = tileX;
            this.tileY = tileY;
        }
    });

    var InventoryScreen = Class(WindowObject, {
        constructor: function(gameManager, inventory) {
            InventoryScreen.$super.call(this, gameManager);

            this.inventory = inventory;

            //These seem useless right now, but may be useful later...
            this.width = Math.min(inventory.items.length, 4);
            this.height = Math.ceil(inventory.items.length / 4);

            /*
            var background = new PIXI.Graphics();
            background.beginFill(0x0, 0.2);
            background.drawRect(0, 0, 300, 32 * this.height);
            background.endFill();
            this.container.addChild(background);
            */

            this.addChild(new Box(gameManager, 0, 0, 300, 32 * this.height));

            for (var i = 0; i < inventory.items.length; i++) {
                if (inventory.items[i] === false) continue;
                var x = i % 4;
                var y = Math.floor(i / 4);
                var item = new InventoryItem(gameManager, inventory.items[i], i, x, y, this);
                this.addChild(item);
            }

            var tooltip = new PIXI.Container();
            tooltip.visible = false;

            var tooltipGraphics = new PIXI.Graphics();
            tooltip.addChild(tooltipGraphics);

            var tooltipTitle = new PIXI.Text("", {
                font: Helpers.getFont(16),
                fill: "white"
            });
            tooltip.addChild(tooltipTitle);

            var tooltipDesc = new PIXI.Text("", {
                font: Helpers.getFont(14),
                fill: "white",
                wordWrap: true,
                wordWrapWidth: 200
            });
            tooltipDesc.y = 20;
            tooltip.addChild(tooltipDesc);

            this.container.addChild(tooltip);

            var self = this;
            this.container.interactive = true;
            this.container.on("mousemove", function(e) {
                var pos = e.data.getLocalPosition(self.container);
                var mx = pos.x;
                var my = pos.y;
                tooltip.x = mx + 15;
                tooltip.y = my + 15;
                var item = self.getItemAt(mx, my);
                if (item !== false) {
                    tooltipTitle.text = item.item.name;
                    tooltipDesc.text = item.item.description;
                    tooltip.visible = true;
                } else {
                    tooltip.visible = false;
                }
                if (tooltip.visible) {
                    tooltipGraphics.clear();
                    tooltipGraphics.beginFill(0x000000, 0.5);
                    var pad = 2;
                    tooltipGraphics.drawRect(-pad, -pad, Math.max(200, tooltip.width + (2 * pad)), tooltip.height + (2 * pad));
                    tooltipGraphics.endFill();
                }
            });
        },
        getItemAt: function(x, y) {
            var tileX = Math.floor(x / (SIZE + PADDING * 2));
            var tileY = Math.floor(y / (SIZE + PADDING * 2));
            for (var i = 0; i < this.children.length; i++) {
                var item = this.children[i];
                if (item.tileX === tileX && item.tileY === tileY) return item;
            }
            return false;
        }
    });

    return InventoryScreen;

});
