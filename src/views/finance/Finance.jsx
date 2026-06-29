import React, { useEffect, useState } from 'react'
import axios from 'axios'

import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
} from '@coreui/react'


const Finance = () => {
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [visible, setVisible] = useState(false)
const [editingAccount, setEditingAccount] = useState(null)
const [transactionVisible, setTransactionVisible] = useState(false)



const [newTransaction, setNewTransaction] = useState({
  account_id: '',
  transaction_type: 'Credit',
  amount: '',
  description: '',
})


const [newAccount, setNewAccount] = useState({
  account_name: '',
  account_type: '',
  balance: '',
})
  

  useEffect(() => {
  axios
    .get('http://localhost:5000/api/accounts')
    .then((res) => setAccounts(res.data))
    .catch((err) => console.log(err))

  axios
    .get('http://localhost:5000/api/transactions')
    .then((res) => setTransactions(res.data))
    .catch((err) => console.log(err))
}, [])

  
  // Remove duplicate account names for display
const uniqueAccounts = [
  ...new Map(
    accounts.map(acc => [acc.account_name, acc])
  ).values()
]

// Calculate totals using unique accounts
const totalBalance = uniqueAccounts.reduce(
  (sum, acc) => sum + Number(acc.balance || 0),
  0
)

const totalAccounts = uniqueAccounts.length

const totalIncome = transactions
  .filter((t) => t.transaction_type === 'Credit')
  .reduce((sum, t) => sum + Number(t.amount || 0), 0)

const totalExpenses = transactions
  .filter((t) => t.transaction_type === 'Debit')
  .reduce((sum, t) => sum + Number(t.amount || 0), 0)

const addAccount = async () => {
  try {
    const res = await axios.post(
      'http://localhost:5000/api/accounts',
      newAccount
    )

    const account = {
      account_id: res.data.accountId,
      ...newAccount,
    }

    setAccounts([...accounts, account])

    setNewAccount({
      account_name: '',
      account_type: '',
      balance: '',
    })

    setVisible(false)

    alert('Account added successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to add account')
  }
}



const deleteAccount = async (id) => {
  const confirmDelete = window.confirm(
    'Are you sure you want to delete this account?'
  )

  if (!confirmDelete) return

  try {
    await axios.delete(
      `http://localhost:5000/api/accounts/${id}`
    )

    setAccounts(
      accounts.filter(
        (acc) => acc.account_id !== id
      )
    )

    alert('Account deleted successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to delete account')
  }
}

const editAccount = (account) => {
  setEditingAccount(account)

  setNewAccount({
    account_name: account.account_name || '',
    account_type: account.account_type || '',
    balance: account.balance || '',
  })

  setVisible(true)
}


const updateAccount = async () => {
  try {
    await axios.put(
      `http://localhost:5000/api/accounts/${editingAccount.account_id}`,
      newAccount
    )

    setAccounts(
      accounts.map((acc) =>
        acc.account_id === editingAccount.account_id
          ? {
              ...acc,
              ...newAccount,
            }
          : acc
      )
    )

    setVisible(false)
    setEditingAccount(null)

    alert('Account updated successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to update account')
  }
}


const addTransaction = async () => {
  try {
    await axios.post(
      'http://localhost:5000/api/transactions',
      newTransaction
    )

    const txRes = await axios.get(
      'http://localhost:5000/api/transactions'
    )

    setTransactions(txRes.data)

    const accRes = await axios.get(
      'http://localhost:5000/api/accounts'
    )

    setAccounts(accRes.data)

    setTransactionVisible(false)

    setNewTransaction({
      account_id: '',
      transaction_type: 'Credit',
      amount: '',
      description: '',
    })

    alert('Transaction added successfully')
  } catch (error) {
    console.error(error)
    alert('Failed to add transaction')
  }
}


  return (
    <>
      <CRow className="mb-4">

<CCol md={3}>
  <CCard className="text-white bg-info">
    <CCardBody>
      <h6>Total Corporate Balance</h6>
      <h2>GHS {totalBalance.toLocaleString()}</h2>
    </CCardBody>
  </CCard>
</CCol>


        <CCol md={3}>
  <CCard className="text-white bg-primary">
    <CCardBody>
      <h6>Total Accounts</h6>
      <h2>{totalAccounts}</h2>
    </CCardBody>
  </CCard>
</CCol>

<CCol md={3}>
  <CCard className="text-white bg-success">
    <CCardBody>
      <h6>Total Income</h6>
      <h2>GHS {totalIncome.toLocaleString()}</h2>
    </CCardBody>
  </CCard>
</CCol>

<CCol md={3}>
  <CCard className="text-white bg-danger">
    <CCardBody>
      <h6>Total Expenses</h6>
      <h2>GHS {totalExpenses.toLocaleString()}</h2>
    </CCardBody>
  </CCard>
</CCol>

        

      </CRow>

      <CCard>
  <CCardHeader className="d-flex justify-content-between">
  <strong>Corporate Accounts</strong>

  <CButton
    color="primary"
    onClick={() => {
      setEditingAccount(null)

      setNewAccount({
        account_name: '',
        account_type: '',
        balance: '',
      })

      setVisible(true)
    }}
  >
    + Add Account
  </CButton>
</CCardHeader>

  <CCardBody>
    <CTable hover responsive>

      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>ID</CTableHeaderCell>
          <CTableHeaderCell>Account Name</CTableHeaderCell>
          <CTableHeaderCell>Type</CTableHeaderCell>
          <CTableHeaderCell>Balance</CTableHeaderCell>
          <CTableHeaderCell>Actions</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

    

      <CTableBody>
  {uniqueAccounts.map((account) => (
    <CTableRow key={account.account_id}>
      <CTableDataCell>{account.account_id}</CTableDataCell>

      <CTableDataCell>
        {account.account_name}
      </CTableDataCell>

      <CTableDataCell>
        {account.account_type}
      </CTableDataCell>

      <CTableDataCell>
        GHS {Number(account.balance).toLocaleString()}
      </CTableDataCell>

      <CTableDataCell>
        <CButton
  color="info"
  size="sm"
  className="me-2"
  onClick={() => editAccount(account)}
>
  Edit
</CButton>

<CButton
  color="danger"
  size="sm"
  onClick={() =>
    deleteAccount(account.account_id)
  }
>
  Delete
</CButton>
      </CTableDataCell>

    </CTableRow>
  ))}
</CTableBody>

    </CTable>
  </CCardBody>
</CCard>

<CCard className="mt-4">
 <CCardHeader className="d-flex justify-content-between">
  <strong>TRANSACTION LEDGER</strong>

  <CButton
    color="success"
    onClick={() => setTransactionVisible(true)}
  >
    + Add Transaction
  </CButton>
</CCardHeader>

  <CCardBody>
    <CTable hover responsive>

      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Date</CTableHeaderCell>
          <CTableHeaderCell>Account</CTableHeaderCell>
          <CTableHeaderCell>Type</CTableHeaderCell>
          <CTableHeaderCell>Amount</CTableHeaderCell>
          <CTableHeaderCell>Description</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {transactions.map((t) => (
          <CTableRow key={t.transaction_id}>

            <CTableDataCell>
              {new Date(t.transaction_date).toLocaleDateString()}
            </CTableDataCell>

            <CTableDataCell>
              {t.account_name}
            </CTableDataCell>

            <CTableDataCell>
              {t.transaction_type}
            </CTableDataCell>

            <CTableDataCell>
              GHS {Number(t.amount).toLocaleString()}
            </CTableDataCell>

            <CTableDataCell>
              {t.description}
            </CTableDataCell>

          </CTableRow>
        ))}
      </CTableBody>

    </CTable>
  </CCardBody>
</CCard>

<CModal
  visible={visible}
  onClose={() => setVisible(false)}
>
  <CModalHeader>
    <CModalTitle>
      {editingAccount ? 'Edit Account' : 'Add Account'}
    </CModalTitle>
  </CModalHeader>

  <CModalBody>

    <CFormInput
      className="mb-3"
      placeholder="Account Name"
      value={newAccount.account_name}
      onChange={(e) =>
        setNewAccount({
          ...newAccount,
          account_name: e.target.value,
        })
      }
    />

    <CFormInput
      className="mb-3"
      placeholder="Account Type"
      value={newAccount.account_type}
      onChange={(e) =>
        setNewAccount({
          ...newAccount,
          account_type: e.target.value,
        })
      }
    />

    <CFormInput
      placeholder="Balance"
      type="number"
      value={newAccount.balance}
      onChange={(e) =>
        setNewAccount({
          ...newAccount,
          balance: e.target.value,
        })
      }
    />

  </CModalBody>

  <CModalFooter>

    <CButton
      color="secondary"
      onClick={() => setVisible(false)}
    >
      Cancel
    </CButton>

    <CButton
  color="success"
  onClick={
    editingAccount
      ? updateAccount
      : addAccount
  }
>
  {editingAccount
    ? 'Update Account'
    : 'Save Account'}
</CButton>

  </CModalFooter>
</CModal>

<CModal
  visible={transactionVisible}
  onClose={() => setTransactionVisible(false)}
>
  <CModalHeader>
    <CModalTitle>
      Add Transaction
    </CModalTitle>
  </CModalHeader>

  <CModalBody>

    <CFormSelect
      className="mb-3"
      value={newTransaction.account_id}
      onChange={(e) =>
        setNewTransaction({
          ...newTransaction,
          account_id: e.target.value,
        })
      }
    >
      <option value="">
        Select Account
      </option>

      {accounts.map((account) => (
        <option
          key={account.account_id}
          value={account.account_id}
        >
          {account.account_name}
        </option>
      ))}
    </CFormSelect>

    <CFormSelect
      className="mb-3"
      value={newTransaction.transaction_type}
      onChange={(e) =>
        setNewTransaction({
          ...newTransaction,
          transaction_type: e.target.value,
        })
      }
    >
      <option value="Credit">
        Credit
      </option>

      <option value="Debit">
        Debit
      </option>
    </CFormSelect>

    <CFormInput
      type="number"
      placeholder="Amount"
      className="mb-3"
      value={newTransaction.amount}
      onChange={(e) =>
        setNewTransaction({
          ...newTransaction,
          amount: e.target.value,
        })
      }
    />

    <CFormInput
      placeholder="Description"
      value={newTransaction.description}
      onChange={(e) =>
        setNewTransaction({
          ...newTransaction,
          description: e.target.value,
        })
      }
    />

  </CModalBody>

  <CModalFooter>

    <CButton
      color="secondary"
      onClick={() =>
        setTransactionVisible(false)
      }
    >
      Cancel
    </CButton>

    <CButton
      color="success"
      onClick={addTransaction}
    >
      Save Transaction
    </CButton>

  </CModalFooter>
</CModal>




</>
)
}


     

export default Finance