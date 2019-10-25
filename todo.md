Todos/Ideas
===========
Smug's TODO:
Add:
- Make bot assign tripcodes to account name(s) in database (?)
- Make bot console display specific colors for specific phrases (Stealth rocks phrases in brown, Nice skill in yellow)
- Phrases
- - if oppmon.fainted < 0 say "6-0 avoided, champ wins!"
- - if opphas(Landorus) == true say "LAAAAAAAAAAAAAAAANDOOOOOOOOOOOOOOOOOOOOOO!!!!!"
- - if champmon.kill(hoge) == 1 && hp > 50% spam some HOGE CHEERS [does this sorta]
- - if oppmon(1 thru 6).dexnum <= 151 say "ahem \n KAAAAAAAAAAAAAAAAAAAAAAANTOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
- - if champ has 60 seconds left say "WAKE UP CHAMP!!!!!!!!!"
- - if any mon gets FRZ say "Am I glad he's frozen in there and that we're out here, and that he's the sheriff, and that we're frozen out here, and that we're in there, and I just remembered, we're out here. What I wanna know is, where's the caveman?"

Improve:
- Ability to scan thread for available battles in a scan-snooze-scan matter where the snooze is over 5 minutes
- - if(statusType == "idle") {
- Snap function [still doesnt fuckin work]
- User responses [when greeted, does not respond except to Roxle's main account]


og todo:
- Make dogars-chan follow invites
- Make dogars-chan check dubs/trips/quads [does this]
- Make hijacker play random moves/run an AI (fuck this noise just look at dev's version)
 

Any AI doesn't have to play perfectly all the time, just to not stroke at critical times. A bad move due to a missed predict is ok, but not 3 times in a row.
Getting a switch predicted is OK, but switching out a +4 def/spdef snips in front of a burnt lando that doesn't have SD is not.

Realistically implementing the "great" AI could take a few weeks if the codebase for Showdown was more modular and allowed an easier and more efficient state serialization/duplication of a battle. Unfortunately, as the code is right now, it'd take a significant rewrite.

Also, don't try to implement a """"General"""" AI. These are all slow inaccurate garbage hacks. Machine Learning and AI101 shit (minimax variants and shallow neural nets) won't produce anything of worth and are a waste of resources.
Hardcoding behaviors is fine and is the most efficient solution (read: faster) as long as we can prove we have a 100% accurate understanding of the meta game and what constitutes an optimal play for any given turn for a player.

Simplify deploying:
 - Right now deploying relies on both frontend and backend to be stored in the same folder:
    - Only the backend should know where is the front-end
 - Symlinks needs to be manually created from the backend public folder to the frontend dist folder:
    - Needs to be done once but needs to be automated
    - the precache symlink needs to be recreated on every rebuild of the frontend because it's build-unique; needs to be automated
