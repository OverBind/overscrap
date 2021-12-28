import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    file: 'dist/index.mjs',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' })]
};
