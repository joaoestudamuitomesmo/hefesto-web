import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import dados from '../data/materiais.json'
import filamentos from '../assets/filamentos.png'
import { useCarrinho } from '../context/CarrinhoContext'
import { formatarPreco } from '../storage'

export default function DetalheProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { adicionar } = useCarrinho()
  const material = dados.materiais.find(m => m.id === id)

  const [cor, setCor] = useState(material?.cores[0].nome)
  const [qtd, setQtd] = useState(1)

  if (!material) return <section className="secao"><p>Material não encontrado.</p></section>

  const precoCarretel = material.precoGrama * 1000

  function adicionarAoCarrinho() {
    adicionar({ id: material.id, nome: material.nome, cor, qtd, preco: precoCarretel })
    navigate('/carrinho')
  }

  return (
    <section className="secao detalhe">
      <img src={filamentos} alt={material.nome} />
      <div className="detalhe-info">
        <h1>{material.nome}</h1>
        <p>{material.descricao}</p>

        <label>
          Cor
          <select value={cor} onChange={e => setCor(e.target.value)}>
            {material.cores.map(c => (
              <option key={c.nome}>{c.nome}</option>
            ))}
          </select>
        </label>

        <div className="campo">
          <span>Qtd (carretéis de 1 kg)</span>
          <div className="qtd">
            <button onClick={() => setQtd(q => Math.max(1, q - 1))}>-</button>
            <span>{qtd}</span>
            <button onClick={() => setQtd(q => q + 1)}>+</button>
          </div>
        </div>

        <strong className="preco">{formatarPreco(precoCarretel * qtd)}</strong>

        <div className="acoes">
          <button className="botao" onClick={adicionarAoCarrinho}>Adicionar ao carrinho</button>
          <Link to="/orcamento" className="botao secundario">Solicitar orçamento</Link>
        </div>
      </div>
    </section>
  )
}
