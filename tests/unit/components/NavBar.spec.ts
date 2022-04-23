import {mount} from '@vue/test-utils'
import NavBar from '@/components/common/NavBar.vue'
import {getRouter} from "vue-router-mock";

let wrapper

describe('NavBar.vue', () => {
    beforeEach(() => {
        wrapper = mount(NavBar)
    })

//TODO: expand mobile/desktop view and values for 1 record.
it('nav buttons navigates to routes', async () => {
    const navButtons = wrapper.findAll('.nav-button')
    const navPromises = navButtons.map(button => button.click())
    await Promise.all(navPromises)
    expect(getRouter().push).toHaveBeenCalledTimes(navButtons.length)
});
});
