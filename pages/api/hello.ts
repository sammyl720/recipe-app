// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import db from '../../db'
export default async (req:NextApiRequest, res: NextApiResponse) => {
  // console.log(req)
  const session = await getSession({ req })
  console.log(session)
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
