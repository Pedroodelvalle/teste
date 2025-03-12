export async function onRequest(context) {
    const url = new URL(context.request.url);
    const imageUrl = url.searchParams.get('url');
    
    // Se não tiver parâmetro de URL, apenas passe para a página normalmente
    if (!imageUrl) {
      return context.next();
    }
  
    try {
      // Busca a imagem da URL fornecida
      const imageResponse = await fetch(imageUrl);
      
      // Prepara os cabeçalhos da resposta
      const headers = new Headers(imageResponse.headers);
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      
      // Retorna a imagem com os cabeçalhos CORS
      return new Response(imageResponse.body, {
        status: imageResponse.status,
        headers
      });
    } catch (error) {
      return new Response(`Error fetching image: ${error.message}`, { status: 500 });
    }
  }