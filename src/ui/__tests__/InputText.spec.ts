import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import InputText from '../InputText.vue'
import { nextTick } from 'vue'

// This is a demo unit test for a component

describe('InputText', () => {
  it('renders title properly', () => {
    const wrapper = mount(InputText, { props: { value: '', placeholder: 'Enter name' } })
    expect(wrapper.get('input').attributes('placeholder')).toBe('Enter name')
  })

  it('renders and updates value properly', async () => {
    const wrapper = mount(InputText, {
      props: { value: 'Initial value', placeholder: 'Enter name' }
    })

    expect(wrapper.get('input').attributes('value')).toBe('Initial value')

    wrapper.setProps({ value: 'New value' })

    await nextTick() // Wait for the next tick to update the DOM

    expect(wrapper.get('input').attributes('value')).toBe('New value')
  })

  it('emits an input event when the value changes', async () => {
    const wrapper = mount(InputText, {
      props: { value: 'Initial value', placeholder: 'Enter name' }
    })

    wrapper.get('input').element.value = 'New value'
    await wrapper.get('input').trigger('input')

    expect(wrapper.emitted('input')).toEqual([['New value']])
  })
})
