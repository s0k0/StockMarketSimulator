import { shallowMount } from '@vue/test-utils'
import StockValue from '@/components/StockValue.vue'

describe('StockValue.vue', () => {
  it('renders props when passed', () => {
    const isin = 'DE000A1EWWW0'
    const price = 103.34575
    const wrapper = shallowMount(StockValue, {
      propsData: { isin, price }
    })
    expect(wrapper.text()).toMatch(isin)
    expect(wrapper.text()).toMatch(price.toFixed(2))
  })
})
