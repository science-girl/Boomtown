// Importing client from postgres library
module.exports = async app => {
  const { Client } = require("pg");
  const client = new Client({
    user: app.get("PGUSER"),
    host: app.get("PGHOST"),
    database: app.get("PGDATABASE"),
    password: app.get("PGPASSWORD"),
    port: app.get("PGPORT")
  });

  await client.connect();

  return {
    // TODO: change to this format
    // async getItems(){
    //   try{
    //   const items = await client.query("SELECT * FROM items");
    //   return items.rows;
    // }catch(e){
    //   return [];
    // }
    // }

    getAllItems() {
      return new Promise((resolve, reject) => {
        client.query("SELECT * FROM items", (err, res) => {
          resolve(res.rows);
        });
      });
    },
    getTags(itemid) {
      return new Promise((resolve, reject) => {
        client.query(
          `SELECT * FROM tags
          INNER JOIN itemtags ON itemtags.tagid = tags.id
          WHERE itemtags.itemid=$1`,
          [itemid],
          (err, res) => {
            resolve(res.rows);
          }
        );
      });
    },
    getItem: id => {
      return new Promise((resolve, reject) => {
        console.log(id);
        client.query("SELECT * FROM items WHERE id=$1", [id], (err, res) => {
          resolve(res.rows);
        });
      });
    }
  };
};

//   createItem(id) {
//     return;
//   },
//   updateItem(id) {
//     return;
//   }
// };
