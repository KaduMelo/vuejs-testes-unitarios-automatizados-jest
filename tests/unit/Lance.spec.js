import Lance from '@/components/Lance'
import { createWrapper, mount } from '@vue/test-utils'

test('does not accept when bid less than zero', () => {
    const wraper = mount(Lance)
    const input = wraper.find('input')
    input.setValue(-100)
    wraper.trigger('submit')
    const lancesEmitidios = wraper.emitted('novo-lance')
    expect(lancesEmitidios).toBeUndefined()
})

test('accept a bid when the value is greater than zero', () => {
    const wraper = mount(Lance)
    const input = wraper.find('input')
    input.setValue(100)
    wraper.trigger('submit')
    const lancesEmitidios = wraper.emitted('novo-lance')
    expect(lancesEmitidios).toHaveLength(1)
})

test('emit the expected value of the bid valid', () => {
    const wraper = mount(Lance)
    const input = wraper.find('input')
    input.setValue(100)
    wraper.trigger('submit')
    const lancesEmitidios = wraper.emitted('novo-lance')

    const lance = parseInt(lancesEmitidios[0][0])
    expect(lance).toBe(100)
})