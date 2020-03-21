import PropTypes from 'prop-types';
import { Menu } from 'rbx';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

import Icon from '../../Icon';

/**
 *
 * @param {{
 * active: boolean;
 * to: string;
 * svg: import('react-icons').IconType;
 * children: JSX.Element;
 * isExpanded: boolean;
 * onClick?: () => void;
 * }}
 */
function NavigationLink({ to, svg, children, isExpanded, onClick, active }) {
  return (
    <Menu.List.Item
      as={Link}
      to={to}
      active={active}
      tooltip={isExpanded ? undefined : children}
      tooltipPosition={isExpanded ? undefined : 'right'}
      onClick={onClick}
    >
      <Icon svg={svg} />
      <span>{children}</span>
    </Menu.List.Item>
  );
}

NavigationLink.propTypes = {
  active: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  svg: PropTypes.func.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default memo(NavigationLink);
