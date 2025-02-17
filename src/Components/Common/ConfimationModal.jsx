import React from 'react';

const ConfimationModal = () => {
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
            <div className ='w-10/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>

            <p className='text-2xl font-semibold text-richblack-5'>
                {
                    modelData.text
                }
            </p>
            <p className='mt-3 mb-5 leading-6 text-richblack-200'>
                {
                    modelData.additionalText
                }

            </p> 
            <div className ='flex items-center gap-x-4'>
                <IconBtn onclick={modelData.btn1Handler} text={modelData.btn1Text} />
                <button className='cursor-pointer rounded-md bg-richblack-200 text-richblack-900 hover:bg--richblack-900 hover:text-richblack-200 py-8px px-20px font-semibold duration-300' onClick={modelData.btn2Handler} >
                    {
                        modelData.btn2Text
                    }
                </button>
            </div>

            </div>
            
        </div>
    );
};

export default ConfimationModal;