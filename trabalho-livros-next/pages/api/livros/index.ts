/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '../../../classes/controle/ControleLivros';

export const controleLivros = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      res.status(200).json(controleLivros.obterLivros());
    } else if (req.method === 'POST') {
      const livro = req.body;
      controleLivros.incluir(livro);
      res.status(200).json({ message: 'Livro incluído com sucesso' });
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
