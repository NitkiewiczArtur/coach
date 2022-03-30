import {mount} from '@vue/test-utils'
import ExerciseDetails from '@/components/modals/ExerciseDetails.vue'
import {getTestExercise} from "../../../utils/testHelper";

let wrapper
const detailedExercise = getTestExercise()

const mountFunction = (options = {}) => {
    return mount(ExerciseDetails, {
        ...options
    });
};

describe('ExerciseDetails.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
            propsData: {
                detailedExercise: detailedExercise
            }
        })
    });

    it('emits close modal event when close modal button pressed', async () => {
        const detailsModalCloseButton = wrapper.find('.button--cancel')
        await detailsModalCloseButton.trigger('click');
        const closeExerciseDetailsModalClickedEvent = wrapper.emitted().closeExerciseDetailsModalClicked

        expect(closeExerciseDetailsModalClickedEvent).toBeTruthy()
    });

    it('displays passed exercise data', async () => {
        const exerciseNameHeaderValue = wrapper.find('h4').text().toLowerCase()
        const targetWithBodyPartValue = wrapper.find('.exercise-info-wrapper__body-part__value').text().toLowerCase()
        const equipmentValue = wrapper.find('.exercise-info-wrapper__equipment__value').text().toLowerCase()
        const targetWithBodyPartExpectedString = detailedExercise.target + ' (' + detailedExercise.bodyPart + ')'

        expect(exerciseNameHeaderValue).toBe(detailedExercise.name)
        expect(targetWithBodyPartValue).toBe(targetWithBodyPartExpectedString)
        expect(equipmentValue).toBe(detailedExercise.equipment)
    });
})
