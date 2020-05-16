import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { ICreateCommentCommand } from "../detail-post";
import AddComment from "./add-comment";

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: any) => key
    })
}));
let container: any = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const mock = {
    postId: '1',
    commentFlag: false,
    createComment: (postId: string, comment: ICreateCommentCommand) => { return new Promise<string>((resolve, reject) => { resolve('1') }) },
    refreshCallback: (comment: ICreateCommentCommand) => { },
    replyTo: undefined,
}
it("", () => {
    const openComment = jest.fn();
    act(() => {
        render(<AddComment {...mock} openComment={openComment}/>, container);
    });
    expect(container.textContent).toBe("ADD_COMMENT");
    const button = document.getElementById('send-comment');
    expect(button).toBeNull()
    const addCommentBtn = document.getElementById('add-comment');
    expect(addCommentBtn).not.toBeNull()
    act(() => {
        addCommentBtn!.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      });
    expect(openComment).toHaveBeenCalledTimes(1);
});