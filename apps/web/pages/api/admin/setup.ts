import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

// Simple helper to read the setup token from header/query
function getToken(req: NextApiRequest): string | undefined {
  const header = (req.headers['x-setup-token'] || req.headers['x-setup'] || req.headers['authorization']) as
    | string
    | undefined;
  if (header && header.startsWith('Bearer ')) return header.slice('Bearer '.length);
  if (header) return header;
  const q = req.query.token as string | undefined;
  return q;
}

async function ensureSchema() {
  // Create tables if they do not exist (SQLite dialect by default)
  // This makes the endpoint idempotent and avoids relying on running CLI in the serverless runtime.
  await prisma.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS "Setting" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "key" TEXT NOT NULL UNIQUE,
      "value" TEXT NOT NULL,
      "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
  );

  await prisma.$executeRawUnsafe(
    `CREATE TABLE IF NOT EXISTS "Template" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "slug" TEXT NOT NULL UNIQUE,
      "name" TEXT NOT NULL,
      "content" TEXT NOT NULL,
      "createdAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
      "updatedAt" DATETIME DEFAULT CURRENT_TIMESTAMP
    );`
  );

  // Ensure an index on Setting.key (UNIQUE is already applied above)
}

async function seedTemplates() {
  const templates = [
    {
      slug: 'welcome-email',
      name: 'Welcome Email',
      content: 'Hi {{name}}, welcome to our app!'
    },
    {
      slug: 'password-reset',
      name: 'Password Reset',
      content: 'Click here to reset your password: {{link}}'
    }
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: { name: t.name, content: t.content },
      create: t,
    });
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'POST, GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getToken(req);
  const expected = process.env.SETUP_TOKEN;

  if (!expected) {
    return res.status(500).json({ error: 'Missing SETUP_TOKEN env' });
  }
  if (!token || token !== expected) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Ensure DB schema exists (works for SQLite by default)
    await ensureSchema();

    // Check idempotent flag
    const flag = await prisma.setting.findUnique({ where: { key: 'setup_complete' } }).catch(() => null);
    if (flag?.value === 'true') {
      return res.status(200).json({ status: 'ok', alreadySetup: true });
    }

    // Seed initial templates
    await seedTemplates();

    // Mark setup as complete
    await prisma.setting.upsert({
      where: { key: 'setup_complete' },
      update: { value: 'true' },
      create: { key: 'setup_complete', value: 'true' },
    });

    return res.status(200).json({ status: 'ok', migrated: true, seeded: true });
  } catch (err) {
    console.error('Setup error:', err);
    return res.status(500).json({ error: 'Setup failed' });
  }
}
