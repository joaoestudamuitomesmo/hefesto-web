import { Link } from 'react-router-dom'
import hero from '../assets/hero.png'
import Card from '../components/Card'

export default function Home() {
  return (
    <>
      <section className="hero">
        <span>Hefesto</span>
        <h1>MANUFATURA</h1>
        <img src={hero} alt="Impressoras 3D" />
        <h1 className="espacado">A D I T I V A</h1>
        <a href="#empresa" className="saiba-mais">
          <span className="seta">↓</span>
          Saiba Mais
        </a>
      </section>

      <section id="empresa" className="secao">
        <h2 className="titulo-esquerda">Hefesto</h2>
        <div className="cards">
          <Card titulo="Empresa">
            Manufatura aditiva que une engenharia de precisão e sustentabilidade.
          </Card>
          <Card titulo="Serviços">Manufatura aditiva com impressão 3D</Card>
          <Card titulo="Solução">Redução do desperdício de material</Card>
        </div>
      </section>

      <section className="secao centro">
        <h2 className="grande">Impressão</h2>
        <div className="cta">
          <h2>Começar a imprimir</h2>
          <Link to="/orcamento" className="botao">Orçamento</Link>
        </div>
      </section>
    </>
  )
}
