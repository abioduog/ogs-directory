// import React, { useState, useRef } from 'react'

// import { VStack, Input, Button } from '@chakra-ui/react'

// const AddProductForm = () => {
// 	const [formInput, setFormInput] = useState({
// 		name: '',
// 		price: 0,
// 		total: 0,
// 	})

// 	const formRef = useRef()

// 	const handleSubmit = async (e) => {
// 		e.preventDefault()

// 		console.log(formInput)

// 		formRef.current.reset()
// 	}

// 	const handleChange = (e) =>
// 		setFormInput((prev) => {
// 			const key = e.target.name
// 			let value = e.target.value

// 			value = parseInt(value, 10) || value

// 			return { ...prev, [key]: value }
// 		})

// 	return (
// 		<VStack
// 			as='form'
// 			ref={formRef}
// 			spacing={5}
// 			alignItems='start'
// 			onSubmit={handleSubmit}
// 		>
// 			<Input
// 				value={formInput.name}
// 				name='name'
// 				placeholder='Name'
// 				onChange={handleChange}
// 			/>
// 			<Input
// 				name='price'
// 				placeholder='Price'
// 				type='number'
// 				onChange={handleChange}
// 				value={formInput.price}
// 			/>
// 			<Input
// 				name='total'
// 				placeholder='Total'
// 				type='number'
// 				onChange={handleChange}
// 				value={formInput.total}
// 			/>

// 			<Button type='submit'>Add Product</Button>
// 		</VStack>
// 	)
// }

// export default AddProductForm
