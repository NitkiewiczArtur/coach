import {shallowMount} from '@vue/test-utils'
import WorkoutList from '@/components/WorkoutList.vue'
import ExerciseTable from '@/components/ExerciseTable.vue'
import {getTestWorkouts} from "../../utils/testHelper";
import {getRouter} from "vue-router-mock";

let wrapper

const mountFunction = (options = {}) => {
    return shallowMount(WorkoutList, {
        ...options
    });
};

describe('WorkoutList.vue', () => {
    beforeEach(async () => {
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

    it('navigates to new route after "results", or "start" button pressed', async () => {
        const resultsButton = wrapper.find('.button--primary')
        const startButton = wrapper.find('.button--submit')

        await resultsButton.trigger('click')
        await startButton.trigger('click')

        expect(getRouter().push).toHaveBeenCalledTimes(2)
    });

    it('shows workouts exercise table after show button pressed', async () => {
        const showWorkoutExercisesButton = wrapper.find('.button--triangle')

        await showWorkoutExercisesButton.trigger('click')
        const exerciseTable = wrapper.findComponent(ExerciseTable)
        expect(exerciseTable.isVisible()).toBeTruthy()
    });

    it('hides workouts exercise table after hide button pressed', async () => {
        const showWorkoutExercisesButton = wrapper.find('.button--triangle')
        await showWorkoutExercisesButton.trigger('click')

        await showWorkoutExercisesButton.trigger('click')
        const exerciseTable = wrapper.findComponent(ExerciseTable)
        expect(exerciseTable.isVisible()).toBeFalsy()
    });
})
