import { Component } from "react"; //리엑트에서 Component 가져온다.
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import Expenselist from "./components/Expenselist";


class App extends Component{

	constructor(props){
		super(props);
		this.state ={
			expenses: [ // 이름
				{ id: 1, charge: "렌트비", amount: 16000 },
				{ id: 2, charge: "교통비", amount: 20000 },
				{ id: 3, charge: "숙박비", amount: 200000 },
				{ id: 4, charge: "식비", amount: 56000 }
			]
		}
	}

	

	// 클릭 이벤트 함수 생성
	// 아이템 제거
	handleDelete = (id) => {
		const newExpenses = this.state.expenses.filter(expect=> expect.id !== id);
		this.setState({ expenses : newExpenses })

	}

	render(){
		return (
			<main className="main-container">
				<h1>예산 계산기</h1>
				<div style={{width: '100%', background:'white',padding:'1rem'}}>
					{/* Expense Form */}
					<ExpenseForm />
				</div>
				<div style={{ width: '100%', background: 'white', padding: '1rem' }}>
					{/* Expense list */}
					<Expenselist initialExpenses={this.state.expenses} handleDelete={this.handleDelete} />
				</div>
				<div style={{display:'flex', justifyContent:'end',marginTop:'1rem'}}>
					<p>
						총 지출:
						<span>원</span>
					</p>
				</div>
			</main>
		)
	}

}

//내보내기 default - 메인으로 내보냄
export default App;