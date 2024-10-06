import React from 'react';

import Logo1 from '../../../assets/TimeLineLogo/logo1.png';
import Logo2 from '../../../assets/TimeLineLogo/logo2.png';
import Logo3 from '../../../assets/TimeLineLogo/logo3.png';
import Logo4 from '../../../assets/TimeLineLogo/logo4.png';
import timelineImage from '../../../assets/Images/random bg img/coding bg11.jpg';

import Img from './../../Common/Imge';
import { motion } from 'framer-motion';
import { fadeIn } from '../../Common/motionFrameVarients';

// Timeline data
const timeline = [
  {
    Logo: Logo1,
    heading: 'Leadership',
    Description: 'Fully committed to the success of the company',
  },
  {
    Logo: Logo2,
    heading: 'Responsibility',
    Description: 'Students will always be our top priority',
  },
  {
    Logo: Logo3,
    heading: 'Flexibility',
    Description: 'The ability to switch is an important skill',
  },
  {
    Logo: Logo4,
    heading: 'Solve the problem',
    Description: 'Code your way to a solution',
  },
];

const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row gap-15 items-center'>
        {/* Timeline List */}
        <motion.div
          variants={fadeIn('right', 0.1)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.1 }}
          className='w-full lg:w-[45%] flex flex-col gap-5'
        >
          {timeline.map(({ Logo, heading, Description }, index) => (
            <div className='flex flex-row gap-6' key={index}>
              <div className='w-[50px] h-[50px] rounded-full bg-richblue-500 flex justify-center items-center'>
                <img src={Logo} alt={`${heading} logo`} />
              </div>

              <div>
                <h2 className='font-semibold text-[18px]'>{heading}</h2>
                <p className='text-base'>{Description}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Timeline Image */}
        <motion.div
          variants={fadeIn('left', 0.1)}
          initial='hidden'
          whileInView='show'
          viewport={{ once: false, amount: 0.1 }}
          className='relative shadow-blue-200'
        >
          <Img
            src={timelineImage}
            alt='Timeline background'
            className='shadow-white object-cover h-fit scale-x-[-1] w-[550px]'
          />

          <div
            className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                            left-[50%] translate-x-[-50%] translate-y-[-70%] rounded-3xl'
          >
            <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
              <p className='text-2xl lg:text-3xl font-bold'>10</p>
              <p className='text-caribbeangreen-300 text-xs lg:text-sm'>
                Years of Experience
              </p>
            </div>

            <div className='flex gap-5 items-center px-7'>
              <p className='text-2xl lg:text-3xl font-bold'>250</p>
              <p className='text-caribbeangreen-300 text-xs lg:text-sm'>
                Types of Courses
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TimelineSection;
