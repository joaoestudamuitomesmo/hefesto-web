import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dados from '../data/materiais.json'
import { useCarrinho } from '../context/CarrinhoContext'
import { criarPedido, getUsuario } from '../storage'

export default function Orcamento() {
  const navigate = useNavigate()
  const { itens, limpar } = useCarrinho()
  const usuario = getUsuario()
  const [materialId, setMaterialId] = useState(dados.materiais[0].id)

  const material = dados.materiais.find(m => m.id === materialId)

  function enviar(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target))
    const arquivo = form.arquivo?.name || ''
    const id = criarPedido({ ...form, arquivo, itens })
    limpar()
    navigate(`/confirmacao/${id}`)
  }

  return (
    <section className="secao form-pagina">
      <h1>Solicitação de orçamento</h1>
      <p>Envie seu modelo 3D e receba o orçamento por e-mail.</p>

      <form onSubmit={enviar}>
        <input name="nome" placeholder="Nome" defaultValue={usuario?.nome} required />
        <input name="empresa" placeholder="Empresa" defaultValue={usuario?.empresa} />
        <input name="email" type="email" placeholder="E-mail" defaultValue={usuario?.email} required />
        <input name="telefone" placeholder="Telefone" />

        <select name="servico">
          {dados.servicos.map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select name="material" value={materialId} onChange={e => setMaterialId(e.target.value)}>
          {dados.materiais.map(m => (
            <option key={m.id} value={m.id}>{m.nome}</option>
          ))}
        </select>
        <select name="cor">
          {material.cores.map(c => (
            <option key={c.nome}>{c.nome}</option>
          ))}
        </select>
        <input name="quantidade" type="number" min="1" defaultValue="1" placeholder="Quantidade" />

        <label className="upload">
          .STL/.OBJ/.STEP
          <input name="arquivo" type="file" accept=".stl,.obj,.step,.stp" required />
        </label>
        <textarea name="mensagem" rows="5" placeholder="Mensagem" />

        {itens.length > 0 && <p className="aviso">{itens.length} item(ns) do carrinho serão incluídos.</p>}
        <button className="botao">Enviar solicitação</button>
      </form>
    </section>
  )
}
