import Leiloeiro from '@/views/Leiloeiro'
import { mount } from '@vue/test-utils'
import { getLeilao, getLances } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leilao = {
    produto: 'Livro da casa do código',
    lanceInicial: 50,
    descricao: 'Livro bem bacana sobre Vue'
}

const lances = [
    {
      id: 1,
      valor: 1001,
      data: "2020-06-13T18:04:26.826Z",
      leilao_id: 1
    },
    {
      valor: 1005,
      data: "2020-06-13T18:04:26.826Z",
      id: 2,
      leilao_id: 2
    },
    {
      valor: 1099,
      data: "2020-06-13T18:19:44.871Z",
      leilao_id: 1,
      id: 3
    },
    {
      valor: 500,
      data: "2020-07-24T14:40:33.951Z",
      leilao_id: 4,
      id: 4
    }
  ]

describe('Auctioneer starts auction without bids', () => {
    test('warn when you have no bids', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce([])

        const wrapper = mount(Leiloeiro, {
            id: 1
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(true)
    })
})

describe('An auctioneer communicates the lowest and highest bid amounts', () => {
    test('shows the highest bid for that auction', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            id: 1
        })

        await flushPromises()

        const maiorLance = wrapper.find('.maior-lance')
        expect(maiorLance.element.textContent).toContain('Maior lance: R$ 1099')
    })

    test('shows the lowest bid for that auction', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            id: 1
        })

        await flushPromises()

        const menorLance = wrapper.find('.menor-lance')
        expect(menorLance.element.textContent).toContain('Menor lance: R$ 500')
    })
})

describe('An auctioneer displays existing bids', () => {
    test('not show warn of the "without bids"', async () => {

        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            id: 1
        })

        await flushPromises()

        const alerta = wrapper.find('.alert-dark')

        expect(alerta.exists()).toBe(false)
    })

    test('has a list of bids', async () => {
    
        getLeilao.mockResolvedValueOnce(leilao)
        getLances.mockResolvedValueOnce(lances)

        const wrapper = mount(Leiloeiro, {
            id: 1
        })

        await flushPromises()

        const list = wrapper.find('.list-inline')
        expect(list.exists()).toBe(true)
    })
})