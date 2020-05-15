import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
const duration = 300;

const defaultStyle = {
    position: 'relative',
    transition: `right ${duration}ms ease-in-out`,
    right: '-100%',
    height: '100%',
    display: 'flex',
    flexDirection:'column'
}

const transitionStyles: { [index: string]: any } = {
    'entering': { right: '0' },
    'entered': { right: '0' },
};
interface IProps {
    children?: JSX.Element
}
interface IState {
    toggle: boolean
}
class SlideInOut extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = { toggle: false }
        setTimeout(() => { this.setState({ toggle: true }) }, 0)
    }
    removeScrollBar() {
        document.getElementById('root')!.style.overflow = 'hidden'
    }
    restoreScrollBar() {
        document.getElementById('root')!.style.overflow = 'auto'
    }
    render() {
        return (<Transition in={this.state.toggle} timeout={duration} onEnter={() => { this.removeScrollBar() }} onEntered={() => { this.restoreScrollBar() }}>
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
export default SlideInOut