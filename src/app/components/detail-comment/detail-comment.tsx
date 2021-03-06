import { MoreOutlined, DislikeFilled, LikeFilled, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from "antd";
import moment from "moment";
import React, { useState } from "react";
import i18n from '../../../locale/i18n';
import { HttpClient } from '../../http/http-client';
import { IComment } from '../detail-post';

interface IProp extends IComment {
    replyComment?: IComment,
    isLast: boolean,
    reply: (commentId: string) => void
}
function DetailComment(props: IProp) {
    const [userLike, setUserLiked] = useState(false);
    const [userLikeNum, setUserLikedNum] = useState(props.likeNum);
    const [userDislike, setUserDisliked] = useState(false);
    const [userDislikeNum, setUserDislikedNum] = useState(props.dislikeNum);
    const toggleLike = () => {
        if (userLike) {
            HttpClient.removeLikeComment(props.id)
            setUserLiked(false);
            setUserLikedNum(userLikeNum - 1 < 0 ? 0 : userLikeNum - 1)
        } else {
            HttpClient.addLikeComment(props.id);
            setUserLiked(true);
            setUserDisliked(false);
            setUserLikedNum(userLikeNum + 1)
            if (userDislike)
                setUserDislikedNum(userDislikeNum - 1 < 0 ? 0 : userDislikeNum - 1)
        }
    }
    const toggleDislike = () => {
        if (userDislike) {
            HttpClient.removeDislikeComment(props.id)
            setUserDisliked(false);
            setUserDislikedNum(userDislikeNum - 1 < 0 ? 0 : userDislikeNum - 1)
        } else {
            HttpClient.addDislikeComment(props.id);
            setUserDisliked(true);
            setUserLiked(false);
            setUserDislikedNum(userDislikeNum + 1)
            if (userLike)
                setUserLikedNum(userLikeNum - 1 < 0 ? 0 : userLikeNum - 1)
        }
    }
    const menu = (
        <Menu>
            <Menu.Item>
                <div onClick={() => {
                    HttpClient.addReportComment(props.id).then()
                }}>{i18n.t('REPORT')}</div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={() => {
                    HttpClient.addNotInterestedComment(props.id).then()
                }}>{i18n.t('NOT_INTERESTED')}</div>
            </Menu.Item>
        </Menu>
    );
    return (
        <div style={{ marginTop: '4px', paddingTop: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <div>{props.publishedBy === '-1' ? i18n.t('YOU') : props.publishedBy}</div>
                        {props.publishedBy !== '-1' ?
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Dropdown overlay={menu}>
                                    <MoreOutlined style={{ fontSize: '24px' }} />
                                </Dropdown>
                            </div>
                            : null
                        }

                    </div>
                    <div>{moment(props.publishedAt).fromNow()}</div>
                </div>
            </div>
            {
                props.replyTo ? (
                    <div style={{ borderLeft: '3px solid #f0f0f0', marginTop: '4px', paddingTop: '4px', paddingLeft: '4px' }}>
                        {props.replyComment ?
                            props.replyComment.content
                            : <span style={{ textDecoration: 'line-through' }}>{i18n.t('DELETED')}</span>}</div>
                ) : null
            }
            <div style={{ marginTop: '4px', paddingTop: '4px' }}>{props.content}</div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', borderBottom: props.isLast ? 'none' : '1px solid #f0f0f0', paddingBottom: props.isLast ? 'auto' : '4px', }}>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <LikeFilled style={{ color: userLike ? '#1DA57A' : 'inherit', paddingRight: '8px' }} onClick={() => { toggleLike() }} />
                    <div>{userLikeNum}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <DislikeFilled style={{ color: userDislike ? '#1DA57A' : 'inherit', paddingRight: '8px' }} onClick={() => { toggleDislike() }} />
                    <div>{userDislikeNum}</div>
                </div>
                <MessageOutlined style={{ paddingRight: '8px' }} onClick={(ev) => { props.reply(props.id); ev.stopPropagation() }} />
            </div>
        </div>
    )
}
export default DetailComment;