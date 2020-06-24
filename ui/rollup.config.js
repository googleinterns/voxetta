import merge from 'deepmerge';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

// use createSpaConfig for bundling a Single Page App
import {createSpaConfig} from '@open-wc/building-rollup';
// use createBasicConfig to do regular JS to JS bundling
// import { createBasicConfig } from '@open-wc/building-rollup';

// TODO: make SPA decision and cleanup this config further

const baseConfig = createSpaConfig({
    // development mode creates a non-minified build for debugging or development
    developmentMode: process.env.ROLLUP_WATCH === 'true',

    // set to true to inject the service worker registration into your index.html
    injectServiceWorker: false,
});

export default merge(baseConfig, {
    input: './index.html',

    output: {
        dir: 'dist',
        format: 'cjs',
    },
    plugins: [
        resolve(),
        copy({
            targets: [
                {
                    src: 'WEB-INF',
                    dest: 'dist/',
                },
            ],
        }),
    ],
});
