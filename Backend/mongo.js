"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const settings_1 = require("./settings");
const request = require("request-promise-native");
const tripcode = require("tripcode");
const utils_1 = require("../Website/utils");
const poke_utils_1 = require("../Website/poke-utils");
const Champ_1 = require("./Models/Champ");
const Replay_1 = require("./Models/Replay");
const dexdata_1 = require("../Shoedrip/dexdata");
const url = `mongodb://${settings_1.settings.db.host}:${settings_1.settings.db.port || 27017}`;
const dbName = settings_1.settings.db.database;
let memes;
exports.total = 0;
let connection;
let inited = false;
exports.init = () => __awaiter(this, void 0, void 0, function* () {
    if (inited)
        return;
    connection = yield mongodb_1.MongoClient.connect(url, { useNewUrlParser: true });
    memes = connection.db(dbName);
    let collections = yield memes.collections();
    inited = true;
    exports.ChampsCollection = memes.collection('Champs');
    exports.SetsCollection = memes.collection('Sets');
    exports.ReplaysCollection = memes.collection('Replays');
    exports.total = yield exports.SetsCollection.countDocuments({});
});
const updateElo = (trip, name) => __awaiter(this, void 0, void 0, function* () {
    let b = yield request.get(`https://play.pokemonshowdown.com/~~showdown/action.php?act=ladderget&user=${utils_1.toId(name)}`);
    let stats = JSON.parse(b.substr(1));
    if (stats.length == 0)
        throw "Unregistered or never played";
    let oustat = stats.filter(e => e.formatid == 'gen7ou')[0];
    if (!oustat)
        throw "Never played OU";
    let ouelo = ~~oustat.elo;
    // no need to sync
    exports.ChampsCollection.updateOne({
        trip
    }, {
        $set: {
            elo: ouelo,
            showdown_name: name
        }
    });
});
exports.rebuildChampAvatars = () => __awaiter(this, void 0, void 0, function* () {
    let i = 0;
    let j = 0;
    let target = 10;
    let champs = yield exports.ChampsCollection.find({}).toArray();
    for (let c of champs) {
        ++i;
        if (c.avatar && c.avatar in dexdata_1.BattleAvatarNumbers) {
            ++j;
            if ((i / champs.length) * 100 >= target) {
                target += 10;
                console.log(`${target}%...`);
            }
            c.avatar = dexdata_1.BattleAvatarNumbers[c.avatar];
            yield exports.ChampsCollection.updateOne({
                trip: c.trip
            }, {
                $set: { avatar: c.avatar }
            });
        }
    }
});
exports.registerChampResult = (battleData, hasWon) => __awaiter(this, void 0, void 0, function* () {
    let replayurl;
    if (!inited)
        return;
    try {
        yield updateElo(battleData.champ.trip, battleData.champ.showdown_name);
    }
    catch (e) {
        console.log(e);
    }
    let inc = hasWon ? 'wins' : 'loses';
    let champ = yield exports.ChampsCollection.findOne({ trip: battleData.champ.trip });
    if (!champ) {
        exports.ChampsCollection.insertOne(new Champ_1.Champ(battleData.champ.name, battleData.champ.trip));
    }
    if (battleData.champ.avatar != '166')
        yield exports.ChampsCollection.updateOne({
            trip: battleData.champ.trip
        }, {
            $set: { avatar: battleData.champ.avatar }
        });
    yield exports.ChampsCollection.updateOne({
        trip: battleData.champ.trip
    }, {
        $inc: { [inc]: 1 },
        $set: {
            name: battleData.champ.name,
            last_seen: +new Date
        }
    });
    if (!hasWon)
        return;
    if (!battleData.champ.current_battle)
        return;
    yield poke_utils_1.pokeUtils.saveReplay(battleData.champ.current_battle);
    replayurl = 'http://replay.pokemonshowdown.com/' + battleData.roomid;
    let savedrepl = yield exports.ReplaysCollection.insertOne(new Replay_1.Replay(replayurl, 'Automatically uploaded replay. Champ: ' + battleData.champ.name + ' ' + battleData.champ.trip, battleData.champ.name, battleData.champ.trip, 0));
    let n = 0;
    for (let i = 0; i < battleData.memes.length; ++i) {
        let set = yield exports.SetsCollection.findOne({ name: battleData.memes[i].name });
        if (set) {
            ++n;
            yield exports.ReplaysCollection.update({ _id: savedrepl.insertedId }, { $push: { sets: set } });
        }
    }
});
exports.deleteSet = (id, trip, ignored) => __awaiter(this, void 0, void 0, function* () {
    let row = yield exports.SetsCollection.findOne({ id });
    if (!row)
        throw 'No such set';
    if (trip != settings_1.settings.admin_pass && (!row.hash || !trip))
        throw 'No tripcode associated with this set or no tripcode given';
    if (!(trip == settings_1.settings.admin_pass || row.hash == tripcode(trip)))
        throw 'Wrong tripcode';
    let del = yield exports.SetsCollection.deleteOne({ id });
    exports.total--;
    return null;
});
exports.updateSet = (id, trip, info) => __awaiter(this, void 0, void 0, function* () {
    let uset = yield exports.SetsCollection.findOne({ id });
    if (!uset)
        throw 'No such set';
    if (trip != settings_1.settings.admin_pass && (!uset.hash || !trip))
        throw 'No tripcode associated with this set or no tripcode given';
    if (!(trip == settings_1.settings.admin_pass || uset.hash == tripcode(trip)))
        throw 'Wrong tripcode';
    uset.format = "gen7ou";
    let formats = ["gen7ou", "gen7anythinggoes", "ubers", "uu", "ru",
        "nu", "pu", "lc", "gen8oubeta", "gen8doublesoubeta", "cap"];
    if (formats.includes(info.format))
        uset.format = info.format;
    uset.description = info.desc.substr(0, 650);
    let pok = poke_utils_1.pokeUtils.parseSet(info.set);
    pok.format = uset.format;
    for (let i in pok)
        uset[i] = pok[i];
    uset.date_added = +new Date();
    let errors = yield poke_utils_1.pokeUtils.checkSet(pok);
    if (errors) {
        throw errors;
    }
    exports.SetsCollection.updateOne({ id }, { $set: uset });
    return null;
});
exports.buildCheckableSet = (set) => {
    let nset = set;
    [1, 2, 3, 4]
        .map(d => 'move_' + d)
        .forEach(mp => nset[mp] = nset[mp] ? nset[mp].split('/')[0].trim() : null);
    return nset;
};
exports.createNewSet = (sdata) => __awaiter(this, void 0, void 0, function* () {
    let nset = {};
    nset.hash = tripcode(sdata.trip);
    nset.format = "gen7ou";
    let formats = ["gen7ou", "gen7anythinggoes", "ubers", "uu", "ru",
        "nu", "pu", "lc", "gen8oubeta", "gen8doublesoubeta", "cap"];
    if (formats.includes(sdata.format))
        nset.format = sdata.format;
    nset.creator = sdata.creat.substr(0, 23);
    nset.description = sdata.desc.substr(0, 650);
    let pok = poke_utils_1.pokeUtils.parseSet(sdata.set);
    pok.format = nset.format;
    let errors = yield poke_utils_1.pokeUtils.checkSet(pok);
    if (errors)
        throw errors;
    for (let i in pok)
        nset[i] = pok[i];
    nset.date_added = +new Date();
    exports.total++;
    nset.id = (yield exports.SetsCollection.find().sort({ id: -1 }).toArray())[0].id + 1;
    yield exports.SetsCollection.insert(nset);
    return nset;
});
exports.getRandomSet = (seed = ~~(Math.random() * exports.total)) => __awaiter(this, void 0, void 0, function* () { return exports.SetsCollection.find().skip(seed % exports.total).limit(1).toArray(); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvQmFja2VuZC9tb25nby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEscUNBQXNEO0FBQ3RELHlDQUFzQztBQUN0QyxrREFBa0Q7QUFDbEQscUNBQXFDO0FBS3JDLDRDQUF3QztBQUN4QyxzREFBa0Q7QUFFbEQsMENBQXVDO0FBRXZDLDRDQUF5QztBQUV6QyxpREFBMEQ7QUFFMUQsTUFBTSxHQUFHLEdBQUcsYUFBYSxtQkFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksbUJBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3pFLE1BQU0sTUFBTSxHQUFHLG1CQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQztBQUNwQyxJQUFJLEtBQVMsQ0FBQztBQUVILFFBQUEsS0FBSyxHQUFHLENBQUMsQ0FBQztBQW1CckIsSUFBSSxVQUF1QixDQUFDO0FBQzVCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNSLFFBQUEsSUFBSSxHQUFHLEdBQVMsRUFBRTtJQUN6QixJQUFJLE1BQU07UUFDTixPQUFPO0lBQ1gsVUFBVSxHQUFHLE1BQU0scUJBQVcsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsZUFBZSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkUsS0FBSyxHQUFHLFVBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUIsSUFBSSxXQUFXLEdBQUcsTUFBTSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUMsTUFBTSxHQUFHLElBQUksQ0FBQztJQUNkLHdCQUFnQixHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDOUMsc0JBQWMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzFDLHlCQUFpQixHQUFHLEtBQUssQ0FBQyxV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LENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNDLElBQUksTUFBTTtRQUNOLE1BQU0sTUFBTSxDQUFDO0lBQ2pCLEtBQUssSUFBSSxDQUFDLElBQUksR0FBRztRQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckIsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7SUFDOUIsYUFBSyxFQUFFLENBQUM7SUFDUixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBTSxzQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzdFLE1BQU0sc0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFBLENBQUE7QUFFVSxRQUFBLFlBQVksR0FBRyxDQUFPLE9BQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLGFBQUssQ0FBQyxFQUFFLEVBQUUsZ0RBQUMsT0FBQSxzQkFBYyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsYUFBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBLEdBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1vbmdvQ2xpZW50LCBEYiwgQ29sbGVjdGlvbiB9IGZyb20gJ21vbmdvZGInO1xuaW1wb3J0IHsgc2V0dGluZ3MgfSBmcm9tICcuL3NldHRpbmdzJztcbmltcG9ydCAqIGFzIHJlcXVlc3QgZnJvbSAncmVxdWVzdC1wcm9taXNlLW5hdGl2ZSc7XG5pbXBvcnQgKiBhcyB0cmlwY29kZSBmcm9tICd0cmlwY29kZSc7XG5cbmltcG9ydCB7IFNob3dkb3duU3RhdCB9IGZyb20gJy4uL1Nob3dkb3duL1Nob3dkb3duU3RhdHMnO1xuaW1wb3J0IHsgQmF0dGxlRGF0YSB9IGZyb20gJy4uL1Nob3dkb3duL0JhdHRsZURhdGEnO1xuXG5pbXBvcnQgeyB0b0lkIH0gZnJvbSAnLi4vV2Vic2l0ZS91dGlscyc7XG5pbXBvcnQgeyBwb2tlVXRpbHMgfSBmcm9tICcuLi9XZWJzaXRlL3Bva2UtdXRpbHMnO1xuXG5pbXBvcnQgeyBDaGFtcCB9IGZyb20gJy4vTW9kZWxzL0NoYW1wJztcbmltcG9ydCB7IFNldHMgfSBmcm9tICcuL01vZGVscy9TZXRzJztcbmltcG9ydCB7IFJlcGxheSB9IGZyb20gJy4vTW9kZWxzL1JlcGxheSc7XG5pbXBvcnQgeyBCYXR0bGVVUkwgfSBmcm9tICcuL0NyaW5nZUNvbXBpbGF0aW9uJztcbmltcG9ydCB7IEJhdHRsZUF2YXRhck51bWJlcnMgfSBmcm9tICcuLi9TaG9lZHJpcC9kZXhkYXRhJztcblxuY29uc3QgdXJsID0gYG1vbmdvZGI6Ly8ke3NldHRpbmdzLmRiLmhvc3R9OiR7c2V0dGluZ3MuZGIucG9ydCB8fCAyNzAxN31gO1xuY29uc3QgZGJOYW1lID0gc2V0dGluZ3MuZGIuZGF0YWJhc2U7XG5sZXQgbWVtZXM6IERiO1xuXG5leHBvcnQgbGV0IHRvdGFsID0gMDtcbmV4cG9ydCBsZXQgQ2hhbXBzQ29sbGVjdGlvbjogQ29sbGVjdGlvbjxDaGFtcD47XG5leHBvcnQgbGV0IFNldHNDb2xsZWN0aW9uOiBDb2xsZWN0aW9uPFNldHM+O1xuZXhwb3J0IGxldCBSZXBsYXlzQ29sbGVjdGlvbjogQ29sbGVjdGlvbjxSZXBsYXk+O1xuXG5leHBvcnQgdHlwZSBRdWVyeU9wZXJhdGlvbjxUPiA9XG4gICAgeyBbb3AgaW4gJyRhbmQnIHwgJyRhZGQnIHwgJyRkaXZpZGUnXTogQXJyYXk8QWdncmVnYXRpb25RdWVyeTxUPj4gfSB8IHt9O1xuXG5cbnR5cGUgUXVlcnlWYWx1ZSA9IHN0cmluZyB8IG51bWJlciB8IFJlZ0V4cDtcbnR5cGUgQWdncmVnYXRpb25RdWVyeTxUPiA9IFF1ZXJ5RmllbGRPZjxUPiB8IFF1ZXJ5T3BlcmF0aW9uPFQ+IHwgUXVlcnlWYWx1ZTtcbnR5cGUgUXVlcnlGaWVsZE9mPFQ+ID0geyBba2V5IGluIGtleW9mIFRdPzogUXVlcnlWYWx1ZSB9O1xuXG5leHBvcnQgdHlwZSBBZ2dyZWdhdGlvblBpcGVsaW5lU3RhZ2U8VD4gPVxuICAgIHsgJG1hdGNoOiBBZ2dyZWdhdGlvblF1ZXJ5PFF1ZXJ5RmllbGRPZjxUPj4gfSB8XG4gICAgeyAkYWRkRmllbGRzOiB7IFtrOiBzdHJpbmddOiBRdWVyeU9wZXJhdGlvbjxUPiB9IH0gfFxuICAgIHsgJHNvcnQ6IHsgW2tleSBpbiBrZXlvZiBUXT86IC0xIHwgMSB9IH0gfFxuICAgIHVuZGVmaW5lZDtcblxubGV0IGNvbm5lY3Rpb246IE1vbmdvQ2xpZW50O1xubGV0IGluaXRlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCBpbml0ID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmIChpbml0ZWQpXG4gICAgICAgIHJldHVybjtcbiAgICBjb25uZWN0aW9uID0gYXdhaXQgTW9uZ29DbGllbnQuY29ubmVjdCh1cmwsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlIH0pO1xuICAgIG1lbWVzID0gY29ubmVjdGlvbi5kYihkYk5hbWUpO1xuICAgIGxldCBjb2xsZWN0aW9ucyA9IGF3YWl0IG1lbWVzLmNvbGxlY3Rpb25zKCk7XG4gICAgaW5pdGVkID0gdHJ1ZTtcbiAgICBDaGFtcHNDb2xsZWN0aW9uID0gbWVtZXMuY29sbGVjdGlvbignQ2hhbXBzJyk7XG4gICAgU2V0c0NvbGxlY3Rpb24gPSBtZW1lcy5jb2xsZWN0aW9uKCdTZXRzJyk7XG4gICAgUmVwbGF5c0NvbGxlY3Rpb24gPSBtZW1lcy5jb2xsZWN0aW9uKCdSZXBsYXlzJyk7XG4gICAgdG90YWwgPSBhd2FpdCBTZXRzQ29sbGVjdGlvbi5jb3VudERvY3VtZW50cyh7fSk7XG59XG5cbmNvbnN0IHVwZGF0ZUVsbyA9IGFzeW5jICh0cmlwOiBzdHJpbmcsIG5hbWU6IHN0cmluZykgPT4ge1xuICAgIGxldCBiOiBzdHJpbmcgPSBhd2FpdCByZXF1ZXN0LmdldChgaHR0cHM6Ly9wbGF5LnBva2Vtb25zaG93ZG93bi5jb20vfn5zaG93ZG93bi9hY3Rpb24ucGhwP2FjdD1sYWRkZXJnZXQmdXNlcj0ke3RvSWQobmFtZSl9YCk7XG4gICAgbGV0IHN0YXRzOiBTaG93ZG93blN0YXRbXSA9IEpTT04ucGFyc2UoYi5zdWJzdHIoMSkpO1xuICAgIGlmIChzdGF0cy5sZW5ndGggPT0gMClcbiAgICAgICAgdGhyb3cgXCJVbnJlZ2lzdGVyZWQgb3IgbmV2ZXIgcGxheWVkXCI7XG4gICAgbGV0IG91c3RhdCA9IHN0YXRzLmZpbHRlcihlID0+IGUuZm9ybWF0aWQgPT0gJ2dlbjdvdScpWzBdO1xuICAgIGlmICghb3VzdGF0KVxuICAgICAgICB0aHJvdyBcIk5ldmVyIHBsYXllZCBPVVwiO1xuICAgIGxldCBvdWVsbyA9IH5+b3VzdGF0LmVsbztcbiAgICAvLyBubyBuZWVkIHRvIHN5bmNcbiAgICBDaGFtcHNDb2xsZWN0aW9uLnVwZGF0ZU9uZSh7XG4gICAgICAgIHRyaXBcbiAgICB9LCB7XG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgZWxvOiBvdWVsbyxcbiAgICAgICAgICAgICAgICBzaG93ZG93bl9uYW1lOiBuYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG5leHBvcnQgY29uc3QgcmVidWlsZENoYW1wQXZhdGFycyA9IGFzeW5jICgpID0+IHtcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGogPSAwO1xuICAgIGxldCB0YXJnZXQgPSAxMDtcbiAgICBsZXQgY2hhbXBzID0gYXdhaXQgQ2hhbXBzQ29sbGVjdGlvbi5maW5kKHt9KS50b0FycmF5KCk7XG4gICAgZm9yIChsZXQgYyBvZiBjaGFtcHMpIHtcbiAgICAgICAgKytpO1xuICAgICAgICBpZiAoYy5hdmF0YXIgJiYgYy5hdmF0YXIgaW4gQmF0dGxlQXZhdGFyTnVtYmVycykge1xuICAgICAgICAgICAgKytqO1xuICAgICAgICAgICAgaWYgKChpIC8gY2hhbXBzLmxlbmd0aCkgKiAxMDAgPj0gdGFyZ2V0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0ICs9IDEwO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke3RhcmdldH0lLi4uYClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYy5hdmF0YXIgPSBCYXR0bGVBdmF0YXJOdW1iZXJzW2MuYXZhdGFyIGFzIGtleW9mIHR5cGVvZiBCYXR0bGVBdmF0YXJOdW1iZXJzXTtcbiAgICAgICAgICAgIGF3YWl0IENoYW1wc0NvbGxlY3Rpb24udXBkYXRlT25lKHtcbiAgICAgICAgICAgICAgICB0cmlwOiBjLnRyaXBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgJHNldDogeyBhdmF0YXI6IGMuYXZhdGFyIH1cbiAgICAgICAgICAgICAgICB9KTsgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBjb25zdCByZWdpc3RlckNoYW1wUmVzdWx0ID0gYXN5bmMgKGJhdHRsZURhdGE6IEJhdHRsZURhdGEsIGhhc1dvbjogYm9vbGVhbik6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCByZXBsYXl1cmw6IHN0cmluZztcbiAgICBpZiAoIWluaXRlZClcbiAgICAgICAgcmV0dXJuO1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHVwZGF0ZUVsbyhiYXR0bGVEYXRhLmNoYW1wLnRyaXAsIGJhdHRsZURhdGEuY2hhbXAuc2hvd2Rvd25fbmFtZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhlKTtcbiAgICB9XG4gICAgbGV0IGluYyA9IGhhc1dvbiA/ICd3aW5zJyA6ICdsb3Nlcyc7XG4gICAgbGV0IGNoYW1wID0gYXdhaXQgQ2hhbXBzQ29sbGVjdGlvbi5maW5kT25lKHsgdHJpcDogYmF0dGxlRGF0YS5jaGFtcC50cmlwIH0pO1xuICAgIGlmICghY2hhbXApIHtcbiAgICAgICAgQ2hhbXBzQ29sbGVjdGlvbi5pbnNlcnRPbmUobmV3IENoYW1wKGJhdHRsZURhdGEuY2hhbXAubmFtZSwgYmF0dGxlRGF0YS5jaGFtcC50cmlwKSk7XG4gICAgfVxuICAgIGlmIChiYXR0bGVEYXRhLmNoYW1wLmF2YXRhciAhPSAnMTY2JylcbiAgICAgICAgYXdhaXQgQ2hhbXBzQ29sbGVjdGlvbi51cGRhdGVPbmUoe1xuICAgICAgICAgICAgdHJpcDogYmF0dGxlRGF0YS5jaGFtcC50cmlwXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAkc2V0OiB7IGF2YXRhcjogYmF0dGxlRGF0YS5jaGFtcC5hdmF0YXIgfVxuICAgICAgICAgICAgfSk7XG4gICAgYXdhaXQgQ2hhbXBzQ29sbGVjdGlvbi51cGRhdGVPbmUoe1xuICAgICAgICB0cmlwOiBiYXR0bGVEYXRhLmNoYW1wLnRyaXBcbiAgICB9LCB7XG4gICAgICAgICAgICAkaW5jOiB7IFtpbmNdOiAxIH0sXG4gICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgbmFtZTogYmF0dGxlRGF0YS5jaGFtcC5uYW1lLFxuICAgICAgICAgICAgICAgIGxhc3Rfc2VlbjogK25ldyBEYXRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIGlmICghaGFzV29uKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKCFiYXR0bGVEYXRhLmNoYW1wLmN1cnJlbnRfYmF0dGxlKVxuICAgICAgICByZXR1cm47XG4gICAgYXdhaXQgcG9rZVV0aWxzLnNhdmVSZXBsYXkoYmF0dGxlRGF0YS5jaGFtcC5jdXJyZW50X2JhdHRsZSk7XG4gICAgcmVwbGF5dXJsID0gJ2h0dHA6Ly9yZXBsYXkucG9rZW1vbnNob3dkb3duLmNvbS8nICsgYmF0dGxlRGF0YS5yb29taWQ7XG4gICAgbGV0IHNhdmVkcmVwbCA9IGF3YWl0IFJlcGxheXNDb2xsZWN0aW9uLmluc2VydE9uZShuZXcgUmVwbGF5KHJlcGxheXVybCxcbiAgICAgICAgJ0F1dG9tYXRpY2FsbHkgdXBsb2FkZWQgcmVwbGF5LiBDaGFtcDogJyArIGJhdHRsZURhdGEuY2hhbXAubmFtZSArICcgJyArIGJhdHRsZURhdGEuY2hhbXAudHJpcCxcbiAgICAgICAgYmF0dGxlRGF0YS5jaGFtcC5uYW1lLFxuICAgICAgICBiYXR0bGVEYXRhLmNoYW1wLnRyaXAsXG4gICAgICAgIDApKTtcbiAgICBsZXQgbiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXR0bGVEYXRhLm1lbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGxldCBzZXQgPSBhd2FpdCBTZXRzQ29sbGVjdGlvbi5maW5kT25lKHsgbmFtZTogYmF0dGxlRGF0YS5tZW1lc1tpXS5uYW1lIH0pXG4gICAgICAgIGlmIChzZXQpIHtcbiAgICAgICAgICAgICsrbjtcbiAgICAgICAgICAgIGF3YWl0IFJlcGxheXNDb2xsZWN0aW9uLnVwZGF0ZSh7IF9pZDogc2F2ZWRyZXBsLmluc2VydGVkSWQgfSxcbiAgICAgICAgICAgICAgICB7ICRwdXNoOiB7IHNldHM6IHNldCB9IH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgY29uc3QgZGVsZXRlU2V0ID0gYXN5bmMgKGlkOiBudW1iZXIsIHRyaXA6IHN0cmluZywgaWdub3JlZD86IGFueSkgPT4ge1xuICAgIGxldCByb3cgPSBhd2FpdCBTZXRzQ29sbGVjdGlvbi5maW5kT25lKHsgaWQgfSk7XG4gICAgaWYgKCFyb3cpXG4gICAgICAgIHRocm93ICdObyBzdWNoIHNldCc7XG4gICAgaWYgKHRyaXAgIT0gc2V0dGluZ3MuYWRtaW5fcGFzcyAmJiAoIXJvdy5oYXNoIHx8ICF0cmlwKSlcbiAgICAgICAgdGhyb3cgJ05vIHRyaXBjb2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNldCBvciBubyB0cmlwY29kZSBnaXZlbic7XG4gICAgaWYgKCEodHJpcCA9PSBzZXR0aW5ncy5hZG1pbl9wYXNzIHx8IHJvdy5oYXNoID09IHRyaXBjb2RlKHRyaXApKSlcbiAgICAgICAgdGhyb3cgJ1dyb25nIHRyaXBjb2RlJztcbiAgICBsZXQgZGVsID0gYXdhaXQgU2V0c0NvbGxlY3Rpb24uZGVsZXRlT25lKHsgaWQgfSk7XG4gICAgdG90YWwtLTtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0ZVNldCA9IGFzeW5jIChpZDogbnVtYmVyLCB0cmlwOiBzdHJpbmcsIGluZm86IHsgZm9ybWF0OiBzdHJpbmcsIGRlc2M6IHN0cmluZywgc2V0OiBzdHJpbmcgfSkgPT4ge1xuICAgIGxldCB1c2V0ID0gYXdhaXQgU2V0c0NvbGxlY3Rpb24uZmluZE9uZSh7IGlkIH0pO1xuICAgIGlmICghdXNldClcbiAgICAgICAgdGhyb3cgJ05vIHN1Y2ggc2V0JztcbiAgICBpZiAodHJpcCAhPSBzZXR0aW5ncy5hZG1pbl9wYXNzICYmICghdXNldC5oYXNoIHx8ICF0cmlwKSlcbiAgICAgICAgdGhyb3cgJ05vIHRyaXBjb2RlIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHNldCBvciBubyB0cmlwY29kZSBnaXZlbic7XG4gICAgaWYgKCEodHJpcCA9PSBzZXR0aW5ncy5hZG1pbl9wYXNzIHx8IHVzZXQuaGFzaCA9PSB0cmlwY29kZSh0cmlwKSkpXG4gICAgICAgIHRocm93ICdXcm9uZyB0cmlwY29kZSc7XG4gICAgdXNldC5mb3JtYXQgPSBcImdlbjdvdVwiO1xuICAgIGxldCBmb3JtYXRzID0gW1wiZ2VuN291XCIsIFwiZ2VuN2FueXRoaW5nZ29lc1wiLCBcInViZXJzXCIsIFwidXVcIiwgXCJydVwiLFxuICAgICAgICBcIm51XCIsIFwicHVcIiwgXCJsY1wiLCBcImdlbjhvdWJldGFcIiwgXCJnZW44ZG91Ymxlc291YmV0YVwiLCBcImNhcFwiXTtcbiAgICBpZiAoZm9ybWF0cy5pbmNsdWRlcyhpbmZvLmZvcm1hdCkpXG4gICAgICAgIHVzZXQuZm9ybWF0ID0gaW5mby5mb3JtYXQ7XG4gICAgdXNldC5kZXNjcmlwdGlvbiA9IGluZm8uZGVzYy5zdWJzdHIoMCwgNjUwKTtcbiAgICBsZXQgcG9rID0gcG9rZVV0aWxzLnBhcnNlU2V0KGluZm8uc2V0KTtcbiAgICBwb2suZm9ybWF0ID0gdXNldC5mb3JtYXQ7XG4gICAgZm9yIChsZXQgaSBpbiBwb2spXG4gICAgICAgIHVzZXRbaV0gPSBwb2tbaV07XG4gICAgdXNldC5kYXRlX2FkZGVkID0gK25ldyBEYXRlKCk7XG4gICAgbGV0IGVycm9ycyA9IGF3YWl0IHBva2VVdGlscy5jaGVja1NldChwb2spO1xuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgICAgdGhyb3cgZXJyb3JzO1xuICAgIH1cbiAgICBTZXRzQ29sbGVjdGlvbi51cGRhdGVPbmUoeyBpZCB9LCB7ICRzZXQ6IHVzZXQgfSk7XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBidWlsZENoZWNrYWJsZVNldCA9IChzZXQ6IFNldHMpID0+IHtcbiAgICBsZXQgbnNldCA9IHNldDtcbiAgICBbMSwgMiwgMywgNF1cbiAgICAgICAgLm1hcChkID0+ICdtb3ZlXycgKyBkKVxuICAgICAgICAuZm9yRWFjaChtcCA9PiBuc2V0W21wXSA9IG5zZXRbbXBdID8gKDxzdHJpbmc+bnNldFttcF0pLnNwbGl0KCcvJylbMF0udHJpbSgpIDogbnVsbCk7XG4gICAgcmV0dXJuIG5zZXQ7XG59XG5cbnR5cGUgdCA9IFtudW1iZXIsIG51bWJlcj9dO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTmV3U2V0ID0gYXN5bmMgKHNkYXRhOiB7XG4gICAgdHJpcDogc3RyaW5nLFxuICAgIGZvcm1hdDogc3RyaW5nLFxuICAgIGRlc2M6IHN0cmluZyxcbiAgICBzZXQ6IHN0cmluZyxcbiAgICBjcmVhdDogc3RyaW5nXG59KSA9PiB7XG4gICAgbGV0IG5zZXQ6IFNldHMgPSB7fSBhcyBTZXRzO1xuICAgIG5zZXQuaGFzaCA9IHRyaXBjb2RlKHNkYXRhLnRyaXApO1xuICAgIG5zZXQuZm9ybWF0ID0gXCJnZW43b3VcIjtcbiAgICBsZXQgZm9ybWF0cyA9IFtcImdlbjdvdVwiLCBcImdlbjdhbnl0aGluZ2dvZXNcIiwgXCJ1YmVyc1wiLCBcInV1XCIsIFwicnVcIixcbiAgICAgICAgXCJudVwiLCBcInB1XCIsIFwibGNcIiwgXCJnZW44b3ViZXRhXCIsIFwiZ2VuOGRvdWJsZXNvdWJldGFcIiwgXCJjYXBcIl07XG5cdGlmIChmb3JtYXRzLmluY2x1ZGVzKHNkYXRhLmZvcm1hdCkpXG4gICAgICAgIG5zZXQuZm9ybWF0ID0gc2RhdGEuZm9ybWF0O1xuICAgIG5zZXQuY3JlYXRvciA9IHNkYXRhLmNyZWF0LnN1YnN0cigwLCAyMyk7XG4gICAgbnNldC5kZXNjcmlwdGlvbiA9IHNkYXRhLmRlc2Muc3Vic3RyKDAsIDY1MCk7XG4gICAgbGV0IHBvayA9IHBva2VVdGlscy5wYXJzZVNldChzZGF0YS5zZXQpO1xuICAgIHBvay5mb3JtYXQgPSBuc2V0LmZvcm1hdDtcbiAgICBsZXQgZXJyb3JzID0gYXdhaXQgcG9rZVV0aWxzLmNoZWNrU2V0KHBvayk7XG4gICAgaWYgKGVycm9ycylcbiAgICAgICAgdGhyb3cgZXJyb3JzO1xuICAgIGZvciAobGV0IGkgaW4gcG9rKVxuICAgICAgICBuc2V0W2ldID0gcG9rW2ldO1xuICAgIG5zZXQuZGF0ZV9hZGRlZCA9ICtuZXcgRGF0ZSgpO1xuICAgIHRvdGFsKys7XG4gICAgbnNldC5pZCA9IChhd2FpdCBTZXRzQ29sbGVjdGlvbi5maW5kKCkuc29ydCh7IGlkOiAtMSB9KS50b0FycmF5KCkpWzBdLmlkICsgMTtcbiAgICBhd2FpdCBTZXRzQ29sbGVjdGlvbi5pbnNlcnQobnNldCk7XG4gICAgcmV0dXJuIG5zZXQ7XG59XG5cbmV4cG9ydCBsZXQgZ2V0UmFuZG9tU2V0ID0gYXN5bmMgKHNlZWQ6IG51bWJlciA9IH5+KE1hdGgucmFuZG9tKCkgKiB0b3RhbCkpID0+IFNldHNDb2xsZWN0aW9uLmZpbmQoKS5za2lwKHNlZWQgJSB0b3RhbCkubGltaXQoMSkudG9BcnJheSgpO1xuIl19