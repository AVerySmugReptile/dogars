let Client   = require('mysql');
let fs       = require('fs');
let poke     = require('./poke-utils');
let tripcode = require('tripcode');

let settings = JSON.parse(fs.readFileSync('settings.json'));

let c = Client.createConnection(settings.db);

let total = 0;

c.query('SELECT COUNT(*) FROM Sets', (e, rows) => {
  if (e)
    console.log(e);
  total = rows[0]['COUNT(*)'];
  total = parseInt(total);
  module.exports.total = total;
});

module.exports.getAllSets = (cb) => {
  c.query('select * from Sets', (e, rows) => {
    if (e)
      console.log(e);
    cb(rows);
  });
}

module.exports.getSetsPage = (setPerPage, pageNumber, cb) => {
  let offset = setPerPage * pageNumber;
  c.query('select * from Sets order by id desc limit ? offset ?;', [~~setPerPage, ~~offset], (e, rows) => {
    if (e)
      console.log(e);
    cb(rows);
  });
}

module.exports.getSetById = (id, cb) => {
  c.query('select * from Sets where id = ?', [id], (e, rows) => {
    if (e)
      console.log(e);
    console.log(id);
    cb(rows[0]);
  });
}

module.exports.getSetsByName = (name, cb) => {
  let pattern = '%' + name + '%';
  c.query('select * from Sets where name like ? or species like ? or move_1 like ? or move_2 like ? or move_3 like ? or move_4 like ?',
          [pattern,
           pattern, pattern, pattern, pattern,
           pattern], (e, rows) => {
    if (e)
      console.log(e);
    cb(rows);
  });
}

module.exports.createNewSet = (request, cb) => {
  let row = {};
  row.hash = tripcode(request.body.trip);
  row.format = "gen7ou";
  let formats = ["gen7ou", "gen7anythinggoes", "ubers", "uu", "ru",
				 "nu", "pu", "lc", "cap"];
  formats.forEach(f => {
    if (request.body.format == f)
      row.format = f;
  });
  row.creator = request.body.creat.substr(0, 23);
  row.description = request.body.desc.substr(0, 230);
  row.date_added = +new Date();

  try {
    let pok = poke.parseSet(request.body.set);
    for(var i in pok)
      row[i] = pok[i];
  }
  catch(e) {
      return cb(e);
  }
  console.log(row);
  let data = ['date_added', 'format', 'creator', 'hash', 'name', 'species',
              'gender', 'item', 'ability', 'shiny', 'level', 'happiness', 'nature',
              'move_1', 'move_2', 'move_3', 'move_4', 'hp_ev', 'atk_ev', 'def_ev',
              'spa_ev', 'spd_ev', 'spe_ev', 'hp_iv', 'atk_iv', 'def_iv', 'spa_iv',
              'spd_iv', 'spe_iv', 'description'];

  let data_arr = [];

  let querystr = 'INSERT INTO Sets (';

  data.forEach(attr => {
    data_arr.push(row[attr]);
    querystr += attr;
    if (attr != 'description')
      querystr += ', ';
  })
  querystr += ') VALUES (';
  data.forEach(attr => {
    querystr += '?';
    if (attr != 'description')
      querystr += ', ';
  });
  querystr += ')';
  c.query(querystr, data_arr, (e, rows) => {
    if (e)
      return cb(e);
    cb(null, rows);
    module.exports.total++;
  });
}

module.exports.updateSet = (request, cb) => {
  module.exports.getSetById(request.params.id, row => {
    if (request.body.trip == '' || (request.body.trip != settings.admin_pass && row.hash != tripcode(request.body.trip)))
      return cb('Wrong tripcode');
    row.format = "gen7ou";
    let formats = ["gen7ou", "gen7anythinggoes", "ubers", "uu", "ru",
				   "nu", "pu", "lc", "cap"];
    formats.forEach(f => {
      if (request.body.format == f)
        row.format = f;
    });
    row.description = request.body.desc.substr(0, 230);
    row.date_added = +new Date();
    try {
      let pok = poke.parseSet(request.body.set);
      for(var i in pok)
        row[i] = pok[i];
    }
    catch(e) {
      return cb(e);
    }
    let data = ['date_added', 'format', 'creator', 'hash', 'name', 'species',
                'gender', 'item', 'ability', 'shiny', 'level', 'happiness', 'nature',
                'move_1', 'move_2', 'move_3', 'move_4', 'hp_ev', 'atk_ev', 'def_ev',
                'spa_ev', 'spd_ev', 'spe_ev', 'hp_iv', 'atk_iv', 'def_iv', 'spa_iv',
                'spd_iv', 'spe_iv', 'description'];

    let data_arr = [];

    let querystr = 'UPDATE Sets SET ';

    data.forEach(attr => {
      data_arr.push(row[attr]);
      querystr += attr + ' = ?';
      if (attr != 'description')
        querystr += ', ';
    })
    querystr += ' WHERE id = ?';
    data_arr.push(request.params.id);
    console.log(querystr);
    c.query(querystr, data_arr, (e, rows) => {
      if (e)
        cb(e);
      else
        cb(null, rows.info);
    });
  });
}

module.exports.deleteSet = (request, cb) => {
  module.exports.getSetById(request.params.id, row => {
    console.log('TRIP: ' + request.body.trip);
    if (request.body.trip == '' ||
        (request.body.trip != settings.admin_pass &&
         row.hash != tripcode(request.body.trip)))
      return cb('Wrong tripcode');
    c.query('DELETE FROM Sets WHERE id = ?', [request.params.id], (e, rows) => {
      if (e)
        return cb(e);
      cb(null, rows.info);
      module.exports.total--;
    });
  });
}
