import React, { useState, useEffect } from "react";
import { FiPlusCircle } from "react-icons/fi";
import DailyMenu from "../DailyMenuItem/index";
import { useDispatch } from "react-redux";
import UserRequest from "services/Requests/User";
import useLoading from "hooks/useLoading";
import { setUsers as setUsersAction, setBookings, setCategories as setCategoriesAction } from "redux/actions";
import BookingRequest from "services/Requests/Booking";
import MainStatistics from "../../components/Dashboard/Home/MainStatistics";
import ReviewRequest from "../../services/Requests/Review";
import OrderRequest from 'services/Requests/Order';
import ProductRequest from '../../services/Requests/Product';
import CategoryRequest from "services/Requests/Category";
import Toaster from "../../components/Toaster/Toaster";

function DashboardHome() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, withLoading] = useLoading();
  const [userCount, setUserCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterType, setToasterType] = useState("error");
  const [categories, setCategories] = useState([]);

  const [modalData, setModalData] = useState({
    category_id: '',
    name: '',
    price: '',
    description: '',
    avatar: ''
  });


  // Fetch functions
  const getAllUsers = async () => {
    try {
      const response = await withLoading(UserRequest.getAllUsers());
      dispatch(setUsersAction(response?.data));
      setUserCount(Array.isArray(response?.data) ? response.data.length : 0);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const getAllBookings = async () => {
    try {
      const bookings = await withLoading(BookingRequest.getAllBookings());
      dispatch(setBookings(bookings?.data));
      setBookingCount(Array.isArray(bookings?.data) ? bookings.data.length : 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllOrders = async () => {
    try {
      const orders = await withLoading(OrderRequest.getAllOrders());
      setOrderCount(Array.isArray(orders?.data) ? orders.data.length : 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllReviews = async () => {
    try {
      const reviews = await withLoading(ReviewRequest.getAllReviews());
      setReviewCount(Array.isArray(reviews?.data) ? reviews.data.length : 0);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await withLoading(CategoryRequest.getAllCategories());
      const categoriesData = response?.data || [];
      setCategories(categoriesData); // Store categories in local state
      dispatch(setCategoriesAction(categoriesData)); // Update Redux store if needed
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllUsers();
    getAllBookings();
    getAllOrders();
    getAllReviews();
    getAllCategories();
  }, []);

  // Modal Handlers
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddproduct = async () => {
    try {
      const formData = new FormData();
      formData.append("category_id", modalData.category_id);
      formData.append("name", modalData.name);
      formData.append("description", modalData.description);
      formData.append("price", modalData.price);

      if (selectedImage) {
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput?.files?.[0]) {
          formData.append("avatar", fileInput.files[0]); // assuming backend expects avatar
        }
      }

      const response = await ProductRequest.addAProduct(formData);
      console.log("Product added", response.data);
      setToasterMessage('Product added.');
      setToasterType('success');
      setShowToaster(true);
      setIsModalOpen(false);
    } catch (error) {
      let errorMsg = "Failed to add product. Please try again.";
      if (error.response && error.response.data) {
        if (error.response.data.name) {
          errorMsg = error.response.data.name[0];
        } else if (error.response.data.price) {
          errorMsg = error.response.data.price[0];
        } else if (error.response.data.avatar) {
          errorMsg = error.response.data.avatar[0];
        }
      }

      console.error("Error adding product:", error);
      setToasterMessage('Failed to add Product .');
      setToasterType('error');
      setShowToaster(true);
    }
  };


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setModalData(prev => ({ ...prev, avatar: file }));
    }
  };

  const handleInputChange = (field) => (e) => {
    setModalData(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="container mx-auto p-4">
      <MainStatistics
        userCount={userCount}
        bookingCount={bookingCount}
        orderCount={orderCount}
        reviewCount={reviewCount}
      />

      <div className="flex justify-between items-center mt-10">
        <h1 className="text-white font-semibold text-[48px]">Add new Product</h1>
        <FiPlusCircle onClick={handleOpenModal} className="text-white text-[48px] cursor-pointer" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-md shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">Add New Product</h2>
            <form>
              <div className="mb-4 flex flex-row">
                <div className="w-1/3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Item Type</label>
                  <select
                    value={modalData.category_id}
                    onChange={handleInputChange("category_id")}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  >
                    <option value="">Select</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mx-6 w-2/3">
                  <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    value={modalData.name}
                    onChange={handleInputChange("name")}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <input
                  type="text"
                  value={modalData.description}
                  onChange={handleInputChange("description")}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                <input
                  type="number"
                  value={modalData.price}
                  onChange={handleInputChange("price")}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
                />
                {selectedImage && (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="mt-4 rounded-md h-20 w-20 object-cover"
                  />
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleAddproduct}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showToaster && <Toaster message={toasterMessage} type={toasterType} onClose={() => setShowToaster(false)} />}

    </div>
  );
}

export default DashboardHome;
