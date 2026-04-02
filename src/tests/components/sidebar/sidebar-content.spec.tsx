import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

import {
  SidebarContent,
  SidebarContentProps,
} from '@/components/sidebar/sidebar-content';

const pushMock = jest.fn();

const initialPrompts = [
  {
    id: '1',
    title: 'Prompt 1',
    content: 'Conteúdo do Prompt 1',
  },
];

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const makeSut = (
  { prompts = initialPrompts }: SidebarContentProps = {} as SidebarContentProps
) => {
  return render(<SidebarContent prompts={prompts} />);
};

describe('SidebarContent', () => {
  const user = userEvent.setup();

  describe('Base', () => {
    it('deveria renderizar o botao para criar um novo prompt', () => {
      makeSut({ prompts: [] });

      expect(screen.getByRole('complementary')).toBeVisible();
      expect(screen.getByRole('button', { name: 'Novo prompt' })).toBeVisible();
    });

    it('deveria renderizar a lista de prompts', () => {
      makeSut();

      expect(screen.getByText(initialPrompts[0].title)).toBeInTheDocument();
    });

    it('deveria atualizar o campo de busca ao digitar', async () => {
      makeSut();

      const searchInput = screen.getByPlaceholderText('Buscar prompts...');

      await user.type(searchInput, 'Prompt 1');

      expect(searchInput).toHaveValue('Prompt 1');
    });
  });

  describe('Colapsar / Expandir', () => {
    it('deveria iniciar expandida e exibir o botao minimizar', () => {
      makeSut();

      const aside = screen.getByRole('complementary');
      expect(aside).toBeVisible();

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      expect(collapseButton).toBeVisible();

      const expandButton = screen.queryByRole('button', {
        name: /expandir sidebar/i,
      });

      expect(expandButton).not.toBeInTheDocument();
    });

    it('deveria contrair e mostrar o botao de expandir', async () => {
      makeSut({ prompts: [] });

      const collapseButton = screen.getByRole('button', {
        name: /minimizar sidebar/i,
      });

      await user.click(collapseButton);

      const expandButton = screen.getByRole('button', {
        name: /expandir sidebar/i,
      });

      expect(expandButton).toBeInTheDocument();
      expect(collapseButton).not.toBeInTheDocument();
    });
  });

  describe('Novo prompt', () => {
    it('deveria navegar o usuario para a pagina de novo propmpt', async () => {
      makeSut({ prompts: [] });

      const newButton = screen.getByRole('button', { name: /Novo prompt/i });

      await user.click(newButton);

      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });
});
