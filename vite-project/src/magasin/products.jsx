import { useEffect, useState } from "react";
import "./mag.css";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);
  const [dataLength, setDataLength] = useState(0);

  const limit = 10;
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products", {
        params: { limit: limit * count },
      })
      .then((res) => {
        setProducts(res.data.products);
        setDataLength(res.data.total);
      })
      .catch((err) => console.error("Xatolik:", err))
      .finally(() => setLoading(false));
  }, [count]);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div>
      <h1>Mahsulotlar</h1>
      <input
        type="text"
        placeholder="Mahsulot qidirish..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <select>
        <option >Saralash...</option>
        <option >A - Z</option>
        <option >Z - A</option>
        <option >Narx Arzon</option>
        <option >Narx Qimmat</option>
        <option>Reyting past</option>
        <option >Reyting baland</option>
      </select>

      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      <ul className="cards">
        {filteredProducts.map((product) => (
          <li className="card" key={product.id}>
            <img className="card_img" src={product.thumbnail} alt={product.title} />
            <div className="card_content">
              <b>{product.title}</b>
              <p>Narxi: {product.price} $</p>
              <p>Reyting: {product.rating}</p>
            </div>
          </li>
        ))}
      </ul>

      {products.length > 0 && dataLength > limit * count && (
        <button onClick={() => setCount((prev) => prev + 1)} className="btn">
          Show more
        </button>
      )}
    </div>
  );
};

export default Products;
