var Fright = Fright || (function() {
    'use strict';
    
    var version = 0.1,
    
    HandleInput = function(msg) {
        var args,frmod,text='<div style="padding:1px 3px;border: 1px solid #8B4513;background: #460701; color: white; font-size: 80%;">';
        var fright_result,fright_total;
        var fright_table = [
                '<strong>Adrenaline Surge</strong>: The hero\'s \"fight\" response takes over. He adds +2 to all Trait and damage rolls on his next action.',
                '<strong>Shaken</strong>: The character is Shaken.',
                '<strong>Panicked</strong>: The character immediately moves his full Pace plus running die away from the danger and is Shaken.',
                '<strong>Minor Phobia</strong>: The character gains a Minor Phobia Hindrance somehow associated with the trauma.',
                '<strong>Major Phobia</strong>: The character gains a Major Phobia Hindrance.',
                '<strong>The Mark of Fear</strong>: The hero is Shaken and also suffers some cosmetic physical alteration—a white streak forms in the hero\'s hair, his eyes twitch constantly, or some other minor physical alteration. This reduces his Charisma by 1.',
                '<strong>Heart Attack</strong>: The hero is so overwhelmed with fear that his heart stutters. He becomes Incapacitated and must make a Vigor roll at -2. If successful, he’s Shaken and can\'t attempt to recover for 1d4 rounds. If he fails, he dies in 2d6 rounds. A Healing roll at -4 saves the victim’s life, but he remains Incapacitated.'
            ];
        if (msg.type !== "api") {
            return;
        }
        
        args = msg.content.split(" ");

        switch(args[0]) {
            case '!fright':
                if(args.length > 2 || args.length === 2 && isNaN(args[1])) {
                    sendChat(msg.who,'Too many or wrong type of input. !fright should have at most one integer.');
                    break;
                }
                else {
                    frmod = Number(args[1]) || 0;
                    //fright_result = Math.floor((Math.random() * 20) + 1);
                    fright_result = randomInteger(20);
                    fright_total = fright_result+frmod;
                    text += '<p><strong>Die Result</strong>: ' +fright_result+'</p><p><strong>Modifier</strong>: ' +frmod+ '</p><p><strong>Result</strong>: ' +fright_total +'</p><p>';
                    
                    //Get the Table Result
                    if (fright_total<5) {
                        text += fright_table[0];
                    }
                    else if (fright_total<9) {
                        text += fright_table[1];
                    }
                    else if (fright_total<13) {
                        text += fright_table[2];
                    }
                    else if (fright_total<17) {
                        text += fright_table[3];
                    }
                    else if (fright_total<19) {
                        text += fright_table[4];
                    }
                    else if (fright_total<21) {
                        text += fright_table[5];
                    }
                    else {
                        text += fright_table[6];
                    }
                    
                    text += '</p></div>'
                    //sendChat(msg.who,text);
                    sendChat(msg.who+"- Fright Table",text);
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
    Fright.RegisterEventHandlers();
});