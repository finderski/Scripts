// Github:   https://github.com/pelwer1/Deal-Init

/*global
   Campaign, sendChat, getObj, getAttrByName
*/

const rcg = (function() {
    'use strict';
    const version = '0.1',
        lastUpdate = '[Last Update: Apr 7, 2018, 9pm]',
        chatOutputLength = 4,
        cardOrder = ["first","second","third"];
    let deck      = {},
        hand      = {},
        discards  = {};
    /*const cardStart =  '<div style="background-color: white; border: 1px solid black; border-bottom: none; border-radius: 15px 15px 0px 0px; width: 250px; margin: 0px; padding-top:10px;">'
        +'<div style="display: block; width: 95%; padding-left: 10px;">',

          cardEnd = '<div style="background-color: white; border: 1px solid black; border-top: none; border-radius: 0px 0px 15px 15px; width: 250px; margin: 0px;">'
            +'<div style="display: block; width: 95%; padding-top: 10px;padding-left: 10px; text-align: right;">',*/
    const cardStart = '<div style="background-color: white; border: 1px solid black; border-bottom: none; border-radius: 15px 15px 0px 0px; width: 250px; margin: 0px; padding-top:10px;">'
        +'<div style="display: block; width: 95%; padding-left: 10px;">',

          cardContentStart = '<div style="background-color: white; border: 1px solid black; border-top: none; width: 230px; margin: 0px; padding: 10px; border-radius: 0px 0px 15px 15px;">',


          beginBox = '<div style="display:block; background-color: black; color: white; width: 100%; padding: 5px; text-align: center; margin: 10px;"> Begin Character Creation </div>',

          endBox = '<div style="display:block; background-color: black; color: white; width: 100%; padding: 5px; text-align: center; margin: 10px;"> End Character Creation </div>';

    let cardOutPut = '',
        cRace,
        cClass,
        cMaHindrance,
        cMiHindrance,
        cEdge = [],
        cGender,
        cSkills,
        cPowers = [],
        infoBoxText = '';

//},
//-----------------------------------------------------------------------------
// Card constructor function.
//-----------------------------------------------------------------------------
const Card = function(cardRank, faceValue, cardSuit, cardSymbol) {

  this.cardRank = cardRank;   //0-53 for sorting, higher # = higher initiative
  this.faceValue = faceValue; // Face value of the card e.g. 2,3,4,5,6,7,8,9,10,Jack,Queen,King,Ace,Joker
  this.cardSuit = cardSuit;   // Suit e.g. Spades, Hearts, Diamonds, Clubs
  this.cardSymbol = cardSymbol; //The symbol for the suit

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
    // this.cards[0]  = new Card( 0, "2C,"Clubs","♣" );
    this.cards[0]  = new Card( 0,2,"Clubs","♣" );
    this.cards[1]  = new Card( 1,2,"Diamonds","♦" );
    this.cards[2]  = new Card( 2,2,"Hearts","♥" );
    this.cards[3]  = new Card( 3,2,"Spades","♠" );
    this.cards[4]  = new Card( 4,3,"Clubs","♣" );
    this.cards[5]  = new Card( 5,3,"Diamonds","♦" );
    this.cards[6]  = new Card( 6,3,"Hearts","♥" );
    this.cards[7]  = new Card( 7,3,"Spades","♠" );
    this.cards[8]  = new Card( 8,4,"Clubs","♣" );
    this.cards[9]  = new Card( 9,4,"Diamonds","♦" );
    this.cards[10] = new Card(10,4,"Hearts","♥" );
    this.cards[11] = new Card(11,4,"Spades","♠" );
    this.cards[12] = new Card(12,5,"Clubs","♣" );
    this.cards[13] = new Card(13,5,"Diamonds","♦" );
    this.cards[14] = new Card(14,5,"Hearts","♥" );
    this.cards[15] = new Card(15,5,"Spades","♠" );
    this.cards[16] = new Card(16,6,"Clubs","♣" );
    this.cards[17] = new Card(17,6,"Diamonds","♦" );
    this.cards[18] = new Card(18,6,"Hearts","♥" );
    this.cards[19] = new Card(19,6,"Spades","♠" );
    this.cards[20] = new Card(20,7,"Clubs","♣" );
    this.cards[21] = new Card(21,7,"Diamonds","♦" );
    this.cards[22] = new Card(22,7,"Hearts","♥" );
    this.cards[23] = new Card(23,7,"Spades","♠" );
    this.cards[24] = new Card(24,8,"Clubs","♣" );
    this.cards[25] = new Card(25,8,"Diamonds","♦" );
    this.cards[26] = new Card(26,8,"Hearts","♥" );
    this.cards[27] = new Card(27,8,"Spades","♠" );
    this.cards[28] = new Card(28,9,"Clubs","♣" );
    this.cards[29] = new Card(29,9,"Diamonds","♦" );
    this.cards[30] = new Card(30,9,"Hearts","♥" );
    this.cards[31] = new Card(31,9,"Spades","♠" );
    this.cards[32] = new Card(32,10,"Clubs","♣" );
    this.cards[33] = new Card(33,10,"Diamonds","♦" );
    this.cards[34] = new Card(34,10,"Hearts","♥" );
    this.cards[35] = new Card(35,10,"Spades","♠" );
    this.cards[36] = new Card(36,"J","Clubs","♣" );
    this.cards[37] = new Card(37,"J","Diamonds","♦" );
    this.cards[38] = new Card(38,"J","Hearts","♥" );
    this.cards[39] = new Card(39,"J","Spades","♠" );
    this.cards[40] = new Card(40,"Q","Clubs","♣" );
    this.cards[41] = new Card(41,"Q","Diamonds","♦" );
    this.cards[42] = new Card(42,"Q","Hearts","♥" );
    this.cards[43] = new Card(43,"Q","Spades","♠" );
    this.cards[44] = new Card(44,"K","Clubs","♣" );
    this.cards[45] = new Card(45,"K","Diamonds","♦" );
    this.cards[46] = new Card(46,"K","Hearts","♥" );
    this.cards[47] = new Card(47,"K","Spades","♠" );
    this.cards[48] = new Card(48,"A","Clubs","♣" );
    this.cards[49] = new Card(49,"A","Diamonds","♦" );
    this.cards[50] = new Card(50,"A","Hearts","♥" );
    this.cards[51] = new Card(51,"A","Spades","♠" );
    this.cards[52] = new Card(52,"Joker","Black"," " );
    this.cards[53] = new Card(53,"Joker","Red"," " );

},

rollD6 = function(numDice) {
    // define a function that rolls a d6 and handle exploding.
    // returns an array of the rolled values, like [4] or [6,6,3]
    const getD6e = () => {
      let acc=[];
      while(acc.push(randomInteger(6)) && acc[acc.length-1]===6) /* {} */; // empty body
      return acc;
    };

    // define a function that calls getD6e n times and returns an array of all the rolls
    // for example with n=2: [3,5] or [6,2,5] or [6,2,6,6,3]
    const getNd6e = (n) => [...Array(n).keys()].reduce((m)=>[...m,...getD6e()],[]);

    // sum the array returned for 2d6!
    return getNd6e(numDice).reduce((m,v)=>m+v);
},

//-----------------------------------------------------------------------------
// stackShuffle(n): Shuffles a stack of cards 'n' times.
//-----------------------------------------------------------------------------

stackShuffle = function(n) {

  let i, j, k;
  let temp;

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

  let card;

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
},

//-----------------------------------------------------------------------------
// shuffle(): Returns shuffled deck
//-----------------------------------------------------------------------------
shuffle = function(info) {

  if (deck === null) { return; }

  deck.shuffle(1);
  if (info === null) {
      sendChat('','/em Deck shuffled.' );
  }
  else {
      sendChat('','/em Deck shuffled for '+info);
  }
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

  let s, i;
    let  who=getObj('player',id).get('_displayname').split(' ')[0];


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
// deal(): Deals card to Chat
//-----------------------------------------------------------------------------
deal = function(id) {
    let i,
        startTile,
        who=getObj('player',id).get('_displayname').split(' ')[0],
        sendto = "";
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

    // deal
    let nextcard = {},
        charcards = {},
        gearcards = {},
        ABcards = {},
        cardColor = "black";
    const first = "first",
          second = "second",
          third = "third";
    // draw a cards for Basic Info
    for(i=0; i<3; i++) {
        nextcard = deck.deal();

        charcards[cardOrder[i]] = nextcard;
        switch(nextcard.cardSuit) {
            case "Spades":
                if (i === 1){ cRace = "Human"; }
                if (i === 2){ cClass = "Fighter";}
                break;
            case "Clubs":
                if (i === 1){ cRace = "Elf"; }
                if (i === 2){ cClass = "Wizard";}
                break;
            case "Hearts":
                if (i === 1){ cRace = "Half-folk"; }
                if (i === 2){ cClass = "Cleric";}
                break;
            case "Diamonds":
                if (i === 1){ cRace = "Dwarf"; }
                if (i === 2){ cClass = "Rogue";}
                break;
            case "Red":
                if (i === 1){ cRace = "Half-orc"; }
                if (i === 2){ cClass = "Cleric or Rogue";}
                break;
            case "Black":
                if (i === 1){ cRace = "Half-elf"; }
                if (i === 2){ cClass = "Fighter or Wizard";}
                break;
        }
        hand.addCard(nextcard);

    }
    //log("Number of Cards: "+charcards.length);
    //log("charcards = "+JSON.stringify(charcards));
    //charcards = JSON.parse(charcards);
    //log("charcards (Parsed): "+JSON.stringify(charcards.first));
    //Display first cards
    cardOutPut = beginBox
    +cardStart;

    for (i=0; i<3; i++) {
        if (charcards[cardOrder[i]].cardSuit === "Clubs" || charcards[cardOrder[i]].cardSuit === "Spades") { cardColor = "black"; }
        else { cardColor = "red"; }
        log("card "+i+" suit: "+charcards[cardOrder[i]].cardSuit+"; card color: "+cardColor);
        cardOutPut += '<div style="width: 31%; display: inline-block; margin:0px;">'
                        +'<span style="font-size: 2em;display:block;width:100%; text-align:center;color: '+cardColor+';">'+charcards[cardOrder[i]].faceValue+'</span>'
                        +'<span style="font-size: 1.5em;display:block;width:100%; text-align:center;color: '+cardColor+';">'+charcards[cardOrder[i]].cardSymbol+'</span>'
                    +'</div>';
    }
    cardOutPut += '</div>'
    +'</div>';

    //Begin the content of the Card section.
    cardOutPut += cardContentStart;
    cEdge = [];
    log("Reset Edges: "+cEdge);
    for (i=0; i<3; i++) {
        /*if (charcards[cardOrder[i]].cardSuit === "Clubs" || charcards.first.cardSuit === "Spades") { cardColor = "black"; }
        else { cardColor = "red"; }
        cardOutPut += cardStart
                +'<span style="font-size: 2em;display:block;width:35px; text-align:center;color: '+cardColor+';">'+charcards[cardOrder[i]].faceValue+'</span>'
                +'<span style="font-size: 1.5em;display:block;width:35px; text-align:center;color: '+cardColor+';">'+charcards[cardOrder[i]].cardSymbol+'</span>'
            +'</div>'
        +'</div>'*/
        //cardOutPut +='<div style="background-color: white; border: 1px solid black; border-bottom: none; border-top: none; width: 230px; margin: 0px; padding: 10px;">';
        switch(i) {
            /*-----------------------------------------------------------------------------
            -- First Card: Sex,
            -------------------------------------------------------------------------------*/
            case 0: //First Card

                //Determine Gender
                //cardOutPut += "**Gender**: ";
                if (charcards[cardOrder[i]].faceValue === "Joker") {
                    //cardOutPut += "You choose";
                    cGender = "You choose";
                }
                else if(cardColor === "red") {
                    //cardOutPut += "Female";
                    cGender = "Female";
                }
                else { //card is black
                    //cardOutPut += "Male";
                    cGender = "Male";
                }
                //Determine Major Hindrance
                //cardOutPut += "<br /><br />**Hindrance (Major)**: ";
                if (charcards[cardOrder[i]].faceValue === "Joker") {
                    if (charcards[cardOrder[i]].cardSuit === "Red") {
                        //cardOutPut += "Elderly (Your Strength and Vigor drop by one die type as per standard rules, but you get to increase all the skills from your class by one die type.)<br />";
                        cMaHindrance = 'Elderly (Your Strength and Vigor drop by one die type as per standard rules, but you get to increase all the skills from your class by one die type.)<br />';
                    }
                    else {
                        //cardOutPut += "<br /><br />Hindrance (Major): Young (Two base Attributes of your choice drop by one die type. The skills you receive from your class are lowered by one die type. All other effects apply as usual—i.e. you get an extra Benny and receive -1 Size.)<br />";
                        cMaHindrance = 'Young (Two base Attributes of your choice drop by one die type. The skills you receive from your class are lowered by one die type. All other effects apply as usual—i.e. you get an extra Benny and receive -1 Size.)';
                    }
                }
                else {
                    switch(charcards[cardOrder[i]].faceValue) {
                        case 2://fall through
                        case 3:
                            //cardOutPut += 'Bad Luck<br />';
                            cMaHindrance = 'Bad Luck';
                            break;
                        case 4:
                            //cardOutPut += 'Arrogant<br />';
                            cMaHindrance = 'Arrogant';
                            break;
                        case 5:
                            //cardOutPut += 'Code of Honor<br />';
                            cMaHindrance = 'Code of Honor';
                            break;
                        case 6:
                            //cardOutPut += 'One Eye<br />';
                            cMaHindrance = 'One Eye';
                            break;
                        case 7:
                            //cardOutPut += 'Lame<br />';
                            cMaHindrance = 'Lame';
                            break;
                        case 8:
                            //cardOutPut += 'Big Mouth<br />';
                            cMaHindrance = 'Big Mouth';
                            break;
                        case 9:
                            //cardOutPut += 'Overconfident<br />';
                            cMaHindrance = 'Overconfident';
                            break;
                        case 10:
                            //cardOutPut += 'Yellow<br />';
                            cMaHindrance = 'Yellow';
                            break;
                        case "J":
                            //cardOutPut += 'Clueless<br />';
                            cMaHindrance = 'Clueless';
                            break;
                        case "Q":
                            if (cRace === "Half-folk") {
                                //cardOutPut += 'Yellow<br />';
                                cMaHindrance = 'Yellow';
                            }
                            else {
                                //cardOutPut += 'Bloodthirsty<br />';
                                cMaHindrance = 'Bloodthirsty';
                            }
                            break;
                        case "K":
                            //cardOutPut += 'Heroic<br />';
                            cMaHindrance = 'Heroic';
                            break;
                        case "A":
                            //cardOutPut += 'Curious<br />';
                            cMaHindrance = 'Curious';
                            break;
                    }
                }

                //Done with First Card Info
                break;
            /*-----------------------------------------------------------------------------
            -- Second Card: Race
            -------------------------------------------------------------------------------*/
            case 1: //Second Card
                /*let racialAtt = '(Apply the appropriate racial abilities; attributes begin at d6 and ';
                cardOutPut += "**Race**: ";
                if (cRace === "Half-orc") {
                    cardOutPut += "Half-orc "+racialAtt+'Strength begins at d8)';
                }
                else if (cRace === "Half-elf"){
                    cardOutPut += "Half-elf "+racialAtt+'choose one Attribute that begins at d8)';
                }
                else if (cRace === "Human") {
                    cardOutPut += "Human (You don’t receive the usual free Edge; all attributes begin at d6—freely choose one attribute and increase it to d8. *Note*: you can choose which Attribute to increase based on your class, so check the third card now!)";
                }
                else if(cRace === "Half-folk") {
                    cardOutPut += "Half-folk "+racialAtt+'Spirit begins at d8)';
                }
                else if(cRace === "Dwarf") {
                    cardOutPut += "Dwarf "+racialAtt+'Vigor begins at d8)';
                }
                else { //card is Clubs, so race is Elf
                    cardOutPut += "Elf "+racialAtt+'Agility begins at d8)';
                }
                cardOutPut += '<br />';*/
                //Determine Minor Hindrance
                //cardOutPut += "<br /><br />**Hindrance (Minor)**: ";
                switch(charcards[cardOrder[i]].faceValue) {
                    case 2:
                        if (cRace === "Elf") {
                            //cardOutPut += 'Anemic<br />';
                            cMiHindrance = "Anemic";
                        }
                        else {
                            //cardOutPut += 'Obese<br />';
                            cMiHindrance = "Obese";
                        }
                        break;
                    case 3:
                        //cardOutPut += 'Stubborn<br />';
                        cMiHindrance = "Stubborn";
                        break;
                    case 4:
                        //cardOutPut += 'Outsider<br />';
                        cMiHindrance = "Outsider";
                        break;
                    case 5:
                        if(cClass === "Fighter") {
                            //cardOutPut += "Illiterate<br />";
                            cMiHindrance = "Illiterate";
                        }
                        else if (cClass === "Fighter or Wizard") {
                            //cardOutPut += "Fighter gains Illiterate, Wizard gains Pacifist<br />";
                            cMiHindrance = "Pacifist or Illiterate";
                        }
                        else {
                            //cardOutPut += 'Pacifist<br />';
                            cMiHindrance = "Pacifist";
                        }
                        break;
                    case 6:
                        //cardOutPut += 'Anemic<br />';
                        cMiHindrance = "Anemic";
                        break;
                    case 7:
                        if (cClass === "Wizard" || cClass === "Cleric") {
                            //cardOutPut += 'Cautious<br />';
                            cMiHindrance = "Cautious";
                        }
                        else if (cClass === "Fighter or Wizard") {
                            //cardOutPut += "Fighter gains Illiterate, Wizard gains Cautious<br />";
                            cMiHindrance = "Illiterate or Cautious";
                        }
                        else if (cClass === "Cleric or Rogue") {
                            //cardOutPut += "Rogue gains Illiterate, Cleric gains Cautious<br />";
                            cMiHindrance = "Illiterate or Cautious";
                        }
                        break;
                    case 8:
                        //cardOutPut += 'Big Mouth<br />';
                        cMiHindrance = "Big Mouth";
                        break;
                    case 9:
                        if (cRace === "Elf") { /*cardOutPut += 'Stubborn<br />';*/ cMiHindrance="Stubborn";}
                        else { /*cardOutPut += 'All Thumbs<br />';*/ cMiHindrance="All Thumbs";}
                        break;
                    case 10:
                        //cardOutPut += 'Mean<br />';
                        cMiHindrance = "Mean";
                        break;
                    case "J":
                        //cardOutPut += 'Loyal<br />';
                        cMiHindrance = "Loyal";
                        break;
                    case "Q":
                        if (cRace === "Elf") { /*cardOutPut += 'Outsider<br />';*/ cMiHindrance = "Outsider"; }
                        else { /*cardOutPut += 'Ugly<br />';*/ cMiHindrance = "Ugly"; }
                        break;
                    case "K":
                        //cardOutPut += 'Cautious<br />';
                        cMiHindrance = "Cautious";
                        break;
                    case "A":
                        //cardOutPut += 'Habit<br />';
                        cMiHindrance = "Habit";
                        break;
                    case "Joker":
                        //cardOutPut += 'No Minor Hindrance!<br />'
                        cMiHindrance = "None";
                }
                //Done with second card info
                break;

            /*-----------------------------------------------------------------------------
            -- Third Card: Class
            -------------------------------------------------------------------------------*/
            case 2: //Third Card
                //cardOutPut += "**Class**: ";
                if (charcards[cardOrder[i]].faceValue === "Joker") {
                    if (charcards[cardOrder[i]].cardSuit === "Red") {
                        /*cardOutPut += "Choose between Cleric & Rogue<br />"
                        +'*Cleric*: **Faith** d6, **Fighting** d6, **Healing** d6, **Intimidation** d6, **Persuasion** d6. **Arcane Background (Miracles)**.<br /><br />'
                        +'*Rogue*: **Fighting** d6, **Notice** d6, **Stealth** d6, **Streetwise** d6. You can also choose two of the following skills, at a d6: **Climbing**, **Gambling**, **Lockpicking**, **Persuasion**, **Shooting**, **Swimming**, or **Throwing**.';*/
                        cSkills = "Choose between Cleric & Rogue<br />"
                        +'*Cleric*: **Faith** d6, **Fighting** d6, **Healing** d6, **Intimidation** d6, **Persuasion** d6. **Arcane Background (Miracles)**.<br /><br />'
                        +'*Rogue*: **Fighting** d6, **Notice** d6, **Stealth** d6, **Streetwise** d6. You can also choose two of the following skills, at a d6: **Climbing**, **Gambling**, **Lockpicking**, **Persuasion**, **Shooting**, **Swimming**, or **Throwing**';
                    }
                    else {
                        /*cardOutPut += "Choose between Fighter & Wizard<br />"
                        +'*Fighter*: **Fighting** d10, **Intimidation** d6, You can also choose one of the following skills, at a d6: **Climbing**, **Healing**, **Shooting**, **Swimming**, or **Throwing**.<br /><br />'
                        +'*Wizard*: **Fighting** d4, **Knowledge (Magic and Occult)** d6, **Investigation** d6, **Notice** d6, **Spellcasting** d8. **Arcane Background (Magic)**.';*/
                        cSkills = "Choose between Fighter & Wizard<br />"
                        +'*Fighter*: **Fighting** d10, **Intimidation** d6, You can also choose one of the following skills, at a d6: **Climbing**, **Healing**, **Shooting**, **Swimming**, or **Throwing**.<br /><br />'
                        +'*Wizard*: **Fighting** d4, **Knowledge (Magic and Occult)** d6, **Investigation** d6, **Notice** d6, **Spellcasting** d8. **Arcane Background (Magic)**';
                    }
                }
                else if (cClass === "Fighter") {
                    /*cardOutPut += "Fighter<br />"
                        +'**Fighting** d10, **Intimidation** d6, You can also choose one of the following skills, at a d6: **Climbing**, **Healing**, **Shooting**, **Swimming**, or **Throwing**.';*/
                    cSkills = '**Fighting** d10, **Intimidation** d6, You can also choose one of the following skills, at a d6: **Climbing**, **Healing**, **Shooting**, **Swimming**, or **Throwing**';
                }
                else if(cClass === "Cleric") {
                    /*cardOutPut += "Cleric<br />"
                        +'**Faith** d6, **Fighting** d6, **Healing** d6, **Intimidation** d6, **Persuasion** d6. **Arcane Background (Miracles)**.';*/
                    cSkills = '**Faith** d6, **Fighting** d6, **Healing** d6, **Intimidation** d6, **Persuasion** d6';
                    cEdge[cEdge.length] = "Arcane Background (Miracles)";
                }
                else if(cClass === "Rogue") {
                    /*cardOutPut += "Rogue<br />"
                    +'**Fighting** d6, **Notice** d6, **Stealth** d6, **Streetwise** d6. You can also choose two of the following skills, at a d6: **Climbing**, **Gambling**, **Lockpicking**, **Persuasion**, **Shooting**, **Swimming**, or **Throwing**.';*/
                    cSkills = '**Fighting** d6, **Notice** d6, **Stealth** d6, **Streetwise** d6. You can also choose two of the following skills, at a d6: **Climbing**, **Gambling**, **Lockpicking**, **Persuasion**, **Shooting**, **Swimming**, or **Throwing**';
                }
                else { //card is Clubs
                    /*cardOutPut += "Wizard<br />"
                        +'**Fighting** d4, **Knowledge (Magic and Occult)** d6, **Investigation** d6, **Notice** d6, **Spellcasting** d8. **Arcane Background (Magic)**.';*/
                    cSkills = '**Fighting** d4, **Knowledge (Magic and Occult)** d6, **Investigation** d6, **Notice** d6, **Spellcasting** d8';
                    cEdge[cEdge.length] = "Arcane Background (Magic)"
                }
                //Determine edges
                //cardOutPut += "<br /><br />**Edge(s)**: ";

                //Probably need to check for Joker here so I can run through this Switch a few times if a Joker is drawn
                let edgeDeck = [];
                log("Edge Deck (start): "+edgeDeck);
                edgeDeck[edgeDeck.length] = charcards[cardOrder[i]].faceValue;
                if(charcards[cardOrder[i]].faceValue === "Joker") {
                    log("Third Card is a Joker");
                    //Draw two more cards
                    if(cMaHindrance === "Bad Luck" || cMiHindrance === "Bad Luck") {
                        log("Character has Bad Luck");
                        let a = 0;
                        for (a=0; a<2; a++) {
                            nextcard = deck.deal();
                            edgeDeck[edgeDeck.length] = nextcard.faceValue;
                            log("Next Card Face value: "+nextcard.faceValue);
                            hand.addCard(nextcard);
                        }
                        log(edgeDeck);
                    }
                    else {
                        log("Character doesn't have Bad Luck");
                        cEdge[cEdge.length] = "Luck";
                        edgeDeck = []; //reset the Edge Deck because the edge has been taken
                        log("Edge Deck: "+edgeDeck);
                    }

                }
                log("Edge Deck (after check for Joker): "+edgeDeck);
                let z;
                for (z = 0; z<edgeDeck.length; z++) {
                    //switch(charcards[cardOrder[i]].faceValue) {
                    switch(edgeDeck[z]) {
                        case 2:
                            //cardOutPut += 'Alertness<br />';
                            cEdge[cEdge.length] = "Alertness";
                            break;
                        case 3:
                            if (cClass === "Wizard") { /*cardOutPut += "Scholar<br />";*/ cEdge[cEdge.length] = "Scholar"; }
                            else if( cClass === "Fighter or Wizard") {
                                //cardOutPut += "Fighter gains Brawler, Wizard gains Scholar<br />";
                                cEdge[cEdge.length] = "Fighter gains Brawler, Wizard gains Scholar";
                            }
                            else { /*cardOutPut += 'Brawler<br />';*/ cEdge[cEdge.length] = "Brawler"; }
                            break;
                        case 4:
                            //cardOutPut += 'Hard to Kill<br />';
                            cEdge[cEdge.length] = "Hard to Kill";
                            break;
                        case 5:
                            if(cClass === "Wizard" || cClass === "Cleric") { /*cardOutPut += 'Strong Willed<br />';*/ cEdge[cEdge.length] = "Strong Willed"; }
                            else if (cClass === "Fighter or Wizard") { /*cardOutPut += 'Fighter gains Ambidextrous, Wizard gains Strong Willed<br />';*/ cEdge[cEdge.length] = "Fighter gains Ambidextrous, Wizard gains Strong Willed" }
                            else if (cClass === "Cleric or Rogue") { /*cardOutPut += 'Cleric gains Strong Willed, Rogue gains Ambidextrous<br />';*/ cEdge[cEdge.length] = "Rogue gains Ambidextrous, Cleric gains Strong Willed"; }
                            else { /*cardOutPut += 'Ambidextrous (Wizard & Cleric gains Strong Willed instead)<br />';*/ cEdge[cEdge.length] = "Ambidextrous"; }
                            break;
                        case 6:
                            //cardOutPut += 'Quick<br />';
                            cEdge[cEdge.length] = "Quick";
                            break;
                        case 7:
                            if (cClass === "Fighter") { /*cardOutPut += "Trademark Weapons<br />";*/ cEdge[cEdge.length] = "Trademark Weapon"; }
                            else if(cClass === "Fighter or Wizard") { /*cardOutPut += "Fighter gains Trademark Weapons, Wizard gains Nerves of Steel<br />";*/ cEdge[cEdge.length] = "Fighter gains Trademark Weapon, Wizard gains Nerves of Steel"; }
                            else { /*cardOutPut += 'Nerves of Steel<br />';*/ cEdge[cEdge.length] = "Nerves of Steel"; }
                            break;
                        case 8:
                            //cardOutPut += 'Common Bond<br />';
                            cEdge[cEdge.length] = "Common Bond";
                            break;
                        case 9:
                            if (cMaHindrance === "Yellow" || cMiHindrance === "Yellow") { /*cardOutPut += "Fleet-footed<br />";*/ cEdge[cEdge.length] = "Fleet-footed"; }
                            else { /*cardOutPut += 'Brave<br />';*/ cEdge[cEdge.length] = "Brave"; }
                            break;
                        case 10:
                            //cardOutPut += 'Strong Willed<br />';
                            cEdge[cEdge.length] = "Strong willed";
                            break;
                        case "J":
                            if (cRace === "Dwarf" || cRace === "Half-orc") { /*cardOutPut += "Liquid Courage<br />";*/ cEdge[cEdge.length] = "Liquid Courage"; }
                            else if (cMaHindrance === "Ugly" || cMiHindrance === "Ugly") { /*cardOutPut += "Strong Willed<br />";*/ cEdge[cEdge.length] = "Strong Willed"; }
                            else { /*cardOutPut += 'Attractive<br />';*/ cEdge[cEdge.length] = "Attractive"; }
                            break;
                        case "Q":
                            //cardOutPut += 'Elan<br />';
                            cEdge[cEdge.length] = "Elan";
                            break;
                        case "K":
                            //cardOutPut += 'Charismatic<br />';
                            cEdge[cEdge.length] = "Charismatic";
                            break;
                        case "A":
                            if (cRace === "Elf") { /*cardOutPut += 'Alertness<br />';*/ cEdge[cEdge.length] = "Alertness"; }
                            else if(cMaHindrance === "Obese" || cMiHindrance === "Obese") { /*cardOutPut += 'Charismatic<br />';*/ cEdge[cEdge.length] = "Charismatic"; }
                            else { /*cardOutPut += 'Brawny<br />';*/ cEdge[cEdge.length] = "Brawny"; }
                            break;
                    }
                }

                //Done with Third Card Info
                break;
        }
        //cardOutPut +='</div>'
        /*+cardEnd
                +'<span style="font-size: 1.5em;display:block; width:35px; text-align:center;margin-bottom:5px; margin-left:202px;color: '+cardColor+';">'+charcards[cardOrder[i]].cardSymbol+'</span>'
                +'<span style="font-size: 2em;display:block;width:35px; text-align:center;margin-bottom:10px; margin-left:202px;color: '+cardColor+';">'+charcards[cardOrder[i]].faceValue+'</span>'
            +'</div>'
        +'</div>'*/
        //+'<br />';
    }
    let trapping;
    if(cClass === "Wizard" || cClass === "Cleric" || cClass === "Cleric or Rogue" || cClass === "Fighter or Wizard") {
        //need to draw cards for AB Powers
        cPowers = [];
        if(cClass === "Wizard" || cClass === "Fighter or Wizard") {
            cPowers[cPowers.length] = 'Detect/Conceal Arcana';
            for(i = 0; i<2; i++) {
                nextcard = deck.deal();
                hand.addCard(nextcard);
                log("AB Card Drawn: "+nextcard.cardSymbol+nextcard.faceValue);
                if(nextcard.faceValue === "Joker"){
                    i = i-2;
                }
                switch(randomInteger(6)) {
                    case 1:
                        trapping = 'Sound/Force';
                        break;
                    case 2:
                        trapping = 'Light/Electricity';
                        break;
                    case 3:
                        trapping = 'Fire/Heat/earth';
                        break;
                    case 4:
                        trapping = 'Ice/Cold/Air';
                        break;
                    case 5:
                        trapping = 'Nature/Acid/Earth';
                        break;
                    case 6:
                        trapping = 'Darkness/Necromancy';
                        break;
                }
                switch(nextcard.faceValue) {
                    case 2:
                        cPowers[cPowers.length] = 'Armor ('+trapping+')';
                        break;
                    case 3:
                        cPowers[cPowers.length] = 'Bolt ('+trapping+')';
                        break;
                    case 4:
                        cPowers[cPowers.length] = 'Burst ('+trapping+')';
                        break;
                    case 5:
                        cPowers[cPowers.length] = 'Deflection ('+trapping+')';
                        break;
                    case 6:
                        cPowers[cPowers.length] = 'Confusion ('+trapping+')';
                        break;
                    case 7:
                        cPowers[cPowers.length] = 'Environmental Protection ('+trapping+')';
                        break;
                    case 8:
                        cPowers[cPowers.length] = 'Entangle ('+trapping+')';
                        break;
                    case 9:
                        cPowers[cPowers.length] = 'Light/Obscure ('+trapping+')';
                        break;
                    case 10:
                        cPowers[cPowers.length] = 'Smite ('+trapping+')';
                        break;
                    case "J":
                        cPowers[cPowers.length] = 'Fear ('+trapping+')';
                        break;
                    case "Q":
                        cPowers[cPowers.length] = 'Speak Language ('+trapping+')';
                        break;
                    case "K":
                        cPowers[cPowers.length] = 'Stun ('+trapping+')';
                        break;
                    case "A":
                        cPowers[cPowers.length] = 'Summon Ally ('+trapping+')';
                        break;
                }
                if(nextcard.faceValue != "Joker") {
                    cPowers[cPowers.length-1] += ' ('+nextcard.faceValue+nextcard.cardSymbol+')';
                }
            }
        }
        else {
            cPowers[cPowers.length] = 'Healing';
            for(i = 0; i<1; i++) {
                nextcard = deck.deal();
                hand.addCard(nextcard);
                log("AB Card Drawn: "+nextcard.cardSymbol+nextcard.faceValue);
                if(nextcard.faceValue === "Joker"){
                    i = i-2;
                }
                switch(nextcard.faceValue) {
                    case 2:
                        cPowers[cPowers.length] = 'Armor';
                        break;
                    case 3:
                        cPowers[cPowers.length] = 'Boost Trait';
                        break;
                    case 4:
                        cPowers[cPowers.length] = 'Blind';
                        break;
                    case 5:
                        cPowers[cPowers.length] = 'Deflection';
                        break;
                    case 6:
                        cPowers[cPowers.length] = 'Succor';
                        break;
                    case 7:
                        cPowers[cPowers.length] = 'Environmental Protection';
                        break;
                    case 8:
                        cPowers[cPowers.length] = 'Confusion';
                        break;
                    case 9:
                        cPowers[cPowers.length] = 'Light';
                        break;
                    case 10:
                        cPowers[cPowers.length] = 'Smite';
                        break;
                    case "J":
                        cPowers[cPowers.length] = 'Fear';
                        break;
                    case "Q":
                        cPowers[cPowers.length] = 'Detect Arcana';
                        break;
                    case "K":
                        cPowers[cPowers.length] = 'Stun';
                        break;
                    case "A":
                        cPowers[cPowers.length] = 'Darksight';
                        break;
                }
                if(nextcard.faceValue != "Joker") {
                    cPowers[cPowers.length-1] += ' ('+nextcard.faceValue+nextcard.cardSymbol+')';
                }
            }
        }

    }

    cardOutPut +='**Gender**: '+cGender+'<br />'
    +'**Race**: '+cRace+'<br />'
    +'**Class**: '+cClass+'<br /><br />'
    +'**Hindrances (Major)**: '+cMaHindrance+'<br />'
    +'**Hindrances (Minor)**: '+cMiHindrance+'<br /><br />'
    +'**Edges**: ';

    for(i = 0; i<cEdge.length; i++) {
        cardOutPut += cEdge[i]
        if(i < cEdge.length -1) {
            cardOutPut +=", ";
        }
    }

    if (cClass === "Wizard" || cClass === "Fighter or Wizard" || cClass === "Cleric" || cClass === "Cleric or Rogue") {
        cardOutPut +='<br /><br />';
        if(cClass === "Wizard" || cClass === "Fighter or Wizard") {
            cardOutPut += '**Starting Wizard Powers**: <br />';
        }
        else {
            cardOutPut += '**Starting Cleric Powers**: <br />';
        }
        cardOutPut += '<ul>'
        for(i = 0; i<cPowers.length; i++) {
            cardOutPut += '<li>'+cPowers[i]+'</li>';
            /*if(i< cPowers.length - 1) {
                cardOutPut += ", ";
            }*/
        }
        cardOutPut += '</ul>';
        if(cClass === "Wizard" || cClass === "Fighter or Wizard") {
            cardOutPut += '*NOTE: If you want, one of the powers can be swapped with Bolt.*<br /><br />';
        }
    }

    if(cClass != "Wizard" && cClass != "Fighter or Wizard" && cClass != "Cleric" && cClass != "Cleric or Rogue") {
        cardOutPut += "<br /><br />";
    }

    cardOutPut += "**Skills**:<br />"+cSkills;


    cardOutPut +='</div>'
    +'<br />';

    //log("cardEnd: "+cardEnd);
    infoBoxText ='**Silver Pieces**: '+rollD6(2)+'<br />'
    +'**Basic Gear**: ';

    if(cClass === "Fighter") {
        infoBoxText += 'Leather armor (1), and a club, axe or short sword (Str+d6)';
    }
    else if(cClass === "Cleric") {
        infoBoxText += 'Leather armor (1), staff (Str+d4, Parry +1, 2 Hands, Reach 1), Holy symbol';
    }
    else if(cClass === "Rogue") {
        infoBoxText += 'Leather armor (1), and a dagger (Str+d4)';
    }
    else if(cClass === "Wizard") {
        infoBoxText += 'Spellbook, quill, ink, '+randomInteger(1)+' candles, staff (Str+d4, two handed, +1 Parry, Reach 1) or dagger (Str+d4)';
    }
    else if(cClass === "Cleric or Rogue") {
        infoBoxText += '**Cleric**: Leather armor (1), staff (Str+d4, Parry +1, 2 Hands, Reach 1), Holy symbol<br />or<br />'
        +'**Rogue**: Leather armor (1), and a dagger (Str+d4)';
    }
    else {
        infoBoxText += '**Fighter**: Leather armor (1), and a club, axe or short sword (Str+d6)<br />or<br />'
        +'**Wizard**: Spellbook, quill, ink, '+randomInteger(1)+' candles, staff (Str+d4, two handed, +1 Parry, Reach 1) or dagger (Str+d4)';
    }

    infoBoxText += '<br />'
     +'**Extra Gear** (choose 2):<br />'
     +'<ul>';

    let gearDraw = 3;
    shuffle('Extra Gear');
    if (cClass === "Rogue" || cClass === "Cleric or Rogue") {
        gearDraw = 6;
    }

    let extraGear = [];
    for (i=0; i<gearDraw; i++) {
        nextcard = deck.deal();
        hand.addCard(nextcard);
        log("Gear Card Drawn: "+nextcard.cardSymbol+nextcard.faceValue);
        if(nextcard.faceValue === "Joker"){
            i = i-2;
        }
        else {
            if(nextcard.cardSuit === "Diamonds" || nextcard.cardSuit === "Hearts") {
                switch(nextcard.faceValue) {
                    case 2:
                        extraGear[extraGear.length] = 'Goatskin of wine, 1 pint';
                        break;
                    case 3:
                        extraGear[extraGear.length] = 'Rope (15") and grappling hook; also gain a die step in Climbing';
                        break;
                    case 4:
                        extraGear[extraGear.length] = 'Winter clothes; also gain a die step in Survival';
                        break;
                    case 5:
                        extraGear[extraGear.length] = 'Spyglass';
                        break;
                    case 6:
                        extraGear[extraGear.length] = 'Bandages ('+randomInteger(6)+' uses); also gain a die step in Healing';
                        break;
                    case 7:
                        extraGear[extraGear.length] = 'Shovel and bucket';
                        break;
                    case 8:
                        extraGear[extraGear.length] = 'Musical Instrument; also gain Knowledge (Music) at d4';
                        break;
                    case 9:
                        extraGear[extraGear.length] = 'Elegant clothes (+1 to Charisma)';
                        break;
                    case 10:
                        extraGear[extraGear.length] = 'Iron chain (4")';
                        break;
                    case "J":
                        extraGear[extraGear.length] = 'Lockpicks; also gain a die step in Lockpicking';
                        break;
                    case "Q":
                        extraGear[extraGear.length] = rollD6(2)+' toy soldiers';
                        break;
                    case "K":
                        extraGear[extraGear.length] = 'One weapon of your choice';
                        break;
                    case "A":
                        extraGear[extraGear.length] = 'One piece of armor of your choice';
                        break;
                }
            }
            else { //card is black
                switch(nextcard.faceValue) {
                    case 2:
                        extraGear[extraGear.length] = 'Oil lantern, 1 pint, flint & tinder';
                        break;
                    case 3:
                        extraGear[extraGear.length] = rollD6(2)+' candles, flint & tinder';
                        break;
                    case 4:
                        extraGear[extraGear.length] = '6 torches, fint & tinder';
                        break;
                    case 5:
                        extraGear[extraGear.length] = 'Poison purge ('+randomInteger(6)+' uses)';
                        break;
                    case 6:
                        extraGear[extraGear.length] = 'Hammer and 20 nails';
                        break;
                    case 7:
                        extraGear[extraGear.length] = 'Soap, silver mirror and bone comb';
                        break;
                    case 8:
                        extraGear[extraGear.length] = 'Playing cards; also gain a die step in Gambling';
                        break;
                    case 9:
                        extraGear[extraGear.length] = 'Wooden dice; also gain a die step in Gambling';
                        break;
                    case 10:
                        extraGear[extraGear.length] = 'Crowbar';
                        break;
                    case "J":
                        extraGear[extraGear.length] = 'Whistle';
                        break;
                    case "Q":
                        let foodDays = randomInteger(7)+1;
                        extraGear[extraGear.length] = 'Food rations ('+foodDays+' days)';
                        break;
                    case "K":
                        extraGear[extraGear.length] = 'One weapon of your choice';
                        break;
                    case "A":
                        extraGear[extraGear.length] = 'Bag of caltrops; also gain a die step in Throwing';
                        break;
                }
            }
            extraGear[extraGear.length-1] += ' ('+nextcard.faceValue+nextcard.cardSymbol+')';
        }
    }

    for (i=0; i<extraGear.length; i++) {
        infoBoxText += '<li>'+extraGear[i]+'</li>';
        if (i === 2){
            if(cClass === "Rogue" || cClass === "Cleric or Rogue") {
                infoBoxText += "</ul>"
                +"Rogue's choose an additional 2:"
                +"<ul>";
            }
        }
    }

    infoBoxText += "</ul>"


    let infoBox = '<div style="display:block; background-color: #D7BDE2; color: #633974; width: 230px; padding: 5px; border: 2px solid #4A235A;">'+infoBoxText+'</div>';

    cardOutPut += infoBox
               +endBox;
    sendChat('Game',cardOutPut);

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

  let  who=getObj('player',id).get('_displayname').split(' ')[0];
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

    let msg = _.clone(msg_orig);
    let args = [];
    if (msg.type !== "api") {
		return;
	 }



    args = msg.content
        .replace(/<br\/>\n/g, ' ')
        .replace(/(\{\{(.*?)\}\})/g," $2 ")
        .split(/\s+--/);


    log("Number of Arguments: "+args.length);
    log(args);
    // bail out if api call is not to deal-init
    if (args.shift() !== "!rcg") {
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
        createDeck(msg.playerid);
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
	log('-=> RandoCharGen v'+version+' <=- ' + lastUpdate);
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
	rcg.CheckInstall();
	rcg.RegisterEventHandlers();
});
