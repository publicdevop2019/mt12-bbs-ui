import React, { Component } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import DetailComment from "./detail-comment";
//@note for note only 
export class MockButton extends Component {
    Item = <></>
}
jest.doMock('antd', () => {
    return {
        Menu: MockButton,
    }
})
jest.mock('../../../locale/i18n', () => ({
    t: () => ({
        t: (key: any) => key
    })
}));
jest.mock('moment', () => () => ({ fromNow: () => 'mockMoment' }));
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
    id: 'string',
    publishedAt: new Date().toUTCString(),
    publishedBy: '0',
    content: 'string',
    likeNum: 0,
    dislikeNum: 0,
}
it("", () => {
    const reply = jest.fn();
    const deleteFn = jest.fn();
    act(() => {
        render(<DetailComment {...mock} isLast={false} reply={reply} delete={deleteFn} />, container);
    });
    expect(container.textContent).toBe("0mockMomentstring00");
});