import {ref, watch} from "vue";

export default function (startVal, validators, onValidate) {
    //hack for double nested input like LoadInput, which communicates with parents parent component
    const input = startVal.value ? startVal : ref(startVal)
    const errors = ref([]);
    watch(input, value => {
        errors.value = validators.map(validator => validator(value));
        onValidate(value);
    });
    return {
        input,
        errors
    }
}

