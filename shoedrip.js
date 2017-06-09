const request = require('request-promise-native');
let PSConnection = require('./ps.js');
let db = require('./db.js');

module.exports.champ = {};

let getCurrentThread = async () => {
  let b = await request.get('http://a.4cdn.org/vp/catalog.json');
  let catalog = JSON.parse(b);
  let derp_no = 0;
  catalog.forEach(page => {
    page.threads.forEach(t => {
      if (t.sub && t.sub.toLowerCase().indexOf('showderp') != -1 && t.no > derp_no)
        derp_no = t.no;
    });
  });
  return derp_no;
}

let getCurrentChamp = async b => {
  let thread = JSON.parse(b);
  let derp_no = 0;
  for (var i = thread.posts.length - 1; i != 0; --i) {
    if (thread.posts[i].trip) {
      let content = thread.posts[i].com.replace(/<(?:.|\n)*?>/gm, '');
      let matches;
      if ((matches = content.match(/(https?:\/\/)?play.pokemonshowdown.com\/battle-(.*)-([0-9]*)/g))) {
        let champ = {champ_name: thread.posts[i].name, champ_trip: thread.posts[i].trip, champ_last_active: thread.posts[i].time};
        let curtime = ~~(+new Date() / 1000);
        champ.champ_active = curtime - champ.champ_last_active < 15 * 60;
        champ.champ_battle = matches[0];
        if(champ.champ_battle[0] != 'h')
          champ.champ_battle = 'http://' + champ.champ_battle;
        return champ;
      }
    }
  }
  return {};
}

let oldbattle = null;

// stolen from gist
levenshtein = (a, b) => {
	var tmp;
	if (a.length === 0) { return b.length; }
	if (b.length === 0) { return a.length; }
	if (a.length > b.length) { tmp = a; a = b; b = tmp; }

	var i, j, res, alen = a.length, blen = b.length, row = Array(alen);
	for (i = 0; i <= alen; i++) { row[i] = i; }

	for (i = 1; i <= blen; i++) {
		res = i;
		for (j = 1; j <= alen; j++) {
			tmp = row[j - 1];
			row[j - 1] = res;
			res = b[i - 1] === a[j - 1] ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
		}
	}
	return res;
}

let monitorBattle = (champ) => {
	let battleData = {};
	battleData.champ = champ;
	battleData.memes = [];
	battleData.dist = 100;
	battleData.roomid = champ.champ_battle.match(/battle-(.*)\/?/)[1];

	new PSConnection(champ.champ_battle, (log) => {
		log = log.split('|');
		log.shift();
		if(log[0] == 'win') {
			db.registerChampResult(battleData, champ.showdown_name == log[1]);
			return true;
		}
		else if(log[0] == 'player') {
			// pls use same name when champing
			let dist = levenshtein(champ.champ_name || '', log[2]);
			if (dist < battleData.dist) {
				champ.showdown_name = log[2];
				battleData.champ_alias = log[1];
				battleData.dist = dist;
			}
			console.log('alias:' + battleData.champ_alias);
		}
		else if(log[0] == 'switch' && log[1].indexOf(battleData.champ_alias) == 0) {
			// TODO: check if only one of the two mon has a nickname if the dist isn't 0
			let memename = log[1].substr(5);
			battleData.activeMeme = memename;
			console.log('Switched to ' + memename);
			let exists = false;
			for(var i = 0; i < battleData.memes.length; ++i)
				if (battleData.memes[i].name == memename)
					exists = true;
			if(!exists)
				battleData.memes.push({name: memename, kills: 0, dead: false})
		}
		else if (log[0] == 'faint') {
			if (log[1].indexOf(battleData.champ_alias) == 0) { // champ mon fainted
				let memename = log[1].substr(5);
				console.log('rip: ' + memename);
				for(var i = 0; i < battleData.memes.length; ++i)
					if (battleData.memes[i].name == memename)
						battleData.memes[i].dead = true;
			} else { // opp mon fainted, active mon gets a kills
				console.log('gg: ' + battleData.activeMeme);
				for(var i = 0; i < battleData.memes.length; ++i)
					if (battleData.memes[i].name == battleData.activeMeme)
						battleData.memes[i].kills++;				
			}
		}
	});
}

// make async
amonitorBattle = (champ) => setTimeout(() => monitorBattle(champ), 0);

let main = async () => {
	try {
		let thread = await getCurrentThread();
		let threadjs = await request.get('http://a.4cdn.org/vp/thread/' + thread + '.json');
		let champ = await getCurrentChamp(threadjs);
		if (champ.champ_battle != oldbattle) {
			oldbattle = champ.champ_battle;
			if (champ.champ_name != undefined && champ.champ_name != '')
				amonitorBattle(champ); // async
		}
		module.exports.champ = champ;
	}
	catch(e) {
		console.log(e);
	}
}

main();

setInterval(async () => {await main();}, 1000 * 60);
