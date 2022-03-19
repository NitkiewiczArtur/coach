import {mount} from '@vue/test-utils'
import ExerciseTable from '@/components/ExerciseTable.vue'
import {getTestExercises} from "../../utils/testHelper";

jest.mock('@/services/authService');
let wrapper

const mountFunction = (options = {}) => {
    return mount(ExerciseTable, {
        ...options
    });
};

describe('ExerciseTable.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
            propsData: {
                exercisesToDisplay: getTestExercises()
            }
        })
    });

    it('displays given exercises', async () => {
        const tableRows = wrapper.findAll('tr')
        console.log(wrapper.html())
        // +1 for tabl header row
        expect(tableRows.length).toBe(getTestExercises().length + 1)
    });

    it('shows details modal if showDetailsButton clicked', async () => {
        const showDetailsButton = wrapper.find('.button--triangle')
        let detailsModal = wrapper.find('.modal')
        expect(detailsModal.exists()).toBeFalsy()

        await showDetailsButton.trigger('click')
        detailsModal = wrapper.find('.modal')
        expect(detailsModal.exists()).toBeTruthy()
    });

    it('hides details modal if hide modal event emitted', async () => {
        const showDetailsButton = wrapper.find('.button--triangle')

        await showDetailsButton.trigger('click')
        const detailsModalCloseButton = wrapper.find('.button--cancel')
        await detailsModalCloseButton.trigger('click');
        const detailsModal = wrapper.find('.modal')

        expect(detailsModal.exists()).toBeFalsy()
    });
})
