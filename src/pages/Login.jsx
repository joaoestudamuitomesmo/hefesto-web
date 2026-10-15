import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { salvarUsuario } from '../storage'

export default function Login() {
  const navigate = useNavigate()
  const [aba, setAba] = useState('entrar')
  const [erro, setErro] = useState('')

  function enviar(e) {
    e.preventDefault()
    const form = Object.fromEntries(new FormData(e.target))

    if (aba === 'cadastrar' && form.senha !== form.confirmar) {
      setErro('Senha incorreta.')
      return
    }

    salvarUsuario({ nome: form.nome || form.email, empresa: form.empresa, email: form.email })
    navigate('/area-do-cliente')
  }

  return (
    <section className="secao form-pagina">
      <div className="abas">
        <button className={aba === 'entrar' ? 'ativa' : ''} onClick={() => setAba('entrar')}>Entrar</button>
        <button className={aba === 'cadastrar' ? 'ativa' : ''} onClick={() => setAba('cadastrar')}>Cadastrar</button>
      </div>

      <form onSubmit={enviar} key={aba}>
        {aba === 'cadastrar' && (
          <>
            <input name="nome" placeholder="Nome" required />
            <input name="empresa" placeholder="Empresa" />
          </>
        )}
        <input name="email" type="email" placeholder="E-mail" required />
        {aba === 'cadastrar' && <input name="telefone" placeholder="Telefone" />}
        <input name="senha" type="password" placeholder="Senha" required />
        {aba === 'cadastrar' && <input name="confirmar" type="password" placeholder="Confirmar senha" required />}

        {erro && <p className="aviso">{erro}</p>}
        {aba === 'entrar' && <button type="button" className="link">Esqueci a senha</button>}
        <button className="botao">{aba === 'entrar' ? 'Entrar' : 'Criar conta'}</button>
      </form>
    </section>
  )
}
