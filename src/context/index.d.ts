import { LoadableComponent } from '@loadable/component';
import { Component } from 'react';
import { IconType } from 'react-icons';

interface Route {
  routerPath: string;
  clientPath: string;
  component: LoadableComponent;
  title: string;
  visibleInDrawerNav: boolean;
  icon?: IconType;
}

export function useNavigationContext(): {
  PreloadingLink: Component<{ to: Route }>;
  routes: {
    [key: string]: Route;
  };
};

export function NavigationProvider({ children }): JSX.Element;
