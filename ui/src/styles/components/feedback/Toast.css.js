import {css} from 'lit-element';

export default css`
    .toast {
        align-items: center;
        background: #fce8e6;
        color: #d93025;
        display: flex;
        font-weight: 500;
        padding: 20px 16px;
        position: relative;
        z-index: 999;
    }

    p {
        flex: 1;
        margin: 0;
        line-height: 1.5;
        padding-right: 1em;
    }
`;
