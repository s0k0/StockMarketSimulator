import { shallowMount, mount } from '@vue/test-utils'
import StockValue from '@/components/StockValue.vue'

describe('StockValue.vue', () => {
  it('renders props when passed', () => {
    //Given
    const isin = 'DE000A1EWWW0'
    const price = 103.34575

    //When
    const wrapper = shallowMount(StockValue, {
      propsData: { isin, price }
    })

    //Then
    expect(wrapper.text()).toMatch(isin)
    expect(wrapper.text()).toMatch(price.toFixed(2))
  })
  it('emits ISIN to parent on button click', async () => {
    //Given
    const isin = 'DE000A1EWWW0'
    const price = 103.34575
    const wrapper = mount(StockValue, {
      propsData: { isin, price }
    })

    //When
    await wrapper.find('button').trigger('click')

    //Then
    expect(wrapper.emitted().removeStock).toBeTruthy()
    expect(wrapper.emitted().removeStock[0]).toEqual([isin])
  })
})
