import React, { Component } from "react";
import '../../locale/i18n';
import AddComment from "../components/add-comment";
import DetailPost, { IComment, IPost } from "../components/detail-post";
import NavBack from "../components/nav-back";
import { HttpClient } from "../http/http-client";
interface IState {
    openComment: boolean;
    replyTo: string;
    postDetails?: IPost;
    commentList?: IComment[];
}
export class ViewPost extends Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            openComment: false,
            replyTo: '',
        }
    }
    componentDidMount() {
        HttpClient.getPostDetail(this.props.match.params[0]).then(next => {
            this.setState({ ...this.state, postDetails: next })
        });
        this.refreshComment();
    }
    private refreshComment() {
        HttpClient.getCommentForPost(this.props.match.params[0]).then(next => {
            this.setState({ ...this.state, commentList: next })
        })
    }
    render() {
        return (
            this.state.postDetails ?
                <>
                    <NavBack topic={this.state.postDetails!.topic} />
                    <div onClick={() => this.setState({ openComment: false })}>
                        <DetailPost {...this.state.postDetails!} reply={(e) => this.setState({ openComment: true, replyTo: e })} commentList={this.state.commentList} />
                    </div>
                    <AddComment
                        replyTo={this.state.replyTo}
                        commentFlag={this.state.openComment}
                        openComment={() => this.setState({ openComment: true })}
                        postId={this.state.postDetails!.id}
                        createComment={HttpClient.createComment}
                        refreshCallback={() => { this.refreshComment(); this.setState({ openComment: false }) }}
                    />
                </>
                : null
        )
    }
}
export default ViewPost;