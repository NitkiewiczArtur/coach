import {shallowMount} from '@vue/test-utils'
import RegisterView from '@/views/RegisterUser.vue'
import {signUp} from "@/services/authService";

let wrapper;
const TEST_EMAIL = "test@test.pl";
const TEST_PASSWORD = "testPassword";

describe('RegisterUser.vue', () => {
    beforeEach(() => {
        wrapper = shallowMount(RegisterView)
    });

    it('renders properly', () => {
        const buttons = wrapper.findAll(".button")
        const inputs = wrapper.findAll('.input')

        expect(
            buttons.every(button =>
            button.text() === "Log in" || "Sign up"
            )).toBeTruthy();
        expect(buttons.length == 2)
        expect(inputs.length == 2)
    });

    it('signs you up', async () => {
        const signUpButton = wrapper.findAll(".button")
            .find(button => button.text() === "Sign up")
        const emailInput = wrapper.find('input[type=email]')
        const passwordInput = wrapper.find('input[type=password]')
        await emailInput.setValue(TEST_EMAIL)
        await passwordInput.setValue(TEST_PASSWORD)
        await signUpButton.trigger('click');

        expect(signUp).toHaveBeenCalled()
        expect(wrapper.router.push).toHaveBeenCalled()
    });

    it('shows email and password missing errors if inputs not passed', async () => {
        const signUpButton = wrapper.findAll(".button")
            .find(button => button.text() === "Sign up")
        await signUpButton.trigger('click')
        const errors = wrapper.findAll(".error")

        expect(errors).toHaveLength(2)
        expect(signUp).not.toHaveBeenCalled()
    });
})
