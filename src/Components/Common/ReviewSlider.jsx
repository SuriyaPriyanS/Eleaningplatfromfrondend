import React, { useEffect, useState } from "react";
//import { Card } from "flowbite-react";
//import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa";
import Img from './Imge'; // Replace with your image component if needed

// Import Swiper React components for sliding reviews
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// API service imports
import { apiConnector } from "../../services/apiConnector";
import { ratingsEndpoints } from "../../services/apis";

function ReviewSlider() {
  const [reviews, setReviews] = useState(null);
  const truncateWords = 15;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await apiConnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        );
        if (data?.success) {
          setReviews(data?.data);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  if (!reviews) return null;

  return (
    <div className="container mx-auto py-10">
      <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
        <Swiper
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          className="w-full"
        >
          {reviews.map((review, i) => (
            <SwiperSlide key={i}>
              <Card className="bg-richblack-800 p-4 text-white">
                <div className="flex items-center gap-4">
                  <Img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold capitalize">
                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                    </h1>
                    <h2 className="text-sm font-medium text-gray-400">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>

                <p className="mt-2 text-sm">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : review?.review}
                </p>

                <div className="flex items-center gap-2 mt-2">
                  <h3 className="font-semibold text-yellow-400">
                    {review.rating}
                  </h3>
                  <ReactStars
                    count={5}
                    value={parseInt(review.rating)} // Convert to a number
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default ReviewSlider;
