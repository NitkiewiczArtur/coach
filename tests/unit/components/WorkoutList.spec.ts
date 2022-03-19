import {mount} from '@vue/test-utils'
import WorkoutList from '@/components/WorkoutList.vue'
import {getTestWorkouts} from "../../utils/testHelper";
import {getRouter} from "vue-router-mock";

jest.mock('@/services/authService');
jest.mock('@/services/exerciseService');
jest.mock('@/services/workoutService');

let wrapper

const mountFunction = (options = {}) => {
    return mount(WorkoutList, {
        ...options
    });
};

describe('WorkoutList.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
            propsData: {
                workoutsToDisplay: getTestWorkouts(),
            }
        })
    });

    it('displays given workouts', async () => {
        const listRows = wrapper.findAll('.list__item')

        expect(listRows.length).toBe(getTestWorkouts().length)
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

    it('navigates to workout result view for chosen workout by "results" button', async () => {
        const resultsButton = wrapper.find('.button--primary')

        await resultsButton.trigger('click')

        expect(getRouter().push).toHaveBeenCalled()
    });
})
