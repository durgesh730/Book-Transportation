import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { serverhost } from '../../host';

const ImgName = ({ data }) => {
    const adminhost = `${serverhost}/admin`
    const [user, setUser] = useState();

    const handleUserDetails = async () => {
        try {
            const res = await axios.get(`${adminhost}/UserDataAtAdmin/${data}`)
            setUser(res.data)
            return Promise.resolve(res);
        } catch (error) {
            return Promise.reject({ error })
        }
    }

    useEffect(() => {
        handleUserDetails();
    }, [])

    return (
        <>
            {
                user?.length === 0 || user === undefined ? <div class="Imgloader"></div> :
                    user?.map((item, i) => {
                        return (
                            <>
                                <img src={item.link} alt='img' /><br />
                                <span>By: {item.username}</span>
                            </>
                        )
                    })
            }
        </>
    )
}

export default ImgName
