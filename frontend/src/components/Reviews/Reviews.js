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
    >
      <div className="flex my-10 justify-center">
        <img src={ReviewImg} alt="Reviews" className="w-1/2 my-auto -z-10" />
      </div>
      <h2 className="text-3xl font-semibold my-6 text-center">
        What Our Customers have to say...
      </h2>
      <Slider {...settings}>
        {reviews &&
          reviews.filter(review => review.status === "approved")
            .map((review) => (
              <div key={review.id}>

                <div className="bg-white p-4 ml-5 my-4 rounded-lg shadow-md w-4/5 h-64 flex flex-col relative overflow-hidden">
                  {/* Decorative corner elements */}
                  <div className="absolute top-0 right-0 w-16 h-16 -mt-4 -mr-4 bg-yellow-100 rounded-full opacity-30"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 -mb-2 -ml-2 bg-yellow-100 rounded-full opacity-30"></div>

                  {/* Top section with stars and date */}
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex">
                      {Array.from({ length: review.no_of_stars }, (_, index) => (
                        <Star key={index} sx={{ color: "#FFD700", fontSize: "1.25rem" }} />
                      ))}
                    </div>
                    <p className="text-gray-500 text-sm">
                      {format(new Date(review.created_at), "do MMM yyyy")}
                    </p>
                  </div>

                  {/* Content with image and comment */}
                  <div className="flex flex-1 gap-4 overflow-hidden">
                    {/* Square image container */}
                    <div className="flex-shrink-0 w-32 h-32 bg-gray-100 rounded-lg overflow-hidden border-2 border-yellow-100">
                      <img
                        src={review.review_image}
                        alt="Review"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Comment section */}
                    <div className="flex-1 flex flex-col">
                      <div className=" p-3 flex-1 overflow-y-auto">
                        <p className="text-yellow-900 italic font-serif text-[24px] leading-relaxed text-justify">
                          {`"${review.comment}"`}
                        </p>
                      </div>

                      {/* Decorative quote marks */}
                      <div className="absolute top-1/2 right-6 text-yellow-200 text-7xl font-serif -translate-y-1/2 -z-10">
                        "
                      </div>
                    </div>
                  </div>
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
