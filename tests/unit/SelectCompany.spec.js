import { shallowMount, mount } from '@vue/test-utils'
import SelectCompany from '@/components/SelectCompany.vue'

describe('StockValue.vue', () => {
  it('renders props when passed', () => {
    //Given
    const placeholder = 'Select a company'

    //When
    const wrapper = shallowMount(SelectCompany)

    //Then
    expect(wrapper.text()).toMatch(placeholder)
  })

  it('contains company options in dropdown and sets selected company on click', () => {
    //Given
    const wrapper = shallowMount(SelectCompany)

    //Then
    expect(wrapper.vm.selectedCompany).toBe('');
    expect(wrapper.findAll('select > option').length).toBe(31);

    //When
    wrapper.findAll('select > option').at(2).element.selected = true;
    wrapper.find('select').trigger('change');

    //Then
    expect(wrapper.vm.selectedCompany).toBe('DE0008404005'); //Allianz
  })

  it('emits selected company to parent', () => {
    //Given
    const wrapper = mount(SelectCompany)

    //When
    wrapper.findAll('select > option').at(2).element.selected = true;
    wrapper.find('select').trigger('change');
    wrapper.vm.changeCompany()

    //Then
    expect(wrapper.vm.selectedCompany).toBe('DE0008404005'); //Allianz
    expect(wrapper.emitted().selectCompany).toBeTruthy()
    expect(wrapper.emitted().selectCompany[0]).toEqual(['DE0008404005'])
  })
})
