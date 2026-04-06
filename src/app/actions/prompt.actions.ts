'use server';

import { prisma } from '@/lib/prisma';

import { PromptSummary } from '@/core/domain/prompts/prompt.entity';
import { SearchPromptsUseCase } from '@/core/application/prompts/search-prompts.use-case';
import { PrismaRepository } from '@/infra/repository/prisma.repository';

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

  const repository = new PrismaRepository(prisma);
  const useCase = new SearchPromptsUseCase(repository);

  try {
    const results = await useCase.execute(term);

    const summaries = results.map(({ id, title, content }) => ({
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
