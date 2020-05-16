import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AccountDetail from "./account-detail";
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('react-i18next', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
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

it("", () => {
    act(() => {
        render(<Router><AccountDetail /></Router>, container);
    });
    expect(container.textContent).toBe(" MY_POSTS MY_COMMENTSDARK_THEMELOG_OUT");
});