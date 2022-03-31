import {shallowMount} from '@vue/test-utils'
import ExerciseSetResultInput from '@/components/ExerciseSetResultInput.vue'
import {getEmittedEventValue, getTestSetResult} from "../../utils/testHelper";

let wrapper
const CHANGE_VALUE = 5
const LOAD_TEST_INPUT_VALUE = 110
const REPS_TEST_INPUT_VALUE = 7

const mountFunction = (options = {}) => {
    return shallowMount(ExerciseSetResultInput, {
        ...options
    });
};

describe('ExerciseSetResultInput.vue', () => {
    beforeEach(() => {
        wrapper = mountFunction({
                propsData: {
                    setResult: getTestSetResult(),
                    incrementValue: CHANGE_VALUE,
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
        const incrementButton = wrapper.find('.button--increment')
        const loadInput = wrapper.find('.set-result-input--load')
        await loadInput.trigger('focus')
        await incrementButton.trigger('click')

        const loadChangedEvent = wrapper.emitted().loadChanged
        expect(loadChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(loadChangedEvent))
            .toBe(CHANGE_VALUE + getTestSetResult().load)
    });
    it('emits loadChanged and passes new load value when decrement button pressed', async () => {
        const decrementButton = wrapper.find('.button--decrement')
        const loadInput = wrapper.find('.set-result-input--load')
        await loadInput.trigger('focus')
        await decrementButton.trigger('click')

        const loadChangedEvent = wrapper.emitted().loadChanged
        expect(loadChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(loadChangedEvent))
            .toBe(getTestSetResult().load - CHANGE_VALUE)
    });

    it('emits loadChanged and passes new load value when the value from input changed by input typing',
        async () => {
            const input = wrapper.find('.set-result-input--load')

            await input.setValue(LOAD_TEST_INPUT_VALUE)

            const loadChangedEvent = wrapper.emitted().loadChanged
            expect(loadChangedEvent).toBeTruthy()
            expect(getEmittedEventValue(loadChangedEvent))
                .toBe(LOAD_TEST_INPUT_VALUE)
        });

    it('emits repsChanged and passes new reps value when increment button pressed', async () => {
        const incrementButton = wrapper.find('.button--increment')
        const repsInput = wrapper.find('.set-result-input--reps')
        await repsInput.trigger('focus')
        await incrementButton.trigger('click')

        const repsChangedEvent = wrapper.emitted().repsChanged
        expect(repsChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(repsChangedEvent))
            .toBe(getTestSetResult().reps + CHANGE_VALUE)
    });
    it('emits repsChanged and passes new reps value when decrement button pressed', async () => {
        const decrementButton = wrapper.find('.button--decrement')
        const repsInput = wrapper.find('.set-result-input--reps')
        await repsInput.trigger('focus')
        await decrementButton.trigger('click')

        const repsChangedEvent = wrapper.emitted().repsChanged
        expect(repsChangedEvent).toBeTruthy()
        expect(getEmittedEventValue(repsChangedEvent))
            .toBe(getTestSetResult().reps - CHANGE_VALUE)
    });

    it('emits repsChanged and passes new reps value when the value from input changed by input typing',
        async () => {
            const input = wrapper.find('.set-result-input--reps')

            await input.setValue(REPS_TEST_INPUT_VALUE)

            const repsChangedEvent = wrapper.emitted().repsChanged
            expect(repsChangedEvent).toBeTruthy()
            expect(getEmittedEventValue(repsChangedEvent))
                .toBe(REPS_TEST_INPUT_VALUE)
        });
})
