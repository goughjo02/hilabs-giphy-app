import { FunctionComponent, type ReactNode } from "react";
import { render as rttlRender } from "@testing-library/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { FavoritesProvider } from "@/components/providers/favorites-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

type UI = Parameters<typeof rttlRender>[0];
type Options = Parameters<typeof rttlRender>[1];

const BaseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </FavoritesProvider>
    </ThemeProvider>
  );
};

export const render = (
  ui: UI,
  options?: Omit<Options, "wrapper"> & {
    extraWrappers?: Array<(args: { children: ReactNode }) => ReactNode>;
  }
) => {
  const extraWrappers = options?.extraWrappers ?? [];
  const wrapper: FunctionComponent<{
    children: ReactNode;
  }> = extraWrappers.reduce((acc, Wrapper) => {
    const newComponent = ({ children }: { children: ReactNode }) => (
      <Wrapper>{acc({ children })}</Wrapper>
    );
    newComponent.displayName = "Wrapper";
    return newComponent;
  }, BaseWrapper);
  wrapper.displayName = "TestWrapper";

  return rttlRender(ui, {
    ...options,
    wrapper,
  });
};
