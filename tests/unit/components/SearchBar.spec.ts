import {shallowMount} from '@vue/test-utils'
import SearchBar from '@/components/common/SearchBar.vue'
import {getEmittedEventValue} from "../../utils/testHelper";

let wrapper
const TEST_VALUE = "test";

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

        const searchClickedEvent = wrapper.emitted('searchClicked')
        expect(searchClickedEvent).toBeTruthy()
        expect(getEmittedEventValue(searchClickedEvent)).toBe(TEST_VALUE)
    });
})
