import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  output: {
    sourcemap: true,
    file: 'dist/index.js',
  },
  plugins: [typescript({ tsconfig: './tsconfig.json' })]
};
