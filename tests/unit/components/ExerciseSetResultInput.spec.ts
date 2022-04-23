import {shallowMount} from '@vue/test-utils'
import ExerciseSetResultInput from '@/components/ExerciseSetCreationFragment.vue'
import {getEmittedEventValue, getTestSetResult} from "../../utils/testHelper";

let wrapper
const CHANGE_VALUE = 1
const LOAD_TEST_INPUT_VALUE = 110
const REPS_TEST_INPUT_VALUE = 7
const initialSet = getTestSetResult()

const mountFunction = (options = {}) => {
    return shallowMount(ExerciseSetResultInput, {
        ...options
    });
};

describe('ExerciseSetCreationFragment.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
                propsData: {
                    setResult: initialSet,
                    incrementAmount: CHANGE_VALUE,
                }
            }
        )
    });

    it('renders properly', () => {
        const buttons = wrapper.findAll('button')
        const inputs = wrapper.findAll('input')

        expect(buttons.length).toBe(2)
        expect(inputs.length).toBe(2)
    });

    it('emits loadChanged and passes new load value when increment button pressed', async () => {
        const incrementButton = wrapper.find('.button--submit--round')
        const loadInput = wrapper.find('.input--load')
        await loadInput.trigger('focus')
        await incrementButton.trigger('click')
        initialSet.load += CHANGE_VALUE

        const loadChangedEvent = wrapper.emitted('loadChanged')
        expect(loadChangedEvent).toHaveLength(1)
        expect(getEmittedEventValue(loadChangedEvent))
            .toStrictEqual(initialSet)
    });
    it('emits loadChanged and passes new load value when decrement button pressed', async () => {
        const decrementButton = wrapper.find('.button--cancel--round')
        const loadInput = wrapper.find('.input--load')
        initialSet.load -= CHANGE_VALUE

        await loadInput.trigger('focus')
        await decrementButton.trigger('click')

        const loadChangedEvent = wrapper.emitted().loadChanged
        expect(loadChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(loadChangedEvent))
            .toStrictEqual(initialSet)
    });

    it('emits loadChanged and passes new load value when the value from input changed by input typing',
        async () => {
            const input = wrapper.find('.input--load')
            initialSet.load = LOAD_TEST_INPUT_VALUE

            await input.setValue(LOAD_TEST_INPUT_VALUE)

            const loadChangedEvent = wrapper.emitted().loadChanged
            expect(loadChangedEvent).toBeTruthy()
            expect(getEmittedEventValue(loadChangedEvent))
                .toStrictEqual(initialSet)
        });

    it('emits repsChanged and passes new reps value when increment button pressed', async () => {
        const incrementButton = wrapper.find('.button--submit--round')
        const repsInput = wrapper.find('.input--reps')
        initialSet.reps += CHANGE_VALUE

        await repsInput.trigger('focus')
        await incrementButton.trigger('click')

        const repsChangedEvent = wrapper.emitted().repsChanged
        expect(repsChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(repsChangedEvent))
            .toStrictEqual(initialSet)
    });
    it('emits repsChanged and passes new reps value when decrement button pressed', async () => {
        const decrementButton = wrapper.find('.button--cancel--round')
        const repsInput = wrapper.find('.input--reps')
        initialSet.reps -= CHANGE_VALUE

        await repsInput.trigger('focus')
        await decrementButton.trigger('click')

        const repsChangedEvent = wrapper.emitted().repsChanged
        expect(repsChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(repsChangedEvent))
            .toStrictEqual(initialSet)
    });

    it('emits repsChanged and passes new reps value when the value from input changed by input typing',
        async () => {
            const input = wrapper.find('.input--reps')
            initialSet.reps = REPS_TEST_INPUT_VALUE

            await input.setValue(REPS_TEST_INPUT_VALUE)

            const repsChangedEvent = wrapper.emitted().repsChanged
            expect(repsChangedEvent).toBeTruthy()
            expect(getEmittedEventValue(repsChangedEvent))
                .toStrictEqual(initialSet)
        });
    it('throws error when new reps value input is less than 0',
        async () => {
            const input = wrapper.find('.input--reps')
            initialSet.reps = REPS_TEST_INPUT_VALUE

            await input.setValue(REPS_TEST_INPUT_VALUE)

            const repsChangedEvent = wrapper.emitted().repsChanged
            expect(repsChangedEvent).toBeTruthy()
            expect(getEmittedEventValue(repsChangedEvent))
                .toStrictEqual(initialSet)
        });
})
