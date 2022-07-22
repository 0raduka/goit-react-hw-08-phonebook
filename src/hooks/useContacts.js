import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { useGetAllContactsQuery } from '../redux/contacts/contactsApi';
import { createSelector } from '@reduxjs/toolkit';

export const useContacts = () => {
  const filterValue = useSelector(state => state.filter?.value);
  const normalizedFilter = filterValue.toLowerCase();

  const dataCheck = useGetAllContactsQuery();
  // console.log('DATA CHECK', dataCheck);

  const selectedContacts = useMemo(() => {
    return createSelector(
      [response => response.data, (_, filter) => filter],
      (contacts, filter) => {
        return (
          contacts?.filter(contact =>
            contact.name.toLowerCase().includes(filter)
          ) ?? []
        );
      }
    );
  }, []);

  return useGetAllContactsQuery(undefined, {
    selectFromResult(result) {
      return {
        ...result,
        filteredContatcs: selectedContacts(result, normalizedFilter),
      };
    },
  });
};
