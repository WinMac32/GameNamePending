
define(["entity/player", "item/manager", "util/helpers", "gui/inventory", "gui/window","board/board", "entity/enemy","tile/wall","tile/path","tile/door","board/room"], function(Player, ItemManager, Helpers, InventoryScreen, Window, Board, Enemy, Wall, Path, Door, Room) {
    /**
        This is the meat of the game logic.

        All world updating, player management, networking, etc should be
        contained in or dispatched from here.
    */
    var GameManager = Class({
        constructor: function(game, scene) {
            this.game = game;
            this.scene = scene;

            //Temp save data for testing. This will be loaded from JSON/Database.
            var saveData = {
                saveName: "Test Save",
                characterName: "Joe",
                repeats: 0,
                inventory: false,
                chest: false,
                equip: {
                    head: false,
                    chest: false,
                    legs: false,
                    feet: false,
                    hands: false,
                    item: false
                },
                map: false //False here can mean player is currently in lobby
            }
            
            var self = this;

            this.itemManager = new ItemManager();
            this.board = new Board(this,30,30);

            this.board.addRoom(10,10,this.createTestRoom());
            this.board.addEnemy(new Enemy(this, 5, 5, 1, 1, 1, {}, "male-race-1"));

            this.player = new Player(this, saveData);
            this.scene.addObject(this.player.container, 1);
            this.scene.addObject(this.board.container, 0);
            this.scene.addObject(this.board.enemyContainer, 1);

            //var tempBG = new PIXI.Sprite(PIXI.utils.TextureCache[Helpers.sprite("temp_bg.jpg")]);
            //tempBG.width = game.gameWidth;
            //tempBG.height = game.gameHeight;
            //this.scene.addObject(tempBG, 0);

            this.fpsText = new PIXI.Text("FPS", {font : "24px Arial"});
            this.scene.addObject(this.fpsText, 9);

            this.testInv = new InventoryScreen(this, this.player.inventory);
            this.testGui = new Window(300, 300, "Inventory");
            this.testGui.container.addChild(this.testInv.container);
            this.scene.addObject(this.testGui.rootContainer, 8);
        },
        update: function() {
            this.player.update();
            this.board.update();
            this.testInv.update();
            this.fpsText.text = "FPS: " + this.game.fps;
        },

        /**
            Use for testing room templates
        */
        createTestRoom: function(){
            var width = 5;
            var height = 5;
            this.grid = new Array(width);
            for(var i = 0;i < width;i++){
                this.grid[i] = new Array(height);
                for(var j = 0;j < height;j++){
                    var temp;
                    
                    if(i==Math.floor(width/2)&&j==0||i==0&&j==Math.floor(height/2)){
                        temp = new Door(this);
                    }
                    else if(i==0||j==0||i==width-1||j==height-1){
                        temp = new Wall(this);
                    }
                    else{
                        temp = new Path(this);
                    }
                    temp.tileSprite.x = i * temp.tileSprite.width;
                    temp.tileSprite.y = j * temp.tileSprite.height;
                    this.grid[i][j] = temp.toJSON();                    
                }
            }
            var room = {                
                width: width,
                height: height,
                entrances: 0b1111,
                entranceLocations: [[1,0],[0,1],[2,1],[1,2]],
                grid: this.grid
            };
            var r = new Room(this);

            r.fromJSON(JSON.stringify(room));
            return r;
        }
    });

    return GameManager;
});
