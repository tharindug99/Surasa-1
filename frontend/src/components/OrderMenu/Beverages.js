import React, { useEffect, useState } from "react";
import DailyMenuItemRequest from "services/Requests/DailyMenuItem";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Beverage() {
  const [categoryOneItems, setCategoryOneItems] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllDailyMenuItems = async () => {
      try {
        const dailyMenuItems = await DailyMenuItemRequest.getAllDailyMenuItem();
        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"
        setCategoryOneItems(dailyMenuItems?.data || []);
        console.log("Today's date", today)
        console.log("All Daily Menuitems", dailyMenuItems);
        (dailyMenuItems?.data || []).forEach(item => {
          console.log("Item ID:", item.id, "Date:", item.date);
        });
        const todaysItems = (dailyMenuItems?.data || []).filter(
          item => item.date === today
        );
        setCategoryOneItems(todaysItems);
        console.log(categoryOneItems);
        console.log("Today Items", todaysItems);
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
        centerInsufficientSlides={true}
      >
        {BeverageItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="bg-white my-5 justify-between rounded-lg items-center shadow-md overflow-hidden h-[30rem] flex flex-col">
              <div className="flex justify-center items-center">
                <img
                  className="h-44 w-44 object-cover rounded-lg my-2"
                  src={item.image}
                  alt={item.name}
                />
              </div>
              <div className="px-6 py-4 flex-grow w-full">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 h-4 text-base">{item.description}</p>
              </div>
              <div className="px-6 pt-4 pb-2 w-full">
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    LKR {item.price}
                  </span>
                  <span className="inline-block bg-yellow-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                    ⭐ {item.rating || 4.5}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Beverage;
