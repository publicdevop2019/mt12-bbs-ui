import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
const duration = 300;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
}

const transitionStyles: { [index: string]: any } = {
    'entering': { opacity: 1 },
    'entered': { opacity: 1 },
};
interface IProps {
    children?: JSX.Element
}
interface IState {
    toggle: boolean
}
class Fade extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { toggle: false }
        setTimeout(() => { this.setState({ toggle: true }) }, 0)
    }
    render() {
        return (<Transition in={this.state.toggle} timeout={duration}>
            {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state.toString()]
                }}>
                    {this.props.children}
                </div>)}
        </Transition>);
    }
};
export default Fade