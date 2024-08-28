exports.searchProducts = async (req, res) => {
  const { name, category } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE name ILIKE $1 OR category ILIKE $2",
      [`%${name}%`, `%${category}%`]
    );

    res.json({ products: result.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "INSERT INTO carts (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [userId, productId]
    );

    res
      .status(201)
      .json({ message: "Product added to cart!", cartItem: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.userId;

  try {
    const result = await pool.query(
      "DELETE FROM carts WHERE user_id = $1 AND product_id = $2 RETURNING *",
      [userId, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    res.json({ message: "Product removed from cart!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
