import React, { Component } from "react";
import i18n from "../../locale/i18n";
import { CardComment } from "../components/card-comment";
import { IComment } from "../components/detail-post";
import NavBack from "../components/nav-back";
import { HttpClient } from "../http/http-client";
import { Empty } from "antd";

interface IProp {

}
interface IState {
    comments: IComment[] | undefined,
    pageNum: number
}
export class MyComments extends Component<IProp, IState> {
    constructor(props: any) {
        super(props)
        this.state = {
            comments: undefined,
            pageNum: 0
        }
    }
    private deleteComment(id: string) {
        HttpClient.deleteComment(id).then(() => {
            HttpClient.getCommentForUser(this.state.pageNum).then(next => {
                next.forEach(e => {
                    e.delete = (id) => { this.deleteComment(id) }
                });
                this.setState({ comments: next })
            })
        })
    }
    componentDidMount() {
        HttpClient.getCommentForUser(this.state.pageNum).then(next => {
            next.forEach(e => {
                e.delete = (id) => { this.deleteComment(id) }
            });
            this.setState({ comments: next })
        });
    }
    render() {
        return (
            <>
                <NavBack topic={i18n.t('MY_COMMENTS')} />
                {this.state.comments ?
                    this.state.comments.length > 0 ?
                        this.state.comments.map(e => <CardComment key={e.id} {...e} />) : <Empty description={false} className="empty-placeholder" />
                    : null}
            </>
        )
    }
}