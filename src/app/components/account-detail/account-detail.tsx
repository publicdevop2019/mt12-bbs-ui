import React from "react";
import { useTranslation } from 'react-i18next';
import { Button, Switch } from "antd";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { ReadOutlined, CommentOutlined } from '@ant-design/icons';
import { ThemeContext } from "../../context/theme.context";
function AccountDetail(props: any) {
    const { t } = useTranslation();
    return (
        <AuthContext.Consumer>
            {
                ({ clearJwt }) => (
                    <div>
                        <Link to="/account/posts" > <div style={{ fontSize: '16px', marginBottom: '4px', padding: '8px 0px 8px 16px', borderBottom: '1px solid #f0f0f0' }}><ReadOutlined style={{ marginRight: '8px' }} />{t('MY_POSTS')}</div></Link>
                        <Link to="/account/comments" > <div style={{ fontSize: '16px', marginBottom: '4px', padding: '8px 0px 8px 16px', borderBottom: '1px solid #f0f0f0' }}><CommentOutlined style={{ marginRight: '8px' }} />{t('MY_COMMENTS')}</div></Link>
                        <ThemeContext.Consumer>{
                            ({ theme, updateTheme }) => (
                                <div style={{ fontSize: '16px', marginBottom: '4px', padding: '8px 0px 8px 16px', borderBottom: '1px solid #f0f0f0' }}><Switch style={{ marginRight: '8px' }} checked={theme === 'dark'} onChange={(e) => { e ? updateTheme('dark') : updateTheme('light') }} />{t('DARK_THEME')}</div>
                            )
                        }
                        </ThemeContext.Consumer>
                        <div style={{ display: 'flex' }}><Button type="primary" style={{ flex: 1, margin: '0px 8px' }} onClick={() => clearJwt()}>{t('LOG_OUT')}</Button></div>
                    </div>
                )
            }
        </AuthContext.Consumer>
    )
}
export default AccountDetail;