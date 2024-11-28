import axios from "axios";


export function calcularIdade(nascimento, hoje) {
    var diferencaAnos = hoje.getFullYear() - nascimento.getFullYear();
   
    if ( new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()) < new Date(hoje.getFullYear(), nascimento.getMonth(), nascimento.getDate()) ) {
        diferencaAnos--;
    }
    return diferencaAnos;
}
 

export async function validarImagem(url_imagem) {
    try {
        // faz a requisão para a url
        const { status, headers, data } = await axios({
          url: url_imagem,
          method: 'GET',
          responseType: 'text',
        });

        if (status === 200 && headers['content-type'].startsWith('image/')) return url_imagem;
        return false;
    } catch (err) {
        return false;
    }
}
