'use server';

import { prisma } from '@/lib/prisma';

import { PromptSummary } from '@/core/domain/prompts/prompt.entity';

type SearchFormState = {
  success: boolean;
  prompts?: PromptSummary[];
  message?: string;
};

export async function searchPromptAction(
  _prev: SearchFormState,
  formData: FormData
): Promise<SearchFormState> {
  const term = String(formData.get('q')).trim();

  try {
    const prompts = await prisma.prompt.findMany({
      where: term
        ? {
            OR: [
              { title: { contains: term, mode: 'insensitive' } },
              { content: { contains: term, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
    });

    const summaries = prompts.map(({ id, title, content }) => ({
      id,
      title,
      content,
    }));

    return {
      success: true,
      prompts: summaries,
    };
  } catch (error) {
    console.error('Error searching prompts:', error);

    return {
      success: false,
      message: 'Falha ao buscar prompts. Por favor, tente novamente.',
      prompts: [],
    };
  }
}
