import type { DOMWrapper, VueWrapper } from '@vue/test-utils'

/**
 * Get an element by its label text
 * @param wrapper Result of `mount` from `@vue/test-utils`
 * @param labelText Content of the label element
 * @example getByLabelText(wrapper, 'Email')
 * @throws {Error} If the label is not found
 * @throws {Error} If the label does not have a "for" attribute
 * @throws {Error} If the element related to the label is not found
 * @returns
 */
export function getByLabelText(wrapper: VueWrapper, labelText: string): DOMWrapper<Element> {
  const label = wrapper.findAll('label').find((label) => label.text() === labelText)

  if (!label) {
    throw new Error(`Label with text "${labelText}" not found`)
  }

  const labelFor = label.attributes('for')

  if (!labelFor) {
    throw new Error(`Label with text "${labelText}" does not have a "for" attribute`)
  }

  const relatedElement = wrapper.find(`#${labelFor}`)

  return relatedElement
}
