import React, { useEffect, useState } from 'react';
import { Table, notification, Spin } from 'antd';
import moment from 'moment';
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

	const colums = [
		{
			title:'First Name',
			dataIndex:'first_name',
			
		},
		{
			title:'Last Name',
			dataIndex:'last_name',
			
		},
		{
			title:'Price',
			dataIndex:'price',
			
		},
		{
			title:'Created At',
			dataIndex:'created_at',
		render:(text: React.ReactNode)=><div>{moment(`${text}`).format('ll')}</div>
			
		},

		{
			title:'State',
			dataIndex:'state',
			
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
