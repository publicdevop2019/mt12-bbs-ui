import React, { Component } from "react";
import i18n from "../../locale/i18n";
import CardPost, { IPostBrief } from "../components/card-post";
import NavBack from "../components/nav-back";
import { HttpClient, POST_PAGE_SIZE } from "../http/http-client";
import { Empty } from "antd";
import { GhostDiv } from "../components/ghost-card/ghost-card";
interface IProp {

}
interface IState {
    postBrief: IPostBrief[] | undefined,
    eof: boolean
}
class MyPosts extends Component<IProp, IState> {
    private pageNum = 0;
    constructor(props: any) {
        super(props)
        this.state = {
            postBrief: undefined,
            eof: false
        }
    }
    private deletePost(id: string) {
        HttpClient.deletePost(id).then(() => {
            this.pageNum = 0;
            this.setState({ eof: false, postBrief: undefined })
        })
    }
    appendPosts() {
        HttpClient.getPostForUser(this.pageNum).then(next => {
            next.forEach(e => {
                e.editable = true;
                e.delete = (id) => { this.deletePost(id) }
            });
            if (next.length === 0 || next.length < POST_PAGE_SIZE) {
                this.setState({ eof: true })
                if (!this.state.postBrief)
                    this.setState({ postBrief: next })
                if (this.state.postBrief)
                    this.setState({ ...this.state, postBrief: [...this.state.postBrief!, ...next] })
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
        return (
            <>
                <NavBack topic={i18n.t('MY_POSTS')} />
                {this.state.postBrief ?
                    this.state.postBrief.length > 0 ?
                        this.state.postBrief.map(e => <CardPost key={e.id} {...e} />) : <Empty description={false} className="empty-placeholder" />
                    : null}
                {this.state.eof ? <div style={{ textAlign: 'center', marginTop: '16px' }}>{i18n.t('END_OF_LIST')}</div> : <GhostDiv callback={() => { this.appendPosts() }} />}
            </>
        )
    }
}
export default MyPosts