export default async function handler(req, res) {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).send('Missing "url" parameter');
  }

  try {
    const imageRes = await fetch(url);
    const imageBuffer = await imageRes.arrayBuffer();
    
    // Copiar cabeçalhos relevantes
    res.setHeader('Content-Type', imageRes.headers.get('content-type'));
    res.setHeader('Access-Control-Allow-Origin', '*');
    
    return res.send(Buffer.from(imageBuffer));
  } catch (error) {
    return res.status(500).send('Error fetching image');
  }
}