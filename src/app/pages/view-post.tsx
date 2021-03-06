import React, { Component } from "react";
import '../../locale/i18n';
import i18n from "../../locale/i18n";
import AddComment from "../components/add-comment/add-comment";
// import { ICreateCommentCommand } from "../components/detail-comment";
import DetailPost, { IComment, IPost, ICreateCommentCommand } from "../components/detail-post";
import { GhostDiv } from "../components/ghost-card/ghost-card";
import NavBack from "../components/nav-back";
import { COMMENT_PAGE_SIZE, HttpClient } from "../http/http-client";
interface IState {
    openComment: boolean;
    replyTo: string;
    postDetails?: IPost;
    commentList?: IComment[];
    eof: boolean;
}
export class ViewPost extends Component<any, IState>{
    private pageNum = 0;
    constructor(props: any) {
        super(props);
        this.state = {
            openComment: false,
            replyTo: '',
            eof: false
        }
    }
    componentDidMount() {
        HttpClient.getPostDetail(this.props.match.params[0]).then(next => {
            this.setState({ ...this.state, postDetails: next })
        });
    }
    private refreshComment(tobe: ICreateCommentCommand) {
        const tobeComment = {
            id: '-1' + new Date().getMilliseconds(),
            publishedAt: new Date().toUTCString(),
            publishedBy: '-1',
            content: tobe.content,
            likeNum: 0,
            dislikeNum: 0,
            replyTo: tobe.replyTo,
        } as IComment
        this.setState({ ...this.state, commentList: [tobeComment, ...this.state.commentList!] })
    }
    private appendComment() {
        HttpClient.getCommentForPost(this.props.match.params[0], this.pageNum).then(next => {
            if (next.length === 0 || next.length < COMMENT_PAGE_SIZE) {
                this.setState({ eof: true })
                if (!this.state.commentList) {
                    this.setState({ ...this.state, commentList: next })
                }
                else if (this.state.commentList) {
                    this.setState({ ...this.state, commentList: [...this.state.commentList!, ...next] })
                }
            } else {
                if (this.state.commentList) {
                    this.setState({ ...this.state, commentList: [...this.state.commentList!, ...next] })
                } else {
                    this.setState({ ...this.state, commentList: next })
                }
                this.pageNum++;
            }
        })
    }
    render() {
        return (
            this.state.postDetails ?
                <>
                    <NavBack />
                    <div
                        onClick={() => this.state.openComment && this.setState({ openComment: false })}
                    >
                        <DetailPost {...this.state.postDetails!} reply={(e) => this.setState({ openComment: true, replyTo: e })} commentList={this.state.commentList} />
                    </div>
                    <AddComment
                        replyTo={this.state.replyTo}
                        commentFlag={this.state.openComment}
                        openComment={() => this.setState({ openComment: true })}
                        postId={this.state.postDetails!.id}
                        createComment={HttpClient.createComment}
                        refreshCallback={(tobe) => { this.refreshComment(tobe); this.setState({ openComment: false }) }}
                    />
                    {this.state.eof ? <div style={{ textAlign: 'center', marginTop: '16px' }}>{i18n.t('END_OF_LIST')}</div> : <GhostDiv callback={() => { this.appendComment() }} />}
                </>
                : null
        )
    }
}
export default ViewPost;