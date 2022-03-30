import {mount} from '@vue/test-utils'
import WorkoutDetails from '@/components/modals/WorkoutDetails.vue'
import ExerciseTable from '@/components/ExerciseTable.vue'
import {getTestExercises, getTestWorkout} from "../../../utils/testHelper";

let wrapper
const detailedWorkout = getTestWorkout()
const detailedExercises = getTestExercises()
const mountFunction = (options = {}) => {
    return mount(WorkoutDetails, {
        ...options
    });
};

describe('WorkoutDetails.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
            propsData: {
                detailedExercises: detailedExercises,
                detailedWorkout: detailedWorkout
            }
        })
    });

    it('emits close modal event when close modal button pressed', async () => {
        const detailsModalCloseButton = wrapper.find('.button--cancel')
        await detailsModalCloseButton.trigger('click');
        const closeExerciseDetailsModalClickedEvent = wrapper.emitted().closeWorkoutDetailsModalClicked

        expect(closeExerciseDetailsModalClickedEvent).toBeTruthy()
    })

    it('displays passed data in header and exerciseTable', async () => {
        const workoutNameHeaderValue = wrapper.find('h2').text().toLowerCase()
        const exerciseTable = wrapper.findComponent(ExerciseTable)

        expect(workoutNameHeaderValue).toBe(detailedWorkout.name)
        expect(exerciseTable).toBeTruthy()
    });

})
