import Avaliador from '@/views/Avaliador'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { getLeiloes } from '@/http'
import flushPromises from 'flush-promises'

jest.mock('@/http')

const leiloes = [
    {
        id: 3,
        produto: "Livro da Casa do Código",
        descricao: "Um livro super completo, sobre um assunto incrível.",
        lanceInicial: 500
    },
    {
        produto: "Ebook da Casa do Código",
        descricao: "Um livro com um conteúdo muito interessante sobre VueJS",
        lanceInicial: 700,
        id: 4
    },
]

describe('An evaluator that connects with the API', () => {
    test('show all auctions returned by the API', async () => {
        getLeiloes.mockResolvedValueOnce(leiloes)

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(leiloes.length)
    })

    test('not exists auctions returned by the API', async () => {
        getLeiloes.mockResolvedValueOnce([])

        const wrapper = mount(Avaliador, {
            stubs: {
                RouterLink: RouterLinkStub
            }
        })
        await flushPromises()

        const totalLeiloesExibidos = wrapper.findAll('.leilao').length
        expect(totalLeiloesExibidos).toBe(0)
    })

})