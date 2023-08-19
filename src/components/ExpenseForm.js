import React from 'react'
import './ExpenseForm.css'
import { MdSend } from 'react-icons/md'

const ExpenseForm = ({ handleCharge, charge, handleAmount, amount, handleSubmit, edit })=>{
	return (
		<form onSubmit={handleSubmit}>
		<div className='form-center'>
			<div className='form-group'>
				<label for='charge'>지출 항목</label>
			
				<input type='text' className='form-control' id='charge' name='charge' placeholder='예) 렌트비'
					value={charge}
					onChange={handleCharge}
				></input>
			</div>
			<div className='form-group'>
				<label for='amount'>비용</label>
				<input type='number' className='form-control' id='amount' name='amount' placeholder='예) 1000'
				 	value={amount}
					onChange={handleAmount}
				></input>
			</div>
		</div>
		<button type='submit' className='btn'>
			{ edit ? '수정' : '제출' }
			<MdSend className='btn-icon'></MdSend>
		</button>
	  </form>
	)
}

export default ExpenseForm