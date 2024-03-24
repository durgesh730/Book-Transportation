import React, { useEffect, useState } from 'react'
import "../../style/comments.css"
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ImgName from './ImgName';
import { serverhost } from '../../host';

const Comment = () => {
    const commenthost = `${serverhost}/comment`
    var [a, seta] = useState(0);
    const [comment, setComments] = useState([]);

    const handleIncrease = () => {
        if (a < comment.length - 1) {
            a = a + 1;
            seta(a);
        }
    }
    const handledecrease = () => {
        if (a <= comment.length - 1 && a > 0) {
            a = a - 1;
            seta(a);
        }
    }
    const Comments = async () => {
        const resd = await fetch(`${commenthost}/allcomments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const resp = await resd.json();
        setComments(resp.data)
    }

    console.log(comment.length)

    // useEffect(() => {
    //     Comments();
    // }, [])

    return (
        <>
            <div className='container' >
                {comment.length !== 0 ?
                        <div className='comments' >
                            <div onClick={handledecrease} className='comment-arrow' >
                                <IoIosArrowBack />
                            </div>

                            {comment?.map((item, index) => {
                                return (
                                    <>
                                        {a === index ?
                                            <>
                                                <div className='comments-img' >
                                                    <ImgName data={item.userId} />
                                                </div>
                                                <div className='comments-text' >
                                                    <span key={index}>{item.desc} </span>
                                                </div>
                                            </> : ""}
                                    </>
                                )
                            })
                            }

                            <div onClick={handleIncrease} className='comment-arrow'>
                                <IoIosArrowForward />
                            </div>
                        </div>
                     : ""}
            </div>
        </>
    )
}

export default Comment
