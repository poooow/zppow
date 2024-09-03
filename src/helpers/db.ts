import {enablePromise, openDatabase} from 'react-native-sqlite-storage';
const parseString = require('react-native-xml2js').parseString;
const XML_URL = 'https://raw.githubusercontent.com/poooow/zppow/main/inet.xml';
enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'DbZpevnikator4', location: 'default'});
};

export async function existsDb(): Promise<boolean> {
  const db = await getDBConnection();
  try {
    const results = await db.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name='zpevnikator';`,
    );
    return results[0].rows.length ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function purgeDb() {
  if ((await existsDb()) === false) return false;

  const db = await getDBConnection();
  try {
    await db.executeSql('DROP TABLE zpevnikator;');
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function createDb() {
  const db = await getDBConnection();
  try {
    await db.executeSql(
      'CREATE VIRTUAL TABLE IF NOT EXISTS zpevnikator USING fts4(id INTEGER PRIMARY KEY AUTOINCREMENT, groupname TEXT, title TEXT, text TEXT, textclean TEXT, tokenize=unicode61);',
    );
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function populateDb(setStatus: (status: string) => void) {
  createDb();

  setStatus('Nahrávám zpěvník ...');

  let xmlData;

  try {
    xmlData = await fetch(XML_URL);
    xmlData = await xmlData.text();
  } catch (error) {
    console.error(error);
    return;
  }

  let jsonData: any;
  parseString(xmlData, (_err: any, result: any) => (jsonData = result));

  if (jsonData) {
    setStatus('Zpracovávám zpěvník ...');
  } else {
    purgeDb();
    setStatus('Nepodařilo se stáhnout zpěvník');
    return;
  }

  let song = jsonData.InetSongDb.song;

  const db = await getDBConnection();

  try {
    db.transaction(tx => {
      for (let i = 0; i < song.length; i++) {
        let groupname = song[i].groupname
          .toString()
          .replace(/\"/g, '&quot;')
          .replace(/\"/g, '&quot;');
        let title = song[i].title.toString().replace(/\"/g, '&quot;');
        let text = song[i].songtext.toString().replace(/\"/g, '&quot;');
        let textclean = text.replace(/\[(.{1,7}?)\]/g, '');

        tx.executeSql(
          'INSERT INTO zpevnikator (groupname, title, text, textclean) VALUES (?,?,?,?)',
          [groupname, title, text, textclean],
        );
      }
    });
  } catch (error) {
    setStatus('Nepodařilo se uložit zpěvník');
    console.error(error);
    return;
  }
}

/**
 * Get songs from database to state
 * @param query query string
 */
export async function getSongList(query: string) {
  query = '*' + query + '*';

  const db = await getDBConnection();

  let songList: any = [];

  await db.transaction(async tx => {
    var [tx, results] = await tx.executeSql(
      'SELECT groupname,title,text,snippet(zpevnikator, "<b>", "</b>","...", 4, 10) AS snippet FROM zpevnikator WHERE title MATCH ? OR groupname MATCH ? OR zpevnikator MATCH ? LIMIT 42',
      [query, query, query],
    );

    for (let i = 0; i < results.rows.length; ++i) {
      songList.push({
        id: i.toString(),
        groupname: results.rows.item(i).groupname,
        title: results.rows.item(i).title,
        text: results.rows.item(i).text,
        snippet: results.rows.item(i).snippet,
      });
    }
  });

  return songList;
}
