import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import i18n from 'i18next';
import { IPostBrief } from "../components/card-post";
import { ICreateCommentCommand, IPost, IComment } from '../components/detail-post';
export interface ICreatePostCommand {
    topic: string,
    title: string,
    content: string
}
export interface ITokenResponse {
    access_token: string;
    refresh_token?: string;
    token_type?: string;
    expires_in?: string;
    scope?: string;
    uid?: string;
}
export const POST_PAGE_SIZE = 20;
export const COMMENT_PAGE_SIZE = 20;
export class HttpClient {
    public static async getPostByTopic(category: string, pageNum: number) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/public/posts?topic=${category}&pageNum=${pageNum}&pageSize=${POST_PAGE_SIZE}&sortBy=id&sortOrder=asc`);
        return response.data as IPostBrief[];

    }
    public static async getPostForUser(pageNum: number) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/private/posts?pageNum=${pageNum}&pageSize=${POST_PAGE_SIZE}&sortBy=id&sortOrder=asc`);
        return response.data as IPostBrief[];

    }
    public static async getCommentForUser(pageNum: number) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/private/comments?pageNum=${pageNum}&pageSize=${COMMENT_PAGE_SIZE}&sortBy=id&sortOrder=asc`);
        return response.data as IComment[];

    }
    public static async getCommentForPost(postId: string, pageNum: number) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + `/public/posts/${postId}/comments?pageNum=${pageNum}&pageSize=${COMMENT_PAGE_SIZE}&sortBy=id&sortOrder=asc`);
        return response.data as IComment[];

    }
    public static async createPost(post: ICreatePostCommand) {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts', post);
        message.success(i18n.t('NET_SUCCESS'))
        return response.headers['location'] as string;
    }
    public static async updatePost(post: ICreatePostCommand, postId: string) {
        await axios.put(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId, post);
        message.success(i18n.t('NET_SUCCESS'))
    }
    public static async getPostDetail(postId: string) {
        const response = await axios.get(process.env.REACT_APP_SERVER_URL + '/public/posts/' + postId);
        return response.data as IPost
    }
    public static async createComment(postId: string, comment: ICreateCommentCommand) {
        const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/comments', comment);
        message.success(i18n.t('NET_SUCCESS'))
        return response.headers['location'] as string
    }

    public static async deletePost(postId: string) {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId);
        message.success(i18n.t('NET_SUCCESS'))
        return response.headers['location'] as string
    }
    public static async deleteComment(commentId: string) {
        const response = await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId);
        message.success(i18n.t('NET_SUCCESS'))
        return response.headers['location'] as string
    }
    public static async getToken(code: string) {
        const header = {
            'Authorization': 'Basic ' + btoa(process.env.REACT_APP_APP_ID + ':' + process.env.REACT_APP_APP_SECRET_PUBLIC)
        }
        const formData = new FormData();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code);
        formData.append('redirect_uri', process.env.REACT_APP_AUTH_REDIRECT_URL + i18n.t("REDIRECT_URL"));
        const token = await axios.post<ITokenResponse, AxiosResponse<ITokenResponse>>(process.env.REACT_APP_TOKEN_URL!, formData, { headers: header })
        return token.data
    }
    public static async addLikePost(postId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/likes');
    }
    public static async addReportPost(postId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/reports');
    }
    public static async addNotInterestedPost(postId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/notInterested');
        message.success(i18n.t('NET_SUCCESS'))
    }
    public static async removeLikePost(postId: string) {
        await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/likes');
    }
    public static async addLikeComment(commentId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/likes');
    }
    public static async addReportComment(commentId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/reports');
        message.success(i18n.t('NET_SUCCESS'))
    }
    public static async addNotInterestedComment(commentId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/notInterested');
        message.success(i18n.t('NET_SUCCESS'))
    }
    public static async removeLikeComment(commentId: string) {
        await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/likes');
    }
    public static async addDislikePost(postId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/dislikes');
    }
    public static async removeDislikePost(postId: string) {
        await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/posts/' + postId + '/dislikes');
    }
    public static async addDislikeComment(commentId: string) {
        await axios.post(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/dislikes');
    }
    public static async removeDislikeComment(commentId: string) {
        await axios.delete(process.env.REACT_APP_SERVER_URL + '/private/comments/' + commentId + '/dislikes');
    }
    public static async uploadImage(file: File) {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        const response = await axios.post(process.env.REACT_APP_UPLOAD_SVC + '/files', formData);
        return process.env.REACT_APP_UPLOAD_SVC + '/files/' + response.headers['location'] as string;
    }
}