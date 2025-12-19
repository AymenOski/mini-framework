// implementation of our React.createElement-like function
export function createElement(tag, props, ...children) {
    const normalizedProps = props || {};

    return {
        tag,
        props: normalizedProps,
        chidren: []
    }
}

