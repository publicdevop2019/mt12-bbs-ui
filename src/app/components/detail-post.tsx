import { DislikeFilled, LikeFilled, UserOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import moment from "moment";
import React, { useState } from "react";
import '../../locale/i18n';
import { HttpClient } from '../http/http-client';
import DetailComment from './detail-comment';

export interface IPost {
    id: string,
    imageUrl: string,
    title: string,
    topic: string,
    publishedAt: string,
    content: string,
    publishedBy: string,
}
export interface IPostProp extends IPost {
    reply: (commentId: string) => void
    commentList?: IComment[],
}
export interface IComment {
    id: string,
    publishedAt: string,
    publishedBy: string,
    content: string,
    replyTo?: string,
    liked?: boolean,
    delete: (id: string) => void,
}
export interface ICreateCommentCommand {
    content: string,
    replyTo?: string,
}
function DetailPost(props: IPostProp) {
    const [userLike, setUserLiked] = useState(false);
    const toggleLikePost = () => {
        if (userLike) {
            HttpClient.removeLikePost(props.id)
            setUserLiked(false);
        } else {
            HttpClient.addLikePost(props.id);
            setUserLiked(true);
        }
    }

    const parseReplyComment = (comment: IComment) => {
        return props.commentList!.filter(el => String(el.id) === comment.replyTo)[0]
    }
    return (
        <div style={{ margin: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '24px', paddingBottom: '8px' }}>{props.title}</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '20px' }}>
                    <div>{props.publishedBy}</div>
                    <div>{moment(props.publishedAt).fromNow()}</div>
                </div>
            </div>
            <div style={{ marginTop: '4px', paddingTop: '4px' }}>{props.content}</div>
            <div style={{ marginTop: '8px', marginBottom: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                <LikeFilled style={{ fontSize: '24px', color: userLike ? '#1DA57A' : 'inherit' }} onClick={() => { toggleLikePost() }} />
                <DislikeFilled style={{ fontSize: '24px' }} />
            </div>
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '4px', paddingTop: '4px' }}>
                {props.commentList && props.commentList.length !== 0 && props.commentList.map((e, index) =>
                    <DetailComment {...e}
                        reply={props.reply}
                        isLast={index === (props.commentList!.length - 1)}
                        replyComment={parseReplyComment(e)}
                        key={e.id}
                    />
                )}
            </div>
        </div>
    )
}
export default DetailPost;