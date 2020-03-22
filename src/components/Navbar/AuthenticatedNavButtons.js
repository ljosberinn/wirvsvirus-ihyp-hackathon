import { Dropdown, Image, Button } from 'rbx';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
import { FaTasks } from 'react-icons/fa';
import { useIdentityContext } from 'react-netlify-identity';
import { NavLink } from 'react-router-dom';

import { withSuspense } from '../../hocs';
import { useNavigate } from '../../hooks';
import { getGuardian } from '../../services/GuardianService';
import Icon from '../Icon';
import Loader from '../Loader';
import styles from './AuthenticatedNavButtons.module.scss';

export default withSuspense(function AuthenticatedNavButtons() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [guardian, setGuardian] = useState(null);
  const {
    user: { id },
  } = useIdentityContext();

  useEffect(() => {
    getGuardian(id)
      .then(setGuardian)
      .catch(console.error);
  }, [id]);

  const { logoutUser } = useIdentityContext();
  const { t } = useTranslation(['navigation', 'routes']);
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/');
    setIsLoggingOut(true);

    logoutUser();
  }

  function renderAvatar() {
    if (guardian) {
      return (
        <div>
          <div className={styles.name}>{guardian.firstName} {guardian.lastName}</div>
          <div className={styles.karma}>Karma {guardian.karma}</div>
        </div>
      );
    }
  }

  return (
    <>
      <Button.Group>
        <Dropdown hoverable>
          <Dropdown.Trigger>
            <div className={styles.profile}>
              <Image.Container size={32}>
                <Image src={guardian ? guardian.img : undefined} rounded />
              </Image.Container>
              <span>
                {renderAvatar()}
              </span>
              <Icon svg={FaAngleDown} />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Content>
              <Dropdown.Item as={NavLink} to="/aufgaben">
                <Icon svg={FaTasks} />
                <span>Meine Aufgaben</span>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                color="danger"
                onClick={handleLogout}
                disabled={isLoggingOut}
              >
                <Icon svg={FaSignOutAlt} />
                <span>{t('logout')}</span>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
      {isLoggingOut && <Loader isFullPage />}
    </>
  );
});
