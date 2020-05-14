import React, { useRef, useEffect } from 'react';
import './ghost-card.scss';
interface IProp {
    callback: () => Promise<void> | void
}
const visibilityConfig = {
    threshold: 0
};
export function GhostDiv(prop: IProp) {
    const divRef: any = useRef(null);
    useEffect(() => {
        let observer = new IntersectionObserver((entries, self) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    prop.callback()
                }
            });
        }, visibilityConfig);
        observer.observe(divRef.current);
    }, [divRef]);
    return (
        <div ref={divRef} className="ghost-card">
        </div>
    )
}