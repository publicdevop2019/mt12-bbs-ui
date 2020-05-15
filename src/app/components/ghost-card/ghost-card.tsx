import React, { Component } from 'react';
import './ghost-card.scss';
interface IProp {
    callback: () => Promise<void> | void
}
const visibilityConfig = {
    threshold: 1
};
export class GhostDiv extends Component<IProp, any>{
    private divRef: any;
    constructor(props: IProp) {
        super(props);
        this.divRef = React.createRef();
    }
    componentDidMount() {
        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.props.callback()
                }
            });
        }, visibilityConfig);
        observer.observe(this.divRef.current);

    }
    render() {
        return (
            <div ref={this.divRef} className="ghost-card">
            </div>
        )
    }
}