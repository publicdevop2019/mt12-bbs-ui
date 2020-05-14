import { Menu, Empty } from "antd";
import i18n from 'i18next';
import React, { Component } from "react";
import CardPost, { IPostBrief } from "../components/card-post";
import { HttpClient, POST_PAGE_SIZE } from "../http/http-client";
import { GhostDiv } from "../components/ghost-card/ghost-card";
interface IProp {

}
interface IState {
    category: string,
    postBrief: IPostBrief[] | undefined,
    eof: boolean
}
export class HomePage extends Component<IProp, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            category: 'house',
            postBrief: undefined,
            eof: false
        }
    }
    private pageNum = 0;
    retrieveNewPosts(category: string) {
        this.pageNum = 0;
        this.setState({ category: category, eof: false, postBrief: undefined })
    }
    appendPosts() {
        HttpClient.getPostByTopic(this.state.category, this.pageNum).then(next => {
            if (next.length === 0 || next.length < POST_PAGE_SIZE) {
                this.setState({ eof: true })
                if (!this.state.postBrief){
                    this.setState({ postBrief: next })
                }
                else if (this.state.postBrief){
                    this.setState({ ...this.state, postBrief: [...this.state.postBrief!, ...next] })
                }
            } else {
                if (this.state.postBrief) {
                    this.setState({ postBrief: [...this.state.postBrief!, ...next] })
                } else {
                    this.setState({ postBrief: next })
                }
                this.pageNum++;
            }
        });
    }
    render() {
        console.dir()
        return (
            <>
                <Menu mode="horizontal" className="menu-group" selectedKeys={[this.state.category]}>
                    <Menu.Item key="house" className="menu-item" onClick={() => { this.retrieveNewPosts('house') }}>
                        {i18n.t('TOPIC_HOUSE')}
                    </Menu.Item>
                    <Menu.Item key="auto" className="menu-item" onClick={() => { this.retrieveNewPosts('auto') }}>
                        {i18n.t('TOPIC_AUTO')}
                    </Menu.Item>
                    <Menu.Item key="finance" className="menu-item" onClick={() => { this.retrieveNewPosts('finance') }}>
                        {i18n.t('TOPIC_FINANCE')}
                    </Menu.Item>
                </Menu>
                {
                    this.state.postBrief ?
                        this.state.postBrief.length !== 0 ?
                            this.state.postBrief.map(e => <CardPost key={e.id} {...e} />) : <Empty description={false} className="empty-placeholder" />
                        : null
                }
                {this.state.eof ? <div style={{ textAlign: 'center', marginTop: '16px' }}>{i18n.t('END_OF_LIST')}</div> : <GhostDiv callback={() => { this.appendPosts() }} />}

            </>
        )
    }
}
export default HomePage;