var manageCharacter = manageCharacter || (function() {
    'use strict';
    
    var version = '0.1.0',
    lastUpdate = '2016-06-04',
    schemaVersion = 0.1,
    
        WCSkills = [
            ['staticAthletics', 'staticAthleticsC', 'staticAthleticsS', 'staticAthleticsZ', 'staticBoating', 'staticClimbing', 'staticCybermastery', 'staticDriving', 'staticDriving2W', 'staticDriving4W', 'staticDriving6W', 'staticDrivingH', 'staticDrivingT', 'staticFaith', 'staticFightingB', 'staticFightingBL', 'staticFightingBS', 'staticFightingI', 'staticGambling', 'staticGuts', 'staticHacking', 'staticHackingF', 'staticHackingH', 'staticHackingOC', 'staticHackingOE', 'staticHackingR', 'staticHealing', 'staticHealingC', 'staticHealingEM', 'staticHealingF', 'staticHealingS', 'staticIntimidation', 'staticInvestigation', 'staticLockpicking', 'staticLockpicking:E', 'staticLockpicking:M', 'staticLockpickingDTE', 'staticLockpickingDTM', 'staticNotice', 'staticPersuasion', 'staticPersuasion:D', 'staticPersuasion:S', 'staticPersuasionB', 'staticPiloting', 'staticPilotingA', 'staticPilotingG', 'staticPilotingS', 'staticPsionics', 'staticRepair', 'staticRepairC', 'staticRepairE', 'staticRepairM', 'staticRepairS', 'staticRepairW', 'staticRiding', 'staticRitual', 'staticShooting', 'staticShootingB', 'staticShootingFA', 'staticShootingH', 'staticShootingL', 'staticShootingV', 'staticSpellcasting', 'staticStealth', 'staticStealthD', 'staticStealthH', 'staticStealthL', 'staticStealthS', 'staticStreetwise', 'staticSurvival', 'staticSurvivalA', 'staticSurvivalD', 'staticSurvivalF', 'staticSurvivalJ', 'staticSurvivalM', 'staticSurvivalS', 'staticSurvivalU', 'staticSwimming', 'staticTaunt', 'staticThrowing', 'staticThrowingD', 'staticThrowingG', 'staticThrowingK', 'staticThrowingS', 'staticTracking', 'staticTrackingG', 'staticTrackingU', 'staticTrackingW', 'staticWeirdScience'],
            
            ['@{skillrt} @{defsTemplate} @{rolltAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Climbing}} @{rolltAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Swimming}} @{rolltAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Zero-G Maneuvers}} @{rolltAthletics}', '@{skillrt} @{defsTemplate} @{rolltBoating}', '@{skillrt} @{defsTemplate} @{rolltClimbing}', '@{skillrt} @{defsTemplate} @{rolltCybermastery}', '@{skillrt} @{defsTemplate} @{rolltDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=2-Wheeled Vehicles}} @{rolltDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=4-Wheeled Vehicles}} @{rolltDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=6+-Wheeled Vehicles}} @{rolltDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hovercrafts}} @{rolltDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Tracked Vehicles}} @{rolltDriving}', '@{skillrt} @{defsTemplate} @{rolltFaith}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Blunt Weapon}} @{rolltFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Long Blade}} @{rolltFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Short Blade}} @{rolltFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Improvised Weapon}} @{rolltFighting}', '@{skillrt} @{defsTemplate} @{rolltGambling}', '@{skillrt} @{defsTemplate} @{rolltGuts}', '@{skillrt} @{defsTemplate} @{rolltHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Firewall Penetration}} @{rolltHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hyper Combat}} @{rolltHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Object Control}} @{rolltHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Object Editing}} @{rolltHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Run Programs}} @{rolltHacking}', '@{skillrt} @{defsTemplate} @{rolltHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Cyber Surgery}} @{rolltHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Emergency Medicine}} @{rolltHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=First Aid}} @{rolltHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Surgery}} @{rolltHealing}', '@{skillrt} @{defsTemplate} @{rolltIntimidation}', '@{skillrt} @{defsTemplate} @{rolltInvestigation}', '@{skillrt} @{defsTemplate} @{rolltLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Electronic}} @{rolltLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mechanical}} @{rolltLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disarm Trap (Electronic)}} @{rolltLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disarm Trap (Mechanical)}} @{rolltLockpicking}', '@{skillrt} @{defsTemplate} @{rolltNotice}', '@{skillrt} @{defsTemplate} @{rolltPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Diplomacy}} @{rolltPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Seduction}} @{rolltPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Bluffing}} @{rolltPersuasion}', '@{skillrt} @{defsTemplate} @{rolltPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Aircraft}} @{rolltPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Golemmech}} @{rolltPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Spacecraft}} @{rolltPiloting}', '@{skillrt} @{defsTemplate} @{rolltPsionics}', '@{skillrt} @{defsTemplate} @{rolltRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Cybernetics}} @{rolltRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Electronics}} @{rolltRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mechanical}} @{rolltRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Structural}} @{rolltRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Weapons}} @{rolltRepair}', '@{skillrt} @{defsTemplate} @{rolltRiding}', '@{skillrt} @{defsTemplate} @{rolltRitual}', '@{skillrt} @{defsTemplate} @{rolltShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Bow}} @{rolltShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Fully Automatic}} @{rolltShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Handguns}} @{rolltShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Long-arms}} @{rolltShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Vehicle Weapons}} @{rolltShooting}', '@{skillrt} @{defsTemplate} @{rolltSpellcasting}', '@{skillrt} @{defsTemplate} @{rolltStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disguise}} @{rolltStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hiding}} @{rolltStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Legerdemain}} @{rolltStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Sneaking}} @{rolltStealth}', '@{skillrt} @{defsTemplate} @{rolltStreetwise}', '@{skillrt} @{defsTemplate} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Arctic}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Desert}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Forest}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Jungle}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mountain}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Space}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Urban}} @{rolltSurvival}', '@{skillrt} @{defsTemplate} @{rolltSwimming}', '@{skillrt} @{defsTemplate} @{rolltTaunt}', '@{skillrt} @{defsTemplate} @{rolltThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Darts}} @{rolltThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Grenades}} @{rolltThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Knives/Axes}} @{rolltThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Spears}} @{rolltThrowing}', '@{skillrt} @{defsTemplate} @{rolltTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Global DataNet}} @{rolltTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Urban}} @{rolltTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Wilderness}} @{rolltTracking}', '@{skillrt} @{defsTemplate} @{rolltWeirdScience}']
        ],
        
        MookSkills = [
          ['staticmAthletics', 'staticmAthleticsC', 'staticmAthleticsS', 'staticmAthleticsZ', 'staticmBoating', 'staticmClimbing', 'staticmCybermastery', 'staticmDriving', 'staticmDriving2W', 'staticmDriving4W', 'staticmDriving6W', 'staticmDrivingH', 'staticmDrivingT', 'staticmFaith', 'staticmFightingB', 'staticmFightingBL', 'staticmFightingBS', 'staticmFightingI', 'staticmGambling', 'staticmGuts', 'staticmHacking', 'staticmHackingF', 'staticmHackingH', 'staticmHackingOC', 'staticmHackingOE', 'staticmHackingR', 'staticmHealing', 'staticmHealingC', 'staticmHealingEM', 'staticmHealingF', 'staticmHealingS', 'staticmIntimidation', 'staticmInvestigation', 'staticmLockpicking', 'staticmLockpicking:E', 'staticmLockpicking:M', 'staticmLockpickingDTE', 'staticmLockpickingDTM', 'staticmNotice', 'staticmPersuasion', 'staticmPersuasion:D', 'staticmPersuasion:S', 'staticmPersuasionB', 'staticmPiloting', 'staticmPilotingA', 'staticmPilotingG', 'staticmPilotingS', 'staticmPsionics', 'staticmRepair', 'staticmRepairC', 'staticmRepairE', 'staticmRepairM', 'staticmRepairS', 'staticmRepairW', 'staticmRiding', 'staticmRitual', 'staticmShooting', 'staticmShootingB', 'staticmShootingFA', 'staticmShootingH', 'staticmShootingL', 'staticmShootingV', 'staticmSpellcasting', 'staticmStealth', 'staticmStealthD', 'staticmStealthH', 'staticmStealthL', 'staticmStealthS', 'staticmStreetwise', 'staticmSurvival', 'staticmSurvivalA', 'staticmSurvivalD', 'staticmSurvivalF', 'staticmSurvivalJ', 'staticmSurvivalM', 'staticmSurvivalS', 'staticmSurvivalU', 'staticmSwimming', 'staticmTaunt', 'staticmThrowing', 'staticmThrowingD', 'staticmThrowingG', 'staticmThrowingK', 'staticmThrowingS', 'staticmTracking', 'staticmTrackingG', 'staticmTrackingU', 'staticmTrackingW', 'staticmWeirdScience'],
          
          ['@{skillrt} @{defsTemplate} @{rolltmAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Climbing}} @{rolltmAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Swimming}} @{rolltmAthletics}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Zero-G Maneuvers}} @{rolltmAthletics}', '@{skillrt} @{defsTemplate} @{rolltmBoating}', '@{skillrt} @{defsTemplate} @{rolltmClimbing}', '@{skillrt} @{defsTemplate} @{rolltmCybermastery}', '@{skillrt} @{defsTemplate} @{rolltmDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=2-Wheeled Vehicles}} @{rolltmDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=4-Wheeled Vehicles}} @{rolltmDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=6+-Wheeled Vehicles}} @{rolltmDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hovercrafts}} @{rolltmDriving}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Tracked Vehicles}} @{rolltmDriving}', '@{skillrt} @{defsTemplate} @{rolltmFaith}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Blunt Weapon}} @{rolltmFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Long Blade}} @{rolltmFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Short Blade}} @{rolltmFighting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Improvised Weapon}} @{rolltmFighting}', '@{skillrt} @{defsTemplate} @{rolltmGambling}', '@{skillrt} @{defsTemplate} @{rolltmGuts}', '@{skillrt} @{defsTemplate} @{rolltmHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Firewall Penetration}} @{rolltmHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hyper Combat}} @{rolltmHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Object Control}} @{rolltmHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Object Editing}} @{rolltmHacking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Run Programs}} @{rolltmHacking}', '@{skillrt} @{defsTemplate} @{rolltmHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Cyber Surgery}} @{rolltmHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Emergency Medicine}} @{rolltmHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=First Aid}} @{rolltmHealing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Surgery}} @{rolltmHealing}', '@{skillrt} @{defsTemplate} @{rolltmIntimidation}', '@{skillrt} @{defsTemplate} @{rolltmInvestigation}', '@{skillrt} @{defsTemplate} @{rolltmLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Electronic}} @{rolltmLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mechanical}} @{rolltmLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disarm Trap (Electronic)}} @{rolltmLockpicking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disarm Trap (Mechanical)}} @{rolltmLockpicking}', '@{skillrt} @{defsTemplate} @{rolltmNotice}', '@{skillrt} @{defsTemplate} @{rolltmPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Diplomacy}} @{rolltmPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Seduction}} @{rolltmPersuasion}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Bluffing}} @{rolltmPersuasion}', '@{skillrt} @{defsTemplate} @{rolltmPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Aircraft}} @{rolltmPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Golemmech}} @{rolltmPiloting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Spacecraft}} @{rolltmPiloting}', '@{skillrt} @{defsTemplate} @{rolltmPsionics}', '@{skillrt} @{defsTemplate} @{rolltmRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Cybernetics}} @{rolltmRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Electronics}} @{rolltmRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mechanical}} @{rolltmRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Structural}} @{rolltmRepair}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Weapons}} @{rolltmRepair}', '@{skillrt} @{defsTemplate} @{rolltmRiding}', '@{skillrt} @{defsTemplate} @{rolltmRitual}', '@{skillrt} @{defsTemplate} @{rolltmShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Bow}} @{rolltmShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Fully Automatic}} @{rolltmShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Handguns}} @{rolltmShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Long-arms}} @{rolltmShooting}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Vehicle Weapons}} @{rolltmShooting}', '@{skillrt} @{defsTemplate} @{rolltmSpellcasting}', '@{skillrt} @{defsTemplate} @{rolltmStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Disguise}} @{rolltmStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Hiding}} @{rolltmStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Legerdemain}} @{rolltmStealth}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Sneaking}} @{rolltmStealth}', '@{skillrt} @{defsTemplate} @{rolltmStreetwise}', '@{skillrt} @{defsTemplate} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Arctic}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Desert}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Forest}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Jungle}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Mountain}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Space}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Urban}} @{rolltmSurvival}', '@{skillrt} @{defsTemplate} @{rolltmSwimming}', '@{skillrt} @{defsTemplate} @{rolltmTaunt}', '@{skillrt} @{defsTemplate} @{rolltmThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Darts}} @{rolltmThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Grenades}} @{rolltmThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Knives/Axes}} @{rolltmThrowing}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Spears}} @{rolltmThrowing}', '@{skillrt} @{defsTemplate} @{rolltmTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Global DataNet}} @{rolltmTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Urban}} @{rolltmTracking}', '@{skillrt} @{defsTemplate} {{skill_nameHeader=Wilderness}} @{rolltmTracking}', '@{skillrt} @{defsTemplate} @{rolltmWeirdScience}']
        ],
        
        skillNames = ['Athletics', 'Athletics-Climbing', 'Athletics-Swimming', 'Athletics-Zero-G-Maneuvers', 'Boating', 'Climbing', 'Cybermastery', 'Driving', 'Driving-2-Wheeled', 'Driving-4-Wheeled', 'Driving-6-Wheeled', 'Driving-Hover', 'Driving-Tracked', 'Faith', 'Fighting-Blunt', 'Fighting-Blade-Short', 'Fighting-Blade-Long', 'Fighting-Improvised', 'Gambling', 'Guts', 'Hacking', 'Hacking-Firewall-Penetration', 'Hacking-Hypercombat', 'Hacking-Ojbect-Control', 'Hacking-Object-Editing', 'Hacking-Run-Programs', 'Healing', 'Healing-Cyber-Surgery', 'Healing-Emergency-Medicine', 'Healing-First-Aid', 'Healing-Surgery', 'Intimidation', 'Investigation', 'Lockpicking', 'Lockpicking-Electronic', 'Lockpicking-Mechanical', 'Lockpicking-Disarm-Trap-Electronic', 'Lockpicking-Disarm-Trap-Mechanical', 'Notice', 'Persuasion', 'Persuasion-Diplomacy', 'Persuasion-Seduction', 'Persuasion-Bluffing', 'Piloting', 'Piloting-Aircraft', 'Piloting-Golemmech', 'Piloting-Spacecraft', 'Psionics', 'Repair', 'Repair-Cybernetics', 'Repair-Electronics', 'Repair-Mechanical', 'Repair-Structural', 'Repair-Weapons', 'Riding', 'Ritual', 'Shooting', 'Shooting-Bow', 'Shooting-Fully-Automatic', 'Shooting-Handguns', 'Shooting-Long-arms', 'Shooting-Vehicle-Weapons', 'Spellcasting', 'Stealth', 'Stealth-Disguise', 'Stealth-Hiding', 'Stealth-Legerdemain', 'Stealth-Sneaking', 'Streetwise', 'Survival', 'Survival-Arctic', 'Survival-Desert', 'Survival-Forest', 'Survival-Jungle', 'Survival-Mountain', 'Survival-Space', 'Survival-Urban', 'Swimming', 'Taunt', 'Throwing', 'Throwing-Darts', 'Throwing-Grenades', 'Throwing-Knives-Axes', 'Throwing-Spears', 'Tracking', 'Tracking-Global-DataNet', 'Tracking-Urban', 'Tracking-Wilderness', 'Weird-Science'],
    
    /*-------------------------------------
    / Create New Ability
    /-------------------------------------*/
    
    newAbility = function(cID, pName, nAction) {
        createObj("ability", {
            name: pName,
            characterid: cID,
            action: nAction,
            istokenaction: true
        });
        
        log("### Created Ability " + pName + " ###");
    },
    
    /*-------------------------------------
    / Update Abilities List
    /-------------------------------------*/
    
    updateAbility = function(cID, pName, nAction) {
        var charAbility = findObjs({
        	_type: "ability",
    		_characterid: cID,
    		name: pName});
        //log(updateAgility);
        
        //Insert some error handling...the Ability doesn't exist then create it
        if (charAbility.length < 1){
            //Ability doesn't exist, so create it
            newAbility(cID, pName, nAction);
        }
        else{
            charAbility[0].set({action: nAction});
            log("### Updated " + pName + " ###");
        }
    },
    
    /*-------------------------------------
    / New Character - Setup default Abilities
    /-------------------------------------*/
    
    newCharacter = function(obj) {
        log("### New Character Created—Set up Default Abilities ###")
        // If there aren't any ability objects to grab, then we're probably in the middle of a sandbox spin-up
        if (findObjs({  _type: "ability"}).length === 0)
            return;
    
        var abil = findObjs({  _type: "ability", _characterid: obj.id});
        if (abil.length === 0)  // Only create the abilities if the character doesn't have any
        {
            newAbility(obj.id, "Agility", "@{skillrt} @{defsTemplate} @{rolltAgility}");
            newAbility(obj.id, "Smarts", "@{skillrt} @{defsTemplate} @{rolltSmarts}");
            newAbility(obj.id, "Spirit", "@{skillrt} @{defsTemplate} @{rolltSpirit}");
            newAbility(obj.id, "Strength", "@{skillrt} @{defsTemplate} @{rolltStrength}");
            newAbility(obj.id, "Vigor", "@{skillrt} @{defsTemplate} @{rolltVigor}");
            newAbility(obj.id, "Unskilled", "@{skillrt} @{defsTemplate} @{rolltUnskilled}");
            newAbility(obj.id, "Fighting", "@{skillrt} @{defsTemplate} @{rolltFighting}");
        }
    },
    
    /*-------------------------------------
    / Modify Character
    /-------------------------------------*/
    
    modifyCharacter = function(obj) {
        var aName = obj.get('name'),
    		cID = obj.get('characterid'),
    		aValue = obj.get('current');
    	log("aName: " + aName + " || Length: " + aName.length);
    	log("aName Partial: " + aName.slice(0,7));
    	log("aValue: " + aValue);
    	
    	//Check to see if the character type has changed (mook or Wild Card)
    	if (aName == 'is_npc') { 
    	    log("### Changed the Character Type ###");
    	    if (aValue == '1') {
        		log("    ### Character is a Mook ###");
        		updateAbility(cID,"Agility","@{skillrt} @{defsTemplate} @{rolltmAgility}");
                updateAbility(cID, "Smarts", "@{skillrt} @{defsTemplate} @{rolltmSmarts}");
                updateAbility(cID, "Spirit", "@{skillrt} @{defsTemplate} @{rolltmSpirit}");
                updateAbility(cID, "Strength", "@{skillrt} @{defsTemplate} @{rolltmStrength}");
                updateAbility(cID, "Vigor", "@{skillrt} @{defsTemplate} @{rolltmVigor}");
                updateAbility(cID, "Unskilled", "@{skillrt} @{defsTemplate} @{rolltmUnskilled}");
                updateAbility(cID, "Fighting", "@{skillrt} @{defsTemplate} @{rolltmFighting}");
    	    }
    	    else {
                log("    ### Character is a Wild Card ###");
                updateAbility(cID,"Agility","@{skillrt} @{defsTemplate} @{rolltAgility}");
                updateAbility(cID, "Smarts", "@{skillrt} @{defsTemplate} @{rolltSmarts}");
                updateAbility(cID, "Spirit", "@{skillrt} @{defsTemplate} @{rolltSpirit}");
                updateAbility(cID, "Strength", "@{skillrt} @{defsTemplate} @{rolltStrength}");
                updateAbility(cID, "Vigor", "@{skillrt} @{defsTemplate} @{rolltVigor}");
                updateAbility(cID, "Unskilled", "@{skillrt} @{defsTemplate} @{rolltUnskilled}");
                updateAbility(cID, "Fighting", "@{skillrt} @{defsTemplate} @{rolltFighting}");
            }
    	}
    	
    	//Check to see if a Skill is what changed
        else if (aName.slice(0,6) == 'static'){ //Character type hasn't changed, so need to check to see if a skill was selected
            var i = 0,
                sFound = "no",
                modORnew = "mod",
                abilityName,
                abilityExists,
                abilityAction;
            
            if (aName.slice(0,7) == 'staticm') {
                //Search MookSkills
                log("### Searching Mook Skills ###");
                
                for (i; i < skillNames.length; i += 1) {
                    //log("aName: " + aName + " || Skill Lookup: " + MookSkills[0][i]);
                    if(aName == MookSkills[0][i]){
                        sFound = "yes";
                        abilityAction = MookSkills[1][i];
                        break;
                    }
                }
                //log("i value: " + i);
            }
            else {
                //Search WCSkills
                log("### Searching Wild Card Skills ###");
                
                for (i; i < skillNames.length; i += 1) {
                    //log("aName: " + aName + " || Skill Lookup: " + WCSkills[0][i] + " (" + WCSkills[0][i].length + ")");
                    if(aName === WCSkills[0][i]){
                        sFound = "yes";
                        abilityAction = WCSkills[1][i];
                        break;
                    }
                }
            }
            
            if (sFound === 'no'){
                //The Skill wasn't found in the list
                log("!!!! Skill not found !!!!");
                log("!!!! " + aName + " not found !!!!");
            }
            else {
                //Skill was found in the list
                //Get the Ability Name
                abilityName = skillNames[i];
                
                //See if Ability Already Exists
                abilityExists = findObjs({
            	_type: "ability",
        		_characterid: cID,
        		name: abilityName});
        		
                if (aValue === '0') {
                    //Skill was removed
                    if (abilityExists.length > 0) {
                        //Remove it
                        abilityExists[0].remove();
                        log("### Removed Ability " + abilityName);
                    }
                }
                else {
                    //Skill is to be added
                    /*if (abilityExists.length < 1) {
                        //Doesn't exist
                        abilityExists[0].remove();
                        log("### Removed Ability " + abilityName);
                    }*/
                    updateAbility(cID, abilityName, abilityAction);
                }
            }
        }
        
        //Something not Character Type or Skill
        else {
            log("No Ability Work Necessary");
        }
    },
    
    /*-------------------------------------
    / System Check (Doesn't Work)
    /-------------------------------------*/
    
    mysystemsCheck = function(sNum) {
	    log("Skill Name:" + skillNames[sNum]);
	    log("Activation Field:" + WCSkills[sNum]);
	    log("Formula:" + WCSkills[sNum][sNum]);
	},
    
    /*-------------------------------------
    / Register Event Hanlder
    /-------------------------------------*/
    
    registerEventHandlers = function() {
		//New character, set up the basic/default abilities
        on("add:character", newCharacter);
        
        //Character sheet changed, update abilities
        on("change:attribute", modifyCharacter); 
        
        //Character sheet changed, update abilities
        on("add:attribute", modifyCharacter);
	};

	return {
		RegisterEventHandlers: registerEventHandlers,
		//CheckInstall: checkInstall
	};
	
	
}());

on("ready",function(){
	'use strict';

	//manageCharacter.CheckInstall();
	//manageCharacter.mysystemsCheck(randomInteger(88));
	manageCharacter.RegisterEventHandlers();
});

