import { UserOutlined, MessageOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import moment from "moment";
import React from "react";
import '../../locale/i18n';
import i18n from '../../locale/i18n';

export interface IPost {
    id: string,
    imageUrl: string,
    title: string,
    topic: string,
    publishedAt: string,
    content: string,
    publisherId: string,
}
export interface IPostProp extends IPost {
    reply: (commentId: string) => void
    commentList?: IComment[],
}
export interface IComment {
    id: string,
    publishedAt: string,
    publisherId: string,
    content: string,
    replyTo?: string,
    delete: (id: string) => void,
}
export interface ICreateCommentCommand {
    content: string,
    replyTo?: string,
}
function DetailPost(props: IPostProp) {
    return (
        <div style={{ margin: '8px' }}>
            <div style={{ fontWeight: 600, fontSize: '24px', paddingBottom: '8px' }}>{props.title}</div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Avatar size="large" icon={<UserOutlined />} />
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '20px' }}>
                    <div>{props.publisherId}</div>
                    <div>{moment(props.publishedAt).fromNow()}</div>
                </div>
            </div>
            <div style={{ marginTop: '4px', paddingTop: '4px' }}>{props.content}</div>
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '4px', paddingTop: '4px' }}>
                {props.commentList && props.commentList.length !== 0 && props.commentList.map((e, index) => {
                    return (
                        <div key={e.id} style={{ marginTop: '4px', paddingTop: '4px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar size="large" icon={<UserOutlined />} />
                                <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '20px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}><div>{e.publisherId}</div> <MessageOutlined onClick={(ev) => { props.reply(e.id); ev.stopPropagation() }} /></div>
                                    <div>{moment(e.publishedAt).fromNow()}</div>
                                </div>
                            </div>
                            {
                                e.replyTo ? (
                                    <div style={{ borderLeft: '3px solid #f0f0f0', marginTop: '4px', paddingTop: '4px', paddingLeft: '4px' }}>
                                        {props.commentList!.filter(el => String(el.id) === e.replyTo).length === 1 ?
                                            props.commentList!.filter(el => String(el.id) === e.replyTo)[0].content
                                            : <span style={{ textDecoration: 'line-through' }}>{i18n.t('DELETED')}</span>}</div>
                                ) : null
                            }
                            <div style={{ borderBottom: props.commentList!.length - 1 !== index ? '1px solid #f0f0f0' : 'none', marginTop: '4px', paddingTop: '4px', paddingBottom: props.commentList!.length - 1 !== index ? '4px' : 'auto', }}>{e.content}</div>
                        </div>)
                })}
            </div>
        </div>
    )
}
export default DetailPost;