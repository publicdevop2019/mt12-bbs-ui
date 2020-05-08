import React from "react";
import { useTranslation } from 'react-i18next';
import '../../locale/i18n';
import { Button } from "antd";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import { ReadOutlined, CommentOutlined } from '@ant-design/icons';
function AccountDetail(props: any) {
    const { t } = useTranslation();
    return (
        <AuthContext.Consumer>
            {
                ({ clearJwt }) => (
                    <div>
                        <Link to="/account/posts" > <div style={{ fontSize: '16px', marginBottom: '4px', padding: '8px 0px 8px 16px', borderBottom: '1px solid #f0f0f0' }}><ReadOutlined style={{ paddingRight: '8px' }} />{t('MY_POSTS')}</div></Link>
                        <Link to="/account/comments" > <div style={{ fontSize: '16px', marginBottom: '4px', padding: '8px 0px 8px 16px', borderBottom: '1px solid #f0f0f0' }}><CommentOutlined style={{ paddingRight: '8px' }} />{t('MY_COMMENTS')}</div></Link>
                        <div style={{ display: 'flex' }}><Button type="primary" style={{ flex: 1, margin: '0px 8px' }} onClick={() => clearJwt()}>{t('LOG_OUT')}</Button></div>
                    </div>
                )
            }
        </AuthContext.Consumer>
    )
}
export default AccountDetail;