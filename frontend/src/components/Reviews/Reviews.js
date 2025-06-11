import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star } from "@mui/icons-material";
import ReviewImg from "../../assets/vectors/reviewImg.png";
import { setReviews } from "../../redux/actions"; // Adjust the path based on your file structure
import ReviewRequest from "../../services/Requests/Review"; // Adjust the path based on your file structure
import useLoading from "hooks/useLoading";
import { format } from "date-fns"; // Import date-fns for date formatting

const Reviews = ({ reviews, setReviews }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [loading, withLoading] = useLoading();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await withLoading(ReviewRequest.getAllReviews());
        setReviews(response.data);

      } catch (error) {
        console.error("Error fetching reviews:", error);

      }
    };

    if (!reviews || reviews.length === 0) {
      fetchReviews();
    }

    const interval = setInterval(() => {
      setSlideIndex((prevIndex) =>
        prevIndex === (reviews?.length || 0) - 2 ? 0 : prevIndex + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [setReviews]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: slideIndex,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-2 lg:mt-30 md:mt-22 sm:mt-11 pt-18 container relative h-screen items-center justify-center w-full"
    // style={{ backgroundImage: `url(${ReviewImg})` }}
    >
      <div className="flex my-10 justify-center">
        <img src={ReviewImg} alt="Reviews" className="w-1/2 my-auto -z-10" />
      </div>
      <h2 className="text-3xl font-semibold my-6 text-center">
        What Our Customers have to say...
      </h2>
      <Slider {...settings}>
        {reviews &&
          reviews.map((review) => (
            <div key={review.id}>
              <div className="bg-white p-4 ml-5 h-full my-4 rounded-lg shadow-md w-4/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{review.full_name}</div>
                  <div className="flex items-center">
                    {Array.from({ length: review.no_of_stars }, (_, index) => (
                      <Star key={index} sx={{ color: "#FFD700" }} />
                    ))}
                  </div>
                </div>
                <img
                  src={review.review_image}
                  alt={review.full_name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <p className="text-black">{review.comment}</p>
                <p className="text-gray-500">
                  Posted on {format(new Date(review.created_at), "do MMM yyyy")}
                </p>
              </div>
            </div>
          ))}
      </Slider>
      {loading && <p>Loading reviews...</p>}
    </div>
  );
};

const mapStateToProps = (state) => ({
  reviews: state.review.reviews, // Assuming your reviews state is stored in `review.reviews`
});

const mapDispatchToProps = {
  setReviews,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);
