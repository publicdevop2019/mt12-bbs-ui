import { DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import moment from "moment";
import React, { useState } from "react";
import '../../locale/i18n';
import { HttpClient } from '../http/http-client';
import DetailComment from './detail-comment/detail-comment';
import { RichTextEditor } from './rich-text-editor';
import i18n from '../../locale/i18n';
import Fade from './animation/fade-in';

export interface IPost {
    id: string,
    imageUrl: string,
    title: string,
    topic: string,
    publishedAt: string,
    content: string,
    publishedBy: string,
    likeNum: number
    dislikeNum: number
    userModified: boolean
}
interface IProp extends IPost {
    reply: (commentId: string) => void
    commentList?: IComment[],
}
export interface IComment {
    id: string,
    publishedAt: string,
    publishedBy: string,
    content: string,
    likeNum: number,
    dislikeNum: number,
    replyTo?: string,
    delete: (id: string) => void,
}
export interface ICreateCommentCommand {
    content: string,
    replyTo?: string,
}
function DetailPost(props: IProp) {
    const [wysiwyg] = useState(JSON.parse(props.content));
    const [userLike, setUserLiked] = useState(false);
    const [userDislike, setUserDisliked] = useState(false);
    const [userLikeNum, setUserLikedNum] = useState(props.likeNum);
    const [userDislikeNum, setUserDislikedNum] = useState(props.dislikeNum);
    const toggleLikePost = () => {
        if (userLike) {
            HttpClient.removeLikePost(props.id)
            setUserLiked(false);
            setUserLikedNum(userLikeNum - 1 < 0 ? 0 : userLikeNum - 1)
        } else {
            HttpClient.addLikePost(props.id);
            setUserLiked(true);
            setUserDisliked(false);
            setUserLikedNum(userLikeNum + 1)
            if (userDislike)
                setUserDislikedNum(userDislikeNum - 1 < 0 ? 0 : userDislikeNum - 1)
        }
    }
    const toggleDislikePost = () => {
        if (userDislike) {
            HttpClient.removeDislikePost(props.id)
            setUserDisliked(false);
            setUserDislikedNum(userDislikeNum - 1 < 0 ? 0 : userDislikeNum - 1)
        } else {
            HttpClient.addDislikePost(props.id);
            setUserDisliked(true);
            setUserLiked(false);
            setUserDislikedNum(userDislikeNum + 1)
            if (userLike)
                setUserLikedNum(userLikeNum - 1 < 0 ? 0 : userLikeNum - 1)
        }
    }

    const parseReplyComment = (comment: IComment) => {
        return props.commentList!.filter(el => String(el.id) === String(comment.replyTo))[0]
    }
    return (
        <div style={{ margin: '8px' }}>
            <Fade>
                <>
                    <div style={{ fontWeight: 600, fontSize: '24px', paddingBottom: '8px' }}>{props.title}{props.userModified ? <span style={{ fontWeight: 400, fontSize: '16px', marginLeft: '8px' }}>{i18n.t('USER_MODIFIED')}</span> : null}</div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Avatar size="large" icon={<UserOutlined />} />
                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '20px' }}>
                            <div>{props.publishedBy}</div>
                            <div>{moment(props.publishedAt).fromNow()}</div>
                        </div>
                    </div>

                    <RichTextEditor value={wysiwyg} />

                    <div style={{ marginTop: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <div className="icon-num-vertical"><LikeFilled style={{ fontSize: '24px', color: userLike ? '#1DA57A' : 'inherit' }} onClick={() => { toggleLikePost() }} /><div>{userLikeNum}</div></div>
                        <div className="icon-num-vertical"><DislikeFilled style={{ fontSize: '24px', color: userDislike ? '#1DA57A' : 'inherit' }} onClick={() => { toggleDislikePost() }} /><div>{userDislikeNum}</div></div>
                    </div>
                </>
            </Fade>
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '4px', paddingTop: '4px' }}>
                {props.commentList && props.commentList.length !== 0 && props.commentList.map((e, index) =>
                    <Fade key={e.id}>
                        <DetailComment {...e}
                            reply={props.reply}
                            isLast={index === (props.commentList!.length - 1)}
                            replyComment={parseReplyComment(e)}
                        />
                    </Fade>
                )}
            </div>
        </div>
    )
}
export default DetailPost;