import {mount, shallowMount} from '@vue/test-utils'
import ExerciseResultCreationFragment from '@/components/ExerciseResultCreationFragment.vue'
import ExerciseSetResultInput from '@/components/ExerciseSetResultInput.vue'
import {createMockStore, getTestExerciseResult, getTestSetResult} from "../../utils/testHelper";
import {getSetResults} from "@/model/SetResult";

let wrapper
const CHANGE_VALUE = 1
const LOAD_TEST_INPUT_VALUE = 110
const REPS_TEST_INPUT_VALUE = 7
const lastExerciseResult = getTestExerciseResult()
const setResults = getSetResults(lastExerciseResult)
const lastSetResult = setResults[setResults.length - 1]
const INITIAL_EXERCISE_SET_RESULT_INPUT_COUNT = lastExerciseResult.loads.length
const exerciseId = lastExerciseResult.exerciseId
const newSetResult = getTestSetResult()
const store = createMockStore();

const mountFunction = (options = {}) => {
    return shallowMount(ExerciseResultCreationFragment, {
        ...options
    });
};

describe('ExerciseResultCreationFragment.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
                propsData: {
                    lastExerciseResult: lastExerciseResult,
                },
                global: {
                    plugins: [store]
                }
            }
        )
    });

    it('renders properly', () => {
        const exerciseResultSetInputs = wrapper.findAllComponents(ExerciseSetResultInput)
        const incrementInputs = wrapper.findAll('.input--increment')
        const addSetButtons = wrapper.findAll('.button--submit')
        const remSetButtons = wrapper.findAll('.button--cancel')

        expect(exerciseResultSetInputs).toHaveLength(INITIAL_EXERCISE_SET_RESULT_INPUT_COUNT)
        expect(incrementInputs).toHaveLength(1)
        expect(addSetButtons).toHaveLength(1)
        expect(remSetButtons).toHaveLength(1)
    });

    it('adds ExerciseSetResultInput and commits to store after pressing add set button', async () => {
        const addSetButton = wrapper.find('.button--submit')

        await addSetButton.trigger('click')

        const exerciseResultSetInputs = wrapper.findAllComponents(ExerciseSetResultInput)
        expect(exerciseResultSetInputs).toHaveLength(INITIAL_EXERCISE_SET_RESULT_INPUT_COUNT + 1)
        expect(store.commit).toHaveBeenCalledWith('workoutResult/addSet', {exerciseId, newSetResult: lastSetResult})
    });
    it('removes ExerciseSetResultInput and commits to store after pressing rem set button', async () => {
        const remSetButton = wrapper.find('.button--cancel')

        await remSetButton.trigger('click')

        const exerciseResultSetInputs = wrapper.findAllComponents(ExerciseSetResultInput)
        expect(exerciseResultSetInputs).toHaveLength(INITIAL_EXERCISE_SET_RESULT_INPUT_COUNT - 1)
        expect(store.commit).toHaveBeenCalledWith('workoutResult/removeSet', exerciseId)
    });

    it('commits to store after receiving loadChanged event', async () => {
        const input = wrapper.findComponent(ExerciseSetResultInput)

        await input.vm.$emit('loadChanged', newSetResult)

        expect(store.commit).toHaveBeenCalledWith('workoutResult/setExerciseSetLoad', {exerciseId, newSetResult})
    });

    it('commits to store after receiving repsChanged event', async () => {
        const input = wrapper.findComponent(ExerciseSetResultInput)

        await input.vm.$emit('repsChanged', newSetResult)

        expect(store.commit).toHaveBeenCalledWith('workoutResult/setExerciseSetReps', {exerciseId, newSetResult})
    });
})
