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
      console.log("Products from method:", products.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getAllDailyMenuItems = async () => {
    try {
      const dailyMenuItems = await withLoading(
        DailyMenuItemRequest.getAllDailyMenuItem()
      );
      setDailyMenuItems(dailyMenuItems?.data);
      // console.log("Daily Menu Items from method:", dailyMenuItems.data);
    } catch (error) {
      console.error("Error fetching daily menu items:", error);
    }
  };


  useEffect(() => {
    if (products?.length < 1) {
      getAllProducts();
      console.log("Products from useeffect:", products);
    }
    if (dailyMenuItems?.length < 1) {
      getAllDailyMenuItems();
      console.log("Daily Menu Items from useeffect:", dailyMenuItems.data);
    }
  }, [products.length, dailyMenuItems.length]);

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleUpdate = (updatedProduct) => {
    setProducts(products.map(p =>
      p.id === updatedProduct.id ? updatedProduct : p
    ));
  };

  const handleDailyMenuDelete = (itemId) => {
    setDailyMenuItems(dailyMenuItems.filter(item => item.id !== itemId));
  }

  const handleDailyMenuUpdate = (updatedItem) => {
    setDailyMenuItems(dailyMenuItems.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  return (
    <div className="container">
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h2 style={{ marginBottom: '20px' }}>Products Table</h2>
          <ProductsTable
            products={products}
            onDelete={handleDelete}
            onUpdate={handleUpdate} />

          <h2 style={{ marginBottom: '20px', marginTop: '40px' }}>Daily Menu Items</h2>
          <DailyMenuTable
            dailyMenuItems={dailyMenuItems}
            onDelete={handleDailyMenuDelete}
            onUpdate={handleDailyMenuUpdate} />
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ product, dailyMenuItem }) => ({
  products: product.products || [],
  dailyMenuItems: dailyMenuItem.dailyMenuItems || []
});

const mapDispatchToProps = {
  setProducts,
  setDailyMenuItems
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyMenu);