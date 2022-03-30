jest.mock('@/services/authService');
jest.mock('@/services/exerciseService');
jest.mock('@/services/workoutService');
jest.mock('@/services/workoutResultService');
jest.mock('@/services/exerciseResultDataService');
const {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
} = require('vue-router-mock')
const { config } = require('@vue/test-utils')
// create one router per test file
const router = createRouterMock()
beforeEach(() => {
    injectRouterMock(router)
})
afterEach(() => jest.clearAllMocks())

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)
