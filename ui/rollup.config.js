import merge from 'deepmerge';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';

import {createSpaConfig} from '@open-wc/building-rollup';

const baseConfig = createSpaConfig({
    developmentMode: process.env.ROLLUP_WATCH === 'true',

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
                {
                    src: 'public',
                    dest: 'dist/',
                },
            ],
        }),
    ],
});
