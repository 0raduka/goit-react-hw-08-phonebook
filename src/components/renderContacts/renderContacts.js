import { useDeleteContactMutation } from '../../redux/contacts/contactsApi';
import s from './renderContact.module.css';
import { useContacts } from 'hooks/useContacts';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const RenderContacts = () => {
  const { filteredContatcs, error, isLoading } = useContacts();
  const [deleteContact, result] = useDeleteContactMutation();

  return (
    <>
      <p className={s.text}>Contacts</p>
      {error && <p>Error! Please, reload a page!</p>}
      {isLoading ? (
        <p>Contacts are loading, please wait.</p>
      ) : (
        <ListGroup>
          {filteredContatcs?.map(({ id, name, number }) => (
            <ListGroup.Item key={id}>
              <p>
                <span className="boldFont">{name}</span> : ( {number} )
                <Button
                  className="m-2"
                  variant="danger"
                  type="button"
                  disabled={result.isLoading}
                  onClick={() => deleteContact(id)}
                >
                  Пшeл от сюда
                </Button>
              </p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      {result.isLoading && <p>В процесе анигиляции...</p>}
    </>
  );
};

export default RenderContacts;
