define(["item/factory/templatefactory", "item/factory/affixfactory", "item/item", "item/weapon", "item/armour"], function(TemplateFactory, AffixFactory, Item, Weapon, Armour) {

    var ItemFactory = Class(TemplateFactory, {
        constructor: function(gameManager) {
            ItemFactory.$super.call(this);
            this.gameManager = gameManager;
            this.affixFactory = new AffixFactory(gameManager);

            this.words = {
                adjectives: {
                    shit: ["Rusty", "Flimsy", "Shitty"]
                },
                adverbs: {}
            }

            this.spritesheets = {
                shit: {
                    sword: ["ironsword"],
                    helm: ["ironhelm"],
                    chest: ["ironchest"],
                    legs: ["ironlegs"],
                    gloves: ["irongloves"],
                    boots: ["ironboots"]
                }
            }

            this.templates = [
                {
                    groups: {
                        all: 1.0,
                        weapon: 1.0,
                        shit: 1.0,
                        shitWeapon: 1.0
                    },
                    type: Item.TYPES.WEAPON,
                    data: {
                        name: "!{adjective} Iron Dagger",
                        desc: "Looks like it's about to fall apart",
                        rarity: Item.RARITY.SHIT,
                        sprite: "sword",
                        stats: {
                            damage: [1, 2],
                            attackSpeed: [1.0, 1.2],
                            range: 64,
                            criticalChance: 1,
                            criticalDamage: 1
                        }
                    }
                },
                {
                    groups: {
                        all: 1.0,
                        armour: 1.0,
                        shit: 1.0,
                        shitArmour: 1.0
                    },
                    type: Item.TYPES.ARMOUR,
                    data: {
                        name: "!{adjective} Iron Helm",
                        desc: "Smells like death in here",
                        rarity: Item.RARITY.SHIT,
                        sprite: "helm",
                        stats: {
                            type: Armour.TYPES.HEAD,
                            armour: [1, 1.2]
                        }
                    }
                },
                {
                    groups: {
                        all: 1.0,
                        armour: 1.0,
                        shit: 1.0,
                        shitArmour: 1.0
                    },
                    type: Item.TYPES.ARMOUR,
                    data: {
                        name: "!{adjective} Iron Chestplate",
                        desc: "A size too small",
                        rarity: Item.RARITY.SHIT,
                        sprite: "chest",
                        stats: {
                            type: Armour.TYPES.CHEST,
                            armour: [1, 1.2]
                        }
                    }
                },
                {
                    groups: {
                        all: 1.0,
                        armour: 1.0,
                        shit: 1.0,
                        shitArmour: 1.0
                    },
                    type: Item.TYPES.ARMOUR,
                    data: {
                        name: "!{adjective} Iron Leggings",
                        desc: "I can barely walk in these things",
                        rarity: Item.RARITY.SHIT,
                        sprite: "legs",
                        stats: {
                            type: Armour.TYPES.LEGS,
                            armour: [1, 1.2]
                        }
                    }
                },
                {
                    groups: {
                        all: 1.0,
                        armour: 1.0,
                        shit: 1.0,
                        shitArmour: 1.0
                    },
                    type: Item.TYPES.ARMOUR,
                    data: {
                        name: "!{adjective} Iron Boots",
                        desc: "Ew. Smells like the feet of 43 other people",
                        rarity: Item.RARITY.SHIT,
                        sprite: "boots",
                        stats: {
                            type: Armour.TYPES.FEET,
                            armour: [1, 1.2]
                        }
                    }
                },
                {
                    groups: {
                        all: 1.0,
                        armour: 1.0,
                        shit: 1.0,
                        shitArmour: 1.0
                    },
                    type: Item.TYPES.ARMOUR,
                    data: {
                        name: "!{adjective} Iron Gauntlets",
                        desc: "Might as well be oven mitts",
                        rarity: Item.RARITY.SHIT,
                        sprite: "gloves",
                        stats: {
                            type: Armour.TYPES.HANDS,
                            armour: [1, 1.2]
                        }
                    }
                }
            ]
        },
        getItem: function(group) {
            var template = this.getTemplate(group);

            if (template === false) return false;

            var info = template.data;
            var rarities = ["shit", "common", "uncommon", "rare", "epic", "legendary"];
            var rarity = rarities[info.rarity];

            var name = this.processText(rarity, info.name);
            var desc = this.processText(rarity, info.desc);
            var spritesheets = this.spritesheets[rarity][info.sprite];
            var spritesheet = spritesheets[Math.floor(Math.random() * spritesheets.length)];

            var itemData = {};
            for (var s in info.stats) {
                var stat = info.stats[s];
                if (typeof stat === "number") {
                    var val = stat;
                } else {
                    var val = stat[0] + Math.round(Math.random() * (stat[1] - stat[0]) * 100) / 100;
                }
                itemData[s] = val;
            }

            var classes = [Weapon, Armour];
            return new classes[template.type](name, desc, info.rarity, [], spritesheet, itemData);
        },
        processText: function(rarity, text) {
            var randWord = function(words) {
                if (words === undefined || words.length <= 0) return "";
                return words[Math.floor(Math.random() * words.length)];
            }

            var text = text.replace("!{adjective}", randWord(this.words.adjectives[rarity]));
            text = text.replace("!{adverb}", randWord(this.words.adverbs[rarity]));

            return text;
        },
        generateWeapon: function() {
            return new Weapon("Test Weapon", "This is a weapon", Item.RARITY.COMMON, [], "ironsword", {
                damage: 1,
                attackSpeed: 0.5, //Attack speed is in seconds/hit
                range: 64, //Radius in pixels
                criticalChance: 1,
                criticalDamage: 1
            });
        },
        generateArmours: function() {
            return [
                new Armour("Test Helm", "This is a helmet", Item.RARITY.COMMON, [], "ironhelm", {
                    type: Armour.TYPES.HEAD,
                    armour: 1
                }),
                new Armour("Test Chest", "This is a chestplate", Item.RARITY.COMMON, [], "ironchest", {
                    type: Armour.TYPES.CHEST,
                    armour: 1
                }),
                new Armour("Test Legs", "These are leggings", Item.RARITY.COMMON, [], "ironlegs", {
                    type: Armour.TYPES.LEGS,
                    armour: 1
                }),
                new Armour("Test Boots", "These are boots", Item.RARITY.COMMON, [], "ironboots", {
                    type: Armour.TYPES.FEET,
                    armour: 1
                }),
                new Armour("Test Gloves", "These are gloves", Item.RARITY.COMMON, [], "irongloves", {
                    type: Armour.TYPES.HANDS,
                    armour: 1
                })
            ];
        }
    });

    return ItemFactory;

});
