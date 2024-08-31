import moment from 'moment'
import React from 'react'


const UserInfo = ({ tweet }) => {
    //firebase date function
 let date = tweet.createdAt?.toDate();
 // moment library
 date = moment(date).fromNow();

    return (
        <div className='flex gap-3 items-center whitespace-nowrap'>
            <p>{tweet.user.name}</p>

            <p className='text-gray-400 text-sm'>@{tweet.user.name.toLowerCase().split("muhammed mirhan yorulmaz").join("mirhan_yorulmaz")}</p>

            <p className='text-gray-400 text-sm'>{date}</p>

            {tweet.isEdited && (
                <p className='text-gray-400 text-sm'>edited</p>
            )}

        </div>
    )
}

export default UserInfo