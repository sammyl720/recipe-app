import formidable from 'formidable'
import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import uploader from '../../utils/uploader'
import slugify from '../../utils/slugify'
export const config = {
  api: {
    bodyParser: false
  }
}
export default async (req: NextApiRequest, res:NextApiResponse) => {
  if(req.method !== 'POST') {
    res.status(405).json({
      error: 'Method not allowed'
    }) 
    return
  }
  const session = await getSession({ req })
  if(!session) {
    res.status(401).json({
      error: 'Unauthorized'
    })
    return
  }
  const form = new formidable.IncomingForm()

  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if(err) {
      console.log(err)
      res.status(400).json({
        error: err
      })
      return
    }
    try {
      const upload = await uploader(files.file.path, {
        public_id: slugify(session.user?.name || 'no user') + '/' + slugify(fields.title || files.file.name.split('.')[0] || 'no title'),
      })
      return res.json({
        url: upload.url,
        secure_url: upload.secure_url
      })
    } catch (error) {
      console.log(error)
      res.status(400).json({
        error: error
      })
    }
  })
}