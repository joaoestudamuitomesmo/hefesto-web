import { useState } from 'react'
import { Link } from 'react-router-dom'
import dados from '../data/materiais.json'
import impressora from '../assets/impressora.png'
import filamentos from '../assets/filamentos.png'
import Card from '../components/Card'
import { formatarPreco } from '../storage'

const { materiais } = dados

const todasCores = [...new Set(materiais.flatMap(m => m.cores.map(c => c.nome)))].sort()

export default function Produtos() {
  const [linha, setLinha] = useState('todas')
  const [cor, setCor] = useState('')
  const [busca, setBusca] = useState('')

  const filtrados = materiais.filter(m => {
    if (linha !== 'todas' && m.linha !== linha) return false
    if (cor && !m.cores.some(c => c.nome === cor)) return false
    return m.nome.toLowerCase().includes(busca.toLowerCase())
  })

  return (
    <>
      <section className="secao centro">
        <Card titulo="Impressão" imagem={impressora}>
          Envie seu modelo para impressão nas melhores impressoras do mundo.
        </Card>
        <Link to="/orcamento" className="botao">Solicitar orçamento</Link>
      </section>

      <section className="secao">
        <div className="materiais-bloco">
          <img src={filamentos} alt="Carretéis de filamento" />
          <div className="materiais-texto">
            <h2>Materiais</h2>
            <p>
              Filamentos PLA, PETG, ABS, TPU, Nylon, Fibra de Carbono de alta qualidade para
              qualquer tipo de impressão.
            </p>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="filtros">
          <input placeholder="Buscar material" value={busca} onChange={e => setBusca(e.target.value)} />
          <select value={linha} onChange={e => setLinha(e.target.value)}>
            <option value="todas">Todas as linhas</option>
            <option value="virgem">Virgem técnica</option>
            <option value="reciclado">Eco-Tech (reciclado)</option>
          </select>
          <select value={cor} onChange={e => setCor(e.target.value)}>
            <option value="">Qualquer cor</option>
            {todasCores.map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="lista-materiais">
          {filtrados.map(m => (
            <Link to={`/produtos/${m.id}`} key={m.id} className="material">
              <h3>{m.nome}</h3>
              <span className="tag">{m.linha === 'virgem' ? 'Virgem' : 'Reciclado'}</span>
              <div className="cores">
                {m.cores.map(c => (
                  <i key={c.nome} title={c.nome} style={{ background: c.hex }} />
                ))}
              </div>
              <p>{formatarPreco(m.precoGrama)} / g</p>
            </Link>
          ))}
          {filtrados.length === 0 && <p>Nenhum material encontrado.</p>}
        </div>
      </section>
    </>
  )
}
