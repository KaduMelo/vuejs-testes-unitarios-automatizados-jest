import Lance from '@/components/Lance'
import { mount } from '@vue/test-utils'

describe('A bid without value minimum', () => {
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
})

describe('A bid with value minimum', () => {
    test('all spears must have a value greather than the minimum', () => {
        const wraper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wraper.find('input')
        input.setValue(400)
        wraper.trigger('submit')
        const lancesEmitidios = wraper.emitted('novo-lance')

        expect(lancesEmitidios).toHaveLength(1)
    })

    test('emit the expected value of the bid valid', () => {
        const wraper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wraper.find('input')
        input.setValue(400)
        wraper.trigger('submit')
        const lancesEmitidios = wraper.emitted('novo-lance')
        
        const lance = parseInt(lancesEmitidios[0][0])
        expect(lance).toBe(400)
    })

    test('does not accept bid with value less than the value minimum', async () => {
        const wraper = mount(Lance, {
            propsData: {
                lanceMinimo: 300
            }
        })
        const input = wraper.find('input')
        input.setValue(200)
        wraper.trigger('submit')
        // waiting for the DOM to be updated 
        await wraper.vm.$nextTick()

        const msgErro = wraper.find('p.alert').element.textContent
        const msgEsperado = 'O valor mínimo para o lance é de R$ 300'
        expect(msgErro).toBeTruthy()
        expect(msgErro).toContain(msgEsperado)
    })
})