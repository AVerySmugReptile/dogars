import { Champ } from '../Shoedrip/Champ';
import { RoomID } from './PSRoom';

export class MemeStats {
	name: string = '';
	kills: number = 0;
	dead: boolean = false;
}

export type playerAlias = 'p1' | 'p2';

export class BattleData {
	champ!: Champ;
	dist: number = Infinity;
	roomid: RoomID = '' as RoomID;
	finished: boolean = false;
	champ_alias?: playerAlias;
	active_meme?: string;
	memes: MemeStats[] = []
}
