import React from 'react';
import {TiStarFullOutline, TiStarHalfOutline,TiStarOutline} from "react-icons/ti"

const RatingStars = () => {

    const [starCount, setStarCount] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
    })

    useEffect(()=> {
        const wholeStars = Math.floor(Review_Count) || 0
        setStarCount({
            one: wholeStars,
            two: Review_Count % 1 >= 0.5? wholeStars + 1 : wholeStars,
            three: Review_Count % 1 >= 0.5 && Review_Count % 1 < 0.8? wholeStars + 1 : wholeStars,
            four: Review_Count % 1 >= 0.8 && Review_Count % 1 < 1.2? wholeStars + 1 : wholeStars,
            five: Review_Count % 1 >= 1.2? wholeStars + 1 : wholeStars,
        }, [Review_Count])
    })
    return (
        <div className="flex gap-1 text-yellow-100">
        {starCount.full >= 0 &&
          [...new Array(starCount.full)].map((_, i) => (
            <TiStarFullOutline key={i} size={Star_Size || 20} />
          ))}
        {starCount.half >= 0 &&
          [...new Array(starCount.half)].map((_, i) => (
            <TiStarHalfOutline key={i} size={Star_Size || 20} />
          ))}
        {starCount.empty >= 0 &&
          [...new Array(starCount.empty)].map((_, i) => (
            <TiStarOutline key={i} size={Star_Size || 20} />
          ))}
      </div>
    );
};

export default RatingStars;