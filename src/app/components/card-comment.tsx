import { DeleteOutlined } from '@ant-design/icons';
import moment from "moment";
import React from "react";
import '../../locale/i18n';
import i18n from '../../locale/i18n';
export interface ICommentPrivate {
    id: string,
    publishedAt: string,
    content: string,
    replyTo?: string,
    delete: (id: string) => void,
}
export function CardComment(props: ICommentPrivate) {
    return (
        <div className='comment-card'>
            {props.replyTo ? <div><span style={{ paddingRight: '8px' }}>{i18n.t('REPLIED')}</span>{props.replyTo}</div> : null}
            <div style={{ marginLeft: '24px', marginTop: '8px' }}><span style={{ marginRight: '8px' }}>{i18n.t('WITH')}</span>{props.content}</div>
            <div style={{ textAlign: 'end' }}>{moment(props.publishedAt).fromNow()}</div>
            <DeleteOutlined style={{ fontSize: '24px' }} onClick={() => props.delete(props.id)} />
        </div>
    )
}