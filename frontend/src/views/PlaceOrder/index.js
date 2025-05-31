import React, { useEffect, useState } from "react";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";
import OrderRequest from "services/Requests/Order";
import OrderItemRequest from "services/Requests/OrderItem";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function FoodOrder() {

  // Get user info from localStorage
  const user_id = localStorage.getItem("userId");
  const authToken = localStorage.getItem("authToken");
  const userName = localStorage.getItem("first_name");

  const [categoryOneItems, setCategoryOneItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [formData, setFormData] = useState({
    full_name: userName,
    mobile_number: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);



  useEffect(() => {
    const getAllDailyMenuItems = async () => {
      try {
        const dailyMenuItems = await DailyMenuItemRequest.getAllDailyMenuItem();
        setCategoryOneItems(dailyMenuItems?.data || []);
      } catch (error) {
        console.error("Error fetching daily menu items:", error);
      }
    };

    getAllDailyMenuItems();
  }, []);

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = async () => {
    if (!authToken || !user_id) {
      setError("User not authenticated");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Calculate total order price
      const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // Create order payload
      const orderPayload = {
        user_id,
        ...formData,
        price: totalPrice,
        status: "Pending",
        order_time: new Date().toISOString()
      };

      console.log("Sending order payload:", orderPayload);

      // Create order
      const orderResponse = await OrderRequest.addAnOrder(orderPayload);
      console.log("Order creation response:", orderResponse);

      // Extract the created order from the response
      const createdOrder = orderResponse.data.dailyMenuItem;

      if (!createdOrder || !createdOrder.id) {
        console.error("Invalid order response structure:", orderResponse.data);
        throw new Error("Failed to get order ID from response. Created order not found in dailyMenuItem property.");
      }

      const orderId = createdOrder.id;
      console.log("Created order ID:", orderId);

      // Create order items
      const orderItemPromises = cart.map(item =>
        OrderItemRequest.addAnOrderItem({
          order_id: orderId,
          product_id: item.id,
          price: item.price,
          quantity: item.quantity,
          total_cost: item.price * item.quantity,
          user_id: user_id,
          status: "Pending"
        })
      );

      await Promise.all(orderItemPromises);

      setSuccess(true);
      setCart([]);
      // Reset form after successful order
      setFormData({ full_name: "", mobile_number: "", address: "" });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError("Failed to place order: " + err.message);
      console.error("Order creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  const foodItems = categoryOneItems;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Food Items Slider */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Today's Specials</h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
        >
          {foodItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-[30rem] border-brown-800 border-1">
                <div className="flex justify-center items-center p-4">
                  <img
                    className="h-32 w-32 object-cover rounded-lg"
                    src={item.image}
                    alt={item.name}
                  />
                </div>
                <div className="px-6 py-4 h-[12rem]">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base">{item.description}</p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ${item.price}
                  </span>
                  <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                    ⭐ {item.rating || 4.5}
                  </span>
                </div>
                <div className="p-4">
                  <button
                    onClick={() => addToCart(item)}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Order Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Order</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-4 border-b">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price} × {item.quantity}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded-l"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded-r"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-6 pt-4 border-t">
                <div className="flex justify-between font-bold text-xl">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Form */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                disabled
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Mobile Number</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              ></textarea>
            </div>

            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-2 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 text-green-500 bg-green-100 p-2 rounded">
                Order placed successfully!
              </div>
            )}

            <button
              onClick={handleConfirmOrder}
              disabled={loading || cart.length === 0}
              className={`w-full py-3 rounded-lg font-bold ${loading || cart.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
                } text-white transition`}
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodOrder;