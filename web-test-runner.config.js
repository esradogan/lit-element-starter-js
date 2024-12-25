// web-test-runner.config.js
import { playwrightLauncher } from '@web/test-runner-playwright';
import { coveragePlugin } from '@web/test-runner-coverage';

export default {
  files: ['./test/**/*_test.js'],
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  plugins: [
    coveragePlugin({
      include: ['components/**/*.js', 'pages/**/*.js'], 
      exclude: ['**/test/**/*.*', 'node_modules'],
      reporter: ['text', 'html'], 
      reportDir: 'coverage', 
    }),
  ],
  coverageConfig: {
    report: true,
    reporter: ['lcov', 'text-summary', 'html'],
    reportDir: 'coverage',
  },
};
