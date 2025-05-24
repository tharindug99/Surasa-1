// frontend/src/views/DailyMenu/index.js
import React from "react";
import { connect } from "react-redux";
import { setProducts, setDailyMenuItems } from "redux/actions";
import ProductRequest from "services/Requests/Product";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";
import { useEffect } from "react";
import useLoading from "hooks/useLoading";
import ProductsTable from "components/product/ProductTable";
import DailyMenuTable from "../../views/DailyMenuItem/DailyMenuTable";

const DailyMenu = (props) => {
  const {
    setProducts,
    setDailyMenuItems,
    products,
    dailyMenuItems
  } = props;
  const [loading, withLoading] = useLoading();

  const getAllProducts = async () => {
    try {
      const products = await withLoading(
        ProductRequest.getAllProducts()
      );
      setProducts(products?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Updated to match service method name
  const getAllDailyMenuItems = async () => {
    try {
      const menuItems = await withLoading(
        DailyMenuItemRequest.getAllDailyMenuItem() // Match exact service method name
      );
      setDailyMenuItems(menuItems?.data);
      console.log("Daily Menu Items from method:", menuItems?.data);
    } catch (error) {
      console.error("Error fetching daily menu items:", error);
    }
  };

  useEffect(() => {
    if (products?.length < 1) {
      getAllProducts();
    }
    if (dailyMenuItems?.length < 1) {
      getAllDailyMenuItems();
      console.log("Daily Menu Items from useeffect:", dailyMenuItems);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Products Table</h2>
          <ProductsTable products={products} />

          <h2 style={{ marginBottom: '20px', marginTop: '40px' }}>Daily Menu Items</h2>
          <DailyMenuTable menuItems={dailyMenuItems} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ product, dailyMenuItem }) => ({
  products: product.products || [],
  dailyMenuItems: dailyMenuItem.items || []
});

const mapDispatchToProps = {
  setProducts,
  setDailyMenuItems
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyMenu);