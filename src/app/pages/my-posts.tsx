import React, { Component } from "react";
import i18n from "../../locale/i18n";
import CardPost, { IPostBrief } from "../components/card-post";
import NavBack from "../components/nav-back";
import { HttpClient } from "../http/http-client";
import { Empty } from "antd";
interface IProp {

}
interface IState {
    postBrief: IPostBrief[] | undefined,
}
export class MyPosts extends Component<IProp, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            postBrief: undefined,
        }
    }
    private deletePost(id: string) {
        HttpClient.deletePost(id).then(() => {
            HttpClient.getPostForUser().then(next => {
                next.forEach(e => {
                    e.editable = true;
                    e.delete = (id) => { this.deletePost(id) }
                });
                this.setState({ postBrief: next })
            })
        })
    }
    componentDidMount() {
        HttpClient.getPostForUser().then(next => {
            next.forEach(e => {
                e.editable = true;
                e.delete = (id) => { this.deletePost(id) }
            });
            this.setState({ postBrief: next })
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
            </>
        )
    }
}