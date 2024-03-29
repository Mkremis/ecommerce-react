import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Filters from "../components/Filters";
import ProductFooter from "../components/ProductFooter";
import Aside from "../components/Aside";
const limit = 48;

const SortProduct = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { page, setPage, refreshPage } = useContext(AuthContext);
  const data = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const path = pathname.split("/");
  const root = path[1];

  useEffect(() => {
    if (
      data &&
      Object.keys(data).length > 0 &&
      data.hasOwnProperty("products")
    ) {
      if (page > 1) {
        setItems([...items, ...data.products]);
      } else {
        setItems([...data.products]);
      }
    }
  }, [data, setItems]);

  useEffect(() => {
    let offset = page * limit;
    if (page === 1) window.scrollTo(0, 0);
    if (page > 1 && hasMore) {
      navigate(
        `/${root}/category/${path[3]}/sortBy/${path[5]}/filter/${path[7]}/search/${path[9]}/offset/${offset}`
      );
    }
    if (offset >= data.itemCount) setHasMore(false);
  }, [page, hasMore, setHasMore]);
  return (
    <>
      {data && data.facets && (
        <Filters facets={data.facets} refreshPage={refreshPage} />
      )}
      <section className="content">
        <InfiniteScroll
          dataLength={items.length} //This is important field to render the next data
          next={() => setPage(page + 1)}
          hasMore={hasMore}
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "baseline",
            overflow: "hidden",
          }}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen it all</b>
            </p>
          }
        >
          {items.length > 0 &&
            items.map((product) => {
              if (product.productType === "Product") {
                return (
                  <section className="product" key={product.id}>
                    <ProductCard
                      image={`https://${product.imageUrl}`}
                      name={product.name}
                      price={product.price}
                      id={product.id}
                      gender={root}
                    >
                      <ProductFooter
                        prodId={product.id}
                        prodName={product.name}
                        prodGender={root}
                        prodImage={`https://${product.imageUrl}`}
                        prodPrice={product.price}
                      />
                    </ProductCard>
                  </section>
                );
              }
            })}
        </InfiniteScroll>
      </section>
      <Aside />
    </>
  );
};

export default SortProduct;
