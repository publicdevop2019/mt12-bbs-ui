import React, { Component } from "react";
import i18n from "../../locale/i18n";
import { CardComment } from "../components/card-comment";
import { IComment } from "../components/detail-post";
import NavBack from "../components/nav-back";
import { HttpClient, COMMENT_PAGE_SIZE } from "../http/http-client";
import { Empty } from "antd";
import { GhostDiv } from "../components/ghost-card/ghost-card";

interface IProp {

}
interface IState {
    comments: IComment[] | undefined,
    eof: boolean
}
export class MyComments extends Component<IProp, IState> {
    private pageNum = 0;
    constructor(props: any) {
        super(props)
        this.state = {
            comments: undefined,
            eof: false
        }
    }
    private deleteComment(id: string) {
        HttpClient.deleteComment(id).then(() => {
            this.pageNum = 0;
            this.setState({ eof: false, comments: undefined })
        })
    }
    appendPosts() {
        HttpClient.getCommentForUser(this.pageNum).then(next => {
            next.forEach(e => {
                e.delete = (id) => { this.deleteComment(id) }
            });
            if (next.length === 0 || next.length < COMMENT_PAGE_SIZE) {
                this.setState({ eof: true })
                if (!this.state.comments)
                    this.setState({ comments: next })
            } else {
                if (this.state.comments) {
                    this.setState({ comments: [...this.state.comments!, ...next] })
                } else {
                    this.setState({ comments: next })
                }
                this.pageNum++;
            }
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
                {this.state.eof ? <div style={{ textAlign: 'center', marginTop: '16px' }}>{i18n.t('END_OF_LIST')}</div> : <GhostDiv callback={() => { this.appendPosts() }} />}
            </>
        )
    }
}