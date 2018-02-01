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
    async getUserOwnedItems(userid) {
      try {
        const items = await client.query(
          "SELECT * FROM items where itemowner=$1",
          [userid]
        );
        return items.rows;
      } catch (error) {
        return [];
      }
    },

    async getBorrowedItems(userid) {
      try {
        const borrowedItems = await client.query(
          "SELECT * FROM items where borrower=$1",
          [userid]
        );
        return borrowedItems.rows;
      } catch (error) {
        return [];
      }
    },

    async getAllItems() {
      try {
        const allItems = await client.query("SELECT * FROM items");
        return allItems.rows;
      } catch (error) {
        return [];
      }
    },

    async fetchItems(id) {
      try {
        const items = await client.query(
          "SELECT * FROM items where item.id=$1",
          [id]
        );
        return items.rows;
      } catch (error) {
        return [];
      }
    },

    async getTags(itemid) {
      try {
        const tags = await client.query(
          `SELECT * FROM tags
        INNER JOIN itemtags ON itemtags.tagid = tags.id
        WHERE itemtags.itemid=$1`,
          [itemid]
        );
        return tags.rows;
      } catch (error) {
        return [];
      }
    },
    async getItem(id) {
      try {
        const items = await client.query("SELECT * FROM items WHERE id=$1", [
          id
        ]);
        return items.rows;
      } catch (error) {
        return [];
      }
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
