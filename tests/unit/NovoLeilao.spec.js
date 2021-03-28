import NovoLeilao from '@/views/NovoLeilao'
import { mount } from '@vue/test-utils'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
    push: jest.fn()
}

describe('A new auction must be created', () => {
    test('given a completed form, a new auction must be created', () => {
        createLeilao.mockResolvedValueOnce()

        const wrapper = mount(NovoLeilao, {
            mocks: {
                $router
            }
        })
        wrapper.find('.produto').setValue('Um livro da cada do código')
        wrapper.find('.descricao').setValue('Contéudo de primeira')
        wrapper.find('.valor').setValue('Um livro da cada do código')
        wrapper.find('form').trigger('submit')

        expect(createLeilao).toHaveBeenCalled()
    })
})