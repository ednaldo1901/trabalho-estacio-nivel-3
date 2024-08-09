import React from 'react';
import { Livro } from '../classes/modelo/Livro'; // ajuste conforme necessário
import { controleEditora } from '../classes/controle/ControleEditora'; // ajuste conforme necessário

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const nomeEditora = controleEditora.getNomeEditora(props.livro.codEditora);
  return (
    <tr>
      <td>{props.livro.titulo}</td>
      <td>{props.livro.resumo}</td>
      <td>{props.livro.autores.join(', ')}</td>
      <td>{nomeEditora}</td>
      <td>
        <button className="btn btn-danger" onClick={() => props.excluir(props.livro.codigo)}>Excluir</button>
      </td>
    </tr>
  );
};
