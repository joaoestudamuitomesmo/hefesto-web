import { useState } from 'react'

const perguntas = [
  {
    pergunta: 'Quais formatos de arquivo vocês aceitam?',
    resposta: 'STL, OBJ e STEP. O sistema valida a geometria antes de gerar o orçamento.'
  },
  {
    pergunta: 'Existe quantidade mínima?',
    resposta: 'Não. Fazemos desde uma única peça até pequenos lotes.'
  },
  {
    pergunta: 'Como funciona a logística reversa?',
    resposta: 'Você nos envia sobras plásticas e carretéis vazios e recebe créditos para abater nos próximos orçamentos.'
  },
  {
    pergunta: 'Qual a diferença entre a linha virgem e a Eco-Tech?',
    resposta: 'A Eco-Tech é feita de material reprocessado internamente, com custo por grama menor e resistência técnica certificada.'
  }
]

export default function Contato() {
  const [aberta, setAberta] = useState(null)
  const [enviado, setEnviado] = useState(false)

  function enviar(e) {
    e.preventDefault()
    setEnviado(true)
    e.target.reset()
  }

  return (
    <section className="secao contato">
      <div>
        <h1>Contato</h1>
        <form onSubmit={enviar}>
          <input name="nome" placeholder="Nome" required />
          <input name="email" type="email" placeholder="E-mail" required />
          <textarea name="mensagem" rows="6" placeholder="Mensagem" required />
          <button className="botao">Enviar</button>
          {enviado && <p className="aviso">Mensagem enviada.</p>}
        </form>
      </div>

      <div>
        <h1>FAQ</h1>
        {perguntas.map((p, i) => (
          <div className="faq" key={p.pergunta}>
            <button onClick={() => setAberta(aberta === i ? null : i)}>
              {p.pergunta}
              <span>{aberta === i ? '−' : '+'}</span>
            </button>
            {aberta === i && <p>{p.resposta}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
