export type Tokens = {
  access: string;
  refresh: string;
};

const CLAVE_TOKENS = 'sigesa_tokens';

export const obtenerTokens = (): Tokens | null => {
  try {
    const valor = localStorage.getItem(CLAVE_TOKENS);
    if (!valor) return null;
    return JSON.parse(valor) as Tokens;
  } catch {
    return null;
  }
};

export const guardarTokens = (tokens: Tokens) => {
  localStorage.setItem(CLAVE_TOKENS, JSON.stringify(tokens));
};

export const limpiarTokens = () => {
  localStorage.removeItem(CLAVE_TOKENS);
};
