import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedData = async () => {
  try {
    // Crie a Comunidade
    const comunidade = await prisma.comunidade.create({
      data: {
        nome: 'Comunidade de Nazaré',
        descricao:
          'Nazaré é um distrito rural do Município de Porto Velho (PVH) no estado de Rondônia. A comunidade está localizada às margens do Rio Madeira, em uma região popularmente conhecida como Baixo Madeira.',
        latitude: 39.6122733,
        longitude: -9.0284687,
        populacao: 15000,
      },
    });

    // Crie a Categoria
    const categoria = await prisma.categoria.create({
      data: {
        descricao: 'História',
      },
    });

    // Crie a FonteInformacao
    const fonteInformacao = await prisma.fonteInformacao.create({
      data: {
        nome: 'NAPRA',
        url: 'https://napra.org.br/territorios-de-atuacao/rondonia/nazare/',
      },
    });

    // Crie o TextoColetado
    const textoColetado = await prisma.textoColetado.create({
      data: {
        descricao:
          'A comunidade iniciou-se com a família de Seu Nanã, que como muitas outras, oferecia instrumentos para coleta de seringa, moradia e alimentação aos seringueiros que trabalhavam na floresta. Atualmente, na comunidade residem cerca de 130 famílias, totalizando 550 habitantes.',
        comunidade: {
          connect: { id: comunidade.id },
        },
        categoria: {
          connect: { id: categoria.id },
        },
        fonteInformacao: {
          connect: { id: fonteInformacao.id },
        },
      },
    });

    // Crie as TextoPalavraChave
    const palavrasChave = ['habitantes', 'seringa'];
    for (const palavra of palavrasChave) {
      await prisma.textoPalavraChave.create({
        data: {
          palavraChave: palavra,
          textoColetado: {
            connect: { id: textoColetado.id },
          },
        },
      });
    }

    console.log('Seed concluído com sucesso!');
  } catch (error) {
    console.error('Erro ao executar o seed:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seedData();
