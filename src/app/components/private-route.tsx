import React, { Component } from "react";
import { Redirect, Route, RouteComponentProps } from "react-router-dom";
import { message } from "antd";
import i18n from 'i18next';

interface IPrivateRoute {
    jwt: string,
    path: string,
    updateMenuToAccount: () => void
    render: (props: RouteComponentProps<any>) => React.ReactNode;
}
export class PrivateRoute extends Component<IPrivateRoute> {
    componentDidMount() {
        if (!this.props.jwt) {
            message.info(i18n.t('SIGN_IN_REQUIRED'))
            this.props.updateMenuToAccount();
        }
    }
    render() {
        return (
            <>
                <Route path={this.props.path}
                    render={
                        this.props.jwt ? this.props.render : () => <Redirect to={{ pathname: "/account" }} />
                    } />
            </>
        );

    }
}