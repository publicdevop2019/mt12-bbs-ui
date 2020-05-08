import { Menu, Empty } from "antd";
import i18n from 'i18next';
import React, { Component } from "react";
import CardPost, { IPostBrief } from "../components/card-post";
import { HttpClient } from "../http/http-client";
interface IProp {

}
interface IState {
    category: string,
    postBrief: IPostBrief[] | undefined,
}
export class HomePage extends Component<IProp, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            category: 'house',
            postBrief: undefined
        }
    }
    componentDidMount() {
        HttpClient.getPostByTopic(this.state.category).then(next => {
            this.setState({ postBrief: next })
        });
    }
    render() {
        return (
            <>
                <Menu mode="horizontal" className="menu-group" selectedKeys={[this.state.category]}>
                    <Menu.Item key="house" className="menu-item" onClick={() => this.setState({ category: 'house' }, () => { this.componentDidMount() })}>
                        {i18n.t('TOPIC_HOUSE')}
                    </Menu.Item>
                    <Menu.Item key="auto" className="menu-item" onClick={() => this.setState({ category: 'auto' }, () => { this.componentDidMount() })}>
                        {i18n.t('TOPIC_AUTO')}
                    </Menu.Item>
                    <Menu.Item key="finance" className="menu-item" onClick={() => this.setState({ category: 'finance' }, () => { this.componentDidMount() })}>
                        {i18n.t('TOPIC_FINANCE')}
                    </Menu.Item>
                </Menu>
                {
                    this.state.postBrief ?
                        this.state.postBrief.length !== 0 ?
                            this.state.postBrief.map(e => <CardPost key={e.id} {...e} />) : <Empty description={false} className="empty-placeholder" />
                        : null
                }
            </>
        )
    }
}
export default HomePage;