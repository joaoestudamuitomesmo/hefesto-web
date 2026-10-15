export default function Card({ titulo, imagem, children }) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <div className="card-imagem">{imagem && <img src={imagem} alt="" />}</div>
      <p>{children}</p>
    </div>
  )
}
