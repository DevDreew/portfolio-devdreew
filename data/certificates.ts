import type { Certificate } from '@/types';

/* ============================================================
   CERTIFICADOS

   COMO ADICIONAR UM CERTIFICADO:
   1. Salve a imagem do certificado em /public/certificates/
      (JPG ou PNG, proporção ~4:3, largura mínima 1200px)
   2. Acrescente um objeto no array abaixo
   O grid e o lightbox funcionam automaticamente.

   SUBSTITUIR: os registros abaixo são exemplos — troque pelos
   seus certificados reais e apague os que não usar.
   ============================================================ */

export const certificates: Certificate[] = [
  {
    id: 'cert-01',
    // SUBSTITUIR: título exato do certificado
    title: 'Análise de Dados com Power BI',
    // SUBSTITUIR: instituição emissora
    issuer: 'Instituição Emissora',
    // SUBSTITUIR: data de conclusão
    date: 'Março de 2025',
    // SUBSTITUIR: /certificates/nome-do-arquivo.jpg
    image: '/certificates/certificado-01.jpg',
    // SUBSTITUIR: link público de verificação
    verifyUrl: 'https://exemplo.com/verificar',
    credentialId: 'ABC-123456',
  },
  {
    id: 'cert-02',
    title: 'Python para Análise de Dados',
    issuer: 'Instituição Emissora',
    date: 'Janeiro de 2025',
    image: '/certificates/certificado-02.jpg',
    verifyUrl: 'https://exemplo.com/verificar',
  },
  {
    id: 'cert-03',
    title: 'SQL e Modelagem de Dados',
    issuer: 'Instituição Emissora',
    date: 'Novembro de 2024',
    image: '/certificates/certificado-03.jpg',
  },
];
