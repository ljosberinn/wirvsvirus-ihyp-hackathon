import { Section, Box, Title, Table, Tag, Button } from 'rbx';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TemplatedHelmet } from '../../../components';
import { withSentry } from '../../../hocs';
import { useGuardian } from '../../../hooks';
import { getAllRequests } from '../../../services/RequestService';
import styles from './TasksRoute.module.scss';

export default withSentry(function TasksRoute() {
  const { t } = useTranslation('routes');
  const guardian = useGuardian();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAllRequests()
      .then(requests => {
        setRequests(
          requests.filter(
            request =>
              request.guardian ===
              /* guardian.id*/ '574c455b-b21d-46b8-9ba4-f141a810e028',
          ),
        );
      })
      .catch(console.error);
  });

  return (
    <>
      <TemplatedHelmet>
        <title>{t('tasks')}</title>
      </TemplatedHelmet>
      <Section className={styles.container} aria-labelledby="section-title">
        <Box>
          <Title id="section-title">{t('tasks')}</Title>

          <Table fullwidth narrow striped hoverable>
            <thead>
              <tr>
                <th>Status</th>
                <th>Datum</th>
                <th>Hilfesuchender</th>
                <th>Typ</th>
                <th>Mail</th>
                <th>Addresse</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {requests.map(
                ({
                  id,
                  status,
                  date,
                  completeName,
                  task,
                  email,
                  city,
                  zip,
                  street,
                }) => (
                  <tr key={id}>
                    <td>
                      <Tag
                        color={
                          status === 'pending'
                            ? 'danger'
                            : status === 'done'
                            ? 'success'
                            : 'warning'
                        }
                      />
                    </td>
                    <td>{date}</td>
                    <td>{completeName} </td>
                    <td>{task}</td>
                    <td>{email}</td>
                    <td>{[city, zip, street].filter(Boolean).join(' ')}</td>
                    <td>
                      <Button size="small" type="button" color="info">
                        Aufgabe abgeben
                      </Button>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </Table>
        </Box>
      </Section>
    </>
  );
});
