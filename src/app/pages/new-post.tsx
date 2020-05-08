import { Button, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import i18n from 'i18next';
import React, { Component } from "react";
import { RouteComponentProps } from 'react-router';
import { HttpClient, ICreatePostCommand } from "../http/http-client";

const { Option } = Select;
interface IState {
    formPost: {
        topic: string,
        title: string,
        content: string
    }
}
interface RouteParams {
    postId: string
}
interface IProp extends RouteComponentProps<RouteParams> {
    update?: boolean;
}

export class NewPost extends Component<IProp, IState>{
    constructor(props: IProp) {
        super(props);
        this.state = {
            formPost: {
                topic: '',
                title: '',
                content: ''
            }
        }
    }
    componentDidMount() {
        if (this.props.update) {
            HttpClient.getPostDetail(this.props.match.params.postId).then(next => {
                this.setState({ formPost: { topic: next.topic, title: next.title, content: next.content } })
            })
        }

    }
    private convertToPost(): ICreatePostCommand {
        let a = {
            topic: this.state.formPost.topic,
            title: this.state.formPost.title,
            content: this.state.formPost.content
        }
        return a as ICreatePostCommand
    }
    private handleInputChange(value: any, key: string): void {
        this.setState({ formPost: { ...this.state.formPost, [key]: value } });
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', margin: '8px' }}>
                <Select placeholder={i18n.t("TOPIC_PICK")} style={{ marginBottom: '8px' }} disabled={this.props.update}
                    value={this.state.formPost.topic}
                    onChange={(e) => this.handleInputChange(e, 'topic')}>
                    <Option value="house">{i18n.t("TOPIC_HOUSE")}</Option>
                    <Option value="auto">{i18n.t("TOPIC_AUTO")}</Option>
                    <Option value="finance">{i18n.t("TOPIC_FINANCE")}</Option>
                </Select>
                <Input placeholder={i18n.t('ADD_POST_TITLE')} style={{ marginBottom: '8px' }} value={this.state.formPost.title} disabled={this.props.update}
                    onChange={(e) => this.handleInputChange(e.target.value, 'title')} />
                <TextArea rows={4} value={this.state.formPost.content}
                    onChange={(e) => this.handleInputChange(e.target.value, 'content')} />
                {
                    this.props.update ?
                        <Button type="primary" style={{ flex: 1, marginTop: '8px' }} onClick={() => HttpClient.updatePost(this.convertToPost(), this.props.match.params.postId)}>{i18n.t('UPDATE_POST')}</Button>
                        :
                        <Button type="primary" style={{ flex: 1, marginTop: '8px' }} onClick={() => HttpClient.createPost(this.convertToPost())}>{i18n.t('CREATE_POST')}</Button>
                }
            </div>
        )
    }
}
export default NewPost;