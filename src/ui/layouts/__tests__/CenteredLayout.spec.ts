import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import AppLayout from '../AppLayout.vue'

describe.skip('AppLayout', () => {
  it('renders title properly', () => {
    const wrapper = mount(AppLayout, { props: { title: 'Centered layout title' } })
    expect(wrapper.text()).toContain('Centered layout title')
  })

  it('renders slot content properly', () => {
    const wrapper = mount(AppLayout, {
      slots: {
        default: '<div>Centered layout slot content</div>'
      }
    })
    expect(wrapper.text()).toContain('Centered layout slot content')
  })
})
