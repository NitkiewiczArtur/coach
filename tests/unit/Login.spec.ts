import {shallowMount} from '@vue/test-utils'
import LoginView from '@/views/LoginView.vue'
import {signIn} from "@/services/firebaseService";
import {getRouter} from "vue-router-mock";

let wrapper
const TEST_EMAIL = "test@test.pl";
const TEST_PASSWORD = "testPassword";
jest.mock('@/services/firebaseService');

describe('LoginView.vue', () => {
    beforeEach(() => {
        wrapper = shallowMount(LoginView)
    });
    afterEach(() => jest.clearAllMocks())

    it('renders ', () => {
        const buttons = wrapper.findAll(".button")
        const inputs = wrapper.findAll('.input')

        expect(
            buttons.every(button => ["Log in",
                "Sign up"].includes(button.text()))
        ).toBeTruthy();
        expect(buttons.length == 2)
        expect(inputs.length == 2)
    });

    it('logg you in', async () => {
        const logInButton = wrapper.findAll(".button")
            .find(button => button.text() === "Log in")
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')

        await emailInput.setValue(TEST_EMAIL)
        await passwordInput.setValue(TEST_PASSWORD)
        await logInButton.trigger('click')
        expect(signIn).toHaveBeenCalled()
        expect(getRouter().push).toHaveBeenCalled()
    });

    it('shows email and password missing errors if inputs not passed', async () => {
        const logInButton = wrapper.findAll(".button")
            .find(button => button.text() === "Log in")
        await logInButton.trigger('click')
        const errors = wrapper.findAll(".error")

        expect(errors).toHaveLength(2)
        expect(signIn).not.toHaveBeenCalled()
    });
})