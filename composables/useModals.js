export const useModals = () => {
  const showAddEmployee = useState('showAddEmployee', () => false)
  const showLeaveRequest = useState('showLeaveRequest', () => false)

  return { showAddEmployee, showLeaveRequest }
}