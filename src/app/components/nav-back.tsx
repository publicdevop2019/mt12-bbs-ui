import { LeftOutlined } from '@ant-design/icons';
import React from "react";
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import '../../locale/i18n';
export interface IProps {
    topic?: string,
}
function NavBack(props: IProps) {
    const { t } = useTranslation();
    let history = useHistory();
    let navBack = (e: any) => {
        history.goBack()
    };
    return (
        <div style={{ padding: '8px 4px', display: 'flex', flexDirection: 'row', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ flex: 1, justifyContent: 'left', alignItems: 'center', display: 'flex', flexDirection: 'row' }} onClick={e => navBack(e)}><LeftOutlined style={{ marginRight: '8px' }} />{t('GO_BACK')}</div>
            {props.topic ? <div style={{ fontSize: '16px', fontWeight: 700 }}>{props.topic}</div> : null}
            <div style={{ flex: 1 }}></div>
        </div>
    )
}
export default NavBack;