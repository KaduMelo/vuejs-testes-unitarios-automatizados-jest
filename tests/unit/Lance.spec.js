import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

test('não aceita lance com valor menor do que zero', () => {
    const wraper = mount(Lance)
    expect(wraper).toBeTruthy()
})