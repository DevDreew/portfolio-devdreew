'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { cn, whatsappLink } from '@/lib/utils';
import { revealUp, viewportOnce } from '@/lib/motion';

interface FormState {
  name: string;
  email: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;
type Status = 'idle' | 'sending' | 'sent' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(data: FormState): Errors {
    const e: Errors = {};
    if (data.name.trim().length < 2) e.name = 'Informe seu nome.';
    if (!EMAIL_RE.test(data.email.trim())) e.email = 'Informe um e-mail válido.';
    if (data.message.trim().length < 10)
      e.message = 'Escreva pelo menos 10 caracteres.';
    return e;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');

    try {
      const res = await fetch('/api/contato', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('falha');
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  return (
    <section id="contato" className="scroll-mt-20 py-[var(--space-section)]">
      <div className="shell">
        <SectionHeader
          index="07"
          eyebrow="Contato"
          title="Tem um dado parado esperando virar decisão?"
          description="Me conta o contexto. Respondo em até um dia útil."
        />

        <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Formulário */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={revealUp}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            <Field
              id="name"
              label="Nome"
              value={form.name}
              error={errors.name}
              onChange={(v) => update('name', v)}
              placeholder="Como devo te chamar"
              autoComplete="name"
            />

            <Field
              id="email"
              label="E-mail"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={(v) => update('email', v)}
              placeholder="voce@empresa.com.br"
              autoComplete="email"
            />

            <div>
              <label htmlFor="message" className="eyebrow block">
                Mensagem
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                placeholder="Qual é o contexto e o que você precisa resolver"
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={cn(
                  'mt-2.5 w-full resize-y rounded-sm border bg-base px-4 py-3 text-[15px] transition-colors placeholder:text-ink-3 focus:outline-none',
                  errors.message
                    ? 'border-accent focus:border-accent'
                    : 'border-hairline focus:border-ink',
                )}
              />
              {errors.message && (
                <p id="message-error" role="alert" className="mt-2 text-xs text-accent">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
              </button>

              <p role="status" aria-live="polite" className="text-sm">
                {status === 'sent' && (
                  <span className="text-ink-2">
                    Mensagem enviada. Obrigado — retorno em breve.
                  </span>
                )}
                {status === 'error' && (
                  <span className="text-accent">
                    Não consegui enviar. Tente pelo WhatsApp ao lado.
                  </span>
                )}
              </p>
            </div>
          </motion.form>

          {/* Canais diretos */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={revealUp}
          >
            <h3 className="eyebrow">Ou direto por aqui</h3>

            <ul className="mt-5 space-y-px overflow-hidden rounded-md border border-hairline bg-hairline">
              <ContactRow
                label="WhatsApp"
                value="Resposta mais rápida"
                href={whatsappLink(
                  site.whatsapp,
                  'Olá Drew! Vim pelo seu portfólio.',
                )}
              />
              <ContactRow label="E-mail" value={site.email} href={`mailto:${site.email}`} />
              <ContactRow label="LinkedIn" value={`/in/${site.handle}`} href={site.linkedin} />
              <ContactRow label="GitHub" value={`@${site.githubUser}`} href={site.github} />
            </ul>

            <div className="mt-6 rounded-md border border-hairline bg-surface p-5">
              <p className="font-mono text-label uppercase text-ink-3">Base</p>
              <p className="mt-2 text-sm text-ink-2">{site.location}</p>
              <p className="mt-1 text-sm text-ink-2">
                Disponível para trabalho remoto e híbrido na Grande São Paulo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = 'text',
  placeholder,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow block">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'mt-2.5 w-full rounded-sm border bg-base px-4 py-3 text-[15px] transition-colors placeholder:text-ink-3 focus:outline-none',
          error ? 'border-accent focus:border-accent' : 'border-hairline focus:border-ink',
        )}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-accent">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 bg-base px-5 py-5 transition-colors duration-300 hover:bg-surface"
      >
        <span>
          <span className="block font-mono text-label uppercase text-ink-3">{label}</span>
          <span className="mt-1.5 block text-sm font-medium transition-colors group-hover:text-accent">
            {value}
          </span>
        </span>
        <span
          className="text-ink-3 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        >
          ↗
        </span>
      </a>
    </li>
  );
}
