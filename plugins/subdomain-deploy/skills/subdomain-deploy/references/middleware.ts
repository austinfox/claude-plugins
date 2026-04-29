import { next } from '@vercel/edge'

export const config = {
  matcher: '/((?!_vercel|favicon\\.ico|robots\\.txt).*)',
}

const COOKIE_NAME = 'site_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

async function sha256Hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function loginHtml(error?: string): string {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sign in</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital@1&family=Outfit:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      background: #F4EEE2;
      font-family: 'Outfit', system-ui, sans-serif;
      color: #2c2620;
      display: grid;
      place-items: center;
      padding: 2rem;
    }
    .card {
      width: 100%;
      max-width: 380px;
      text-align: center;
    }
    h1 {
      font-family: 'Lora', Georgia, serif;
      font-style: italic;
      font-weight: 400;
      font-size: 2.5rem;
      margin: 0 0 2rem;
      letter-spacing: -0.01em;
    }
    form { display: flex; flex-direction: column; gap: 0.75rem; }
    input[type="password"] {
      width: 100%;
      padding: 0.85rem 1rem;
      font-family: inherit;
      font-size: 1rem;
      color: inherit;
      background: rgba(255, 255, 255, 0.6);
      border: 1px solid rgba(44, 38, 32, 0.15);
      border-radius: 10px;
      outline: none;
      transition: border-color 120ms ease, background 120ms ease;
    }
    input[type="password"]:focus {
      border-color: rgba(44, 38, 32, 0.45);
      background: rgba(255, 255, 255, 0.85);
    }
    button {
      padding: 0.85rem 1rem;
      font-family: inherit;
      font-size: 1rem;
      font-weight: 500;
      color: #F4EEE2;
      background: #2c2620;
      border: none;
      border-radius: 10px;
      cursor: pointer;
      transition: opacity 120ms ease;
    }
    button:hover { opacity: 0.9; }
    .error {
      color: #8a3a2a;
      font-size: 0.9rem;
      margin: 0.25rem 0 0;
      min-height: 1.2em;
    }
  </style>
</head>
<body>
  <main class="card">
    <h1>Sign in</h1>
    <form method="POST" action="/__auth">
      <input type="password" name="password" autofocus autocomplete="current-password" required />
      <button type="submit">Continue</button>
      <p class="error">${error ?? ''}</p>
    </form>
  </main>
</body>
</html>`
}

function htmlResponse(body: string, status = 200, extraHeaders?: HeadersInit): Response {
  const headers = new Headers(extraHeaders)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  return new Response(body, { status, headers })
}

export default async function middleware(request: Request): Promise<Response | undefined> {
  const password = process.env.SITE_PASSWORD
  if (!password) return next()

  const url = new URL(request.url)
  const expected = await sha256Hex(password)

  if (request.method === 'POST' && url.pathname === '/__auth') {
    const form = await request.formData()
    const submitted = String(form.get('password') ?? '')
    if (submitted === password) {
      const headers = new Headers({ Location: '/' })
      headers.append(
        'Set-Cookie',
        `${COOKIE_NAME}=${expected}; Path=/; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
      )
      return new Response(null, { status: 303, headers })
    }
    return htmlResponse(loginHtml('Wrong password.'), 401)
  }

  const cookieHeader = request.headers.get('cookie') ?? ''
  const authCookie = cookieHeader
    .split(';')
    .map((c) => c.trim())
    .find((c) => c.startsWith(`${COOKIE_NAME}=`))
    ?.slice(COOKIE_NAME.length + 1)

  if (authCookie === expected) return next()

  return htmlResponse(loginHtml(), 401)
}
