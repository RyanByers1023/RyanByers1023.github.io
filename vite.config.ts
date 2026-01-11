import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: './',

    resolve: {
        alias: {
            '@src': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './public/components'),
            '@docs': path.resolve(__dirname, './public/doc'),
            '@imgs': path.resolve(__dirname, './public/img'),
            '@pages': path.resolve(__dirname, './public/pages'),
            '@styles': path.resolve(__dirname, './src/styles'),
            '@scripts': path.resolve(__dirname, './src/ts'),
            '@core': path.resolve(__dirname, './src/ts/core'),
            '@projectCardManager': path.resolve(__dirname, './src/ts/projectCardManager'),
            '@data': path.resolve(__dirname, './src/ts/projectCardManager/data')
        }
    },

    build: {
        outDir: 'dist',
        sourcemap: true,
    },

    server: {
        port: 3000,
        open: true,
    },
});