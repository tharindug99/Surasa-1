// frontend/src/views/DailyMenu/index.js
import React from "react";
import { connect } from "react-redux";
import { setProducts } from "redux/actions"; // Assuming you have a setProducts action
import ProductRequest from "services/Requests/Product"; // Use Product service instead of DailyMenuItem
import { useEffect } from "react";
import useLoading from "hooks/useLoading";
import ProductsTable from "components/product/ProductTable";

const DailyMenu = (props) => {
  const { setProducts, products } = props; // Receive products from props
  const [loading, withLoading] = useLoading();

  const getAllProducts = async () => {
    try {
      const products = await withLoading(
        ProductRequest.getAllProducts() // Use product endpoint
      );
      setProducts(products?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    if (products?.length < 1) {
      getAllProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container">
      {loading ? (
        "Loading Products..."
      ) : (
        //Add Header

        <div>
          <h2 style={{ marginBottom: '20px' }}>Products Table</h2>
          <ProductsTable products={products} />
        </div>


      )}
    </div>
  );
};

const mapStateToProps = ({ product }) => ({
  products: product.products || [] // Assuming your Redux store has a product reducer
});

const mapDispatchToProps = {
  setProducts // Use product action instead of daily menu action
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyMenu);