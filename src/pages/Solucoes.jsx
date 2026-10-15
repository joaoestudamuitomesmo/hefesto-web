import { Link } from 'react-router-dom'
import Card from '../components/Card'

export default function Solucoes() {
  return (
    <section className="secao centro">
      <h2 className="grande">Soluções</h2>
      <div className="cards">
        <Card titulo="Prototipagem rápida">
          Valide o projeto em dias, sem molde e sem quantidade mínima.
        </Card>
        <Card titulo="Peças sob demanda">
          Produza só o que precisa, sem estoque e sem custo de armazenagem.
        </Card>
        <Card titulo="Peças de reposição">
          Substitua componentes descontinuados ou difíceis de encontrar.
        </Card>
        <Card titulo="Materiais de engenharia">
          Nylon, TPU, fibra de carbono e outros além do PLA e ABS.
        </Card>
        <Card titulo="Linha reciclada">
          Filamento Eco-Tech com menor custo por grama e menos desperdício.
        </Card>
      </div>
      <Link to="/orcamento" className="botao">Solicitar orçamento</Link>
    </section>
  )
}
