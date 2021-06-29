import React from "react";
import Form from "./../Common/Form";
import InputField from "./../Common/InputField";
import Joi from "joi-browser";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { createRequest } from "./../../Services/http";

class BasicDetailsForm extends Form {
	state = {
		data: {
			id: 0,
			createDate: Date.now(),
			orderType: "",
			destinationType: "",
			destinationIWName: "",
			recipientName: "",
			recipientContact: "",
			partsRequirements: [
				{
					partNumber: "",
					brandName: "",
					partDescription: "",
					quantity: 0,
				},
			],
			destinationAddress: "",
			casePriority: "",
			orderValue: "",
			advanceStatus: "",
			comment: "",
		},
		errors: {},
	};
	casePriorities = ["High", "Medium", "Low"];
	destinationTypes = ["IW", "RO", "VO", "WH", "OT"];
	orderTypes = [
		"Cx Demand",
		"Missing Item in RO",
		"Range Building",
		"Periodical Replenishment",
	];
	schema = {
		id: Joi.number().min(0).required(),
		createDate: Joi.date(),
		orderType: Joi.string().allow(""),
		destinationIWName: Joi.string().allow(""),
		destinationType: Joi.string().allow(""),
		recipientName: Joi.string().allow(""),
		recipientContact: Joi.string().allow(""),
		partsRequirements: {
			partNumber: Joi.string().allow(""),
			brandName: Joi.string().allow(""),
			partDescription: Joi.string().allow(""),
			quantity: Joi.number().min(0),
		},
		destinationAddress: Joi.string().allow(""),
		casePriority: Joi.string().allow(""),
		orderValue: Joi.string().allow(""),
		advanceStatus: Joi.string().allow(""),
		comment: Joi.string().allow(""),
	};
	doSubmit = async () => {
		console.log(this.state.data);
		createRequest(this.state.data)
			.then((response) => {
				console.log(response);
				alert(response.data.message);
				this.reset();
			})
			.catch((err) => {
				console.log(err);
				alert(err.data.error);
			});
	};
	reset = () => {
		const data = {
			id: 0,
			createDate: Date.now(),
			orderType: "",
			destinationType: "",
			destinationIWName: "",
			recipientName: "",
			recipientContact: "",
			partsRequirements: [
				{
					partNumber: "",
					brandName: "",
					partDescription: "",
					quantity: 0,
				},
			],
			destinationAddress: "",
			casePriority: "",
			orderValue: "",
			advanceStatus: "",
			comment: "",
		};
		this.setState({ data });
	};
	handleStatus = (type) => {
		const data = { ...this.state.data };
		data.advanceStatus = type;
		this.setState({ data });
	};
	handleDelete = (index) => {
		const data = { ...this.state.data };
		data.partsRequirements.splice(index, 1);
		this.setState(data);
	};
	handleAddMore = (type) => {
		const errors = this.validate(type);
		if (Object.keys(errors).length > 0) {
			this.setState({ errors });
		} else {
			const data = { ...this.state.data };
			const partsRequirements = {
				partNumber: "",
				brandName: "",
				partDescription: "",
				quantity: 0,
			};
			data.partsRequirements.push(partsRequirements);
			this.setState({ data });
		}
	};

	render() {
		const { data, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit("partsRequirements")}>
				<div className="container-fluid rounded px-lg-5">
					<div className="row bg-white my-2 py-2 m-auto">
						<div className="col-md-6 my-3">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="id">Demand ID</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.id}
										value={data.id}
										variant="outlined"
										type="text"
										placeholder="Demand Id"
										name="id"
										label="Demand Id"
									></InputField>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-2">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="orderType">Order Type</label>
								</div>
								<div className="col-7">
									<FormControl variant="outlined" className="w-100">
										<InputLabel id="orderType">
											Cx Demand / Missing Item in RO / Range Building /
											Periodical Replenishment
										</InputLabel>
										<Select
											labelId="orderType"
											id="orderType"
											value={data.orderType}
											onChange={this.handleSelect("orderType")}
											label="Cx Demand / Missing Item in RO / Range Building / Periodical Replenishment"
										>
											{this.orderTypes.map((types) => (
												<MenuItem key={types} value={types}>
													{types}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-2">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="destinationIWName">
										Destination Account Name
									</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.destinationIWName}
										value={data.destinationIWName}
										variant="outlined"
										type="text"
										placeholder="Destination Account Name"
										name="destinationIWName"
										label="Destination Account Name"
									></InputField>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-2">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="destinationType">Destination Type</label>
								</div>
								<div className="col-7">
									<FormControl variant="outlined" className="w-100">
										<InputLabel id="destinationType">
											IW / RO / VO / WH / OT
										</InputLabel>
										<Select
											labelId="destinationType"
											id="destinationType"
											value={data.destinationType}
											onChange={this.handleSelect("destinationType")}
											label="IW / RO / VO / WH / OT"
										>
											{this.destinationTypes.map((destination) => (
												<MenuItem key={destination} value={destination}>
													{destination}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-2">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="recipientName">Recipient Name</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.recipientName}
										value={data.recipientName}
										variant="outlined"
										type="text"
										placeholder="Recipient Name"
										name="recipientName"
										label="Recipient Name"
									></InputField>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-2">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="recipientContact">Recipient Contact</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.recipientContact}
										value={data.recipientContact}
										variant="outlined"
										type="text"
										placeholder="Recipient Contact"
										name="recipientContact"
										label="Recipient Contact"
									></InputField>
								</div>
							</div>
						</div>
					</div>
					<div className="row bg-white my-3 py-2 m-auto">
						{data.partsRequirements.map((parts, index) => {
							const length = data.partsRequirements.length;
							return (
								<div
									key={index}
									className="col-md-6"
									style={{ position: "relative" }}
								>
									{length > 1 && (
										<button
											type="button"
											class="btn btn-floating btn-small"
											style={{
												position: "absolute",
												right: 10,
												width: "1.5rem",
												height: "1.5rem",
											}}
											onClick={() => this.handleDelete(index)}
										>
											<i
												class="fas fa-times"
												style={{ width: "inherit", lineHeight: "inherit" }}
											></i>
										</button>
									)}
									<div className="row my-3 pt-3">
										<div className="col-5 text-end my-auto">
											<label htmlFor={`partNumber${index}`}>Part Numbers</label>
										</div>
										<div className="col-7">
											<InputField
												handleChange={this.handleChange("partsRequirements")}
												error={errors["partNumber" + index]}
												value={parts.partNumber}
												variant="outlined"
												id={`partNumber${index}`}
												type="text"
												placeholder="Part Numbers"
												name="partNumber"
												label="Part Number"
											></InputField>
										</div>
									</div>
									<div className="row my-3">
										<div className="col-5 text-end my-auto">
											<label htmlFor={`brandName${index}`}>Brand</label>
										</div>
										<div className="col-7">
											<InputField
												handleChange={this.handleChange("partsRequirements")}
												error={errors["brandName" + index]}
												value={parts.brandName}
												variant="outlined"
												type="text"
												id={`brandName${index}`}
												placeholder="Brand"
												name="brandName"
												label="Brand"
											></InputField>
										</div>
									</div>
									<div className="row my-3">
										<div className="col-5 text-end my-auto">
											<label htmlFor={`partDescription${index}`}>
												Part Descriptions
											</label>
										</div>
										<div className="col-7">
											<InputField
												handleChange={this.handleChange("partsRequirements")}
												error={errors["partDescription" + index]}
												value={parts.partDescription}
												variant="outlined"
												type="text"
												id={`partDescription${index}`}
												placeholder="Part Descriptions"
												name="partDescription"
												label="Part Descriptions"
											></InputField>
										</div>
									</div>
									<div className="row my-3">
										<div className="col-5 text-end my-auto">
											<label htmlFor={`quantity${index}`}>Quantity</label>
										</div>
										<div className="col-7">
											<InputField
												handleChange={this.handleChange("partsRequirements")}
												error={errors["quantity" + index]}
												value={parts.quantity}
												id={`quantity${index}`}
												variant="outlined"
												type="number"
												placeholder="Quantity"
												name="quantity"
												label="Quantity"
											></InputField>
										</div>
									</div>
								</div>
							);
						})}

						<div className="col-md-6">
							<div className="row justify-content-center justify-content-md-start ">
								<div className="col-8">
									<div className="rounded border my-3 p-2 d-flex">
										<ul class="list-group pe-3">
											<li class="list-group-item border-0 p-0">Part No.</li>
											<li class="list-group-item border-0 p-0">Brand</li>
											<li class="list-group-item border-0 p-0">Part Des.</li>
											<li class="list-group-item border-0 p-0">Qutantity</li>
										</ul>
										<ul class="list-group ">
											<li class="list-group-item border-0 p-0">XXXXXXXXXXX</li>
											<li class="list-group-item border-0 p-0">Mahindra</li>
											<li class="list-group-item border-0 p-0">Clutch Brake</li>
											<li class="list-group-item border-0 p-0">2</li>
										</ul>
									</div>
									<div className="rounded border my-3 p-2 d-flex">
										<ul class="list-group pe-3">
											<li class="list-group-item border-0 p-0">Part No.</li>
											<li class="list-group-item border-0 p-0">Brand</li>
											<li class="list-group-item border-0 p-0">Part Des.</li>
											<li class="list-group-item border-0 p-0">Qutantity</li>
										</ul>
										<ul class="list-group ">
											<li class="list-group-item border-0 p-0">XXXXXXXXXXX</li>
											<li class="list-group-item border-0 p-0">Mahindra</li>
											<li class="list-group-item border-0 p-0">Head Light</li>
											<li class="list-group-item border-0 p-0">10</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<div className="col-md-6">
							<button
								type="button"
								onClick={() => this.handleAddMore("partsRequirements")}
								className="btn btn-dark w-100"
							>
								+ Add Part Bundle
							</button>
						</div>
					</div>
					<div className="row bg-white my-3 py-2 m-auto">
						<div className="col-md-6 my-3">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="destinationAddress">
										Destination Address
									</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.destinationAddress}
										value={data.destinationAddress}
										variant="outlined"
										type="text"
										placeholder="Destination Address"
										name="destinationAddress"
										label="Destination Address"
									></InputField>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-3">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="casePriority">Case Priority</label>
								</div>
								<div className="col-7">
									<FormControl variant="outlined" className="w-100">
										<InputLabel id="casePriority">
											High / Medium / Low
										</InputLabel>
										<Select
											labelId="casePriority"
											id="casePriority"
											value={data.casePriority}
											onChange={this.handleSelect("casePriority")}
											label="High / Medium / Low"
										>
											{this.casePriorities.map((priority) => (
												<MenuItem key={priority} value={priority}>
													{priority}
												</MenuItem>
											))}
										</Select>
									</FormControl>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-3">
							<div className="row">
								<div className="col-5 text-end my-auto">
									<label htmlFor="orderValue">Order Value (Rs.)</label>
								</div>
								<div className="col-7">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.orderValue}
										value={data.orderValue}
										variant="outlined"
										type="text"
										placeholder="Order Value"
										name="orderValue"
										label="Order Value"
									></InputField>
								</div>
							</div>
						</div>
						<div className="col-md-6 my-3">
							<div className="row h-100">
								<div className="col-5 text-end my-auto">
									<label htmlFor="advanceStatus">Advance Status</label>
								</div>
								<div className="col-7 d-flex">
									<button
										className={`btn w-50 mx-2 ${
											data.advanceStatus === "Yes" ? "btn-dark" : "btn-light"
										}`}
										onClick={() => this.handleStatus("Yes")}
										type="button"
									>
										Yes
									</button>
									<button
										className={`btn w-50 mx-2 ${
											data.advanceStatus === "No" ? "btn-dark" : "btn-light"
										}`}
										onClick={() => this.handleStatus("No")}
										type="button"
									>
										No
									</button>
								</div>
							</div>
						</div>
						<div className="col-md-12 my-3">
							<div className="row">
								<div className="col-md-2 col-3 text-end my-auto">
									<label htmlFor="comment">Add Comment</label>
								</div>
								<div className="col-md-10 col-9">
									<InputField
										handleChange={this.handleChange("label")}
										error={errors.comment}
										value={data.comment}
										variant="outlined"
										type="text"
										placeholder="Comment"
										name="comment"
										rows={4}
										multiline
										label="Comment"
									></InputField>
								</div>
							</div>
						</div>
					</div>
					<div className="row my-3 py-2 m-auto justify-content-end">
						<div className="col-md-2 col-4">
							<button className="btn btn-dark w-100 mx-2" type="submit">
								Save
							</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
}

export default BasicDetailsForm;
