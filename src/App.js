import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';

// Global styles for mobile responsiveness
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Prevent zoom on input focus on iOS */
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    select, textarea, input[type="text"], input[type="password"],
    input[type="datetime"], input[type="datetime-local"],
    input[type="date"], input[type="month"], input[type="time"],
    input[type="week"], input[type="number"], input[type="email"],
    input[type="url"], input[type="search"], input[type="tel"],
    input[type="color"] {
      font-size: 16px;
    }
  }
`;

// Replace with your actual Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzXOUU3IC8ZvF9GIzR5htghftWDehwBTc7mBg42MpPTZ8mn0DqUG_hf9I2GT7Bxc_WbVA/exec';

// Styled Components
const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

// Header/Navbar Styles
const Navbar = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 15px 0;
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 0 15px;
  }
`;

const Logo = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  color: #667eea;
  display: flex;
  align-items: center;
  gap: 10px;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.2rem;
  
  @media (max-width: 768px) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const NavMenu = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
    gap: 8px;
  }
`;

const NavButton = styled.button`
  padding: 10px 20px;
  background: ${props => props.active ? '#667eea' : 'transparent'};
  color: ${props => props.active ? 'white' : '#667eea'};
  border: 2px solid #667eea;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 13px;
    flex: 1;
    min-width: 100px;
  }
`;

// Main Content Container
const Container = styled.div`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

const PageHeader = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 40px;
  
  @media (max-width: 768px) {
    margin-bottom: 25px;
  }
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (max-width: 480px) {
    font-size: 1.7rem;
  }
`;

const PageSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 10px;
  }
`;

// Footer Styles
const Footer = styled.footer`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 30px 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 0 15px;
  }
`;

const FooterSection = styled.div`
  h3 {
    color: #667eea;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  
  p, li {
    color: #ccc;
    line-height: 1.6;
    margin-bottom: 8px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
`;

const FooterBottom = styled.div`
  text-align: center;
  padding: 20px;
  border-top: 1px solid rgba(255,255,255,0.1);
  margin-top: 30px;
  color: #999;
  font-size: 0.9rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin: 20px 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  @media (max-width: 768px) {
    padding: 20px;
    margin: 15px 0;
    border-radius: 12px;
  }
  
  @media (max-width: 480px) {
    padding: 15px;
    margin: 10px 0;
  }
`;

const StatusCard = styled(Card)`
  background: linear-gradient(45deg, ${props => props.color || '#4CAF50'}, ${props => props.colorLight || '#45a049'});
  color: white;
  text-align: center;
`;

const StatusNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StatusGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StudentList = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  max-height: 400px;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 0;
    max-height: 350px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    margin: 10px 0;
    max-height: 300px;
  }
`;

const StudentItem = styled.div`
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 4px solid #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 12px;
    margin: 8px 0;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    margin: 6px 0;
  }
`;

const InputSection = styled.div`
  margin-bottom: 30px;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    padding: 14px 15px;
    font-size: 16px;
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  @media (max-width: 768px) {
    padding: 14px 25px;
    font-size: 16px;
    width: 100%;
  }
`;

const BalanceCard = styled(Card)`
  background: linear-gradient(45deg, #4CAF50, #45a049);
  color: white;
  text-align: center;
`;

const BalanceAmount = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin: 10px 0;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const StudentInfo = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
  
  @media (max-width: 768px) {
    padding: 15px;
    margin: 15px 0;
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    margin: 10px 0;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    margin: 8px 0;
  }
`;

const Label = styled.span`
  font-weight: bold;
  color: #666;
`;

const Value = styled.span`
  color: #333;
`;

const TransactionHistory = styled.div`
  margin-top: 30px;
`;

const TransactionItem = styled.div`
  background: #f8f9fa;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  border-left: 4px solid ${props => 
    props.type === 'Recharge' ? '#4CAF50' : 
    props.type === 'Bus Board' ? '#2196F3' : 
    props.type === 'Cafe Payment' ? '#FF5722' : 
    props.type === 'Attendance' ? '#9C27B0' : '#666'
  };
  
  @media (max-width: 768px) {
    padding: 12px;
    margin: 8px 0;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    margin: 6px 0;
  }
`;

const TransactionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const TransactionType = styled.span`
  font-weight: bold;
  color: ${props => 
    props.type === 'Recharge' ? '#4CAF50' : 
    props.type === 'Bus Board' ? '#2196F3' : 
    props.type === 'Cafe Payment' ? '#FF5722' : 
    props.type === 'Attendance' ? '#9C27B0' : '#666'
  };
`;

const TransactionAmount = styled.span`
  font-weight: bold;
  color: ${props => props.amount > 0 ? '#4CAF50' : props.amount < 0 ? '#f44336' : '#666'};
`;

const TransactionDate = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const ErrorMessage = styled.div`
  background: #ffebee;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  margin: 10px 0;
  border-left: 4px solid #f44336;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  color: #666;
  font-style: italic;
`;

const RefreshButton = styled(Button)`
  background: linear-gradient(45deg, #FF9800, #FF5722);
  margin: 10px;
  
  @media (max-width: 768px) {
    margin: 10px 0;
    width: 100%;
  }
`;

function App() {
  const [currentPage, setCurrentPage] = useState('balance');
  const [studentId, setStudentId] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [busStatus, setBusStatus] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudentData = async () => {
    if (!studentId.trim()) {
      setError('Please enter a valid Student ID');
      return;
    }

    setLoading(true);
    setError('');
    setStudentData(null);
    setTransactions([]);

    try {
      // Fetch student data
      const studentResponse = await axios.get(GOOGLE_SCRIPT_URL, {
        params: {
          action: 'get_student_data_by_id',
          student_id: studentId.trim()
        }
      });

      if (studentResponse.data.error) {
        setError(studentResponse.data.error);
        return;
      }

      setStudentData(studentResponse.data);

      // Fetch transaction history using the card UID from student data
      const transactionResponse = await axios.get(GOOGLE_SCRIPT_URL, {
        params: {
          action: 'get_student_transactions',
          card_uid: studentResponse.data.cardUid
        }
      });

      if (transactionResponse.data.success) {
        setTransactions(transactionResponse.data.transactions || []);
      }

    } catch (err) {
      setError('Failed to fetch data. Please check your connection and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusStatus = async () => {
    setLoading(true);
    setError('');
    setBusStatus(null);

    try {
      const response = await axios.get(GOOGLE_SCRIPT_URL, {
        params: { action: 'get_bus_status' }
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setBusStatus(response.data);
    } catch (err) {
      setError('Failed to fetch bus status. Please check your connection and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAttendanceStatus = async () => {
    setLoading(true);
    setError('');
    setAttendanceStatus(null);

    try {
      const response = await axios.get(GOOGLE_SCRIPT_URL, {
        params: { action: 'get_attendance_status' }
      });

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setAttendanceStatus(response.data);
    } catch (err) {
      setError('Failed to fetch attendance status. Please check your connection and try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setError('');
    
    if (page === 'bus') {
      fetchBusStatus();
    } else if (page === 'attendance') {
      fetchAttendanceStatus();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    if (amount === 0) return '—';
    return amount > 0 ? `+${amount} Taka` : `-${Math.abs(amount)} Taka`;
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  return (
    <AppContainer>
      <GlobalStyle />
      {/* Navbar */}
      <Navbar>
        <NavContent>
          <Logo>
            <LogoIcon>UT</LogoIcon>
            UniTap
          </Logo>
          <NavMenu>
            <NavButton 
              active={currentPage === 'balance'} 
              onClick={() => handlePageChange('balance')}
            >
              Check Balance
            </NavButton>
            <NavButton 
              active={currentPage === 'bus'} 
              onClick={() => handlePageChange('bus')}
            >
              Bus Status
            </NavButton>
            <NavButton 
              active={currentPage === 'attendance'} 
              onClick={() => handlePageChange('attendance')}
            >
              Attendance
            </NavButton>
          </NavMenu>
        </NavContent>
      </Navbar>

      {/* Main Content */}
      <Container>
        <PageHeader>
          <PageTitle>Welcome to UniTap</PageTitle>
          <PageSubtitle>Your Smart Campus Payment & Tracking System</PageSubtitle>
        </PageHeader>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {loading && <LoadingMessage>Loading...</LoadingMessage>}

        {/* Balance Check Page */}
        {currentPage === 'balance' && (
          <Card>
            <InputSection>
              <h3>Enter Your Student ID</h3>
              <InputGroup>
                <Input
                  type="text"
                  placeholder="Enter your Student ID (Ex. 21301429)"
                  value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && fetchStudentData()}
              />
              <Button onClick={fetchStudentData} disabled={loading}>
                {loading ? 'Loading...' : 'Check Balance'}
              </Button>
            </InputGroup>
          </InputSection>

          {studentData && (
            <>
              <BalanceCard>
                <h2>Current Balance</h2>
                <BalanceAmount>{studentData.balance} Taka</BalanceAmount>
                <p>Available for spending</p>
              </BalanceCard>

              <StudentInfo>
                <h3>Account Information</h3>
                <InfoRow>
                  <Label>Student ID:</Label>
                  <Value>{studentData.studentId}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Card UID:</Label>
                  <Value>{studentData.cardUid}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Registration Date:</Label>
                  <Value>{formatDate(studentData.registrationDate)}</Value>
                </InfoRow>
                <InfoRow>
                  <Label>Account Status:</Label>
                  <Value>{studentData.status}</Value>
                </InfoRow>
              </StudentInfo>

              {transactions.length > 0 && (
                <TransactionHistory>
                  <h3>Recent Transactions</h3>
                  {transactions.slice(0, 10).map((transaction, index) => (
                    <TransactionItem key={index} type={transaction.type}>
                      <TransactionHeader>
                        <TransactionType type={transaction.type}>
                          {transaction.type}
                        </TransactionType>
                        <TransactionAmount amount={transaction.amount}>
                          {formatAmount(transaction.amount)}
                        </TransactionAmount>
                      </TransactionHeader>
                      <TransactionDate>
                        {formatDate(transaction.date)}
                      </TransactionDate>
                      <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
                        {transaction.description}
                        {transaction.balance !== null && ` • Balance: ${transaction.balance} Taka`}
                      </div>
                    </TransactionItem>
                  ))}
                </TransactionHistory>
              )}
            </>
          )}
        </Card>
      )}

      {/* Bus Status Page */}
      {currentPage === 'bus' && (
        <>
          <StatusGrid>
            <StatusCard color="#2196F3" colorLight="#1976D2">
              <h2>Bus Occupancy</h2>
              <StatusNumber>
                {busStatus ? busStatus.occupiedSeats : '?'}/{busStatus ? busStatus.totalSeats : '50'}
              </StatusNumber>
              <p>Students on board</p>
            </StatusCard>
            <StatusCard color="#4CAF50" colorLight="#388E3C">
              <h2>💺 Available Seats</h2>
              <StatusNumber>{busStatus ? busStatus.availableSeats : '?'}</StatusNumber>
              <p>Seats remaining</p>
            </StatusCard>
          </StatusGrid>

          <Card>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <h3>👥 Current Passengers</h3>
              <RefreshButton onClick={fetchBusStatus}>
                Refresh
              </RefreshButton>
            </div>
            
            {busStatus && busStatus.currentPassengers && busStatus.currentPassengers.length > 0 ? (
              <StudentList>
                {busStatus.currentPassengers.map((passenger, index) => (
                  <StudentItem key={index}>
                    <div>
                      <strong>{passenger.studentInfo.studentId}</strong>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        Card: {passenger.studentInfo.cardUid}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        Boarded: {formatTime(passenger.boardTime)}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                        Balance: {passenger.studentInfo.balance} Taka
                      </div>
                    </div>
                  </StudentItem>
                ))}
              </StudentList>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {busStatus ? 'No students currently on the bus' : 'Click refresh to load bus status'}
              </div>
            )}
            
            {busStatus && (
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '20px' }}>
                Last updated: {formatDate(busStatus.lastUpdated)}
              </div>
            )}
          </Card>
        </>
      )}

      {/* Attendance Page */}
      {currentPage === 'attendance' && (
        <>
          <StatusGrid>
            <StatusCard color="#9C27B0" colorLight="#7B1FA2">
              <h2>👥 Total Students</h2>
              <StatusNumber>{attendanceStatus ? attendanceStatus.totalStudents : '?'}</StatusNumber>
              <p>Registered students</p>
            </StatusCard>
            <StatusCard color="#4CAF50" colorLight="#388E3C">
              <h2>Present Today</h2>
              <StatusNumber>{attendanceStatus ? attendanceStatus.presentCount : '?'}</StatusNumber>
              <p>{attendanceStatus ? `${attendanceStatus.attendancePercentage}% attendance` : 'Attendance rate'}</p>
            </StatusCard>
          </StatusGrid>

          <Card>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              <h3>Today's Attendance ({attendanceStatus ? formatDate(attendanceStatus.date).split(',')[0] : 'Today'})</h3>
              <RefreshButton onClick={fetchAttendanceStatus}>
                Refresh
              </RefreshButton>
            </div>
            
            {attendanceStatus && attendanceStatus.presentStudents && attendanceStatus.presentStudents.length > 0 ? (
              <StudentList>
                {attendanceStatus.presentStudents.map((student, index) => (
                  <StudentItem key={index}>
                    <div>
                      <strong>{student.studentInfo.studentId}</strong>
                      <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                        Card: {student.studentInfo.cardUid}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.9rem' }}>
                        {formatTime(student.attendanceTime)}
                      </div>
                      <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                        {student.status}
                      </div>
                    </div>
                  </StudentItem>
                ))}
              </StudentList>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                {attendanceStatus ? 'No attendance recorded today' : 'Click refresh to load attendance'}
              </div>
            )}
            
            {attendanceStatus && (
              <div style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '20px' }}>
                Last updated: {formatDate(attendanceStatus.lastUpdated)}
              </div>
            )}
          </Card>
        </>
      )}
      </Container>

      {/* Footer */}
      <Footer>
        <FooterContent>
          <FooterSection>
            <h3>UniTap</h3>
            <p>Your smart campus payment and tracking solution. Seamlessly integrate RFID technology with modern web interfaces.</p>
          </FooterSection>
          
          <FooterSection>
            <h3>Features</h3>
            <ul>
              <li>Balance Management</li>
              <li>Bus Payment System</li>
              <li>Cafe Purchases</li>
              <li>Attendance Tracking</li>
              <li>Real-time Updates</li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Support</h3>
            <ul>
              <li>Student Services</li>
              <li>Technical Support</li>
              <li>Account Management</li>
              <li>System Status</li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact</h3>
            <p>unitap@gmail.com</p>
          </FooterSection>
        </FooterContent>
        
        <FooterBottom>
          <p>&copy; 2025 UniTap - Smart Campus Solutions. All rights reserved.</p>
        </FooterBottom>
      </Footer>
    </AppContainer>
  );
}

export default App;