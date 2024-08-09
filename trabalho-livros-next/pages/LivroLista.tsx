import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import { LinhaLivro } from '../components/LinhaLivro';
import { Livro } from '../classes/modelo/Livro';

const LivroLista = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState(false);

  const obterLivros = async () => {
    const response = await fetch('/api/livros');
    const livros = await response.json();
    setLivros(livros);
    setCarregado(true);
  };

  const excluirLivro = async (codigo: number) => {
    const response = await fetch(`/api/livros/${codigo}`, {
      method: 'DELETE'
    });
    return response.ok;
  };

  const excluir = (codigo: number) => {
    excluirLivro(codigo).then(() => setCarregado(false));
  };

  useEffect(() => {
    if (!carregado) {
      obterLivros();
    }
  }, [carregado]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Loja Next - Catálogo</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Catálogo de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Autores</th>
              <th>Editora</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map(livro => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={excluir}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default LivroLista;
