define(["globals", "scene/menu", "util/helpers", "load/sheetparser", "input/keyboard", "save/savemanager", "input/keymap"], function(Globals, Menu, Helpers, SheetParser, KeyboardInput, SaveManager, KeyMap) {

    var Game = Class({
        constructor: function() {
            PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

            var docWidth = document.documentElement.offsetWidth;
            var docHeight = document.documentElement.offsetHeight;
            this.gameWidth = Math.min(docWidth - (docWidth / 5), 1200);
            this.gameHeight = Math.min(docHeight - (docHeight / 5), 700);
            this.renderer = PIXI.autoDetectRenderer(this.gameWidth, this.gameHeight, {
                antialiasing: false
            });

            this.lastUpdate = Date.now();

            this.fpsTicker = 0;
            this.fpsMillis = 0;
            this.fps = 0;

            document.getElementById("canvas-wrapper").appendChild(this.renderer.view);

            this.keyboard = new KeyboardInput(window);
            this.keymap = new KeyMap(this.keyboard);

            this.saveManager = new SaveManager();

            Log.info("Created new game instance.");
        },
        run: function() {
            var self = this;

            Log.info("Loading assets...");

            this.toLoad = 2;
            this.loaded = 0;

            WebFont.load({
                active: function() {
                    self.doneLoading("fonts");
                },
                google: {
                    families: ["Poiret One"]
                },
                custom: {
                    families: ["TheFont"]
                }
            });

            var loader = new PIXI.loaders.Loader();
            loader
                .add(Helpers.sprite("players/male-race-1/male-race-1.sheet"))
                .add(Helpers.item("ironsword"))
                .add(Helpers.item("ironboots"))
                .add(Helpers.item("ironchest"))
                .add(Helpers.item("irongloves"))
                .add(Helpers.item("ironhelm"))
                .add(Helpers.item("ironlegs"))
                .add(Helpers.sprite("world/tiles-1/tiles-1.sheet"))
                .add(Helpers.sprite("world/tiles-2/tiles-2.sheet"))
                .add(Helpers.sprite("world/tiles-2/tiles-2-normals.sheet"))
                .add(Helpers.sprite("blank.png"))
                .add(Helpers.sprite("blank-normals.png"))
                .add(Helpers.sprite("placeholder.png"))
                .add(Helpers.sprite("temp_bg.jpg"))
                .add(Helpers.sprite("projectile/temp-projectile.png"))
                .after(SheetParser)
                .once("complete", function() {
                    self.doneLoading("graphics assets");
                });
            loader.load();
        },
        doneLoading: function(group) {
            this.loaded++;
            Log.info("Loaded " + group);
            if (this.loaded >= this.toLoad) {
                Log.info("All assets have loaded.");
                this.startLoop();
            }
        },
        startLoop: function() {
            Log.info("Running game now...");

            this.currentScene = new Menu(this);

            var self = this;

            function render() {
                self.loop();
                requestAnimationFrame(render);
            }

            requestAnimationFrame(render);
        },
        loop: function() {
            this.calculateDelta();
            this.fpsMillis += this.deltaTime;
            this.fpsTicker++;
            if (this.fpsMillis >= 200) {
                this.fps = 1000 / (this.fpsMillis / this.fpsTicker);
                this.fpsMillis = 0;
                this.fpsTicker = 0;
            }
            this.currentScene.update();
            this.currentScene.render(this.renderer);
        },
        changeScene: function(scene) {
            Log.info("Changing scene");
            this.currentScene = scene;
        },
        calculateDelta: function() {
            var now = Date.now();
            this.deltaTime = now - this.lastUpdate;
            this.lastUpdate = now;

            if (this.deltaTime > 100) this.deltaTime = 100;
        }
    });

    return Game;

});
