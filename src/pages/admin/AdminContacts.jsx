import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, 
  FaPhone, 
  FaTrash, 
  FaCheck, 
  FaArchive,
  FaSearch,
  FaFilter,
  FaSync,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
  FaTimes
} from 'react-icons/fa';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { format } from 'date-fns';

// Styled Components with Dark/Blue Theme
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0f172a;
  padding: 2rem;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
`;


const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #f8fafc;
`;

const StatusContainer = styled.div`
  margin-bottom: 3.5rem;
`;

const ErrorBox = styled.div`
  padding: 1rem;
  background-color: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
  color: #fca5a5;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SuccessBox = styled.div`
  padding: 1rem;
  background-color: rgba(16, 185, 129, 0.1);
  border-left: 4px solid #10b981;
  color: #6ee7b7;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContactsListContainer = styled.div`
  background-color: #1e293b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #334155;
`;

const ListHeader = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #334155;
  background-color: #1e40af;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
`;

const Controls = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const SearchInput = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  input {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    background-color: #1e293b;
    border: 1px solid #334155;
    color: #e2e8f0;
    border-radius: 0.375rem;
    width: 200px;
    transition: all 0.2s;

    &:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
    }

    &::placeholder {
      color: #64748b;
    }
  }

  svg {
    position: absolute;
    right: 0.75rem;
    color: #64748b;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  background-color: #1e40af;
  color: #e2e8f0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e3a8a;
  }

  svg {
    color: #93c5fd;
  }
`;

const StatusFilter = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  z-index: 10;
  min-width: 200px;
`;

const StatusOption = styled.div`
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #e2e8f0;

  &:hover {
    background-color: #334155;
  }

  svg {
    color: #93c5fd;
  }
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #64748b;
`;

const ContactItem = styled(motion.div)`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #334155;
  transition: all 0.2s;
  cursor: pointer;
  background-color: #1e293b;

  &:hover {
    background-color: #334155;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ContactHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const ContactEmail = styled.div`
  font-weight: 600;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: #93c5fd;
  }
`;

const ContactDate = styled.div`
  font-size: 0.875rem;
  color: #94a3b8;
`;

const ContactStatus = styled.div`
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  ${props => props.status === 'new' && `
    background-color: rgba(59, 130, 246, 0.2);
    color: #93c5fd;
  `}

  ${props => props.status === 'reviewed' && `
    background-color: rgba(52, 211, 153, 0.2);
    color: #6ee7b7;
  `}

  ${props => props.status === 'archived' && `
    background-color: rgba(100, 116, 139, 0.2);
    color: #94a3b8;
  `}
`;

const ContactMessage = styled.div`
  color: #cbd5e1;
  line-height: 1.5;
  margin: 0.5rem 0;
`;

const ContactPhone = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.875rem;

  svg {
    color: #93c5fd;
  }
`;

const ContactActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
  }

  ${props => props.variant === 'reviewed' && `
    color: #6ee7b7;
    &:hover {
      color: #34d399;
    }
  `}

  ${props => props.variant === 'archived' && `
    color: #94a3b8;
    &:hover {
      color: #64748b;
    }
  `}

  ${props => props.variant === 'delete' && `
    color: #fca5a5;
    &:hover {
      color: #f87171;
    }
  `}
`;

const ClearButton = styled(StatusOption)`
  color: #fca5a5;
  justify-content: center;

  &:hover {
    color: #f87171;
    background-color: rgba(248, 113, 113, 0.1);
  }
`;

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const AdminContacts = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const statusOptions = [
    { value: 'new', label: 'New', icon: <FaRegStar /> },
    { value: 'reviewed', label: 'Reviewed', icon: <FaCheck /> },
    { value: 'archived', label: 'Archived', icon: <FaArchive /> }
  ];

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }
    fetchContacts();
  }, [isAuthenticated, isAdmin, navigate, statusFilter, searchTerm]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/api/contact`;
      const params = new URLSearchParams();
      
      if (statusFilter) {
        params.append('status', statusFilter);
      }
      
      if (searchTerm) {
        params.append('search', searchTerm);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await axios.get(url, { withCredentials: true });
      setContacts(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch contacts';
      setError(errorMsg);
      setLoading(false);
    }
  };

  const updateContactStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/contact/${id}`,
        { status },
        { withCredentials: true }
      );
      
      setContacts(contacts.map(contact => 
        contact._id === id ? response.data.data : contact
      ));
      setSuccess('Contact status updated successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to update contact';
      setError(errorMsg);
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/contact/${id}`, { withCredentials: true });
      setContacts(contacts.filter(contact => contact._id !== id));
      setSuccess('Contact deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to delete contact';
      setError(errorMsg);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status === statusFilter ? null : status);
    setShowStatusFilter(false);
  };

  const clearFilters = () => {
    setStatusFilter(null);
    setSearchTerm('');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <FaRegStar />;
      case 'reviewed': return <FaCheck />;
      case 'archived': return <FaArchive />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <FaSync className="animate-spin" size={32} color="#60a5fa" />
          </div>
        </Container>
      </PageContainer>
    );
  }

  const filteredContacts = contacts.filter(contact => {
    if (statusFilter && contact.status !== statusFilter) return false;
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        contact.email.toLowerCase().includes(searchLower) ||
        (contact.phone && contact.phone.toLowerCase().includes(searchLower)) ||
        contact.message.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  return (
    <PageContainer>
      <Container>
        {/* Space for header component */}
        
        

        <StatusContainer>
          {error && (
            <ErrorBox>
              <span>{error}</span>
              <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                <FaTimes />
              </button>
            </ErrorBox>
          )}

          {success && (
            <SuccessBox>
              <span>{success}</span>
              <button onClick={() => setSuccess(null)} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                <FaTimes />
              </button>
            </SuccessBox>
          )}
        </StatusContainer>

        <ContactsListContainer>
          <ListHeader>
            <ListTitle>
              {statusFilter 
                ? `${statusOptions.find(opt => opt.value === statusFilter)?.label} Messages` 
                : 'All Messages'} ({filteredContacts.length})
            </ListTitle>
            
            <Controls>
              <SearchInput>
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <FaSearch />
              </SearchInput>
              
              <div style={{ position: 'relative' }}>
                <FilterButton onClick={() => setShowStatusFilter(!showStatusFilter)}>
                  <FaFilter />
                  {statusFilter ? statusOptions.find(opt => opt.value === statusFilter)?.label : 'Filter'}
                  {showStatusFilter ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                </FilterButton>
                
                {showStatusFilter && (
                  <StatusFilter>
                    {statusOptions.map(option => (
                      <StatusOption 
                        key={option.value} 
                        onClick={() => handleStatusFilter(option.value)}
                      >
                        {option.icon}
                        {option.label}
                        {statusFilter === option.value && <FaCheck size={12} />}
                      </StatusOption>
                    ))}
                    <ClearButton onClick={clearFilters}>
                      Clear Filters
                    </ClearButton>
                  </StatusFilter>
                )}
              </div>
            </Controls>
          </ListHeader>
          
          {filteredContacts.length === 0 ? (
            <EmptyState>
              No messages found {statusFilter || searchTerm ? `with current filters` : ''}
            </EmptyState>
          ) : (
            <div>
              {filteredContacts.map((contact) => (
                <ContactItem
                  key={contact._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ContactHeader>
                    <ContactEmail>
                      <FaEnvelope />
                      {contact.email}
                    </ContactEmail>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <ContactDate>
                        {format(new Date(contact.createdAt), 'MMM dd, yyyy HH:mm')}
                      </ContactDate>
                      
                      <ContactStatus status={contact.status}>
                        <StatusBadge>
                          {getStatusIcon(contact.status)}
                          {contact.status}
                        </StatusBadge>
                      </ContactStatus>
                    </div>
                  </ContactHeader>
                  
                  {contact.phone && (
                    <ContactPhone>
                      <FaPhone />
                      {contact.phone}
                    </ContactPhone>
                  )}
                  
                  <ContactMessage>
                    {contact.message}
                  </ContactMessage>
                  
                  <ContactActions>
                    {contact.status !== 'reviewed' && (
                      <ActionButton
                        variant="reviewed"
                        onClick={() => updateContactStatus(contact._id, 'reviewed')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Mark as reviewed"
                      >
                        <FaCheck />
                      </ActionButton>
                    )}
                    
                    {contact.status !== 'archived' && (
                      <ActionButton
                        variant="archived"
                        onClick={() => updateContactStatus(contact._id, 'archived')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        title="Archive"
                      >
                        <FaArchive />
                      </ActionButton>
                    )}
                    
                    <ActionButton
                      variant="delete"
                      onClick={() => deleteContact(contact._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title="Delete"
                    >
                      <FaTrash />
                    </ActionButton>
                  </ContactActions>
                </ContactItem>
              ))}
            </div>
          )}
        </ContactsListContainer>
      </Container>
    </PageContainer>
  );
};

export default AdminContacts;