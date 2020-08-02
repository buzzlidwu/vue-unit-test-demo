module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: ['./tests/unit/setup.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,vue}', '!**/node_modules/**'],
  coverageReporters: ['html', 'text-summary']
}
