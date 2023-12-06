
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('dashboard.db');


export const createTable = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS dashboardtable (id INTEGER PRIMARY KEY AUTOINCREMENT, GenerateQuestions TEXT)',
          [],
          () => resolve(),
          error => reject(error)
        );
      },
      error => console.log('Transaction error:', error)
    );
  });
};

export const fetchData = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'SELECT * FROM dashboardtable',
          [],
          (_, { rows: { _array } }) => resolve(_array),
          error => reject(error)
        );
      },
      error => console.log('Transaction error:', error)
    );
  });
};

export const insertData = async name => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO dashboardtable (GenerateQuestions) VALUES (?)',
          [name],
          (_, { insertId }) => resolve(insertId),
          error => reject(error)
        );
      },
      error => console.log('Transaction error:', error)
    );
  });
};

// export const updateData = async (id, newName) => {
//   return new Promise((resolve, reject) => {
//     db.transaction(
//       tx => {
//         tx.executeSql(
//           'UPDATE users SET name=? WHERE id=?',
//           [newName, id],
//           (_, results) => resolve(results.rowsAffected),
//           error => reject(error)
//         );
//       },
//       error => console.log('Transaction error:', error)
//     );
//   });
// };

// export const deleteData = async id => {
//   return new Promise((resolve, reject) => {
//     db.transaction(
//       tx => {
//         tx.executeSql(
//           'DELETE FROM users WHERE id=?',
//           [id],
//           (_, results) => resolve(results.rowsAffected),
//           error => reject(error)
//         );
//       },
//       error => console.log('Transaction error:', error)
//     );
//   });
// };
