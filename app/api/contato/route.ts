import { NextResponse } from 'next/server';

/* ============================================================
   ENDPOINT DO FORMULÁRIO DE CONTATO

   Estado atual: valida os dados e registra no log do servidor.
   Isso já faz o formulário FUNCIONAR sem quebrar em produção.

   SUBSTITUIR — para receber as mensagens de verdade, escolha UMA:

   OPÇÃO A · Resend (recomendado, grátis até 100 e-mails/dia)
   1. Crie a conta em resend.com e gere uma API key
   2. npm install resend
   3. Adicione RESEND_API_KEY nas env vars da Vercel
   4. Descomente o bloco marcado abaixo

   OPÇÃO B · Formspree / Web3Forms (zero backend)
   Troque a URL do fetch no componente Contact.tsx pelo endpoint
   do serviço e apague este arquivo.
   ============================================================ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Payload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'JSON inválido.' }, { status: 400 });
  }

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  // Validação no servidor — nunca confie só na validação do cliente.
  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json(
      { error: 'Dados inválidos. Verifique nome, e-mail e mensagem.' },
      { status: 422 },
    );
  }

  // Limite defensivo de tamanho contra abuso.
  if (name.length > 120 || email.length > 160 || message.length > 5000) {
    return NextResponse.json({ error: 'Conteúdo muito longo.' }, { status: 413 });
  }

  console.log('[contato]', { name, email, length: message.length });

  /* ----------------------------------------------------------
     SUBSTITUIR: descomente para enviar de fato via Resend.

  const { Resend } = await import('resend');
  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: 'Portfólio <onboarding@resend.dev>',
    to: 'SEU_EMAIL_AQUI@dominio.com',
    replyTo: email,
    subject: `Novo contato pelo portfólio — ${name}`,
    text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
  });
  ---------------------------------------------------------- */

  return NextResponse.json({ ok: true }, { status: 200 });
}
