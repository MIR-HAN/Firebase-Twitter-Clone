import React from 'react'
import { LuMessageSquare } from "react-icons/lu";
import { FaRetweet } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";







const Buttons = ({ isLiked, likeCount, toogleLike }) => {
    return (
        <div className='flex justify-between items-center'>

            <div className='p-3 rounded-full hover:bg-[#00a6ff43]
            cursor-pointer transition'>
                <LuMessageSquare />
            </div>

            <div className='p-3 rounded-full hover:bg-[#00ff1143]
            cursor-pointer transition'>
                <FaRetweet />

            </div>

            <div onClick={toogleLike} className='flex justify-center gap-2 items-center p-3 rounded-full hover:bg-[#ff5dfa43]
            cursor-pointer transition'>

                {isLiked ? <FaHeart className='text-red-500' /> :    <CiHeart /> }
            
               {likeCount}

            </div>

            <div className='p-3 rounded-full hover:bg-[#78777761]
            cursor-pointer transition'>
                <CiShare2 />

            </div>

        </div>
    )
}

export default Buttons