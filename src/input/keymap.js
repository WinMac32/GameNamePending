define(["save/storage"], function(Storage) {

    /**
        Key mapping class allows configuring keys to actions
    */
    var KeyMap = Class({
        constructor: function(keyboard) {
            this.keyboard = keyboard;

            if (Storage.hasObject("keymap")) {
                this.map = Storage.getObject("keymap");
            } else {
                this.map = {
                    "move": {
                        "left": "KeyA",
                        "right": "KeyD",
                        "up": "KeyW",
                        "down": "KeyS"
                    },
                    "view": {
                        "drops": "ShiftLeft",
                        "inventory": "KeyI"
                    },
                    "interact": {
                        "use": "KeyE"
                    },
                    "debug": {
                        "Tile": "Digit1",
                        "Wall": "Digit2",
                        "Path": "Digit3",
                        "Door": "Digit4",
                        "Chest": "Digit5",
                        "Torch": "Digit6",
                        "Export": "KeyX",
                        "Clear": "KeyC"
                    }
                };
            }
        },
        getKey: function(key) {
            var parts = key.split(".");
            var entry = this.map;
            for (var i = 0; i < parts.length; i++) {
                entry = entry[parts[i]];
            }
            return entry;
        },
        isKeyDown: function(key) {
            var entry = this.getKey(key);
            return this.keyboard.isKeyDown(entry);
        }
    });

    return KeyMap;

});
