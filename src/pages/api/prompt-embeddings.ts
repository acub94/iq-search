import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
    apiKey: String(process.env.OPEN_AI_KEY),
    organization: String(process.env.OPEN_AI_ORGANIZATION_KEY),
})
const openai = new OpenAIApi(configuration)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    if (req && !req.body) {
        return res.status(500).send('Unprocessable Entity')
    }

    let result

    try {
        console.log(req.body)
        const er = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: String(req.body),
        })

        if (er.status !== 200) {
            res.json({ error: er.data, message: 'Create Embedding Error' })
        }
        const [responseData] = er.data.data

        result = responseData.embedding
    } catch (err: any) {
        console.log(err?.response.data)
    }

    return res.json({  embedding: result })
}
