import { Link } from 'react-router-dom'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../storage'

export default function Carrinho() {
  const { itens, alterarQtd, remover, total } = useCarrinho()

  return (
    <section className="secao form-pagina">
      <h1>Carrinho</h1>

      {itens.length === 0 && (
        <p>Seu carrinho está vazio. <Link to="/produtos">Ver materiais</Link></p>
      )}

      {itens.map(item => (
        <div className="item-carrinho" key={item.chave}>
          <div>
            <h3>{item.nome}</h3>
            <p>{item.cor} · {formatarPreco(item.preco)} / carretel</p>
          </div>
          <div className="qtd">
            <button onClick={() => alterarQtd(item.chave, item.qtd - 1)}>-</button>
            <span>{item.qtd}</span>
            <button onClick={() => alterarQtd(item.chave, item.qtd + 1)}>+</button>
          </div>
          <button className="link" onClick={() => remover(item.chave)}>Remover</button>
        </div>
      ))}

      {itens.length > 0 && (
        <>
          <p className="total">Total estimado: {formatarPreco(total)}</p>
          <Link to="/orcamento" className="botao">Solicitar orçamento</Link>
        </>
      )}
    </section>
  )
}
