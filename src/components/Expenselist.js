import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const Expenselist = ({ expenses, handleDelete, handleEdit, clearItems })=>{
	
	return (
	  <>
		<ul className='list'>
			{expenses.map(expense=>{
				return (
					<ExpenseItem 
						expense={expense}
						key={expense.id}
						handleDelete={handleDelete}
						handleEdit={handleEdit}
					/>
				)
			})}
		</ul>
			{expenses.length > 0 && (
				
				<button className='btn'
						onClick={clearItems}
				>
					목록지우기
						<MdDelete className='btn-icon'></MdDelete>
				</button>
			)}
	  </>
	)

}

export default Expenselist