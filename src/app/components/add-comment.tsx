import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Input } from "antd";
import React, { useRef } from "react";
import { useTranslation } from 'react-i18next';
import '../../locale/i18n';
import { ICreateCommentCommand } from './detail-post';

export interface IAddComment {
    postId: string,
    commentFlag: boolean,
    openComment: () => void,
    createComment: (postId: string, comment: ICreateCommentCommand) => Promise<string>;
    refreshCallback: (tobe: ICreateCommentCommand) => void,
    replyTo: string | undefined,
}
function AddComment(props: IAddComment) {
    const { t } = useTranslation();
    let textInput: any = useRef(null);
    React.useEffect(() => {
        if (props.commentFlag) {
            textInput.current.focus();
        }
    }, [props.commentFlag, props.replyTo]);
    const addComment = () => {
        const tobe = { replyTo: props.replyTo ? props.replyTo : null, content: textInput.current.input.value } as ICreateCommentCommand
        props.createComment(props.postId, tobe).then(next => {
            props.refreshCallback(tobe);
        })
    }
    return (
        <>
            {

                props.commentFlag ?
                    (
                        <div style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '8px' }}><PlusCircleOutlined /></div>
                            <div style={{ flex: 1, paddingRight: '8px' }}><Input placeholder={props.replyTo ? props.replyTo : t('REPLY_NOW')} ref={textInput} /></div>
                            <div><Button type="primary" onClick={() => { addComment() }}>{t('SEND')}</Button></div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}>
                            <Button type="primary" style={{ flex: 1 }} onClick={() => props.openComment()}>{t('ADD_COMMENT')}</Button>
                        </div>

                    )
            }
        </>
    )
}
export default AddComment
