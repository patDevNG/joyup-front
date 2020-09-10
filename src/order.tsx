import React, { useEffect, useState } from 'react';
import { Table, notification, Spin, Typography } from 'antd';
import moment from 'moment';
import { formatAsDollar} from './helpers'
import { List } from 'antd';
// import moment from 'moment';
export const Order = () => {

  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false)
	useEffect(() => {
		const fetchOrder = async ()=>{
			const parameter:RequestInit ={
				method:'GET',
				mode:"cors"
			}
			
			try {
				setisLoading(true);
				const url = 'https://joyup-backend.herokuapp.com/orders';
			const response = await fetch(url,parameter)
			console.log(response);
			const res = await response.json();
			if(res.status === true){
				setdata(res.data)
				setisLoading(false)
			}else{
				setisLoading(false);
				notification.error({
					message:'Error',
					description:res.message
				})
			}
			
			console.log(res);
			} catch (error) {
				setisLoading(false);
				notification.error({
					message:'Error',
					description:"Could not fetch data"
				})
			}
			
			
		}
		fetchOrder()
	}, [])

	const colums:any = [
		{
			title:'Order Id',
			dataIndex:'id',
			width:30,
// 			render:(text:any,record:any)=>{
// 				return (
// <div>{text._id}</div>
// 				)
// 			}
			
		},
		{
			title:'Listed Items',
			dataIndex:'',
			width:40,
		render:(text:any, record:any)=> {

			console.log(text, 'ahshbsdbhadsahdlHASDahdlhaD');
			console.log(record.listItems,'DBshbfhsdbsakAHDSlds');
			
			
			return(
			
				<div>
					<List
				dataSource={record.listItems}
				renderItem={item => (
				  <List.Item>
					<Typography.Text mark></Typography.Text> {item}
				  </List.Item>
				)}
			  />
				</div>
		)}
		},
		
		{
			title:'Amount',
			dataIndex:'price',
		render:(text: any)=>formatAsDollar(parseFloat(text)),
			width:10
		},
		{
			title:'Created At',
			dataIndex:'created_at',
		render:(text: React.ReactNode)=><div>{moment(`${text}`).format('MMMM Do YYYY, h:mm:ss a')}</div>
			
		},

		
	]
	if(isLoading === true){
		return(
			<div className="container">
				<div className="child">
				<Spin  size='large'/>
			</div>
			</div>
			
		)
	}else{
		return <div>
		
		<Table
		columns ={colums}
		dataSource ={data}
		bordered
		/>
	</div>;
	}
	
};
