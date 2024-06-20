import connection from '../_db.js';

const resolvers = {
  Query: {
    products: async () => {
      try {

        const query = 'SELECT * FROM products';
        const [products] = await connection.query(query);
        return products;

      } catch (err) {
        return err;
      }
    },
    product: async (_, args) => {
      try {

        const { id } = args;
        const query = `SELECT * FROM products WHERE id = ${id}`;
        const [product] = await connection.query(query);
        return product[0];

      } catch (err) {
        return err;
      }
    }
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {

        const { name, price, description } = args.product;
        const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
        const inputs = [name, price, description];
        const [product] = await connection.query(query, inputs);

        // Get the insert ID from the result
        const newProductId = product.insertId;

        // Fetch the newly inserted product by its ID
        const selectQuery = 'SELECT * FROM products WHERE id = ?';
        const [newProduct] = await connection.query(selectQuery, [newProductId]);

        return newProduct[0];

      } catch (err) {
        return err
      }
    },
    updateProduct: async (_, args) => {
      try {

        const { id } = args;
        const updates = [];
        const values = [];

        // Build the SET clause dynamically based on the provided input
        for(const key in args.edit) {
          if(args.edit.hasOwnProperty(key) && args.edit[key] !== undefined){
            updates.push(`${key}=?`);
            values.push(args.edit[key]);
          }
        }

        // Check if any updates were provided
        if (updates.length === 0) {
          throw new Error("No valid fields provided for update.");
        }

        const query = `UPDATE products SET ${updates.join(', ')} WHERE id=?`;
        await connection.query(query, [...values, id]);

        // Fetch the newly inserted product by its ID
        const selectQuery = 'SELECT * FROM products WHERE id = ?';
        const [updatedProduct] = await connection.query(selectQuery, [id]);

        return updatedProduct[0];

      } catch (err) {
        return err
      }
    },
    deleteProduct: async (_, args) => {
      try {

        const { id } = args;
        const query = `DELETE FROM products WHERE id = ?`;
        const [product] = await connection.query(query, [id]);

        if (product.affectedRows > 0) {
          return `Product with ID ${id} successfully deleted.`;
        } else {
          throw new Error(`Product with ID ${id} not found or couldn't be deleted.`);
        }

      } catch (err) {
        return err
      }
    }
  }
}

export default resolvers;