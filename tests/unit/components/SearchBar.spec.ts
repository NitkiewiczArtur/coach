import {shallowMount} from '@vue/test-utils'
import SearchBar from '@/components/SearchBar.vue'

let wrapper
const TEST_VALUE = "test";
jest.mock('@/services/authService');

describe('SearchBar.vue', () => {
    beforeEach(() => {
        wrapper = shallowMount(SearchBar)
    });

    it('renders properly', () => {
        const button = wrapper.find('.button')
        const input = wrapper.find('input')
        expect(button.text() === 'search').toBeTruthy()
        expect(input).toBeTruthy()
    });

    it('emits searchClicked and passes input', async () => {
        const searchButton = wrapper.find('.button')
        const input = wrapper.find('input')

        await input.setValue(TEST_VALUE)
        await searchButton.trigger('click')
        expect(wrapper.emitted().searchClicked.length).toBe(1)
        expect(wrapper.emitted().searchClicked[0][0]).toBe(TEST_VALUE)
    });
})
