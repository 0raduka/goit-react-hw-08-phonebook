import React from 'react';
import AddContactForm from 'components/form';
import Filter from 'components/filter';
import RenderContacts from 'components/renderContacts';
import { useGetAllContactsQuery } from 'redux/contacts/contactsApi';
import Section from 'components/section';

const Contacts = () => {
  // console.log(store);

  const receivedData = useGetAllContactsQuery();
  const data = receivedData?.data;

  return (
    <>
      <Section>
        <AddContactForm />
        {data?.length > 0 ? <Filter /> : ''}
        {data?.length > 0 ? (
          <RenderContacts />
        ) : (
          'There are no contacts at this moment'
        )}
      </Section>
    </>
  );
};

export default Contacts;
