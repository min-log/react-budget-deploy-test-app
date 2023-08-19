import { useState } from "react" //리엑트에서 Component 가져온다.
import "./App.css"
import ExpenseForm from "./components/ExpenseForm"
import Expenselist from "./components/Expenselist"
import Alert from "./components/Alert"
import { type } from "@testing-library/user-event/dist/type"



const App = ()=>{

	const [expenses, setExpenses] = useState([
		{ id: 1, charge: "렌트비", amount: 16000 },
		{ id: 2, charge: "교통비", amount: 20000 },
		{ id: 3, charge: "숙박비", amount: 200000 },
		{ id: 4, charge: "식비", amount: 56000 }
	]);
	
	
	// 아이템 입력할때 값을 기억해줄 State
	const [charge,setCharge] = useState("");
	const [amount, setAmount] = useState(0);
	
	// Alert state
	const [alert, setAlert] = useState([
		{ show: false }
	])


	// 수정을 위한 state	
	const [id, setId] = useState('');
	const [edit,setEdit] = useState(false);


	const handleAlert = ({type,text})=>{
		// 생성
		setAlert({show:true,type,text});
		// 제거
		setTimeout(()=>{
			setAlert({show:false})
		},5000)
	}


	// 아이템 생성	
	// 타이핑 시 값이 변경되도록 설정 
	const handleCharge = (e) => {
		console.log(e.target.value);
		setCharge(e.target.value)

	}

	const handleAmount = (e) => {
		setAmount(e.target.valueAsNumber); // value 숫자 타입으로 가져오기 
	}

	const handleSubmit = (e)=>{
		e.preventDefault();// 기본 동작 막기 
		
		if (charge !== "" && amount > 0){
			//수정일때 조건 추가 
			if (edit) {
				// 수정일시 
				const newExpense = expenses.map(item=>{
					return item.id === id ? {...item,charge,amount} : item
				});

				setExpenses(newExpense)
				setEdit(false);
				handleAlert({ type: "success", text:"수정이 완료되었습니다."});
			} else {
				// 초기 생성

				// 저장할 객체 생성
				// crypto.randomUUID 랜덤 번호 생성
				const newExpense = { id: crypto.randomUUID(), charge: charge, amount: amount };
				//불변성 지켜주기 위해 새로운 리스트 객체 생성( 복사하여 사용하지 않으면 원본 데이터가 변경 )
				// 만약 원본데이터를 참조 하고 있는 다른 데이터에서 문제가 생기지 않을 수 있다. 
				// 화면을 업데이트 할때 불변성을 지켜서 값을 이전값과 비교해서 변경된 사항을 확인 후 업데이트 .
				// 얖은 복하하여 ... 나열
				const newExpenses = [...expenses, newExpense];
				setExpenses(newExpenses);
				handleAlert({ type:"success", text:"아이템이 생성되었습니다." });
			}

			
			// 초기화
			setCharge("");
			setAmount(0);

		}else{
			console.log("error");
			handleAlert({ type: "danger", text: "아이템이 생성이 실패 했습니다." });
		}
		
		
	}


	// 수정 기능 
	const handleEdit = id =>{
		const expenseOne = expenses.find(item => item.id === id);
		const { charge, amount } = expenseOne;
		setId(id);
		setCharge(charge)
		setAmount(amount);
		setEdit(true);
	}


	// 클릭 이벤트 함수 생성
	// 아이템 제거
	const handleDelete = (id) => {
		const newExpenses = expenses.filter(expect=> expect.id !== id);
		setExpenses(newExpenses);
		handleAlert({ type: "success", text: "아이템이 삭제 되었습니다." });
	}


	//모두 제거 
	const clearItems = ()=>{
		setExpenses([]); 
		handleAlert({ type:"success",text:"전체 리스트가 삭제되었습니다."});
	}


	return (
		<main className="main-container">
			{ alert.show ? <Alert type={alert.type} text={alert.text} /> : null }
			
			<h1>예산 계산기</h1>
			<div style={{width: '100%', background:'white',padding:'1rem'}}>
				{/* Expense Form */}
				<ExpenseForm 
					handleCharge={handleCharge} 
					charge={charge} 
					handleAmount={handleAmount} amount={amount}
					handleSubmit={handleSubmit} 
					edit={edit}/>
			</div>
			<div style={{ width: '100%', background: 'white', padding: '1rem' }}>
				{/* Expense list */}
				<Expenselist 
					expenses={expenses} handleDelete={handleDelete}
					handleEdit={handleEdit} 
					clearItems={clearItems} />
			</div>
			<div style={{display:'flex', justifyContent:'end',marginTop:'1rem'}}>
				<p>
					총 지출:
					{ expenses.reduce((acc,curr)=>{ //배열 내부 계산하여 반환
						return (acc += curr.amount)
					},0)}
					<span>원</span>
				</p>
			</div>
		</main>
	)


}

//내보내기 default - 메인으로 내보냄
export default App;