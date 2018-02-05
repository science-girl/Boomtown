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

  // ($1, $2), ($1, $3)
  // @param array of tagIds
  // @return a comma separated field of tagIds and the resultId
  generateTagsInsert = tagIdLength => {
    let tagString = "";
    for (let i = 2; i < tagIdLength + 2; i++) {
      tagString = tagString.concat("($1, $" + i + "),");
    }
    return tagString.slice(0, tagString.length - 1);
  };

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

    async getTagMenu() {
      try {
        const tags = await client.query(`SELECT * FROM tags`);
        return tags.rows;
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
    },

    async addItem({ title, description, itemowner, imageurl, tags }) {
      console.log(tags);
      const itemValues = [title, description, itemowner, imageurl];
      const itemInsertQuery = `INSERT INTO items(title, description, itemowner, imageurl)
      VALUES($1, $2, $3, $4) RETURNING *`;
      tags = tags.map(t => t.id);
      try {
        await client.query("BEGIN");
        const itemResult = await client.query(itemInsertQuery, itemValues);
        const tagsInsertQuery =
          "INSERT INTO itemtags (itemid, tagid) VALUES " +
          generateTagsInsert(tags.length);

        const tagResults = await client.query(tagsInsertQuery, [
          itemResult.rows[0].id,
          ...tags
        ]);

        await client.query("COMMIT");
        return itemResult.rows[0];
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    },
    async updateItem({ borrower, id }) {
      const updateValues = [borrower, id];
      const updateBorrowerQuery = `UPDATE items SET borrower=$1 WHERE id=$2`;
      try {
        const itemResult = await client.query(
          updateBorrowerQuery,
          updateValues
        );
        console.log(itemResult);
        return itemResult.rows;
      } catch (e) {
        await client.query("ROLLBACK");
        throw e;
      }
    }
  };
};
