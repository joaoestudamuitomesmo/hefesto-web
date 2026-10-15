import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getUsuario, listarPedidos, sairUsuario } from '../storage'

export default function AreaCliente() {
  const navigate = useNavigate()
  const usuario = getUsuario()

  if (!usuario) return <Navigate to="/login" />

  const pedidos = listarPedidos()

  function sair() {
    sairUsuario()
    navigate('/')
  }

  return (
    <section className="secao form-pagina">
      <div className="topo-area">
        <div>
          <h1>Olá, {usuario.nome}</h1>
          <p>{usuario.email}</p>
        </div>
        <button className="botao secundario" onClick={sair}>Sair</button>
      </div>

      {pedidos.length === 0 && (
        <p>Nenhuma solicitação ainda. <Link to="/orcamento">Pedir orçamento</Link></p>
      )}

      {pedidos.map(p => (
        <div className="pedido" key={p.id}>
          <div>
            <h3>Solicitação #{p.id}</h3>
            <p>{p.servico} · {p.material} · {p.cor} · {p.quantidade} un.</p>
          </div>
          <span className="status">{p.status}</span>
        </div>
      ))}
    </section>
  )
}
