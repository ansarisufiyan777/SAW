import * as SQLite from "expo-sqlite";

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}
const db = openDatabase();
export const createTable = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists attributes (id integer primary key not null, deleted int, attribute text, turk text, french text, english text, sources text, prototype text, note text);"
    );
  });
};
export const add = (
  attribute,
  turk,
  french,
  english,
  sources,
  prototype,
  note,
  forceUpdate
) => {
  // is text empty?
  if (text === null || text === "") {
    return false;
  }

  db.transaction(
    (tx) => {
      tx.executeSql(
        "insert into attributes (deleted, attribute, turk,french, english, sources, prototype, note) values (0, ?,?,?,?,?,?,?)",
        [attribute, turk, french, english, sources, prototype, note]
      );
      tx.executeSql("select * from attributes", [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    },
    null,
    forceUpdate
  );
};

export const deleteItem = (id, forceUpdate) => {
  db.transaction(
    (tx) => {
      tx.executeSql(`delete from attributes where id = ?;`, [id]);
    },
    null,
    forceUpdate
  );
};

export const update = (id, forceUpdate) => {
  db.transaction(
    (tx) => {
      tx.executeSql(
        `update attributes set 
      attribute = ? turk = ? french = ? english = ? sources = ? prototype = ? note = ?
      where id = ?;`,
        [id]
      );
    },
    null,
    forceUpdate
  );
};

export const selectAll = (setItems) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from attributes;`,
      [],
      (_, { rows: { _array } }) => {
        console.log(_array);
        setItems(_array);
      }
    );
  });
};

export default db;
