import React, { useEffect, useState } from "react";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Beverage() {
  const [categoryOneItems, setCategoryOneItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllDailyMenuItems = async () => {
      try {
        const dailyMenuItems = await DailyMenuItemRequest.getAllDailyMenuItem();
        setCategoryOneItems(dailyMenuItems?.data || []);
        console.log(dailyMenuItems);
      } catch (error) {
        console.error("Error fetching daily menu items:", error);
      }
    };

    getAllDailyMenuItems();
  }, []);

  const BeverageItems = categoryOneItems.filter(item => item.category_id === 2);

  return (
    <div className="container mx-auto px-4 py-8">
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
        {BeverageItems.map((item) => (
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
              <div className="px-6 pt-4 pb-2 bottom-4">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  ${item.price}
                </span>
                <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  ⭐ {item.rating || 4.5}
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Beverage;
