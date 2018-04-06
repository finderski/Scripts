// Github:   https://github.com/finderski/Scripts/blob/master/SWSolitaire.js

/*global
   Campaign, sendChat, getObj, getAttrByName
*/

var SWSolitaire = SWSolitaire || (function() {
    'use strict';
    var version = '0.1',
        lastUpdate = '[Last Update: Mar 24, 2018, 7am]',
        Round = 0,
        chatOutputLength = 4,
        deck      = {},
        hand      = {},
        discards  = {},
        mook = {
            "2":{monsterName:"Arachnaur", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50412477/z6dUObndCLyB9fe3Obl9Cw/max.png?1521772789", rollMod:"-2"},
            "3":{monsterName:"Bargest", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423490/LDMdoeFf8osdOcTmD4YpBA/max.png?1521794757", rollMod:"0"},
            "4":{monsterName:"Crocotta", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423647/Id9B0GGL2QRedPtOQapkTg/max.png?1521795322", rollMod:"0"},
            "5":{monsterName:"Cyclops", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423687/c8eM77HUrz_4xhQXLUB4pg/max.png?1521795456", rollMod:"0"},
            "6":{monsterName:"Dissolver", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423741/8ZX4HxB5ZvpdhFjHInIjoA/max.png?1521795684", rollMod:"0"},
            "7":{monsterName:"Earth Elemental", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423797/aI7Z8gVEfs60NwkasOkY9A/max.png?1521795939", rollMod:"0"},
            "8":{monsterName:"Stone Gargoyle", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790412/DIcVfH1pWn_k1dwnAVT-Jg/max.png?1522227661", rollMod:"0"},
            "9":{monsterName:"Hobgoblin", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790412/DIcVfH1pWn_k1dwnAVT-Jg/max.png?1522227661", rollMod:"0"},
            "10":{monsterName:"Goblin Band", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790424/l1R-zj-MsY9Tuu6vi9agVA/max.png?1522227679", rollMod:"0"},
            "Jack":{monsterName:"Manticore", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790425/MsIiJbioTAC_h7V2PK0RoA/max.png?1522227685", rollMod:"0"},
            "Queen":{monsterName:"Nightmare", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790428/SDIUdRAoKRm6RnouBKyxGQ/max.png?1522227694", rollMod:"0"},
            "King":{monsterName:"Skeleton", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790430/uvslpbzPXXRtgBN8t0G3HQ/max.png?1522227700", rollMod:"0"},
            "Ace":{monsterName:"Band of 5 Goblins", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064410/F8tXzS5j3HGhOcdoOJOUOg/max.png?1522581985", rollMod:"0"}
        },
        
        WildCard = {
            2:{monsterName:"✪ Basalisk", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50412888/RI15PyPYtnrGOIhHkzm4eg/max.png?1521773305", rollMod:"-4", wcFailure:"Take [[2d6!]] damage and **Death Gaze**: make a Vigor roll against [[{1d12!+2,1d6!}kh1]] or suffer an additional automatic Wound"},
            3:{monsterName:"✪ Hydra", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064408/7OkN3sSP-yunbf1V0cN46A/max.png?1522581974", rollMod:"-2", wcFailure:"Take [[4d6!]] damage from **Multiple Heads**"},
            4:{monsterName:"✪ Chimera", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423668/bNJIlEvrQGtmROCC4dQ1uA/max.png?1521795402", rollMod:"0", wcFailure:"Take [[2d6!]] damage and **Fiery Breath**: make an Agility roll at -2 or suffer an additional [[2d10!]] points of damage"},
            5:{monsterName:"✪ Black Knight", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423706/qh_mJACVfyqLxZIIh9UbAg/max.png?1521795538", rollMod:"-2", wcFailure:"Take [[4d6!]] damage from **Its Balefire Greatsword**"},
            6:{monsterName:"✪ Dragon", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423767/r6G8f0IETct8SXkBNYNpTQ/max.png?1521795768", rollMod:"-6", wcFailure:"Take [[4d6!]] damage and **Fiery Breath**: make an Agility roll at -2 or suffer an additional [[2d10!]] points of damage"},
            7:{monsterName:"✪ Lava Golem", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50423824/LKXsqc3YuZ5gJ9ADO20E4g/max.png?1521796007", rollMod:"0", wcFailure:"Take [[2d6!]] damage and **Lava Spit**: make an Agility roll at -2 or suffer an additional [[2d10!]] points of damage"},
            8:{monsterName:"✪ Hellhound", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790538/uMVB_63CVkYu2jkRA0t0PQ/max.png?1522227885", rollMod:"-2", wcFailure:"Take [[2d6!]] damange and these are **Terrible Wounds**: Healing rolls, including magical and natural healing, are subject to a –2 penalty on top of any wound penalties; these apply to all subsequent healing rolls"},
            9:{monsterName:"✪ Wight", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064395/vLvqaELoUrDIzfD4EMKLCw/max.png?1522581943", rollMod:"-2", wcFailure:"Take [[2d6!]] damage and you are **Poisoned**: make a Vigor roll at –2. With success, the character gets the “shakes,” suffering –1 to *all trait* rolls for the rest of the game. On a wcFailure, the victim becomes immediately Incapacitated and dies."},
            10:{monsterName:"✪ Medusa", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790555/YB7_kwv75i5DPYnHcByE4A/max.png?1522227909", rollMod:"-4", wcFailure:"Take [[2d6!]] damage and make a Spirit Roll at +4 to avoid her **Petrifying Gaze**. On a wcFailure, you are turned to stone."},
            Jack:{monsterName:"✪ Mummy Lord", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/50790557/VDCwj-i5eSvULEFdL169pQ/max.png?1522227915", rollMod:"-2", wcFailure:"Take [[2d6!]] damage and must make a Vigor roll; if the Vigor roll fails, you have **Mummy Rot** and suffer an immediate additional Wound"},
            Queen:{monsterName:"✪ Lasher Demon", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064414/v-1NV919MWoI-Zk4zL7znA/max.png?1522581995", rollMod:"-4", wcFailure:"Take [[2d6!]] damage and must make a Vigor roll from the **Barbed Whip**; if the Vigor roll fails, you are shaken for [[1d6]] rounds and all actions suffer a -2; any futher Shaken outcomes result in wounds until you can recover from being Shaken."},
            King:{monsterName:"✪ Troll", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064403/u6mfUFoatVe4quHuOmYTYw/max.png?1522581963", rollMod:"-2", wcFailure:"Take [[4d6!]] damage from the Troll's **Claws**"},
            Ace:{monsterName:"✪ Liche", tokenURL:"https://s3.amazonaws.com/files.d20.io/images/51064399/V3PF8HrvoxUkJrKcYLKQTw/max.png?1522581954", rollMod:"-4", wcFailure:"Take [[4d6!]] damage and suffer an automatic wound from its **Death Touch**."}
        },
     
     cardStart =  '<div style="margin-left: -20px; background-color: white; border: 1px solid black; border-radius: 30px; width: 95%;padding: 10px;">',
     divStart =  '<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'
        +'<div style="font-weight: bold; border-bottom: 1px solid black;">',
     divEnd = '</div>',
     cardOutPut = '',
     
getDamage = function(callback) {
    var rollresult;
    rollresult = sendChat("Game","/r 2d6!", function(ops){
        var dmgresult = ops[0].content;
        dmgresult = JSON.parse(dmgresult);
        log("Damage Result: "+JSON.stringify(dmgresult));
        log("Damage Result Total: "+dmgresult.total);
        callback(dmgresult);
    });
},
//-----------------------------------------------------------------------------
// Card constructor function.
//-----------------------------------------------------------------------------
Card = function(cardRank, faceValue,cardSuit) {

  this.cardRank = cardRank;   //0-53 for sorting, higher # = higher initiative 
  this.faceValue = faceValue; // Face value of the card e.g. 2,3,4,5,6,7,8,9,10,Jack,Queen,King,Ace,Joker 
  this.cardSuit = cardSuit;   // Suit e.g. Spades, Hearts, Diamonds, Clubs
  
},

//=============================================================================
// Stack Object
//=============================================================================

//-----------------------------------------------------------------------------
// Stack constructor function.
//-----------------------------------------------------------------------------

Stack = function() {

  // Create an empty array of cards.

  this.cards = [];

  this.makeDeck  = stackMakeDeck;
  this.shuffle   = stackShuffle;
  this.deal      = stackDeal;
  this.draw      = stackDraw;
  this.addCard   = stackAddCard;
  this.combine   = stackCombine;
  this.cardCount = stackCardCount;
},

//-----------------------------------------------------------------------------
// stackMakeDeck(n): Initializes a stack using 1 deck of cards.
//-----------------------------------------------------------------------------
stackMakeDeck = function() {

    // create array of cards to hold the deck
    this.cards = [];

    // fill card deck array with cards: cardRank, shortName,longName)
    // this.cards[0]  = new Card( 0, "2C,"Clubs" );
    this.cards[0]  = new Card( 0,2,"Clubs" );
    this.cards[1]  = new Card( 1,2,"Diamonds" );
    this.cards[2]  = new Card( 2,2,"Hearts" );
    this.cards[3]  = new Card( 3,2,"Spades" );
    this.cards[4]  = new Card( 4,3,"Clubs" );
    this.cards[5]  = new Card( 5,3,"Diamonds" );
    this.cards[6]  = new Card( 6,3,"Hearts" );
    this.cards[7]  = new Card( 7,3,"Spades" );
    this.cards[8]  = new Card( 8,4,"Clubs" );
    this.cards[9]  = new Card( 9,4,"Diamonds" );
    this.cards[10] = new Card(10,4,"Hearts" );
    this.cards[11] = new Card(11,4,"Spades" );
    this.cards[12] = new Card(12,5,"Clubs" );
    this.cards[13] = new Card(13,5,"Diamonds" );
    this.cards[14] = new Card(14,5,"Hearts" );
    this.cards[15] = new Card(15,5,"Spades" );
    this.cards[16] = new Card(16,6,"Clubs" );
    this.cards[17] = new Card(17,6,"Diamonds" );
    this.cards[18] = new Card(18,6,"Hearts" );
    this.cards[19] = new Card(19,6,"Spades" );
    this.cards[20] = new Card(20,7,"Clubs" );
    this.cards[21] = new Card(21,7,"Diamonds" );
    this.cards[22] = new Card(22,7,"Hearts" );
    this.cards[23] = new Card(23,7,"Spades" );
    this.cards[24] = new Card(24,8,"Clubs" );
    this.cards[25] = new Card(25,8,"Diamonds" );
    this.cards[26] = new Card(26,8,"Hearts" );
    this.cards[27] = new Card(27,8,"Spades" );
    this.cards[28] = new Card(28,9,"Clubs" );
    this.cards[29] = new Card(29,9,"Diamonds" );
    this.cards[30] = new Card(30,9,"Hearts" );
    this.cards[31] = new Card(31,9,"Spades" );
    this.cards[32] = new Card(32,10,"Clubs" );
    this.cards[33] = new Card(33,10,"Diamonds" );
    this.cards[34] = new Card(34,10,"Hearts" );
    this.cards[35] = new Card(35,10,"Spades" );
    this.cards[36] = new Card(36,"Jack","Clubs" );
    this.cards[37] = new Card(37,"Jack","Diamonds" );
    this.cards[38] = new Card(38,"Jack","Hearts" );
    this.cards[39] = new Card(39,"Jack","Spades" );
    this.cards[40] = new Card(40,"Queen","Clubs" );
    this.cards[41] = new Card(41,"Queen","Diamonds" );
    this.cards[42] = new Card(42,"Queen","Hearts" );
    this.cards[43] = new Card(43,"Queen","Spades" );
    this.cards[44] = new Card(44,"King","Clubs" );
    this.cards[45] = new Card(45,"King","Diamonds" );
    this.cards[46] = new Card(46,"King","Hearts" );
    this.cards[47] = new Card(47,"King","Spades" );
    this.cards[48] = new Card(48,"Ace","Clubs" );
    this.cards[49] = new Card(49,"Ace","Diamonds" );
    this.cards[50] = new Card(50,"Ace","Hearts" );
    this.cards[51] = new Card(51,"Ace","Spades" );
    this.cards[52] = new Card(52,"Joker","Black" );
    this.cards[53] = new Card(53,"Joker","Red" );
    
},

//-----------------------------------------------------------------------------
// stackShuffle(n): Shuffles a stack of cards 'n' times. 
//-----------------------------------------------------------------------------

stackShuffle = function(n) {

  var i, j, k;
  var temp;

  // Shuffle the stack 'n' times.

  for (i = 0; i < n; i+=1) {
    for (j = 0; j < this.cards.length; j+=1) {
      k = Math.floor(Math.random() * this.cards.length);
      temp = this.cards[j];
      this.cards[j] = this.cards[k];
      this.cards[k] = temp;
    }
  }
},

//-----------------------------------------------------------------------------
// stackDeal(): Removes the first card in the stack and returns it.
//-----------------------------------------------------------------------------

stackDeal = function() {

  if (this.cards.length > 0) {
    return this.cards.shift();
  }
  else {
    return null;
  }

  },

//-----------------------------------------------------------------------------
// stackDraw(n): Removes the specified card from the stack and returns it.
//-----------------------------------------------------------------------------

stackDraw = function(n) {

  var card;

  if (n >= 0 && n < this.cards.length) {
    card = this.cards[n];
    this.cards.splice(n, 1);
  }
  else {
    card = null;
  }
  return card;
},

//-----------------------------------------------------------------------------
// stackAdd(card): Adds the given card to the stack.
//-----------------------------------------------------------------------------
stackAddCard = function(card) {

  this.cards.push(card);
},

//-----------------------------------------------------------------------------
// stackCombine(stack): Adds the cards in the given stack to the current one.
// The given stack is emptied.
//-----------------------------------------------------------------------------

stackCombine = function(stack) {

  this.cards = this.cards.concat(stack.cards);
  stack.cards = [];
},

//-----------------------------------------------------------------------------
// stackCardCount(): Returns the number of cards currently in the stack.
//-----------------------------------------------------------------------------
stackCardCount = function() {

  return this.cards.length;
},


//-----------------------------------------------------------------------------
// createDeck(): creates and shuffles init deck.  Use at start of scene.
//-----------------------------------------------------------------------------
createDeck = function(id) {

  deck     = new Stack();
  hand     = new Stack();
  discards = new Stack();

  deck.makeDeck();

  // var  who=getObj('player',id).get('_displayname').split(' ')[0];
  // sendChat('','/w '+who+" Action Deck reset." );
  shuffle();
  Round = 0;
},

//-----------------------------------------------------------------------------
// shuffle(): Returns shuffled deck
//-----------------------------------------------------------------------------
shuffle = function() {

  if (deck === null) { return; }

  deck.shuffle(1);
  sendChat('Game','/em Action Deck shuffled.' );
},
  
  

//-----------------------------------------------------------------------------
// discard(): moves cards in turn order into the discard pile in preparation for dealing
//-----------------------------------------------------------------------------
discard = function() {

  if (!hand.cards) {return;}

  discards.combine(hand);

},

//-----------------------------------------------------------------------------
// reset(): Moves all cards back into the deck in preparation for shuffle
//-----------------------------------------------------------------------------
reset = function() {

  if (!discards.cards) {return;}

  discards.combine(hand);
  deck.combine(discards);

},

//-----------------------------------------------------------------------------
// display(): sends contents of deck, hand, discard piles to chat
//-----------------------------------------------------------------------------
display = function(id) {

  var s, i;
    var  who=getObj('player',id).get('_displayname').split(' ')[0];
     

  if (!deck.cards) {
      sendChat('Game','/w '+who+'  Deck not built!  Run: !deal-init --reset');
      return;
      
  } 
  
  s = "";
  for (i = 0; i < deck.cardCount(); i+=1) {
    s += deck.cards[i].cardRank + ',' + deck.cards[i].faceValue + ',' + deck.cards[i].cardSuit + "<p>";
  }
  sendChat('Game','/w '+who+' ' + divStart + '<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
    	+'DealInit: Deck Cards</div>'+ s + divEnd );

  s = "";
  for (i = 0; i < hand.cardCount(); i+=1) {
    s += hand.cards[i].cardRank + ',' + hand.cards[i].faceValue + ',' + hand.cards[i].cardSuit + "<p>";
  }
  sendChat('Game','/w '+who+' ' + divStart + '<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
    	+'DealInit: Turn Order</div>'+ s + divEnd );

  s = "";
  for (i = 0; i < discards.cardCount(); i+=1) {
    s += discards.cards[i].cardRank + ',' + discards.cards[i].faceValue + ',' + discards.cards[i].cardSuit + "<p>";
  }
  sendChat('Game','/w '+who+' ' + divStart + '<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
    	+'DealInit: Discards</div>'+ s + divEnd );
},

//-----------------------------------------------------------------------------
// Determine Treasure
//-----------------------------------------------------------------------------
treasure = function(d100) {
    var cOutPut = '';
    var treasure = Math.floor(Math.random() * 10)+1;
    var magicTreasure = Math.floor(Math.random() * 100)+1;
    var magicItem;
			switch (Math.floor(Math.random() * 20+1)) {
				case 1:
				case 2:
					magicItem = "Armor or Shield (roll on Table 1A)";
					break;
				case 3:
				case 4:
				case 5:
					magicItem = "Melee Weapon (roll on Table 2A)";
					break;
				case 6:
				case 7:
					magicItem = "Ranged Weapon (roll on Table 3A)";
					break;
				case 8:
				case 9:
				case 10:
				case 11:
					magicItem = "Miscellaneous Item (roll on Table 4A)";
					break;
				case 12:
				case 13:
				case 14:
					magicItem = "Potion (roll on Table 5)";
					break;
				case 15:
				case 16:
					magicItem = "Ring (roll on Table 6)";
					break;
				case 17:
				case 18:
					magicItem = "Scroll (roll on Table 7A)";
					break;
				case 19:
					magicItem = "Tome (roll on Table 8)";
					break;
				case 20:
					magicItem = "Wand or Staff (roll on Table 9A)";
					break;
			}
    treasure = treasure * 100; //How many gold pieces are found...
    cOutPut += '<div style="display:block; width: 100%; text-align:center;margin-top:10px;">'
        +'You find '+treasure+' gold pieces';
    
    if (magicTreasure < 26) {
        //Magic item was found
					cOutPut +='<br />'
					+'and a magic ' + magicItem + '.';
    }
    else if(d100 < 26) {
        //If a benny is spent, a magic item was found
					cOutPut +='<br />'
					+'If you spend a benny, you also find a magic '+ magicItem + '.';
    }
    else {
        //No magic item was found
					cOutPut +='.'
    }
    return cOutPut;
},

//-----------------------------------------------------------------------------
// Determine Monster
//-----------------------------------------------------------------------------
encounter = function(card) {
    var cOutPut = '';
    var encounterName;
    var encounterURL;
    var wounds = Math.floor(Math.random() * 3)+1;
    var critWounds = wounds+1;
    var ruleSet;
    var d6Damage;
    getDamage( (damage) => d6Damage );
    //var specFailure = WildCard[card.faceValue].wcFailure;
    
    log("card: "+card);
    log("wounds: "+wounds);
    log("crit wounds: "+critWounds);
    
    if(Round < 8) { //Mook
        encounterName = mook[card.faceValue].monsterName;
        log("encounterName: "+encounterName);
        encounterURL = mook[card.faceValue].tokenURL;
        log("encounterURL: "+encounterURL);
        ruleSet = 'Use the Quick Combat rules to determine result.<br />'
            +'<ul>'
                +'<li>Combat skill roll is made at '+mook[card.faceValue].rollMod+'</li>'
                +"<li>If number of wounds taken doesn't incapacitate the character you win and may proceed</li>"
            +'</ul>'
            +'***Result of Quick Combat***<br />'
            +'**Raise**: Take a Benny!<br />'
            +'**Success**: Suffer 1 wound<br />'
            +'**Failure**: Suffer '+wounds;
            if(wounds === 1) {
                ruleSet += ' wound<br />';
            }
            else {
                ruleSet += ' wounds<br />';
            }
            ruleSet +='**Critical Failure**: Suffer '+critWounds+' wounds';
            //log("ruleSet: "+ruleSet);
    }
    else { //Wild Card
        encounterName = WildCard[card.faceValue].monsterName;
        log("encounterName: "+encounterName);
        encounterURL = WildCard[card.faceValue].tokenURL;
        log("encounterURL: "+encounterURL);
        log("d6Damage Value: "+d6Damage);
        ruleSet = 'Use the Quick Skirmish rules to determine result.<br />'
            +'<ul>'
                +'<li>Combat skill roll is made at '+WildCard[card.faceValue].rollMod+'</li>'
                +"<li>If number of wounds taken doesn't incapacitate the character before acquiring 3 Tokens you win and may proceed</li>"
            +'</ul>'
            +'***Result of Quick Combat***<br />'
            +'**Raise**: Take 2 tokens!<br />'
            +'**Success**: Take a token and  [[2d6!]] damage<br />'
            +'**Failure**: '+WildCard[card.faceValue].wcFailure+'<br />'
            +'**Critical Failure**: Lose a token and '+WildCard[card.faceValue].wcFailure;
            log("ruleSet: "+ruleSet);
    }
    cOutPut += '<div style="display:block; text-align: center; font-size:1.25em;font-weight:bold;">'+encounterName+'</div>'
        +'<div style="width: 55px; margin-top:-35px; text-align:left;"><img src="'+encounterURL+'" /></div>'
        +'<div style="display:block; text-align:left;font-size:.9em;">';
            cOutPut += ruleSet;
    cOutPut += '<div style="display:block; text-align: center; font-size:1.25em;">**Treasure**';
    return cOutPut;
},

//-----------------------------------------------------------------------------
// deal(): Deals card to Chat
//-----------------------------------------------------------------------------
deal = function(id) {
		Round = Round + 1;
		cardOutPut = 'Round: '+Round+'<br />'+cardStart;
    var i;
    var startTile;
    var  who=getObj('player',id).get('_displayname').split(' ')[0];
    var sendto = "";
    var d20 = Math.floor(Math.random() * 20)+1;
    var d6 = Math.floor(Math.random() * 6)+1;
    var d100 = Math.floor(Math.random() * 100)+1;
    var diceRolls = '<div style="display:block; width:100%;">'
        +'<div style="display:inline-block; width:32%;text-align: center;font-family:dicefontd20;">t</div>'
        + '<div style="display:inline-block; width:32%;text-align: center;font-family:dicefontd6;">f</div>'
        + '<div style="display:inline-block; width:32%;text-align: center;font-family:dicefontd10;">kj</div>'
    +'</div>'
    +'<div style="display:block; width:100%; margin-bottom: 20px;">'
        + '<div style="display:inline-block; width:32%;text-align: center;">'+d20+'</div>'
        + '<div style="display:inline-block; width:32%;text-align: center;">'+d6+'</div>'
        + '<div style="display:inline-block; width:32%;text-align: center;">'+d100+'</div>'
    +'</div>';
    // build deck if needed
    if (!deck.cards) { 
    createDeck(id);
    shuffle();
    }
    
    // move hand (current turn order) to discard pile
    if (hand.cards) { discards.combine(hand); }
    
    // shuffle if deck is empty
    if (deck.cardCount() === 0 ) {
    sendChat('Game','/em Out of Cards - shuffling discards.' );
    deck.combine(discards);
    shuffle();
    }
    
    if(Round === 1){
        //First round, deck has been reset
        log("round 1");
         if(shuffleDeck("-L7yqhH0jfyDMASWYXdu")){
            log("Deck shuffled");
        }
        startTile = drawCard("-L7yqhH0jfyDMASWYXdu","-L7ysfNC26DymgTOjp7a");
        //playCardToTable(drawCard("-L7yqhH0jfyDMASWYXdu"), {left: "350", top: "350",layer:"map"});
        playCardToTable(startTile, {left: "350", top: "350",layer:"map"});
    }
    
    // deal
    var nextcard = {};
    
    //Most of this for statement needs to be deleted...I need to look at the stuff starting with nextcard = deck.deal()
    
    // draw a card
    nextcard =  deck.deal();
    // store it in hand
    hand.addCard(nextcard);
    //need to get the associated action based on suit 
    //Hearts = Rest/Healing (90% of the time)
    //Diamonds = Treasure
    //Clubs = Monster (different depending on the round, Rds 1-7 = Mook; Rds 8+ = Wild Card)
    //Spades = Traps
    
    if(nextcard.cardSuit === "Hearts") {
        //Check if rest is an option...
        cardOutPut += '<div style="display:block; text-align: right; color: red;font-size:2em;">'+nextcard.faceValue+"♥</div>"
        + diceRolls;
        if(d100<11){
            //No rest for you!! A wandering monster happens by...
            cardOutPut += '<div style="display:block; width: 100%; text-align:center;margin-top:10px;">Just as you think you are going to get some rest...</div>'
        }
        else {
            //Get some Rest...
            cardOutPut += '<div style="display:block; width: 100%; text-align:center;margin-top:10px;">Make a Vigor roll (apply Wound Modifiers)</div>'
                + '<div style="display:block; width: 100%; text-align: left;">'
                    + '<ul>'
                        + '<li>**Raise**: Remove a wound for the Success and each Raise</li>'
                        + '<li>**Success**: Remove a wound</li>'
                        + '<li>**Failure**: No effect</li>'
                        + '<li>**Critical Failure**: Gain an additional wound</li>'
                    + '</ul>'
                + '</div>';
        }
    }
    else if(nextcard.cardSuit === "Diamonds") {
        cardOutPut += '<div style="display:block; text-align: right; color: red;font-size:2em;">'+nextcard.faceValue+"♦</div>"
        + '<div style="display:block; width:100%;">'
        + diceRolls;
        /*var treasure = Math.floor(Math.random() * 10)+1;
        var magicTreasure = Math.floor(Math.random() * 100)+1;
        var magicItem;
				switch (Math.floor(Math.random() * 20+1)) {
					case 1:
					case 2:
						magicItem = "Armor or Shield (roll on Table 1A)";
						break;
					case 3:
					case 4:
					case 5:
						magicItem = "Melee Weapon (roll on Table 2A)";
						break;
					case 6:
					case 7:
						magicItem = "Ranged Weapon (roll on Table 3A)";
						break;
					case 8:
					case 9:
					case 10:
					case 11:
						magicItem = "Miscellaneous Item (roll on Table 4A)";
						break;
					case 12:
					case 13:
					case 14:
						magicItem = "Potion (roll on Table 5)";
						break;
					case 15:
					case 16:
						magicItem = "Ring (roll on Table 6)";
					case 17:
					case 18:
						magicItem = "Scroll (roll on Table 7A)";
						break;
					case 19:
						magicItem = "Tome (roll on Table 8)";
						break;
					case 20:
						magicItem = "Wand or Staff (roll on Table 9A)";
						break;
				}
        treasure = treasure * 100; //How many gold pieces are found...
        cardOutPut += '<div style="display:block; width: 100%; text-align:center;margin-top:10px;">'
            +'You find '+treasure+' gold pieces';
        
        if (magicTreasure < 26) {
            
						cardOutPut +='<br />'
						+'and a magic ' + magicItem + '.';
        }
        else if(d100 < 26) {
            
						cardOutPut +='<br />'
						+'If you spend a benny, you also find a magic '+ magicItem + '.';
        }
        else {
            
						cardOutPut +='.'
        }*/
        cardOutPut += treasure(d100);
        cardOutPut += '</div>';
    }
    else if(nextcard.cardSuit === "Clubs") {
        cardOutPut += '<div style="display:block; text-align: right; color: black;font-size:2em;">'+nextcard.faceValue+"♣</div>"
        + '<div style="display:block; width:100%;">'
        + diceRolls;
        /*cardOutPut += '<div style="display:block; text-align: center; font-size:1.25em;font-weight:bold;">'+mook[nextcard.faceValue].monsterName+'</div>'
        +'<div style="display:block; text-align:left;font-size:.9em;">'
            +'Use Quick Skirmish rules to determine result.<br />'
            +'<ul>'
                +'<li>Combat skill roll is made at -6 (-8 if Shaken)</li>'
                +"<li>If number of wounds taken doesn't incapacitate the character you win and may proceed</li>"
            +'</ul>'
            +'***Result of Quick Combat***<br />'
            +'**Raise**: Take a Benny!<br />'
            +'**Success**: Suffer 1 wound<br />'
            +'**wcFailure**: Suffer '+wounds;
            if(wounds === 1) {
                cardOutPut += ' wound<br />';
            }
            else {
                cardOutPut += ' wounds<br />';
            }
            cardOutPut +='**Critical wcFailure**: Suffer '+critWounds+' wounds'
        +'<div style="display:block; text-align: center; font-size:1.25em;">**Treasure**';*/
        cardOutPut += encounter(nextcard);
        cardOutPut += treasure(d100);
        cardOutPut += '</div>'
    }
    else if(nextcard.cardSuit === "Spades") {
        cardOutPut += '<div style="display:block; text-align: right; color: black;font-size:2em;">'+nextcard.faceValue+"♠</div>"
        + '<div style="display:block; width:100%;">'
        + diceRolls;
    }
    else {
        //Is a Joker...
        cardOutPut += '<div style="display:block; text-align:center;color:red;font-size:2em;">**Joker**</div>';
    }
    
    cardOutPut += divEnd;
    
    sendChat('Game', cardOutPut);
    
},  // end deal

//-----------------------------------------------------------------------------
// dealInitiative(): load turn order with the deal
//-----------------------------------------------------------------------------
// every time we deal, we need to
// o pull turn order tokens
// o get names, ids, and init edges  
// o deal cards to hand, accounting for init edges and end of deck and jokers
// o no cards to custom items in init - set to -1 init to put them at the bottom
// o on recall and shuffle, don't destroy hand unless new scene/combat (createDeck)
// o sort the hand high to low
// o write the hand to turn order
dealInitiative =function(id) {
    // log('-=> DealInit: Calling [getInitiativeEdges] function <=- ');
     // pulls turn order tokens and fills initEdges object with names,ids,edges
    //getInitiativeEdges(id);
    // log('-=> DealInit: back from [getInitiativeEdges] function <=- ');
    deal(id);
},

//-----------------------------------------------------------------------------
// showHelp(): Display command line help in chat
//-----------------------------------------------------------------------------
showHelp = function(id) {
		
  var  who=getObj('player',id).get('_displayname').split(' ')[0];
        sendChat('Game',
			'/w '+who+' '
+'<div style="border: 1px solid black; background-color: white; padding: 3px 3px;">'
	+'<div style="font-weight: bold; border-bottom: 1px solid black;font-size: 130%;">'
		+'DealInit v'+version
	+'</div>'
	+'<div style="padding-left:10px;margin-bottom:3px;">'
		+'<p>DealInit supports Savage Worlds style card based Inititive by dealing cards to Turn Order and sorting the order by suit. </p>'
        +'<p>It does not, however, utilize the Roll20 deck system.  Instead it manages an array of cards that are reshuffled when the deck runs out or a joker is drawn.</p>'
        +'<p>It also checks Token Attributes for Any SW Inititative Edges and handles them appropriately.</p>'
        +'<p>Initiative Edges must be stored in a comma separated list in an Attribute named InitEdges. (e.g.  Qu,LH)</p'
        +'<p>The Edge shorthand is as follows:</p>'
        +'<p><b>Qui</b> = Quick</p>'
        +'<p><b>LH</b> = Level Headed</p>'
        +'<p><b>ILH</b> = Improved Level Headed</p>'
        +'<p><b>WCE</b> = Any Joker Activated Wild Card Edge</p>'
	+'</div>'
	+'<b>Commands</b>'
	+'<div style="padding-left:10px;">'
		+'<b><span style="font-family: serif;">!deal-init '+'[ <i>--help</i> ] [<i>--reset</i> ] [<i>--show</i> ]' +'</span></b>'
		+'<div style="padding-left: 10px;padding-right:20px">'
			+'<ul>'
    			+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">'+'(<i>no args</i>)'+'</span></b> '+' Deals cards to turn order and sorts by suit.'
				+'</li> '
    			+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">'+'--help'+'</span></b> '+' Displays this help.'
				+'</li> '
    			+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">'+'--reset'+'</span></b> '+' Reset the deck and shuffle.  Use at the start of a new scene or encounter.'
				+'</li> '
    			+'<li style="border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;">'
					+'<b><span style="font-family: serif;">'+'--show'+'</span></b> '+' Show the current contents of the deck, discard pile, and turn order.'
				+'</li> '
    		+'</ul>'
    	+'</div>'
    +'</div>'
+'</div>'
    		);
},


//-----------------------------------------------------------------------------
// handleInput(): Parse command line args
//-----------------------------------------------------------------------------
// possible args
// !deal-init 
// --help - show help (showHelp)
// (no args) - deal cards to items in turn order and sort turn order by suit (dealInitiative)
// --reset - creates and shuffles the deck, use at the start of combat/scene (init)
// --show - show the cards in turnorder, discard, draw piles (showCards)
handleInput = function(msg_orig) {
    
    var msg = _.clone(msg_orig);
    var args = [];
    if (msg.type !== "api") {
		return;
	 }



    args = msg.content
        .replace(/<br\/>\n/g, ' ')
        .replace(/(\{\{(.*?)\}\})/g," $2 ")
        .split(/\s+--/);
        


    // bail out if api call is not to deal-init
    if (args.shift() !== "!deal-init") {
        // log('-=> DealInit: Not calling [deal-init] exiting... <=- ');
		return;
	 }

    // print help
    if (args[0] === "help") {
        // log('-=> DealInit: Calling [showHelp] function <=- ');
        showHelp(msg.playerid);
        return;
	 }

    
    // reset the deck and shuffle 
    if (args[0] === "reset") {
    	// log('-=> DealInit: Calling [createDeck] function <=- ');
    	//log(mook);
        recallCards("-L7yqhH0jfyDMASWYXdu");
        //log(cardInfo({type:"deck",deckname:"Start Tiles"}));
        createDeck(msg.playerid);
				Round = 0;
        return;
	 }
    // print out the contents of turn order, discard, and draw piles
    if (args[0] === "show") {
        // log('-=> DealInit: Calling [display] function <=- ');
        display(msg.playerid);
        return;
	 }


    // log('-=> DealInit: Calling [dealInitiative] function <=- ');
    //dealInitiative(msg.playerid);
    
    deal(msg.playerid);
    // log('-=> DealInit: Back from [dealInitiative] function <=- ');
	 return;
    
}, // end handle input

//-----------------------------------------------------------------------------
// checkInstall(): Send version info to console log.
//-----------------------------------------------------------------------------
checkInstall = function() {
	log('-=> SWSolitaire v'+version+' <=- ' + lastUpdate);
},

//-----------------------------------------------------------------------------
// registerEventHandlers(): Get command line parser watching chat for DealInit commands
//-----------------------------------------------------------------------------
registerEventHandlers = function() {
	on('chat:message', handleInput);
};

//-----------------------------------------------------------------------------
// configure deal init on load
//-----------------------------------------------------------------------------
return {
	CheckInstall: checkInstall,
	RegisterEventHandlers: registerEventHandlers
};

}()); // end DealInit



//-----------------------------------------------------------------------------
// configure deal init on load
//-----------------------------------------------------------------------------
on("ready",function(){
   'use strict';
	SWSolitaire.CheckInstall();
	SWSolitaire.RegisterEventHandlers();
});

