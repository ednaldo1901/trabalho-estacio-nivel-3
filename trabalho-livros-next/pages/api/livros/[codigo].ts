/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivros } from './index';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      const codigo = Number(req.query.codigo);
      controleLivros.excluir(codigo);
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
