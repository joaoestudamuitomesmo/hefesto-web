import { Link, useParams } from 'react-router-dom'
import { buscarPedido } from '../storage'

export default function Confirmacao() {
  const { id } = useParams()
  const pedido = buscarPedido(id)

  return (
    <section className="secao centro">
      <h1>Solicitação enviada</h1>
      <h2>Solicitação #{id}</h2>
      <p>
        Recebemos o seu pedido{pedido?.email ? ` e vamos responder em ${pedido.email}` : ''}. O
        orçamento chega assim que a geometria do modelo for validada.
      </p>
      <div className="acoes">
        <Link to="/area-do-cliente" className="botao">Acompanhar solicitação</Link>
        <Link to="/" className="botao secundario">Voltar ao início</Link>
      </div>
    </section>
  )
}
