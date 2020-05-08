import { Button } from "antd";
import React, { Component } from "react";
import AccountDetail from "../components/account-detail";
import { AuthContext } from '../context/auth.context';
import i18n from "../../locale/i18n";
import { HttpClient } from "../http/http-client";

export class Account extends Component {
    static contextType = AuthContext;
    componentDidMount() {
        if (window.location.search.indexOf('code') > -1) {
            const oauthCode = window.location.search.replace('?', '').split('&').filter(e => e.indexOf('code=') > -1)[0].replace('code=', '');
            HttpClient.getToken(oauthCode).then(next => {
                this.context.updateJwt(next.access_token);
                const rawUrl = window.location.toString();
                window.history.replaceState({}, document.title, rawUrl.slice(0, rawUrl.indexOf("?")));
            })
        }
    }
    render() {
        return (
            (
                <AuthContext.Consumer>
                    {({ jwt }) => (
                        jwt === '' ?
                            (<div style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Button type="primary" style={{ flex: 1, margin: '0px 8px' }} onClick={() => { this.openAuthroizationPage() }}>{i18n.t('LOG_IN')}</Button>
                            </div>) :
                            <AccountDetail />
                    )}
                </AuthContext.Consumer>
            )
        )
    }
    openAuthroizationPage() {
        window.location.replace(
            `${process.env.REACT_APP_AUTHORIZE_URL}client_id=${process.env.REACT_APP_APP_ID}&redirect_uri=${process.env.REACT_APP_AUTH_REDIRECT_URL + i18n.t("REDIRECT_URL")}&state=login`
        );
    }
}
export default Account;