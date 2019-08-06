var RandomAdv = RandomAdv || (function() {
    'use strict';

    var version = 0.1,
    getd8 = function() {
        let rollResult = randomInteger(8) - 1;
        return rollResult;
    }

    const HandleInput = function(msg) {
        var args,text='/w gm'
        +'<div style="margin-left: -40px; width: 113%; padding:1px 3px; border: 1px solid black; background: white; color: black; font-size: 80%;">';
        var do_table = [
                ['<strong>assassinate</strong>','<strong>assist</strong>','<strong>find</strong>','<strong>retrieve</strong>','<strong>race</strong>','<strong>negotiate with</strong>','<strong>join</strong>','<strong>steal</strong>'],
                ['<strong>combat</strong>','<strong>discover</strong>','<strong>protect</strong>','<strong>attack</strong>','<strong>serve</strong>','<strong>defend</strong>','<strong>take</strong>','<strong>escape from</strong>'],
                ['<strong>guide</strong>','<strong>avenge</strong>','<strong>liberate</strong>','<strong>foil</strong>','<strong>guard</strong>','<strong>explore</strong>','<strong>journey to/with</strong>','<strong>create</strong>'],
                ['<strong>chase</strong>','<strong>quest for</strong>','<strong>escort</strong>','<strong>rescue</strong>','<strong>meet</strong>','<strong>resist</strong>','<strong>repel</strong>','<strong>safeguard</strong>'],
                ['<strong>disguise</strong>','<strong>travel with</strong>','<strong>deliver</strong>','<strong>defeat</strong>','<strong>investigate</strong>','<strong>support</strong>','<strong>destroy</strong>','<strong>battle</strong>'],
                ['<strong>move</strong>','<strong>track</strong>','<strong>aid</strong>','<strong>assault</strong>','<strong>get past</strong>','<strong>fight</strong>','<strong>protect</strong>','<strong>trap</strong>'],
                ['<strong>conceal</strong>','<strong>obliterate</strong>','<strong>encounter</strong>','<strong>oppose</strong>','<strong>speak with</strong>','<strong>observe</strong>','<strong>fight</strong>','<strong>locate</strong>'],
                ['<strong>strike</strong>','<strong>reveal</strong>','<strong>beset</strong>','<strong>shield</strong>','<strong>contend with</strong>','<strong>infiltrate</strong>','<strong>kill</strong>','<strong>save</strong>']
            ];
        var something_table = [
                ['<strong>an angel</strong>','<strong>a demon</strong>','<strong>a treasure</strong>','<strong>a wizard</strong>','<strong>a god</strong>','<strong>an army</strong>','<strong>a monster</strong>','<strong>a new race</strong>'],
                ['<strong>a princess</strong>','<strong>a magical event</strong>','<strong>a barbarian</strong>','<strong>a warrior</strong>','<strong>magic</strong>','<strong>a dragon</strong>','<strong>guards</strong>','<strong>a government</strong>'],
                ['<strong>a thief</strong>','<strong>an organization</strong>','<strong>a merchant</strong>','<strong>a stranger</strong>','<strong>an atrifact</strong>','<strong>a dungeon</strong>','<strong>a humanoid</strong>','<strong>an abberation</strong>'],
                ['<strong>a friend</strong>','<strong>a giant</strong>','<strong>a secret</strong>','<strong>a woman</strong>','<strong>a noble</strong>','<strong>a kingdom</strong>','<strong>a castle</strong>','<strong>an outsider</strong>'],
                ['<strong>a magical beast</strong>','<strong>an enemy</strong>','<strong>a warlord</strong>','<strong>an item</strong>','<strong>a man</strong>','<strong>a child</strong>','<strong>a weapon</strong>','<strong>a love interest</strong>'],
                ['<strong>a soldiers</strong>','<strong>undead</strong>','<strong>a gem or jewel</strong>','<strong>a secret</strong>','<strong>a construct</strong>','<strong>a creature</strong>','<strong>an animal</strong>','<strong>a sorcerer</strong>'],
                ['<strong>a bard</strong>','<strong>a villain</strong>','<strong>an ally</strong>','<strong>a rival</strong>','<strong>a priest</strong>','<strong>a ruler</strong>','<strong>a magic item</strong>','<strong>a humanoid</strong>'],
                ['<strong>a monk</strong>','<strong>a rogue</strong>','<strong>a village</strong>','<strong>a peasants</strong>','<strong>an oracle</strong>','<strong>a map</strong>','<strong>a monster</strong>','<strong>a prophecy</strong>']
            ];
        var location_table = [
                ['<strong>a mountain</strong>','<strong>a jungle</strong>','<strong>a battlefield</strong>','<strong>the frontier</strong>','<strong>a wasteland</strong>','<strong>a fortress</strong>','<strong>a city</strong>','<strong>underground</strong>'],
                ['<strong>the North</strong>','<strong>a castle</strong>','<strong>a villain\'s lair</strong>','<strong>a desert</strong>','<strong>an ocean</strong>','<strong>a dungeon</strong>','<strong>the plains</strong>','<strong>a nearby kingdom</strong>'],
                ['<strong>another plane</strong>','<strong>a distant kingdom</strong>','<strong>a wizard\'s tower</strong>','<strong>a ship</strong>','<strong>a city</strong>','<strong>a cavern</strong>','<strong>a monster\'s lair</strong>','<strong>a stonghold</strong>'],
                ['<strong>some ruins</strong>','<strong>a village</strong>','<strong>the outlands</strong>','<strong>a secret location</strong>','<strong>a fortress</strong>','<strong>a palace</strong>','<strong>a swamp</strong>','<strong>a tomb</strong>'],
                ['<strong>a bazaar</strong>','<strong>a keep</strong>','<strong>a temple</strong>','<strong>a foreign land</strong>','<strong>an evil land</strong>','<strong>a tavern</strong>','<strong>a guild hall</strong>','<strong>a dungeon</strong>'],
                ['<strong>a road</strong>','<strong>a hamlet</strong>','<strong>a port</strong>','<strong>a cave</strong>','<strong>a subterranean city</strong>','<strong>the border</strong>','<strong>a sepulcher</strong>','<strong>a lost city</strong>'],
                ['<strong>the underworld</strong>','<strong>a trade route</strong>','<strong>the woods</strong>','<strong>the hills</strong>','<strong>a fane</strong>','<strong>a town</strong>','<strong>across the sea</strong>','<strong>the sky</strong>'],
                ['<strong>a citadel</strong>','<strong>the South</strong>','<strong>a dungeon</strong>','<strong>the West</strong>','<strong>a manor</strong>','<strong>some catacombs</strong>','<strong>the East</strong>','<strong>a vault</strong>']
            ];
        var complications_table = [
                ['None','<strong>betrayal</strong>','<strong>rivalry</strong>','<strong>trap</strong>','<strong>royal influence</strong>','<strong>magical event</strong>','<strong>trickery</strong>','<strong>religion</strong>'],
                ['<strong>travel</strong>','<strong>squabbling</strong>','<strong>distraction</strong>','<strong>abduction</strong>','<strong>barriers</strong>','<strong>war</strong>','<strong>diplomacy</strong>','<strong>ambush</strong>'],
                ['<strong>magic</strong>','<strong>race</strong>','<strong>monsters</strong>','<strong>politics</strong>','<strong>theft</strong>','<strong>mystery</strong>','<strong>vendetta</strong>','<strong>fear</strong>'],
                ['<strong>mistaken identity</strong>','<strong>power struggle</strong>','<strong>enemy</strong>','<strong>travel problem</strong>','<strong>criminals</strong>','<strong>superstition</strong>','<strong>drugs</strong>','<strong>construct</strong>'],
                ['<strong>language</strong>','<strong>battle</strong>','<strong>weather</strong>','<strong>side-tracked</strong>','<strong>misdirection</strong>','<strong>bureacracy</strong>','<strong>insanity</strong>','<strong>enemies</strong>'],
                ['<strong>interference</strong>','<strong>attention</strong>','<strong>exploration</strong>','<strong>equipment failure</strong>','<strong>military influence</strong>','<strong>god(s)</strong>','<strong>invasion</strong>','<strong>money</strong>'],
                ['<strong>monsters</strong>','<strong>getting lost</strong>','<strong>red herring</strong>','<strong>disaster</strong>','<strong>guild influence</strong>','<strong>interested parties</strong>','<strong>recurring NPC</strong>','<strong>differing PC motivations</strong>'],
                ['<strong>spies</strong>','<strong>legal trouble</strong>','<strong>lack of trust</strong>','<strong>desperation</strong>','<strong>love interest</strong>','<strong>puzzles</strong>','<strong>double-cross</strong>','<strong>riddles</strong>']
            ];
        var opposition_table = [
                ['<strong>a government official</strong>','<strong>a barbarian</strong>','<strong>a gang</strong>','<strong>a mercenary</strong>','<strong>a spy</strong>','<strong>a sorcerer</strong>','<strong>a construct</strong>','<strong>a guild</strong>'],
                ['<strong>a creature</strong>','<strong>an enemy</strong>','<strong>a villain</strong>','<strong>criminals</strong>','<strong>a dragon</strong>','<strong>an outsider</strong>','<strong>an assassin</strong>','<strong>a monster</strong>'],
                ['<strong>a ruler</strong>','<strong>a shadowy figure</strong>','<strong>a wizard</strong>','<strong>a warrior</strong>','<strong>a humanoid</strong>','<strong>a wardlord</strong>','<strong>undead</strong>','<strong>an abberation</strong>'],
                ['<strong>a former ally</strong>','<strong>a stranger</strong>','<strong>several watchmen</strong>','<strong>a military</strong>','<strong>a veteran</strong>','None','<strong>giants</strong>','<strong>an outlaw</strong>'],
                ['<strong>a humanoid</strong>','<strong>a priest</strong>','<strong>a thief</strong>','<strong>a magic-user</strong>','<strong>a Demon/Devil</strong>','<strong>a merchant</strong>','<strong>an invader</strong>','<strong>a traitor</strong>'],
                ['<strong>a dragon</strong>','<strong>a war</strong>','<strong>an enemy</strong>','<strong>a monster</strong>','<strong>a lunatic</strong>','<strong>a recurring NPC</strong>','<strong>gods</strong>','<strong>a cult</strong>'],
                ['<strong>a fanatic</strong>','<strong>a conspiracy</strong>','<strong>a nation</strong>','<strong>a magical beast</strong>','<strong>an adventurer</strong>','<strong>an enemy</strong>','<strong>a humanoid</strong>','<strong>time</strong>'],
                ['<strong>a friend</strong>','<strong>a mastermind</strong>','<strong>a hazardous environment</strong>','<strong>an artifact</strong>','<strong>a puzzle</strong>','<strong>a champion</strong>','<strong>an immortal</strong>','Roll Twice']
            ];
        /* remember to deal with: None, Roll Twice */
        if (msg.type !== "api") {
            return;
        }

        args = msg.content.split(" ");

        switch(args[0]) {
            case '!randomadv':
                if(args.length > 2) {
                    sendChat(msg.who,'!randomadv takes zero or one argument only.');
                    break;
                }
                else {
                    log("Checking for proper arguments");
                    if(args.length > 1 && args[1] !== "info" && args[1] !== "help") {
                        sendChat(msg.who,'Invalid arugment supplied. Valid arguments are (if supplied): info and help');
                        break;
                    }

                    if(args.length > 1 && args[1] === "info") {
                        var infoText;
                        infoText = text;
                        infoText += "<p>This work is a derivative of the <em>Random Fantasy Adventure Generator</em> (available on <a href=\"https://www.drivethrurpg.com/product/50504/Random-Fantasy-Adventure-Generator\">DriveThruRPG</a>), Copyright 2007, Adamant Entertainment. Author: Gareth-Michael Skarka; this is produced with permission.</p>";
                        infoText += "<h4>OPEN GAME LICENSE Version 1.0a</h4>";
                        infoText += "<p>The following text is the property of Wizards of the Coast, Inc. and is Copyright 2000 Wizards of the Coast, Inc (\"Wizards\"). All Rights Reserved.</p>";
                        infoText += "<ol>";
                        infoText += "<li>Definitions: (a)\"Contributors\" means the copyright and/or trademark owners who have contributed Open Game Content; (b)\"Derivative Material\" means copyrighted material including derivative works and translations (including into other computer languages), potation, modification, correction, addition, extension, upgrade, improvement, compilation, abridgment or other form in which an existing work may be recast, transformed or adapted; (c) \"Distribute\" means to reproduce, license, rent, lease, sell, broadcast, publicly display, transmit or otherwise distribute; (d)\"Open Game Content\" means the game mechanic and includes the methods, procedures, processes and routines to the extent such content does not embody the Product Identity and is an enhancement over the prior art and any additional content clearly identified as Open Game Content by the Contributor, and means any work covered by this License, including translations and derivative works under copyright law, but specifically excludes Product Identity. (e) \"Product Identity\" means product and product line names, logos and identifying marks including trade dress; artifacts; creatures characters; stories, storylines, plots, thematic elements, dialogue, incidents, language, artwork, symbols, designs, depictions, likenesses, formats, poses, concepts, themes and graphic, photographic and other visual or audio representations; names and descriptions of characters, spells, enchantments, personalities, teams, personas, likenesses and special abilities; places, locations, environments, creatures, equipment, magical or supernatural abilities or effects, logos, symbols, or graphic designs; and any other trademark or registered trademark clearly identified as Product identity by the owner of the Product Identity, and which specifically excludes the Open Game Content; (f) \"Trademark\" means the logos, names, mark, sign, motto, designs that are used by a Contributor to identify itself or its products or the associated products contributed to the Open Game License by the Contributor (g) \"Use\", \"Used\" or \"Using\" means to use, Distribute, copy, edit, format, modify, translate and otherwise create Derivative Material of Open Game Content. (h) \"You\" or \"Your\" means the licensee in terms of this agreement.</details></li>";
                        infoText += "<li>The License: This License applies to any Open Game Content that contains a notice indicating that the Open Game Content may only be Used under and in terms of this License. You must affix such a notice to any Open Game Content that you Use. No terms may be added to or subtracted from this License except as describedby the License itself. No other terms or conditions may be applied to any Open Game Content distributed using this License.</li>";
                        infoText += "<li>Offer and Acceptance: By Using the Open Game Content You indicate Your acceptance of the terms of this License.</li>";
                        infoText += "<li>Grant and Consideration: In consideration for agreeing to use this License, the Contributors grant You a perpetual, worldwide, royalty-free, non-exclusive license with the exact terms of this License to Use, the Open Game Content.</li>";
                        infoText += "<li>Representation of Authority to Contribute: If You are contributing original material as Open Game Content, You represent that Your Contributions are Your original creation and/or You have sufficient rights to grant the rights conveyed by this License.</li>";
                        infoText += "<li>Notice of License Copyright: You must update the COPYRIGHT NOTICE portion of this License to include the exact text of the COPYRIGHT NOTICE of any Open Game Content You are copying, modifying or distributing, and You must add the title, the copyright date, and the copyright holder’s name to the COPYRIGHT NOTICE of any original Open Game Content you Distribute.</li>";
                        infoText += "<li>Use of Product Identity: You agree not to Use any Product Identity, including as an indication as to compatibility, except as expressly licensed in another, independent Agreement with the owner of each element of that Product Identity.You agree not to indicate compatibility or co-adaptability with any Trademark or Registered Trademark in conjunction with a work containing Open Game Content except as expressly licensed in another, independent Agreement with the owner of such Trademark or Registered Trademark. The use of any Product Identity in Open Game Content does not constitute a challenge to the ownership of that Product Identity. The owner of any Product Identity used in Open Game Content shall retain all rights, title and interest in and to that Product Identity.</li>";
                        infoText += "<li>Identification: If you distribute Open Game Content You must clearly indicate which portions of the work that you are distributing are Open Game Content.</li>";
                        infoText += "<li>Updating the License: Wizards or its designated Agents may publish updated versions of this License. You may use any authorized version of this License to copy, modify and distribute any Open Game Content originally distributed under any version of this License. 10 Copy of this License: You MUSTinclude a copy of this License with every copy of the Open Game Content You Distribute.</li>";
                        infoText += "<li>Copy of this License: You MUSTinclude a copy of this License with every copy of the Open Game Content You Distribute.</li>";
                        infoText += "<li>Use of Contributor Credits: You may not market or advertise the Open Game Content using the name of any Contributor unless You have written permission from the Contributor to do so.</li>";
                        infoText += "<li>Inability to Comply: If it is impossible for You to comply with any of the terms of this License with respect to some or all of the Open Game Content due to statute, judicial order, or governmental regulation then You may not Use any Open Game Material so affected. 13 Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.</li>";
                        infoText += "<li>Termination: This License will terminate automatically if You fail to comply with all terms herein and fail to cure such breach within 30 days of becoming aware of the breach. All sublicenses shall survive the termination of this License.</li>";
                        infoText += "<li>Reformation: If any provision of this License is held to be unenforceable, such provision shall be reformed only to the extent necessary to make it enforceable.</li>";
                        infoText += "<li>COPYRIGHT NOTICE</li>";
                        infoText += "</ol><p>Open Game License v 1.0a Copyright 2000, Wizards of the Coast, Inc.</p>";
                        infoText += "<p>System Reference Document Copyright 2000-2003, Wizards of the Coast, Inc.; Authors Jonathan Tweet, Monte Cook, Skip Williams, Rich Baker, Andy Collins, David noonan, Rich Redman, Bruce R. Cordell, based on original material by E. Gary Gygax and Dave Arneson.</p>";
                        infoText += "</div>";
                        sendChat(msg.who, infoText);
                        break;
                    }

                    if(args.length > 1 && args[1] === "help") {
                        var helpText = text;
                        helpText += "<h4>Possible Commands</h4>";
                        helpText += "<p><strong>!randomadv</strong>: This will generate a random adventure seed for you.</p>";
                        helpText += "<p><strong>!randomadv info</strong>: This will display information regarding the original source behind this API script.</p>";
                        helpText += "<p><strong>!randomadv</strong>: This will display this help information.</p>";
                        helpText += "<h4>Using the Adventure Seeds</h4>";
                        helpText += "<p>The basic format for the random adventure seed is the dramatic core taken from screenwriting: all plots can be boiled down the following sentence:<br />\"The main characters must [DO] [SOMETHING], but have to contend with [COMPLICATIONS] while being confronted by [OPPOSITION].\"</p>";
                        helpText += "<p>The \"do something\" is the focus of the adventure -- it\'s what drives the action. Splitting the \"do\" (the verb) and the \"something\" (the subject) into two categories can, admittedly, lead to some odd results, such as \"Rescue the Demon\"....but fantasy stories are filled with strange stories and bizarre plots.</p>";
                        helpText += "<h4>Example 1</h4>";
                        helpText += "<p>\"The main characters must [DEFEAT] [A PROPHECY], at [A FORTRESS], but have to contend with [POLITICS] while being confronted by [AN ARTIFACT].\"</p>";
                        helpText += "<p>Giving some thought to the result could lead to the following idea for an adventure:</p>";
                        helpText += "<p>The PCs are hired to bring supplies to a Fortress on the frontier. When they arrive, they discover that the garrison posted at the fortress is preparing to abandon their post. They have received word of a Barbarian horde approaching, and the Barbarian warlord is armed with an Artifact -- the Lance of Alatyr. There is a prophecy the wielder of the lance shall become the ruler of the world, and as such, the soldiers are afraid to stand against the horde.</p>";
                        helpText += "<p>The PCs must figure out a way to convince the soldiers to remain at their posts, and to defeat not only the oncoming barbarians, but their artifact-wielding warlord as well.</p>";
                        helpText += "<h4>Example 2</h4>";
                        helpText += "<p>\"The main characters must [ESCAPE FROM [A CASTLE], at [A WASTELAND, but have to contend with [LACK OF TRUST] while being confronted by [GOVERNMENT OFFICIAL].\"</p>";
                        helpText += "<p>This is a good alternative to the \"PCs meet in a tavern\" method of kicking off a campaign: </p>";
                        helpText += "<p>The PCs are captives at a prison on the middle of a wasteland, where the Kingdom puts Enemies of the State. They must overcome their distrust of their fellow prisoners and figure out a way to escape, all the while contending with the Governor of the Prison.</p>";
                        sendChat(msg.who, helpText);
                        break;
                    }

                    var adventureText = '/w gm '
                    +'<div style="margin-left: -40px; width: 113%; padding:1px 3px; border: 1px solid black; background: palegoldenrod; color: darkblue;">';
                    var doRollOne, doRollTwo, somethingRollOne, somethingRollTwo, locationRollOne, locationRollTwo, complicationRollOne, complicationRollTwo, oppositionRollOne, oppositionRollTwo;
                    var doResult, somethingResult, locationResult, complicationResult, oppositionResult;
                    adventureText += "The main characters must ";
                    doResult = do_table[randomInteger(8) - 1][randomInteger(8) - 1];
                    adventureText += doResult;
                    somethingResult = something_table[randomInteger(8) - 1][randomInteger(8) - 1];
                    adventureText += " " + somethingResult;
                    locationResult = location_table[randomInteger(8) - 1][randomInteger(8) - 1];
                    adventureText += " at " + locationResult;
                    complicationResult = complications_table[randomInteger(8) - 1][randomInteger(8) - 1];
                    if (complicationResult === "None") {
                        log(`No complication`);
                    }
                    else {
                        adventureText += ", but have to contend with " + complicationResult;
                    }
                    oppositionResult = opposition_table[randomInteger(8) - 1][randomInteger(8) - 1];
                    switch (oppositionResult) {
                        case 'None':
                            log(`No opposition`);
                            break;
                        case 'Roll Twice':
                            log(`Got Roll Twice`);
                            let oppositionResults = [];
                            let rollsCount = 2;
                            let newResult;
                            for(let i = 0; i < rollsCount; i++) {
                                newResult = opposition_table[randomInteger(8) - 1][randomInteger(8) - 1];
                                if(newResult === "None") {
                                    log("Result was None...adding nothing");
                                }
                                if(newResult === "Roll Twice") {
                                    log("Result was Roll Twice...not adding anything, but increasing rollCount by 2");
                                    rollCount += 2;
                                }
                                else {
                                    oppositionResults[oppositionResults.length] = newResult;
                                    log(`Added result: ${newResult}`);
                                }
                            }
                            switch (oppositionResults.length) {
                                case 0:
                                    log("No opposition")
                                    break;
                                case 1:
                                    adventureText += " while being confronted by " + oppositionResults[0];
                                    break;
                                case 2:
                                    adventureText += " while being confronted by " + oppositionResults[0] + " and " + oppositionResults[1];
                                    break;
                                default:
                                    log("More than 2 results");
                                    adventureText += " while being confronted by ";
                                    for(let a = 0; a < oppositionResults.length; a++) {
                                        if(a === oppositionResults.length -1) {
                                            adventureText += oppositionResults[a] + ", ";
                                        }
                                        else {
                                            adventureText += "and " + oppositionResults[a];
                                        }
                                    }
                                    break;
                            }
                            break;
                        default:
                            adventureText += " while being confronted by " + oppositionResult;
                            break;
                    }
                    adventureText += ".";
                    //sendChat(msg.who,text);
                    sendChat(msg.who+" - Random Adventure Generator",adventureText);
                    break;
                }
        }
    },

    RegisterEventHandlers = function() {
        on('chat:message', HandleInput);
	};

	return {
		RegisterEventHandlers: RegisterEventHandlers
	};
}());

on("ready",function() {
    'use strict';
    log(`**Random Adventure Generator** has started...`);
    RandomAdv.RegisterEventHandlers();
});
