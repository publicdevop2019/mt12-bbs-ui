import { CommentOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import '../../locale/i18n';
export interface IPostBrief {
    id: string,
    imageUrl: string,
    topic: string,
    title: string,
    publishedAt: string,
    publishedBy: string,
    comments: number,
    views: number,
    editable?: boolean,
    delete: (id: string) => void,
}
export function CardPost(props: IPostBrief) {
    return (
        <>
            <Link to={"/post/" + props.id}>
                <div style={{ border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'row', padding: '4px 8px' }}>
                    <img alt="example" src={props.imageUrl} style={{ height: '100px', width: '100px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, paddingLeft: '8px' }}>
                        <div style={{ flex: 1 }}>{props.title}</div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ fontSize: '16px', fontWeight: 500 }}>{props.publishedBy}</div>
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div style={{ paddingRight: '8px' }}>{moment(props.publishedAt).fromNow()}</div>
                                <div style={{ paddingRight: '8px' }}><span style={{ paddingRight: '4px' }}>{props.comments}</span><CommentOutlined /></div>
                                <div><span style={{ paddingRight: '4px' }}>{props.views}</span><EyeOutlined /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {props.editable ? <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: '8px', marginTop: '8px' }}>
                <Link to={"/edit/" + props.id}>
                    <EditOutlined style={{ fontSize: '24px' }} />
                </Link>
                <DeleteOutlined style={{ fontSize: '24px' }} onClick={() => props.delete(props.id)} /></div> : null}
        </>
    )
}
export default CardPost;