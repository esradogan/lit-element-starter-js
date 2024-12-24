// web-test-runner.config.js
import { playwrightLauncher } from '@web/test-runner-playwright';
import { coveragePlugin } from '@web/test-runner-coverage';

export default {
  files: ['./test/**/*_test.js'], // Test dosyalarınızın yolu
  nodeResolve: true,
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox' }),
    playwrightLauncher({ product: 'webkit' }),
  ],
  plugins: [
    coveragePlugin({
      include: ['components/**/*.js', 'pages/**/*.js'], // Kapsam dahil edilecek dosyalar
      exclude: ['**/test/**/*.*', 'node_modules'], // Hariç tutulacak dosyalar
      reporter: ['text', 'html'], // Raporlayıcılar
      reportDir: 'coverage', // Rapor dizini
    }),
  ],
  coverageConfig: {
    report: true,
    reporter: ['lcov', 'text-summary', 'html'], // Rapor formatları
    reportDir: 'coverage', // Rapor dizini
  },
};
