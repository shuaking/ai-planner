/* eslint-disable no-console */
const { PrismaClient, PlanStatus } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // Seed default templates
  const templates = [
    { slug: 'welcome-email', name: 'Welcome Email', content: 'Hi {{name}}, welcome to our app!' },
    { slug: 'password-reset', name: 'Password Reset', content: 'Click here to reset your password: {{link}}' },
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { slug: t.slug },
      update: { name: t.name, content: t.content },
      create: t,
    });
  }

  // Mark seed/setup complete via Setting table
  await prisma.setting.upsert({
    where: { key: 'setup_complete' },
    update: { value: 'true' },
    create: { key: 'setup_complete', value: 'true' },
  });

  // Create a demo user, project, plan and sections
  const user = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: { email: 'demo@example.com', name: 'Demo User' },
  });

  const project = await prisma.project.upsert({
    where: { ownerId_slug: { ownerId: user.id, slug: 'demo-project' } },
    update: { name: 'Demo Project' },
    create: {
      ownerId: user.id,
      name: 'Demo Project',
      slug: 'demo-project',
      description: 'A sample project created by the seed script.',
    },
  });

  const plan = await prisma.plan.upsert({
    where: { id: 'seed-plan-1' },
    update: { title: 'Getting Started', status: PlanStatus.ACTIVE, projectId: project.id },
    create: {
      id: 'seed-plan-1',
      title: 'Getting Started',
      status: PlanStatus.ACTIVE,
      projectId: project.id,
    },
  });

  const sections = [
    { id: 'seed-plan-1-sec1', title: 'Overview', content: 'This plan will help you get started.', order: 1 },
    { id: 'seed-plan-1-sec2', title: 'Steps', content: '1) Do this. 2) Do that. 3) You are done!', order: 2 },
  ];

  for (const s of sections) {
    await prisma.planSection.upsert({
      where: { id: s.id },
      update: { title: s.title, content: s.content, order: s.order, planId: plan.id },
      create: { id: s.id, planId: plan.id, title: s.title, content: s.content, order: s.order },
    });
  }

  console.log('Seed complete');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
