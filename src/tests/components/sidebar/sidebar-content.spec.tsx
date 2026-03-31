import { render, screen } from '@/lib/test-utils';
import userEvent from '@testing-library/user-event';

import { SidebarContent } from '@/components/sidebar/sidebar-content';

const pushMock = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

const makeSut = () => {
  return render(<SidebarContent />);
};

describe('SidebarContent', () => {
  const user = userEvent.setup();

  it('deveria renderizar o botao para criar um novo prompt', () => {
    makeSut();

    expect(screen.getByRole('complementary')).toBeVisible();

    expect(
      screen.getByRole('button', { name: /novo prompt/i })
    ).toBeInTheDocument();
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
      makeSut();

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
      makeSut();

      const newButton = screen.getByRole('button', { name: /Novo prompt/i });

      await user.click(newButton);

      expect(pushMock).toHaveBeenCalledWith('/new');
    });
  });
});
