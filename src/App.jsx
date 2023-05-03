import { useState, useEffect } from "react";
import "./App.css";
//import {  } from "react";

function App() {
  const [products, setProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const fetchData = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    if (data && data.products) {
      setProduct(data.products);
      setTotalPage(data.total / 10);
    }

    console.log(data.products);
  };
  useEffect(() => {
    fetchData();
  }, [page]);
  const selectedPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= totalPage && selectedPage !== page)
      setPage(selectedPage);
  };
  return (
    <>
      {products.length > 0 && (
        <div className="products">
          {products.map((prod) => {
            return (
              <span key={prod.id} className="single-product">
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination_disable"}
            onClick={() => selectedPageHandler(page - 1)}
          >
            ◀️
          </span>

          {[...Array(totalPage)].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selacted-page" : ""}
                onClick={() => selectedPageHandler(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            className={page < totalPage ? "" : "pagination_disable"}
            onClick={() => selectedPageHandler(page + 1)}
          >
            ▶️
          </span>
        </div>
      )}
    </>
  );
}

export default App;
