import typescriptRollupPlugin from "rollup-plugin-ts";

export default {
    input: 'src/main.ts',
    output: {
        file: 'dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        typescriptRollupPlugin()
    ]
}